/*
 * Game that I need to think of a name for.
 * Written by Michael Warner
 * Version 0.0.1 Alpha
 */

// Sets the scale for rendering.
const zoomLevel = 1;

RequireScript("sprng.js");
RequireScript("util.js");

// Load in our libraries from lib.js
RequireScript("lib/lib.js");

// Load in UI elements.
RequireScript("UI/ui.js");

// Load in other scripts.
RequireScript("playerControl.js");


console.addTypeset("Test", false, colors.get(255, 0, 0));

// Create a standard lightsource, the sun!
let sun = new lightSource(0, 0, 0, 255, 255, 0); 

// Sky background for demo.
let bg = CreateSurface(GetScreenWidth(), GetScreenHeight(), colors.get(125, 125, 255));

// Generate a seed for the terrain generator.
let seed = Math.random() * 5345352432

print("Begining terrain generation...\nSeed is: " + seed);

// Prepare and generate a terrain mesh.
let modelA = new modelObject(0, 0, 0, 0, 0, 0);

let mw = 80;
let mh = 80;
let scale = 40;
function genTile (xp, yp)
{
	let cache = [];
	for(x = xp; x < 2 + xp; x++)
	{
		for(y = yp; y < 2 + yp; y++)
		{
			let val = tprng(x, y, seed, scale).toPrecision(2);
			let id = modelA.addPoint(-1 * (scale * mh / 2) + (x * scale) , -1 * (scale * mh / 2) + (y * scale), val * 120);
            //let id = modelA.addPoint(-1 * (scale * mh / 2) + (x * scale) , -1 * (scale * mh / 2) + (y * scale), 0);

			cache.push(id);
		}
	}
	return(cache);
}

// Begin assembling the mesh
let tile = 0;
for (xpos = 0; xpos < mw; xpos++)
{
	for (ypos = 0; ypos < mh; ypos++)
	{
		let pa = undefined;
		let pb = undefined;
		let pc = undefined;
		let pd = undefined;
		
		let id = genTile(xpos, ypos);

		if (enableVertCaching)
		{
			pa = id[0];
			pb = id[1];
			pc = id[3];
			pd = id[2];
		} else {
			let tx = ((tile + 1) * 4) - 1;
				
			//print(y + "-" + tx);
			
			pa = tx - 3;
			pb = tx - 2;
			pc = tx;
			pd = tx - 1;
			//print("added sequence - " + pa + "," + pb + "," + pc + "," + pd);
			
			tile++;				
		}

        let textures = ['grass.jpg'];

        let tex = Math.floor((pa.z / 100000000000) * textures.length);
        //print(pa);
		modelA.definePoly(pa, pb, pc, pd, textures[0]);
	}
    print("Generating terrain... [" +  Math.floor(xpos/mw * 100) + "%]"); 
}
print("Terrain generation complete!");

// Define movement and rotation speed factors.
let rotspeed = 0.5;
let movspeed = 0.5;

// Profiling stuff
SSj.profile(global, 'CreateColor');
SSj.profile(colors, 'get');
SSj.profile(colors, 'getTemp');
SSj.profile(Shape, 'drawImmediate');
SSj.profile(global, 'backfaceCull');
SSj.profile(global, 'oobCull');
// Run our game.
while (true)
{
    bg.blit(0, 0);
	
    // Get user input.
	if (globalCamera.rot.x > 360)
	{
		globalCamera.rot.x -= 360;
	} else if (globalCamera.rot.x == 0)
    {
        globalCamera.rot.x = 360;
    } else if (globalCamera.rot.x < 0) {
		globalCamera.rot.x += 360;
	}
	
	if (globalCamera.rot.y > 360)
	{
		globalCamera.rot.y -= 360;
	} else if (globalCamera.rot.y == 0)
    {
        globalCamera.rot.y = 360;
    } else if (globalCamera.rot.y < 0) {
		globalCamera.rot.y += 360;https://dont-be-afraid-to-commit.readthedocs.io/en/latest/git/commandlinegit.html
	}
	
	if (globalCamera.rot.z > 360)
	{
		globalCamera.rot.z -= 360;
	} else if (globalCamera.rot.z == 0)
    {
        globalCamera.rot.z = 360;
    } else if (globalCamera.rot.z < 0) {
		globalCamera.rot.z += 360;
	}
	
    // Render model.
	modelA.blit(globalCamera.pos.x, globalCamera.pos.y, globalCamera.pos.z, globalCamera.rot.x, globalCamera.rot.y, globalCamera.rot.z);
    
    //Control Player.
    playerControl();
    
    //Developer Key checks.
    candleDevKeys(KEY_F1, KEY_F2, KEY_F3, KEY_F4);
    
    GetSystemFont().drawText(0, 245, "Seed: " + seed);
    render3dStats();

  	FlipScreen();
}

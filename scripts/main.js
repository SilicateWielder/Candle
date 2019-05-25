/*
 * Game that I need to think of a name for.
 * Written by Michael Warner
 * Version 0.0.1 Alpha
 */

// Sets the scale for rendering.
Sphere.frameRate = 30;

RequireScript("sprng.js");
RequireScript("util.js");

// Load in our libraries from lib.js
RequireScript("lib/lib.js");

// Load in UI elements.
RequireScript("UI/ui.js");

// Load in other scripts.
RequireScript("playerControl.js");


console.addTypeset("Test", false, colors.get(255, 0, 0));

//Seed the terrain generator, and set the size of voxels
let seed = Math.random() * 5345352432
let scale = 40;

// Create a standard lightsource, the sun!
let sun = new lightSource(75, 25, 175, 255, 255, 5); 

// Sky background for demo.
let bg = CreateSurface(GetScreenWidth(), GetScreenHeight(), colors.get(70, 70, 200));

// Set up bgm loop amd mixer.
let bgm = new Sound("sounds/Cyber-Dream-Loop.ogg");
let mix = new Mixer(48000, 16, 2);
mix.volume = 0.25;

let world = null;

//Create a resource attributuion panel.
let pane = CreateSurface(400, 30, colors.get(50, 50, 50, 200));
function attrib()
{
	let font = GetSystemFont();
	let left = GetScreenWidth() - pane.width;
	pane.blit(left, 0);
	font.drawText(left + 5, 0, "Music by Eric Matyas");
	font.drawText(left + 5, 15, "www.soundimage.org");
}

// Create a floating miniSphere logo
let logo = new modelObject(0, 0, 0, 0, 0, 0);
let p1 = logo.addPoint(-5, -3.75, 0);
let p2 = logo.addPoint(5, -3.75, 0);
let p3 = logo.addPoint(5, 3.75, 0);
let p4 = logo.addPoint(-5, 3.75, 0);
logo.definePoly(p3, p4, p1, p2, "sphereClear.png", true);
logo.definePoly(p4, p3, p2, p1, "sphereClear.png", true);
logo.findOrigin();

// Create a skybox
let skyScale = 20;
let skybox = new modelObject(0, 0, 0, 0, 0, 0);
let sp1 = skybox.addPoint(-skyScale, -skyScale, -skyScale, true);
let sp2 = skybox.addPoint(-skyScale, skyScale, -skyScale, true);
let sp3 = skybox.addPoint(skyScale, skyScale, -skyScale, true);
let sp4 = skybox.addPoint(skyScale, -skyScale, -skyScale, true);

let sp5 = skybox.addPoint(-skyScale, -skyScale, skyScale, true);
let sp6 = skybox.addPoint(-skyScale, skyScale, skyScale, true);
let sp7 = skybox.addPoint(skyScale, skyScale, skyScale, true);
let sp8 = skybox.addPoint(skyScale, -skyScale, skyScale, true);

skybox.definePoly(sp2, sp3, sp4, sp1, 'stormydays_ft.png', true);
skybox.definePoly(sp7, sp6, sp5, sp8, 'stormydays_bk.png', true);
skybox.definePoly(sp6, sp2, sp1, sp5, 'stormydays_rt.png', true);
skybox.definePoly(sp3, sp7, sp8, sp4, 'stormydays_lf.png', true);
skybox.definePoly(sp5, sp1, sp4, sp8, 'stormydays_dn.png', true);
skybox.definePoly(sp7, sp3, sp2, sp6, 'stormydays_up.png', true);
skybox.findOrigin();

// Generate terrain.
function genTerrain(width, height, depth)
{
	let generBlocks = 0;
	let totalBlocks = width * height * depth;
	world = null;
	world = new voxelMap(50, 1024, 1024, 1024);
	for(zc = 0; zc < width; zc++) // This
	{
		for(yc = 0; yc < height; yc++)
		{
			for(xc = 0; xc < depth; xc++)
			{
				let level = (0.75 * tprng(xc, zc, seed, scale).toPrecision(2));
				level +=4;
				let blockID = 0;
				if(yc < level)
				{
					blockID = 1;
				}
				world.setVoxel(xc, yc, zc, blockID);
				generBlocks ++;
				let genPerc = (generBlocks / totalBlocks * 100).toPrecision(2);
				print("Generating Terrain... (" + genPerc + "%) - " + generBlocks + "/" + totalBlocks + " Blocks");
			}
		}
	}
	print("Terrain Generation Complete!");
}
genTerrain(20, 10, 20);

pRange = 200;
//Generate particles.
for(pi = 0; pi < 10; pi++)
{
	world.addParticle("null", -pRange/2 + (pRange * Math.random()), 1 * Math.random(), -pRange/2 + (pRange * Math.random()), 0, 0, 0);
}

// Define movement and rotation speed factors.
let rotspeed = 0.5;
let movspeed = 5;

//Adjust the camera
let orbitX = 0;
globalCamera.pos.y = -500
globalCamera.rot.x = 335;
globalCamera.rot.y = 45;

//Controls the orbit of the camera around the scene.
function orbit(dist)
{
	orbitX -= 0.5;
	
	if (orbitX > 360)
	{
		orbitX = orbitX - 360;
	}
	let rads = orbitX * (3.1415 / 180);
	let orbX = (Math.cos(rads) * dist) - (Math.sin(rads) * dist);
	let orbY = (Math.sin(rads) * dist) + (Math.cos(rads) * dist);
	globalCamera.pos.x = orbX;
	globalCamera.pos.z = orbY;
	globalCamera.rot.y += 0.5;
}

// Profiling stuff
//SSj.profile(global, 'genTerrain');
SSj.profile(global, 'CreateColor');
SSj.profile(colors, 'get');
SSj.profile(colors, 'getTemp');
SSj.profile(Shape, 'drawImmediate');
SSj.profile(global, 'backfaceCull');
SSj.profile(global, 'oobCull');
// Run our game.
while (true)
{
	// Start audio, and loop.
	if(!bgm.playing)
	{
		bgm.play(mix);
	}
	if (bgm.position <! bgm.length)
	{
		bgm.position = 0;
	}
		
    // Limit camera rotational values between 0 and 360.  
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
		globalCamera.rot.y += 360;
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
    skybox.place(0, -50, 0);
    skybox.blit(0, -50, 0, globalCamera.rot.x, globalCamera.rot.y, globalCamera.rot.z);
	world.blit(globalCamera.pos.x, globalCamera.pos.y, globalCamera.pos.z, globalCamera.rot.x, globalCamera.rot.y, globalCamera.rot.z);
	logo.place(0, -50, 0);
	logo.blit(0, -70, 50, globalCamera.rot.x, globalCamera.rot.y, globalCamera.rot.z, sun);
    
    //Control camera.
    orbit(700);
    playerControl();

    //Developer Key checks.
    candleDevKeys(KEY_F1, KEY_F2, KEY_F3, KEY_F4);
    
    // Render the attribution and status info.
    attrib();
    render3dStats();
    
  	FlipScreen();
}

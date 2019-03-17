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

let world = new voxelMap(50, 1024, 1024, 255);
world.setVoxel(0, 0, 0, 1);
world.setVoxel(0, 1, 0, 1);
world.setVoxel(1, 0, 0, 1);
world.setVoxel(1, 1, 0, 1);
world.setVoxel(1, 3, 0, 1);
world.setVoxel(1, 3, 3, 1);

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
	world.blit(globalCamera.pos.x, globalCamera.pos.y, globalCamera.pos.z, globalCamera.rot.x, globalCamera.rot.y, globalCamera.rot.z);
    
    //Control Player.
    playerControl();
    
    //Developer Key checks.
    candleDevKeys(KEY_F1, KEY_F2, KEY_F3, KEY_F4);
    
    render3dStats();

  	FlipScreen();
}

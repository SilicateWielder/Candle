/*
 * Candle Lib
 * Written by Michael Warner
 * Version 0.3.3 Alpha
 * Last Update: 06/22/18
 * 
 * Used to render 3d graphics in Sphere
 */

// Set up hard parameters.
const wireframeColor = CreateColor(255, 255, 255);

const enableVertCaching = true; //Enforces caching of vertices for performance improvements (Useless????)
 
// Set up soft parameters.
let bobRossMode = false; // Painter's algorithm toggle.
let wireframesEnabled = false; // Enables the displaying of wireframes in place of textures.

let wireframesForced = false; // forces the engine to render wireframes only.

let lightingEnabled = true; // Enables lighting calculations to be performed 

let micronEnabled = false; // Enables the elusive and seemingly faster micron based rendering system.

let bobRossPref = "";
let bobRossSuff = "";

if (bobRossMode)
{
	bobRossPref = "Gently "; 
}

if (bobRossMode)
{
	bobRossSuff = " in Bob Ross Mode";
}

// Announce loading process.
Print ("  Loading Candle.js" + bobRossSuff + "...");

// Load in the required scripts that are part of this library
RequireScript("lib/candle/vect2.js");
RequireScript("lib/candle/vect3.js");

RequireScript("lib/candle/camera.js");
RequireScript("lib/candle/world.js");

function candleDevKeys(keyA = KEY_F1, keyB = KEY_F2, keyC = KEY_F3, keyD = KEY_F4)
{
	if(IsKeyPressed(keyA))
	{
		if (wireframesForced)
		{
			wireframesForced = false;
		} else {
			wireframesForced = true;
		}
		
		while(IsKeyPressed(keyA))
		{
		}
	}
	
	if(IsKeyPressed(keyB))
	{
		if (bobRossMode)
		{
			bobRossMode = false;
		} else {
			bobRossMode = true;
		}
		
		while(IsKeyPressed(keyB))
		{
		}
	}
	
	if(IsKeyPressed(keyC))
	{
		if (lightingEnabled)
		{
			lightingEnabled = false;
		} else {
			lightingEnabled = true;
		}
		
		while(IsKeyPressed(keyC))
		{
		}
	}
	
    
    if(IsKeyPressed(keyD))
	{
		if (micronEnabled)
		{
			micronEnabled = false;
		} else {
			micronEnabled = true;
		}
		
		while(IsKeyPressed(keyD))
		{
		}
	}
	//Reserve keyD for reloading textures.
}

// miscellaneous functions, move to their own file.
function findSpread(x1, y1, x2, y2)
{
	//print(x1 + ' ' + y1 + ' ' + x2 + ' ' + y2);
	let t = (x2 * y1) - (x1 * y2);
	let b = (Math.pow(x1, 2) + Math.pow(y1, 2)) * (Math.pow(x2, 2) + Math.pow(y2, 2));
	return(t/b);
}

// Announce end of loading process.
Print ("  ...Done.");

/*
 * Candle Lib - pointObject.js
 * Written by Michael Warner
 * Version 0.1.1
 * Last Update: 06/22/18
 * 
 * Wrapper that adds additional functionality to vect3 objects.
 */

let pointObject = function(lX, lY, lZ)
{
	this.vector = new vect3(lX, lY, lZ);
	this.vector.flatten();

	// Publicly accessable location in 3d space.
	this.x = lX;
	this.y = lY;
	this.z = lZ;

    // Ensure values are usable, having zeros causes math problems.
    if(this.x == 0)
    {
        this.x = 0.0000001;
    }

    if (this.y == 0)
    {
        this.y = 0.0000001;
    }

    if(this.z == 0)
    {
        this.z = 0.0000001;
    }
	
	this.xp = this.x;
	this.yp = this.y;
	this.xP = this.z;
	
	this.flat = {};
	this.flat.x = 0;
	this.flat.y = 0;
	
}

pointObject.prototype.rotate = function(rX, rY, rZ, origin = {"x":0, "y":0, "z":0}, offset = {"x":0, "y":0, "z":0})
{
	
	this.vector.rotate(rX, rY, rZ, offset);
	
	let scaleFactor = globalCamera.fov / (globalCamera.fov + (this.vector.pub.z + origin.z));
	
	if (scaleFactor < 0)
	{
		scaleFactor = 4223434324234; // A random value to kick inverted polygons (too far to render) out of view for OOB culling
	};
		
	let x1c = (this.vector.pub.x + origin.x) * scaleFactor;
	let y1c = (this.vector.pub.y + origin.y) * scaleFactor;
	
	this.xp = this.vector.pub.x + origin.x;
	this.yp = this.vector.pub.y + origin.y;
	this.zp = this.vector.pub.z + origin.z;
	
	this.flat.x = x1c;
	this.flat.y = y1c;
}

pointObject.prototype.retrieve = function(origin = {"x":0, "y":0, "z":0})
{
	cache = this.vector.get3d();
	cache.x += origin.x;
	cache.y += origin.y;
	cache.z += origin.z;
}

pointObject.prototype.get2d = function()
{
	let cache = {};
	cache.x = this.flat.x;
	cache.y = this.flat.y;
	
	return(cache);
}

Print("      " + bobRossPref + "Loaded PointOject.js");

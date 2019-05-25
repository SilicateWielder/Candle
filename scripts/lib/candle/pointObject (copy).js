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
	
	// Location of the origin for our point.
	this.origin = {}
	this.origin.x = 0;
	this.origin.y = 0;
	this.origin.z = 0;

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

pointObject.prototype.setPosition = function(x, y, z)
{
	this.vector.modify(x, y, z);
	
	this.x = x;
	this.y = y;
	this.z = z;
	
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
	this.zp = this.z;
	
	this.flat.x = 0;
	this.flat.y = 0;
	
}

pointObject.prototype.setOrigin = function(lX, lY, lZ)
{
	this.origin.x = lX;
	this.origin.y = lY;
	this.origin.z = lZ;
}

pointObject.prototype.rotate = function(rX, rY, rZ)
{
	
	this.vector.rotate(rX, rY, rZ);
	
	this.xp = this.vector.pub.x + this.origin.x;
	this.yp = this.vector.pub.y + this.origin.y;
	this.zp = this.vector.pub.z + this.origin.z;
	
	let cache = cameraObject.project(this.xp, this.yp, this.zp);
	
	this.flat.x = cache.pos.x;
	this.flat.y = cache.pos.y;
}

pointObject.prototype.retrieve = function()
{
	cache = this.vector.get3d();
	cache.x += this.origin.x;
	cache.y += this.origin.y;
	cache.z += this.origin.z;
}

pointObject.prototype.get2d = function(xd, yd, zd)
{
	let cache = {};
	cache.x = this.flat.x;
	cache.y = this.flat.y;
	
	return(cache);
}

Print("      " + bobRossPref + "Loaded PointOject.js");

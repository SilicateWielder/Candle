/*
 * Candle Lib - pointObject.js
 * Written by Michael Warner
 * Version 0.1.1
 * Last Update: 06/22/18
 * 
 * Wrapper that adds additional functionality to vect3 objects.
 */

class pointObject
{
	constructor(lX, lY, lZ)
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
		this.dist = 0;
		
		this.lastState = [];
	}

	// What is with this, why did I do this, me. Fix this.
	rotate(rX, rY, rZ, origin = {"x":0, "y":0, "z":0}, offset = {"x":0, "y":0, "z":0})
	{
		//Create a new state and compare it to the old one, if they're different update the point.
		let state = [rX, rY, rZ, origin, offset];
		if(state != this.lastState)
		{
			this.vector.rotate(rX, rY, rZ, offset);
			
			this.xp = this.vector.pub.x + origin.x;
			this.yp = this.vector.pub.y + origin.y;
			this.zp = this.vector.pub.z + origin.z;
		
			let cache = globalCamera.project(this.xp, this.yp, this.zp);
		
			this.flat.x = cache.pos.x;
			this.flat.y = cache.pos.y;
			this.dist = cache.scale;
			
			this.lastState = state
		}
	}

	retrieve(origin = {"x":0, "y":0, "z":0})
	{
		cache = this.vector.get3d();
		cache.x += origin.x;
		cache.y += origin.y;
		cache.z += origin.z;
	}

	get2d()
	{
		let cache = {};
		cache.x = this.flat.x;
		cache.y = this.flat.y;
		
		return(cache);
	}
	
	getDist()
	{
		return(this.dist);
	}
}
Print("      " + bobRossPref + "Loaded PointOject.js");

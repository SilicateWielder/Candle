/*
 * Candle Lib - camera.js
 * Written by Michael Warner
 * Version 0.1.0
 * Last Update: 06/15/18
 * 
 * Used to a camera in 3d space.
 */
 
 // TODO: Turn the camera into an explicit surface for rendering.
 
class cameraObject
{
	constructor(fov, sX, sY, sZ, rX, rY, rZ)
	{
		this.fov = fov;
		
		this.output = CreateSurface(GetScreenWidth(), GetScreenHeight(), colors.get(0, 0, 0, 0));
		
		this.pos = {};
		this.pos.x = sX;
		this.pos.y = sY;
		this.pos.z = sZ;
		
		this.rot = {};
		this.rot.x = rX;
		this.rot.y = rY;
		this.rot.z = rZ;
	}
	
	getPosition()
	{
		let cache = {};
		cache.x = this.pos.x;
		cache.y = this.pos.y;
		cache.z = this.pos.z;
		return(cache);
	}

	getX()
	{
		return(this.pos.x);
	}

	getY()
	{
		return(this.pos.y);
	}

	getZ()
	{
		return(this.pos.z);
	}

	getRotation()
	{
		return({"x":this.rot.x, "y":this.rot.y, "z":this.rot.z});
	}

	setRotation(rx, ry, rz)
	{
		this.rot.x = rx;
		this.rot.y = ry;
		this.rot.z = rz;
	}
	
	project(x, y, z)
	{
		let scaleFactor = this.fov / z;
	
		if (scaleFactor < 0)
		{
			/*If our scalefactor is a negative value, we'll just overide it
			 * to be an absurd value, this automatically 'kicks' the point
			 * outside of the fied of view for the out-of-bounds culler to
			 * intercept. 
			 * It's an inadvertant distance culler!
			 */
			scaleFactor = 4223434324234;
		};
			
		let x1c = x * scaleFactor;
		let y1c = y * scaleFactor;
		
		return({"pos":{"x":x1c, "y":y1c}, "scale":scaleFactor}); //Ugly but it works
	}
}

var globalCamera = new cameraObject(900, -1209, -755, -1209, 360 - 33, 315 - 90, 180);
//var globalCamera = new cameraObject(900, -609, -755, -609, 360 - 33, 315 - 90, 180);
// Initialize the default worldspace. comment out this line to utilize multiple worldspaces.

Print("    " + bobRossPref + "Loaded Camera.js");

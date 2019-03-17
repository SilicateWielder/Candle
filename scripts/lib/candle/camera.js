/*
 * Candle Lib - camera.js
 * Written by Michael Warner
 * Version 0.1.0
 * Last Update: 06/15/18
 * 
 * Used to a camera in 3d space.
 */
 
 // TODO: Turn the camera into an explicit surface for rendering.
 
 let cameraObject = function(fov, sX, sY, sZ, rX, rY, rZ)
 {
 	this.fov = 400;
    
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

cameraObject.prototype.getPosition = function()
{
	let cache = {};
	cache.x = this.pos.x;
	cache.y = this.pos.y;
	cache.z = this.pos.z;
	return(cache);
}

cameraObject.prototype.getX = function()
{
	return(this.pos.x);
}

cameraObject.prototype.getY = function()
{
	return(this.pos.y);
}

cameraObject.prototype.getZ = function()
{
	return(this.pos.z);
}

cameraObject.prototype.getRotation = function()
{
	return({"x":this.rot.x, "y":this.rot.y, "z":this.rot.z});
}

cameraObject.prototype.setRotation = function(rx, ry, rz)
{
	this.rot.x = rx;
	this.rot.y = ry;
	this.rot.z = rz;
}

var globalCamera = new cameraObject(300, 0, 0, 0, 0, 0, 0);
// Initialize the default worldspace. comment out this line to utilize multiple worldspaces.

Print("    " + bobRossPref + "Loaded Camera.js");

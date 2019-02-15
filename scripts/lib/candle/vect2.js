/*
 * Candle Lib - Vect3.js
 * Written by Michael Warner
 * Version 0.1.0
 * Last Update: 06/15/18
 * 
 * Used to manage points in 2 dimensional space
 */

var vect2 = function (x, y, z)
{
		this.typeset = "CandleVect";
		this.x = x;
		this.y = y;
		this.z = z;
		this.ratio = (3.14159265 / 180);
		
		this.fov = 0
		this.cam = [];
		this.cam.x = 0;
		this.cam.y = 0;
		
		this.pub = []
		this.pub.x = x;
		this.pub.y = y;
		
		
		this.rot = {};
		this.rot.x = 0;
		this.rot.y = 0;
}

vect2.prototype = {}

// Rotates a vector
vect2.prototype.rotate = function(rx, ry, rz)
{
	if (rx != this.rot.x || ry != this.rot.y || rz != this.rot.z)
	{
		this.rot.x = rx;
		this.rot.y = ry;
		
		// Calculate the ratio for degrees to radians
		let rxa = rx * this.ratio;
		let rya = ry * this.ratio;
		
		let xca = Math.cos(rxa);
		let xsa = Math.sin(rxa);
		
		// Rotate around the Y axis.
		let x1 = (xca * this.x) - (xsa * this.z);
		let y1 = (xsa * this.x) + (xca * this.z);
		
		this.pub.x = x1;
		this.pub.y = y1;
	};
};

// Sets the current public positon of an object to it's reference positon.
vect2.prototype.makeDefault = function()
{
	this.x = this.pub.x;
	this.y = this.pub.y;
};

// Flattens a vector to 2D Coordinates
vect2.prototype.grab = function()
{
	return([this.pub.x, this.pub.y]);
};

Print("    " + bobRossPref + " Loaded Vector2.js");
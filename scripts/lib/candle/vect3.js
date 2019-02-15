/*
 * Candle Lib - Vect3.js
 * Written by Michael Warner
 * Version 0.1.6
 * Last Update: 06/22/18
 * 
 * Used to manage points in 3 dimensional space
 */

let mathPrec = 180;
let mathRatio = mathPrec / 3.141459265;
let fastCos = {};
let fastSin = {};

function primeMath(precision)
{
	let limit = 360;
	let ratio = (3.14159265 / 180);
	print(ratio);
	for (i = 0; i <= limit; i += precision)
	{
		fastCos[i] = Math.cos(i * ratio);
		fastSin[i] = Math.sin(i * ratio);
		print(i + ' - ' + fastCos[i]);
	}
}

primeMath(0.5);

print(findSpread(0, 10, 10, 0));

var vect3 = function (x, y, z)
{
		this.x = x;
		this.y = y;
		this.z = z;
		this.ratio = 1;
		
		this.pub = []
		this.pub.x = x;
		this.pub.y = y;
		this.pub.z = z;
		
		this.flat = {};
		this.flat.x = 0;
		this.flat.y = 0;
		
		this.rot = {};
		this.rot.x = 0;
		this.rot.y = 0;
		this.rot.z = 0;
}

vect3.prototype = {}

// Rotates a vector
vect3.prototype.rotate = function(rx, ry, rz)
{
	if (rx != this.rot.x || ry != this.rot.y || rz != this.rot.z)
	{
		this.rot.x = rx;
		this.rot.y = ry;
		this.rot.z = rz;
		
		// Calculate the ratio for degrees to radians
		let rxa = rx * this.ratio;
		let rya = ry * this.ratio;
		let rza = rz * this.ratio;
		
		let cos = Math.cos;
		let sin = Math.sin;

		let xca = fastCos[rxa]; //cosa
		//print(xca);
		let xsa = fastSin[rxa]; //sina
		
		let yca = fastCos[rya]; //cosb
		let ysa = fastSin[rya]; //sinb

		let zca = fastCos[rza]; //cosc
		let zsa = fastSin[rza]; //sinc

		/* THIS SECTION OF CODE IS KNOWN TO WORK, IN CASE OF PROBLEMS DO NOT DELETE */
		// Rotate around the Y axis.
		let x1 = (yca * this.x) - (ysa * this.z);
		let y1 = this.y;
		let z1 = (ysa * this.x) + (yca * this.z);
		
		// Rotate around the X axis.
		let x2 = x1;
		let y2 = (xca * y1) - (xsa * z1);
		let z2 = (xsa * y1) + (xca * z1);
		
		// Rotate around the Z axis.
		let x3 = (zca * x1) - (zsa * y2);
		let y3 = (zsa * x1) + (zca * y2);
		let z3 = z2;

		
		    
		this.pub.x = x3;
		this.pub.y = y3;
		this.pub.z = z3;
	};
};

// Sets the current public positon of an object to it's reference positon.
vect3.prototype.makeDefault = function()
{
	this.x = this.pub.x;
	this.y = this.pub.y;
	this.z = this.pub.z;
};

vect3.prototype.adjust = function(x, y, z)
{
	this.pub.x = x;
	this.pub.y = y;
	this.pub.z = z;
	
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.rot.x = 0;
	this.rot.y = 0;
	this.rot.z = 0;
};

vect3.prototype.flatten = function()
{
	let scaleFactor = globalCamera.fov / (globalCamera.fov + this.pub.z);
	
	if (scaleFactor < 0)
	{
		scaleFactor = 0.00001;
	};
		
	let x1c = (this.pub.x) * scaleFactor;
	let y1c = (this.pub.y) * scaleFactor;
	
	this.flat.x = x1c;
	this.flat.y = y1c;
}

Print("    " + bobRossPref + "Loaded Vector3.js");

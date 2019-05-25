/*
 * Candle Lib - Vect3.js
 * Written by Michael Warner
 * Version 0.1.6
 * Last Update: 06/22/18
 * 
 * Used to manage points in 3 dimensional space
 */

// Cache Cos and Sin math
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
		//print(i + ' - ' + fastCos[i]);
	}
}

primeMath(0.5);

class vect3
{
	constructor(x, y, z)
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
			
			this.origin = {};
			
			this.rot = {};
			this.rot.x = 0;
			this.rot.y = 0;
			this.rot.z = 0;
	}

	// Rotates a vector
	rotate(rx, ry, rz, origin = {"x":0, "y":0, "z":0})
	{
		if (rx != this.rot.x || ry != this.rot.y || rz != this.rot.z || this.origin != origin)
		{
			this.origin = origin;
			this.rot.x = rx;
			this.rot.y = ry;
			this.rot.z = rz;
			
			let posX = this.x + origin.x;
			let posY = this.y + origin.y;
			let posZ = this.z + origin.z;
			
			// Calculate the ratio for degrees to radians
			let rxa = rx * this.ratio;
			let rya = ry * this.ratio;
			let rza = rz * this.ratio;

			let xca = fastCos[rxa]; //cosa
			let xsa = fastSin[rxa]; //sina
			
			let yca = fastCos[rya]; //cosb
			let ysa = fastSin[rya]; //sinb

			let zca = fastCos[rza]; //cosc
			let zsa = fastSin[rza]; //sinc

			// Rotate around the Y axis.
			let x1 = (yca * posX) - (ysa * posZ);
			let y1 = posY;
			let z1 = (ysa * posX) + (yca * posZ);
			
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
	makeDefault()
	{
		this.x = this.pub.x;
		this.y = this.pub.y;
		this.z = this.pub.z;
	};

	adjust(x, y, z)
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

	flatten(camera = globalCamera)
	{
		let p = camera.project(this.pub.x, this.pub.y, this.pub.z);
		
		this.flat.x = p.pos.x;
		this.flat.y = p.pos.y;
		
		return({"x":this.flat.x, "y":this.flat.y});
	}

	blit(x, y)
	{
		this.flatten();
		Rectangle(x + this.flat.x, y + this.flat.y, 3, 3, colors.get(255, 0 ,255));
	};
}

Print("    " + bobRossPref + "Loaded Vector3.js");

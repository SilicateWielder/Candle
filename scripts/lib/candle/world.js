/*
 * Candle Lib - world.js
 * Written by Michael Warner
 * Version 0.1.0
 * Last Update: 06/15/18
 * 
 * Used to manage worldspaces.
 */

// Announce start of loading procedure.
Print("    " + bobRossPref + "Loading World.js...");

// Load in dependencies.
RequireScript("lib/candle/pointObject.js");
RequireScript("lib/candle/modelObject.js");


let voxelMap = function(voxSize = 10, xr, yr, zr)
{
	this.range = {};
	this.range.x = xr;
	this.range.y = yr;
	this.range.z = zr;
	
	this.voxSize = voxSize;
	this.voxel = new modelObject(0, 0, 0, 0, 0, 0);
	let pA = this.voxel.addPoint(voxSize / -2, voxSize / -2, voxSize / -2);
	let pB = this.voxel.addPoint(voxSize / -2, voxSize / 2, voxSize / -2);
	let pC = this.voxel.addPoint(voxSize / 2, voxSize / 2, voxSize / -2);
	let pD = this.voxel.addPoint(voxSize / 2, voxSize / -2, voxSize / -2);
	
	let pE = this.voxel.addPoint(voxSize / -2, voxSize / -2, voxSize / 2);
	let pF = this.voxel.addPoint(voxSize / -2, voxSize / 2, voxSize / 2);
	let pG = this.voxel.addPoint(voxSize / 2, voxSize / 2, voxSize / 2);
	let pH = this.voxel.addPoint(voxSize / 2, voxSize / -2, voxSize / 2);
	this.voxel.definePoly(pD, pA, pB, pC, 'grass.jpg');
	this.voxel.definePoly(pH, pG, pF, pE, 'grass.jpg');
	this.voxel.definePoly(pB, pA, pE, pF, 'grass.jpg');
	this.voxel.definePoly(pD, pC, pG, pH, 'grass.jpg');
	this.voxel.definePoly(pH, pE, pA, pD, 'grass.jpg');
	this.voxel.definePoly(pC, pB, pF, pG, 'grass.jpg');
	
	this.bound = {};
	this.bound.x = 0;
	this.bound.y = 0;
	this.bound.z = 0;
	
	this.data = {};
}

voxelMap.prototype = {};

// Lazy-man's voxel ID generator.
voxelMap.prototype.getId = function(x, y, z)
{
	return('V' + x + '-' + y + '-' + z);
}

voxelMap.prototype.getVoxel = function(x, y, z, canAlloc = false, val = 0)
{
	if (x <= this.range.x && y <= this.range.y && z <= this.range.z)
	{
		let id = this.getId(x, y, z);
		//print(id + ' = ' + this.data[id]);
		return(this.data[id]);
	}
}

voxelMap.prototype.setVoxel = function(x, y, z, val)
{
	if (x <= this.range.x && y <= this.range.y && z <= this.range.z)
	{
		let id = this.getId(x, y, z);
		this.data[id] = val;
		
		print('set voxel at x:' + x + ' y:' + y + ' z:' + z + ' to block: ' + this.getVoxel(x, y, z) + '(' + val + ')');
		if(x > this.bound.x || y > this.bound.y || z > this.bound.z)
		{
			print('new range = x:' + this.range.x + ' Y: ' + this.range.y + ' z: ' + this.range.z);
		}
		
		//Recompute bounds
		if(x > this.bound.x)
		{
			this.bound.x = x;
		}
		
		if(y > this.bound.y)
		{
			this.bound.y = y;
		}
		
		if(z > this.bound.z)
		{
			this.bound.z = z;
		}
	}
}

voxelMap.prototype.debugRender = function(x = 0, y = 0, z = 0)
{
	for (xp = 0; xp <= this.bound.x; xp++)
	{
		for (yp = 0; yp <= this.bound.y; yp++)
		{
			let block = this.getVoxel(xp, yp, z);
			if (true)
			{
				if(block > 0)
				{
					Rectangle(x +  (xp * 10), y + (yp * 10), 10, 10, colors.get(block, block, block))
				}
			}
		}
	}
}

voxelMap.prototype.blit = function(x, y, z, rx, ry, rz)
{
	//this.voxel.blit(x, y, z, rx, ry, rz);
	//this.voxel.pointBlit(x, y, z, rx, ry, rz);
	
	let xStart = 0 - (Math.floor(this.bound.x / 2) * this.voxSize);
	let yStart = 0 - (Math.floor(this.bound.y / 2) * this.voxSize);
	let zStart = 0 - (Math.floor(this.bound.z / 2) * this.voxSize);
	
	for (xp = 0; xp <= this.bound.x; xp++)
	{
		for (yp = 0; yp <= this.bound.y; yp++)
		{
			for (zp = 0; zp <= this.bound.z; zp++)
			{
				let block = this.getVoxel(xp, yp, zp);
				if(block > 0)
				{
					let posX = x + xStart + (xp * this.voxSize);
					let posY = y + yStart + (yp * this.voxSize);
					let posZ = z + zStart + (zp * this.voxSize);
					this.voxel.place(posX, posY, posZ);
					this.voxel.blit(0, 0, 0, rx, ry, rz);
				}
			}
		}
	}
}

Print("    ...Loaded World.js");

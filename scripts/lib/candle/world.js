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

function mergeSortVoxels(arr)
{
    if (arr.length < 2)
        return arr;

    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);

    return mergeVoxels(mergeSortVoxels(left), mergeSortVoxels(right));
}

function mergeVoxels(left, right)
{
    var result = [];

    while (left.length && right.length) {
        if (left[0].dist <= right[0].dist) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}

function bubbleSortVoxels(arr)
{
	var len = arr.length;
	for (var i = len-1; i>=0; i--){
		for(var j = 1; j<=i; j++){
			if(arr[j-1].dist > arr[j].dist){
				var temp = arr[j-1];
				arr[j-1] = arr[j];
				arr[j] = temp;
			}
		}
	}
	return arr;
}

class voxelMap
{
	constructor(voxSize = 10, xr, yr, zr)
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
		
		this.voxel.definePoly(pD, pA, pB, pC, 'grass.jpeg');
		this.voxel.definePoly(pH, pG, pF, pE, 'grass.jpeg');
		this.voxel.definePoly(pB, pA, pE, pF, 'grass.jpeg');
		this.voxel.definePoly(pD, pC, pG, pH, 'grass.jpeg');
		this.voxel.definePoly(pH, pE, pA, pD, 'grass.jpeg');
		this.voxel.definePoly(pC, pB, pF, pG, 'grass.jpeg');
		this.voxel.findOrigin();
		
		this.bound = {};
		this.bound.x = 0;
		this.bound.y = 0;
		this.bound.z = 0;
		
		this.data = {};
		this.voxelCount = 0;
		
		this.entities = [];
		this.particles = [];
	}
	
	addParticle(texture, posX, posY, posZ, oX, oY, oZ, calc)
	{
		let entity = {};
		entity.texture = texture;
		entity.type = "p";
		entity.dist = 0;
		entity.vect = new pointObject(posX, posY, posZ)
		entity.origin = {"x":oX, "y":oY, "z":oZ};
		entity.xI = posX;
		entity.yI = posY;
		entity.zI = posZ;
		entity.call = calc;
		this.particles.push(entity);
	}

	// Lazy-man's voxel ID generator.
	getId(x, y, z)
	{
		return('V' + x + '-' + y + '-' + z);
	}

	getVoxel(x, y, z, canAlloc = false, val = 0)
	{
		if (x <= this.range.x && y <= this.range.y && z <= this.range.z)
		{
			let id = this.getId(x, y, z);
			return(this.data[id]);
		}
	}

	getVoxelCount()
	{
		return(this.voxelCount);
	}

	setVoxel(x, y, z, val)
	{
		if (x <= this.range.x && y <= this.range.y && z <= this.range.z)
		{
			let id = this.getId(x, y, z);
			this.data[id] = val;
			
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

	debugRender(x = 0, y = 0, z = 0)
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
	
	getFaces(xp, yp, zp)
	{
		//This is testing code, it needs to be updated to grab the original textureset for overwriting
		let tex = textures.get('grass.jpg');
		let texs = [tex, tex, tex, tex, tex, tex]
		
		let blockXp = this.getVoxel(xp, yp - 1, zp);
		let blockXn = this.getVoxel(xp, yp + 1, zp);
		let blockYp = this.getVoxel(xp, yp, zp + 1);
		let blockYn = this.getVoxel(xp, yp, zp - 1);
		let blockZp = this.getVoxel(xp - 1, yp, zp);
		let blockZn = this.getVoxel(xp + 1, yp, zp);
		
		// If the side of a block is next to another block, cull it's hidden faces
		// This is done by overiding the texture with a Skip character ('s')
		if(blockXp > 0)
		{
		texs[4] = 'S'; // Switch to 4
		}
		if(blockXn > 0)
		{
			texs[5] = 'S';
		}
		
		if(blockYp > 0)
		{
			texs[1] = 'S';
		}
		if(blockYn > 0)
		{
			texs[0] = 'S';
		}
		
		if(blockZp > 0)
		{
			texs[2] = 'S';
		}
		if(blockZn > 0)
		{
			texs[3] = 'S';
		}
		
		//print(texs);
		return(texs);
	}

	//Distance sorting render algorithm, WIP
	blit(x, y, z, rx, ry, rz)
	{
		let xStart = 0 - (Math.floor(this.bound.x * this.voxSize) / 2);
		let yStart = 0 - (Math.floor(this.bound.y * this.voxSize) / 2);
		let zStart = 0 - (Math.floor(this.bound.z * this.voxSize) / 2);
		
		let renderedPolys = 0;
		let culledPolys = 0;
		let polyCount = 0;
		let quadCount = 0;
		
		let renderOrder = [];

		// Index the world.
		for (let xp = 0; xp <= this.bound.x; xp++)
		{
			for (let yp = 0; yp <= this.bound.y; yp++)
			{
				for (let zp = this.bound.z; zp >= 0; zp--)
				{
					let block = this.getVoxel(xp, yp, zp);
					if(block > 0)
					{
						let texs = this.getFaces(xp, yp, zp);
						
						// Render block if visible
						if (texs[0] != 'S' || texs[1] != 'S' || texs[2] != 'S' || texs[3] != 'S' || texs[4] != 'S' || texs[5] != 'S')
						{
							// Calculate the position of the voxel.
							let posX = x + xStart + (xp * this.voxSize);
							let posY = y + yStart + (yp * this.voxSize);
							let posZ = z + zStart + (zp * this.voxSize);
							
							//Set up the voxel.
							this.voxel.place(posX, posY, posZ);
							this.voxel.prep(0, 0, 0, rx, ry, rz);
							
							//Push new entry to the render index.
							renderOrder.push({"dist":this.voxel.findDistance(), "type":"v", "xI":xp, "yI":yp, "zI":zp, "xP":posX, "yP":posY, "zP":posZ});
							
							//Update counts.
							//renderedPolys += voxStats.rendered;
							//culledPolys += voxStats.culled;
							polyCount += 6;
						} else {
							culledPolys += 6;
							polyCount += 6;
						}
						quadCount++;
					}
				}
			}
		}
		
		
		//Sort out the voxels and render.
		let actualOrder = mergeSortVoxels(renderOrder);
		
		//actualOrder = actualOrder.concat(this.particles);
		//print(actualOrder);
		
		for(let poly = 0; poly < actualOrder.length; poly++)
		{
			let currentPoly = actualOrder[poly];
			if(currentPoly.type == "v")
			{
				this.voxel.place(currentPoly.xP, currentPoly.yP, currentPoly.zP);
				this.voxel.blit(0, 0, 0, rx, ry, rz, ['blah'], this.getFaces(currentPoly.xI, currentPoly.yI, currentPoly.zI));
			} else if (currentPoly.type == "p")
			{
				currentPoly.vect.rotate(rx, ry, rz, {"x":0, "y":Math.random() * 20, "z":50});
				let pos = currentPoly.vect.get2d();
				pos.x = pos.x /100;
				pos.y = pos.y /100;
				Rectangle((GetScreenWidth() / 2) + pos.x, (GetScreenHeight() / 2) + pos.y, 2, 2, colors.get(255, 255, 255));
			} else {print(currentPoly.type);}
		}
	}
}

Print("    ...Loaded World.js");

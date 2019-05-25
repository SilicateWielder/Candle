/*
 * Candle Lib - modelObject.js
 * Written by Michael Warner
 * Version 0.4.2
 * Last Update: 3/20/19
 * 
 * Adds 3 dimensional models.
 */

Print("      " + bobRossPref + "Loading ModelOject.js...");

RequireScript('lib/candle/angles.js');
RequireScript('lib/candle/pointCloud.js');
RequireScript('lib/candle/quad.js');
RequireScript('lib/candle/lighting.js');
RequireScript('lib/candle/culling.js');

class modelObject
{
	constructor(x, y, z, rx, ry, rz)
	{
		this.mx = GetScreenWidth() / 2;
		this.my = GetScreenHeight() / 2; 

		this.stationary = false;
		this.x = x;
		this.y = y;
		this.z = z;
		
		this.rx = rx;
		this.ry = ry;
		this.rz = rz;
		
		this.pos = {};
		this.pos.x = 0;
		this.pos.y = 0;
		this.pos.z = 0;
		
		this.pointCloud = new pointCloud();
		this.pointCache = [];
		this.polygons = [];
		
		this.light = [];
		
		this.prepped = false;
	}
	
	// Adds a new model vertex to the cache.
	addPoint(x, y, z)
	{
		this.prepped = false;
		
		//Generate an ID for cachine
		let id = this.pointCloud.add(x, y, z);
		if(id[0] == true)
		{
			this.pointCache.push(id[1]);
		}
		print(id[0] + ',' + id[1]);
		return(id[1]);
	}


	// Defines a polygon within a model, using the point table for reference.
	// NOTE: Implement that automatic calcuation of rotation and origin for quads.
	definePoly(p1, p2, p3, p4, texture, backwards = false)
	{
		this.prepped = false;
		
		// Test if we can even load this texture, if not throw an error.
		try{
			textures.get(texture);
		} catch(err) {
			print("FATAL: Cannot grab texture")
		}
		let tex = texture;
		
		// Push new polygon metadata.
		let polygon = new quad(p1, p2, p3, p4, tex, this.pointCloud, backwards);
		this.polygons.push(polygon);
	}

	// adjusts the position of a model to a set location
	place(x, y, z)
	{
		this.prepped = false;
		this.pos = {"x": x, "y": y, "z": z};
	}

	move(x, y, z)
	{
		this.prepped = false;
		this.x += x;
		this.y += y;
		this.z += z;
	}

	// Determines the origin of the model, used primarily for modelObject.blit().
	getOrigin(x, y, z)
	{
		let origin = {"x":x, "y":y, "z":z};

		if(!this.stationary)
		{
			origin.x += this.x;
			origin.y += this.y;
			origin.z += this.z;
		}
		
		return(origin);
	}

	//provides point data for a specific polygon.
	getPoints(polyID)
	{
		let poly = this.polygons[currentPoly];
		
		let points = {};
		points.a = this.points[poly.pointA];
		points.b = this.points[poly.pointB];
		points.c = this.points[poly.pointC];
		points.d = this.points[poly.pointD];
	}

	// Rotates all points within the model's point cache.
	// Used primarily in modelObject.blit().
	rotatePoints(rx, ry, rz, originPoint)
	{
		this.pointCloud.rotate(rx, ry, rz, originPoint, this.pos);
	}
	
	findOrigin()
	{
		let xSum = 0;
		let ySum = 0;
		let zSum = 0;
		let total = this.polygons.length;
		
		for(let poly = 0; poly < total; poly++)
		{
			let pos = this.polygons[poly].pos;
			xSum += pos.x;
			ySum += pos.y;
			zSum += pos.z;
		}
		print(xSum + ", " + ySum + ", " + zSum);
	}
	
	findDistance()
	{
		let distanceSum = 0;
		let total = this.polygons.length;
		for(let curPoly = 0; curPoly < total; curPoly++)
		{
			let poly = this.polygons[curPoly];
			
			let lA = this.pointCloud.retrieve(poly.pointA);
			let lB = this.pointCloud.retrieve(poly.pointB);
			let lC = this.pointCloud.retrieve(poly.pointC);
			let lD = this.pointCloud.retrieve(poly.pointD);
			
			lA.get2d();
			lB.get2d();
			lC.get2d();
			lD.get2d();
			
			let tA = lA.getDist();
			let tB = lB.getDist();
			let tC = lC.getDist();
			let tD = lD.getDist();

			distanceSum += (tA + tB + tC + tD);
		}
		let distance = distanceSum / (total * 4);
		//print(distanceSum);
		//print(distance);
		return(distance);
	}

	prep(x, y, z, rx, ry, rz)
	{
		this.prepped = true;
		this.rotatePoints(rx, ry, rz, this.getOrigin(x, y, z));
	}

	// Self expanatory, blits a model onto the screen.
	// NOTE: Break this monster into more tame bits, slimes are more bearable than dragons. (Usually)
	blit(x, y, z, rx, ry, rz, lights, textureOveride = [])
	{
		let lines = [];
		
		if(!this.prepped)
		{
			this.prep(x, y, z, rx, ry, rz);
			//print("prepped");
		}
		
		// Polygons stat variables.
		let currentPoly = 0; 
		let culledPolys = 0;
		let renderedPolys = 0;

		while(currentPoly < this.polygons.length)
		{
			let poly = this.polygons[currentPoly];
			
			let lA = this.pointCloud.retrieve(poly.pointA);
			let lB = this.pointCloud.retrieve(poly.pointB);
			let lC = this.pointCloud.retrieve(poly.pointC);
			let lD = this.pointCloud.retrieve(poly.pointD);
			
			let avgC = poly.getPos();
			
			let tA = lA.get2d();
			let tB = lB.get2d();
			let tC = lC.get2d();
			let tD = lD.get2d();

			// Oh man, this is a mess.
			if ((oobCull(tA, tB, tC, tD, this.points) && backfaceCull([tA, tB, tC, tD], poly.backwards)) || bobRossMode == false)
			{
				// Generate the shape data.
				let eA = {"x":Math.round(tA.x) + this.mx, "y": Math.round(tA.y) + this.my, "u":1 , "v": 0};
				let eB = {"x":Math.round(tB.x) + this.mx, "y": Math.round(tB.y) + this.my, "u":0 , "v": 0};
				let eC = {"x":Math.round(tC.x) + this.mx, "y": Math.round(tC.y) + this.my, "u":0 , "v": 1};
				let eD = {"x":Math.round(tD.x) + this.mx, "y": Math.round(tD.y) + this.my, "u":1 , "v": 1};
					
				// if we're forcing wireframe rendering, add to the line series
				// This is a wreck, clean it. Now, me.
				if(wireframesForced)
				{
					lines.push(eA, eB, eB, eC, eC, eD, eD, eA);
				} else {
					let lightLevel = 255;
					if(lights != undefined)
					{
						lightLevel = sun.findLightLevel(avgC);
					}
					if (textureOveride[currentPoly] == undefined || textureOveride.length < this.polygons.length)
					{
						//print(lightLevel);
						textures.get(this.polygons[currentPoly].texture).transformBlitMask(eA.x, eA.y, eB.x, eB.y, eC.x, eC.y, eD.x, eD.y, colors.getTemp(lightLevel * sun.r, lightLevel * sun.g, lightLevel * sun.b));
					} else {
						if(textureOveride[currentPoly] != 'S')
						{
							textureOveride[currentPoly].transformBlitMask(eA.x, eA.y, eB.x, eB.y, eC.x, eC.y, eD.x, eD.y, colors.getTemp(lightLevel * sun.r, lightLevel * sun.g, lightLevel * sun.b));
						}
					}
				}
				renderedPolys ++;
			} else {
				culledPolys++;
			}
		 currentPoly++
		}

		// If we're allowing wireframe rendering at all, blit the line series.
		if(wireframesForced || wireframesEnabled)
		{
			if(lines.length > 2)
			{
				Shape.drawImmediate(ShapeType.Lines, lines);
			}
		}

		return({"rendered":renderedPolys,"culled":culledPolys,"count":this.polygons.length});
	}

	pointBlit(x, y, z, rx, ry, rz)
	{
		let lines = [];
		let modelOrigin = {"x":x, "y":y, "z":z};

		if (!this.stationary)
		{ 
			modelOrigin.x += this.x;
			modelOrigin.y += this.y;
			modelOrigin.z += this.z;
		}
		
		// Rotate all of our mesh points (vertices).
		for(let c = 0; c < this.pointCache.length; c++)
		{
			let refID = this.pointCache[c];
			this.points[refID].rotate(rx, ry, rz, modelOrigin);
			let coord = this.points[refID].get2d();
			Rectangle(coord.x + (GetScreenWidth() / 2) - 1, coord.y + (GetScreenHeight() / 2) - 1, 3, 3, colors.get(255, 255, 255))
		}

		for(p = 0; p < this.points.length; p++)
		{
			let poly = this.polygons[p];
			
			let tA = this.points[poly.pointA].get2d();
		}
	}
}

Print("      ...Loaded ModelOject.js");

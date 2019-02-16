/*
 * Candle Lib - modelObject.js
 * Written by Michael Warner
 * Version 0.2.5
 * Last Update: 06/22/18
 * 
 * Adds 3 dimensional models.
 */

Print("      " + bobRossPref + "Loading ModelOject.js...");

RequireScript('lib/candle/angles.js');
RequireScript('lib/candle/quad.js');
RequireScript('lib/candle/lighting.js');
RequireScript('lib/candle/culling.js');
 
let lt = CreateColor(255, 255, 255);

function eTransformBlitMask(source, x1, y1, x2, y2, x3, y3, x4, y4, mask)
{
	// Center our coordinates.
	let eX1 = x1 + centerX;
	let eY1 = y1 + centerY;
	let eX2 = x2 + centerX;
	let eY2 = y2 + centerY;
	let eX3 = x3 + centerX;
	let eY3 = y3 + centerY;
	let eX4 = x4 + centerX;
	let eY4 = y4 + centerY;
	
	source.transformBlitMask(eX1, eY1, eX2, eY2, eX3, eY3, eX4, eY4, mask);
};

// Calculates the orienation of a quad along it's x and y axis.
function findQuadOrientation(cA, cB, cC, cD)
{
        /*
        Top    = tA, tD
        Bottom =  tB, tC
        Left   = tA, tB
        Right  = tC, tD
    */

    // Top
    let risA = cA.z - cD.z;
    let runA = cA.x - cD.x;
    let angA = Math.atan(risA/runA);
    angA = angA * (180/Math.PI);
    
    // Bottom
    let risB = cB.z - cC.z;
    let runB = cB.x - cC.x;
    let angB = Math.atan(risB/runB);
    angB = angB * (180/Math.PI);

    // Left
    let risC = cA.z - cB.z;
    let runC = cA.y - cB.y;
    let angC = Math.atan(risC/runC);
    angC = angC * (180/Math.PI);

    // Right
    let risD = cC.z - cD.z;
    let runD = cC.y - cD.y;
    let angD = Math.atan(risD/runD);
    angD = angD * (180/Math.PI);

    // Quadrilateral's averaged orientation
    let avgX = (angA + angB) / 2;
    let avgY = (angC + angD) / 2;

    // calculate difference between sun's angle and quad.
    let dif = {};
    dif.x = avgX;
    dif.y = avgY;
    return(dif);
}

let modelObject = function(x, y, z, rx, ry, rz)
{
	this.stationary = false;
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.rx = rx;
	this.ry = ry;
	this.rz = rz;
	
	this.points = [];
	this.pointCache = [];
	this.polygons = [];
	
	this.textures = [];
	this.textures["default"] = CreateSurface(40, 40, CreateColor(100, 100, 100)).createImage();
	
	this.light = [];
}

// Adds a new vertice to the cache.
modelObject.prototype.addPoint = function(x, y, z)
{
	let cache = new pointObject(x, y, z);
	if (enableVertCaching)
	{	
		//Generate an ID for cachine
		let id = (x + "-" + y + "-" + z);

		//Add point and return ref ID.
		if(this.points[id] === undefined)
		{
			this.pointCache.push(id);
			this.points[id] = cache;
			//print("point " + id + " does not exist, adding...")
		}
		return(id);
	} else {
		this.points.push(cache);
	}
}

/* polygon metadata is defined as the following
	point 1 ---- 0
	point 2 ---- 1
	point 3 ---- 2
	point 4 ---- 3
	texture ---- 4
	rotation x - 5
	rotation y - 6
	rotation z - 7
	pos x ------ 8
	pos y ------ 9
	pos z ----- 10 */
modelObject.prototype.definePoly = function(p1, p2, p3, p4, rx, ry, rz, x, y, z, texture)
{
	let tex = "default";
	if (texture != undefined)
	{
		try
		{
			if (this.textures[texture] === undefined)
			{
				this.textures[texture] = LoadImage(texture);
				tex = texture;
			} else if (this.textures[texture] !== undefined)
			{
				tex = texture;
			}
		} catch (err)
		{
			print("Failed to load texture, defaulting...")
			print("PATH = \"" + texture + "\"");
		}
	}

    //Patch to implement baked angle calculations
    let rot = findQuadOrientation(this.points[p1], this.points[p2], this.points[p3], this.points[p4]);
    let rotX = rot.x;
    let rotY = rot.y;

    let pointA = this.points[p1];
    let pointB = this.points[p2];
    let pointC = this.points[p3];
    let pointD = this.points[p4];

    // Calculate position of polygon.
    let avgXpos = (pointA.x + pointB.x + pointC.x + pointD.x)/4;
    let avgYpos = (pointA.y + pointB.y + pointC.y + pointD.y)/4;
    let avgZpos = (pointA.z + pointB.z + pointC.z + pointD.z)/4;
	
	// Push new polygon metadata.
    let polygon = new quad(p1, p2, p3, p4, tex, this.points);
	this.polygons.push(polygon);
}

modelObject.prototype.place = function(x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
}

modelObject.prototype.move = function(x, y, z)
{
	this.x += x;
	this.y += y;
	this.z += z;
}

modelObject.prototype.moveX = function(dist)
{
	this.x += dist;
}

modelObject.prototype.moveY = function(dist)
{
	this.y += dist;
}

modelObject.prototype.moveZ = function(dist)
{
	this.z += dist;
}

modelObject.prototype.getFlat = function(lA, lB, lC, lD)
{
	//???
}

modelObject.prototype.sortBuffer = function()
{
    let currentPoly = 0; 
    culledPolys = 0;
    renderedPolys = 0;
	while(currentPoly < this.polygons.length)
	{
		//Print("rendering polygon " + currentPoly);
		let poly = this.polygons[currentPoly];
		let polyPos = poly.pos;

        print(polyPos);
		
		

        currentPoly++
    }
}

modelObject.prototype.blit = function(x, y, z, rx, ry, rz)
{
	if (enableVertCaching)
	{
		let currentPoint = 0;
		while(currentPoint < this.pointCache.length)
		{
			let refID = this.pointCache[currentPoint];
			this.points[refID].rotate(rx, ry, rz);
			currentPoint++;
		}	
	} else {
		let currentPoint = 0;
		while(currentPoint < this.points.length)
		{
			this.points[currentPoint].rotate(rx, ry, rz);
			currentPoint++;
		}
	}
	
	let currentPoly = 0; 
    culledPolys = 0;
    renderedPolys = 0;
	while(currentPoly < this.polygons.length)
	{
		//Print("rendering polygon " + currentPoly);
		let poly = this.polygons[currentPoly];
		//print(poly);
		
		// Grab location of vertices for the quadrilateral.
		let lA = poly.pointA;
		let lB = poly.pointB;
		let lC = poly.pointC;
		let lD = poly.pointD;
		
		if (this.stationary)
		{ 
			this.points[lA].setOrigin(x, y, z);
			this.points[lB].setOrigin(x, y, z);
			this.points[lC].setOrigin(x, y, z);
			this.points[lD].setOrigin(x, y, z);
		} else {
			this.points[lA].setOrigin(x + this.x, y + this.y, z + this.z);
			this.points[lB].setOrigin(x + this.x, y + this.y, z + this.z);
			this.points[lC].setOrigin(x + this.x, y + this.y, z + this.z);
			this.points[lD].setOrigin(x + this.x, y + this.y, z + this.z);
		}
		
		let tA = this.points[lA].get2d();
		let tB = this.points[lB].get2d();
		let tC = this.points[lC].get2d();
		let tD = this.points[lD].get2d();

        if (oobCull(tA, tB, tC, tD, this.points))
        {
            if (backfaceCull([tA, tB, tC, tD]) || bobRossMode == false)
            {
            	if (this.textures[this.polygons[currentPoly].texture] == undefined || wireframesForced)
            	{
            		eLine(tA.x, tA.y, tB.x, tB.y, wireframeColor); // Left
            		eLine(tB.x, tB.y, tC.x, tC.y, wireframeColor); // Bottom
            		eLine(tC.x, tC.y, tD.x, tD.y, wireframeColor); // Right
            		eLine(tD.x, tD.y, tA.x, tA.y, wireframeColor); // Top
            	} else {
                    // Calculate and blit light level if enabled.
			        let lightLevel = 125;

           			if (lightingEnabled == true)
           			{
                        
           				lightLevel = findLightLevel(poly.rot, sun);
             		}

			             		
	              	eTransformBlitMask(this.textures[this.polygons[currentPoly].texture], tA.x, tA.y, tB.x, tB.y, tC.x, tC.y, tD.x, tD.y, CreateColor(lightLevel, lightLevel, lightLevel));
                }
                renderedPolys ++;
            } else {
                culledPolys++;
            }
        } else {
            culledPolys++;
        }

        currentPoly++
    }

    GetSystemFont().drawText(0, 200, "Rendered Polygons: " + renderedPolys);
    GetSystemFont().drawText(0, 215, "Culled Polygons: " + culledPolys);
}

Print("      ...Loaded ModelOject.js");

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

let modelObject = function(x, y, z, rx, ry, rz)
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
	
	this.points = [];
	this.pointCache = [];
	this.polygons = [];
	
	this.light = [];
}

// Adds a new vertice to the cache.
modelObject.prototype.addPoint = function(x, y, z)
{
	let cache = new pointObject(x, y, z);
    
	//Generate an ID for cachine
	let id = (x + "-" + y + "-" + z);

	//Add point and return ref ID.
	if(this.points[id] === undefined)
	{
		this.pointCache.push(id);
		this.points[id] = cache;
	}
	return(id);
}

// Defines a polygon within a model, using the point table for reference.
// NOTE: Implement that automatic calcuation of rotation and origin for quads.
modelObject.prototype.definePoly = function(p1, p2, p3, p4, texture)
{
    // Test if we can even load this texture, if not throw an error.
    try{
        textures.get(texture);
    } catch(err) {
        print("FATAL: Cannot grab texture")
    }
    let tex = texture;
	
	// Push new polygon metadata.
    let polygon = new quad(p1, p2, p3, p4, tex, this.points);
	this.polygons.push(polygon);
}

modelObject.prototype.place = function(x, y, z)
{
	this.pos = {"x": x, "y": y, "z": z};
}

modelObject.prototype.move = function(x, y, z)
{
	this.x += x;
	this.y += y;
	this.z += z;
}

// Self expanatory, blits a model onto the screen.
// NOTE: Break this monster into more tame bits, slimes are more bearable than dragons. (Usually)
modelObject.prototype.blit = function(x, y, z, rx, ry, rz, lights, textureOveride = [])
{
    let lines = [];
    let modelOrigin = {"x":x, "y":y, "z":z};

	if (!this.stationary)
    { 
        modelOrigin.x += this.x;
        modelOrigin.y += this.y;
        modelOrigin.z += this.z;
    }
    
    // Rotate all of our nesh points (vertices).
    for(let c = 0; c < this.pointCache.length; c++)
    {
        let refID = this.pointCache[c];
		this.points[refID].rotate(rx, ry, rz, modelOrigin, this.pos);
    }
	
    // Polygons stat variables.
	let currentPoly = 0; 
    let culledPolys = 0;
    let renderedPolys = 0;

	while(currentPoly < this.polygons.length)
	{
		let poly = this.polygons[currentPoly];
		
		let tA = this.points[poly.pointA].get2d();
		let tB = this.points[poly.pointB].get2d();
		let tC = this.points[poly.pointC].get2d();
		let tD = this.points[poly.pointD].get2d();

        if ((oobCull(tA, tB, tC, tD, this.points) && backfaceCull([tA, tB, tC, tD])) || bobRossMode == false)
        {
            // Generate the shape data.
            let eA = {"x":Math.round(tA.x) + this.mx, "y": Math.round(tA.y) + this.my, "u":1 , "v": 0};
            let eB = {"x":Math.round(tB.x) + this.mx, "y": Math.round(tB.y) + this.my, "u":0 , "v": 0};
            let eC = {"x":Math.round(tC.x) + this.mx, "y": Math.round(tC.y) + this.my, "u":0 , "v": 1};
            let eD = {"x":Math.round(tD.x) + this.mx, "y": Math.round(tD.y) + this.my, "u":1 , "v": 1};
                
            // if we're forcing wireframe rendering, add to the line series
            if(wireframesForced)
            {
                lines.push(eA, eB, eB, eC, eC, eD, eD, eA);
            } else {
                textures.get(this.polygons[currentPoly].texture).transformBlitMask(eA.x, eA.y, eB.x, eB.y, eC.x, eC.y, eD.x, eD.y, colors.getTemp(125, 125, 125));
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
        Shape.drawImmediate(ShapeType.Lines, lines);
    }

    // Some debug information relating to polygons counts and culling. Not neccessary
    GetSystemFont().drawText(0, 200, "Rendered Polygons: " + renderedPolys);
    GetSystemFont().drawText(0, 215, "Culled Polygons: " + culledPolys);
    GetSystemFont().drawText(0, 230, "Total Polygon Count: " + this.polygons.length);
}

modelObject.prototype.pointBlit = function(x, y, z, rx, ry, rz)
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

Print("      ...Loaded ModelOject.js");

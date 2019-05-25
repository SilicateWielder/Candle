//Useful for define quadrilaterals within a mesh.

// Calculates the orienation of a quad along it's x and y axis.
// Could probably be improved, I lack the mathematical knowlege.
class quad
{
	constructor(p1, p2, p3, p4, texture, pointCache, backwards)
	{
		this.cache = pointCache;
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
		this.p4 = p4;

		let point1 = pointCache.retrieve(p1);
		let point2 = pointCache.retrieve(p2);
		let point3 = pointCache.retrieve(p3);
		let point4 = pointCache.retrieve(p4);
			
		let avgXpos = (point1.x + point2.x + point3.x + point4.x)/4;
		let avgYpos = (point1.y + point2.y + point3.y + point4.y)/4;
		let avgZpos = (point1.z + point2.z + point3.z + point4.z)/4;

		this.pointA = p1;
		this.pointB = p2;
		this.pointC = p3;
		this.pointD = p4;
		
		this.backwards = backwards;
		
		this.texture = texture;

		let rotCache = this.findOrientation(point1, point2, point3, point4);

		this.rot = {
			"x":rotCache.x,
			"y":rotCache.y,
			"z":0
		};

		this.pos = {
			"x":avgXpos,
			"y":avgYpos,
			"z":avgZpos
		};
	}
	
	getPos()
	{
		return(this.pos);
	}

	getCamPos()
	{
		let point1 = this.cache[this.p1];
		let point2 = this.cache[this.p2];
		let point3 = this.cache[this.p3];
		let point4 = this.cache[this.p4];
		//print(point1);

		let avgXpos = (point1.xp + point2.xp + point3.xp + point4.xp)/4;
		let avgYpos = (point1.yp + point2.yp + point3.yp + point4.yp)/4;
		let avgZpos = (point1.zp + point2.zp + point3.zp + point4.zp)/4;

		let posCache = {}
		posCache.x = avgXpos;
		posCache.y = avgYpos;
		posCache.z = avgZpos;
		
		return(posCache);
	}
	
	findOrientation()
	{
		// Top
		let risA = this.p1.z - this.p4.z;
		let runA = this.p1.x - this.p4.x;
		let angA = Math.atan(risA/runA);
		angA = angA * (180/Math.PI);
		
		// Bottom
		let risB = this.p2.z - this.p3.z;
		let runB = this.p2.x - this.p3.x;
		let angB = Math.atan(risB/runB);
		angB = angB * (180/Math.PI);

		// Left
		let risC = this.p1.z - this.p2.z;
		let runC = this.p1.y - this.p2.y;
		let angC = Math.atan(risC/runC);
		angC = angC * (180/Math.PI);

		// Right
		let risD = this.p3.z - this.p4.z;
		let runD = this.p3.y - this.p4.y;
		let angD = Math.atan(risD/runD);
		angD = angD * (180/Math.PI);

		// Quadrilateral's averaged orientation
		let avgX = (angA + angB) / 2;
		let avgY = (angC + angD) / 2;

		// calculate difference between the camera's angle and quad.
		let dif = {};
		dif.x = avgX;
		dif.y = avgY;
		return(dif);
	}
}

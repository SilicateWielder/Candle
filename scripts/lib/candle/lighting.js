class lightSource
{
	constructor (x, y, z, r, g, b)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.r = r;
		this.g = g;
		this.b = g;
	}
	
	findLightLevel(vector)
	{
		let rawLevel = getAngleSimilarity(vector, {"x":this.x, "y":this.y, "z":this.z}, 135);
		let levelX = rawLevel.x * 255 + 0.00001;
		let levelY = rawLevel.y * 255 + 0.00001;
		let levelZ = rawLevel.z * 255 + 0.00001;
	
		if (levelX > 255)
		{
			levelX = 255 - (levelX - 255);
		}
	
		if (levelY > 255)
		{
			levelY = 255 - (levelY - 255);
		}
    
		if (levelZ > 255)
		{
			levelZ = 255 - (levelZ - 255);
		}

		let level = ((levelX + levelY + levelZ) / 3);
		return(level / 255 * 1.5);
	}
}

Print("         " + bobRossPref + "Loaded lighting.js");

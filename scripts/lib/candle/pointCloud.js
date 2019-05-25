class pointCloud
{
	constructor()
	{
		this.points = [];
		this.pointCache = [];
	}
	
	add(x, y, z)
	{
		let id = (x + "-" + y + "-" + z);
		if(this.points[id] == undefined)
		{
			this.points[id] = new pointObject(x, y, z);
			this.pointCache.push(id);
			return([true, id]);
		} else {
			return([false, id]);
		}
	}
	
	retrieve(id, idY, idZ)
	{
		if (idY == undefined || idZ == undefined)
		{
			return(this.points[id]);
		} else {
			let loc = (id + "-" + idY + "-" + idZ);
			return(this.points[loc]);
		}
	}
	
	rotate(rx, ry, rz, origin, pos)
	{
		for(let crntPoint = 0; crntPoint < this.pointCache.length; crntPoint++)
		{
			let refID = this.pointCache[crntPoint];
			this.points[refID].rotate(rx, ry, rz, origin, pos);
		}
	}
}

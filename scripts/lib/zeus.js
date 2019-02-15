/*
 * Zeus Lib
 * Written by Michael Warner
 * Version 0.0.1
 * Last Update: 01/26/18
 * 
 * Used to create an easy to use debug console in the Sphere Engine
 */

let zeus = function()
{
		this.size = 5
		this.cache = [];
		this.cache.data = [];
		this.cache.limit = 5;
		
		this.typeset = [];
		
		this.bg = [];
		this.bg.img = undefined;
		this.bg.orig = undefined;
		this.bg.w = undefined;
		this.bg.h = undefined;
		
		this.font = [];
		this.font.main = undefined;
		this.font.h = 15;
		this.font.w = 10;
};

zeus.prototype = {};

// Initializes some important data for the Zeus Console.
zeus.prototype.initialize = function(font, width, height, scrnWidth)
{
		this.font.main = font;
		this.font.w = width
		this.font.h = height
		this.bg.w = scrnWidth;
		this.bg.h = height * this.size;
		this.bg.img = CreateSurface(this.bg.w, this.bg.h, CreateColor(125, 125, 255, 125));
		this.bg.img.line(0, this.bg.h - 1, this.bg.w, this.bg.h - 1, CreateColor(255, 255, 255));
		this.bg.orig = this.bg.img;
};

// Sets a limit on the number of cache-able lines.
zeus.prototype.setLimit = function(size)
{
	this.cache.limit = size;
};

// Adds a new message type to those available.
zeus.prototype.addTypeset = function(name, value, color)
{
	this.typeset[name] = [value, color];
};

// Pushes a new event to the console.
zeus.prototype.print = function(type, message)
{
	if (this.cache.data.length >= this.cache.limit)
	{
		this.cache.data.shift();
		//this.cache.data[this.cache.data.length] = ["Test", "Shifted"];
		this.cache.data[this.cache.data.length] = [type, message];
	} else { 
		this.cache.data[this.cache.data.length] = [type, message];
	};
};

// Renders the console.
zeus.prototype.render = function()
{
		this.bg.img = this.bg.orig;
		this.bg.img.blit(0, 0);
		if (this.cache.data.length >= this.size)
		{
			for(i = 0; i < this.size; i++)
			{
				let pos = this.cache.data.length - 1 - i;
				let type = this.cache.data[pos][0];
				
				if (this.typeset[type] != undefined)
				{
					if (this.typeset[type][0])
					{
						let string = "[" + type + "] " + this.cache.data[pos][1];
						this.font.main.drawText(5, 15 * i, string);
					};
				} else {
					this.font.main.drawText(5, 15 * i, "INVALID TYPE");
				};
			}
		} else {
			for(let i = 0; i < this.cache.data.length; i++)
			{
				let pos = this.cache.data.length - 1 - i;
				let type = this.cache.data[pos][0];
				
				if (this.typeset[type] != undefined)
				{
					if (this.typeset[type][0])
					{
						let string = "[" + type + "] " + this.cache.data[pos][1];
						this.font.main.drawText(5, 15 * i, string);
					};
				} else {
					this.font.main.drawText(5, 15 * i, "INVALID TYPE");
				};
			}
		};
};

let console = new zeus;
console.initialize(GetSystemFont(), 15, 15, GetScreenWidth());

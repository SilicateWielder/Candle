/*
 * Candle Lib - micron.js
 * Written by Michael Warner
 * Version 0.0.2
 * Last Update: 06/25/18
 * 
 * Used to render graphics at a low resolution in a high resolution window..
 */

// Announce loading process...
Print ("Loading micron.js...");

RequireScript("lib/micron/scale.js");

Print ("...Done.");

let centerX = GetScreenWidth() / 2;
let centerY = GetScreenHeight() / 2;

let displayScale = new scaleFactor(zoomLevel);

let microSurface = function (width, height)
{
	this.debugFont = GetSystemFont();
	
	this.defaultColor = CreateColor(255, 255, 255, 126);
	
	this.size = {}
	this.size.w = width;
	this.size.h = height;
	
	this.center = {};
	this.center.x = width / 2;
	this.center.y = height / 2;
	
	this.bgColor = CreateColor(0, 0, 0, 125);
	
	this.surface = CreateSurface(width, height, this.bgColor);
	this.screen = CreateSurface(GetScreenWidth(), GetScreenHeight(), this.bgColor);
};

microSurface.prototype.render = function(display)
{
	this.screen.transformBlitSurface(this.surface, 0, 0, this.screen.width, 0, this.screen.width, this.screen.height, 0, this.screen.height);
	
	this.screen.blit(0, 0);
	this.surface.rectangle(0, 0, this.size.w, this.size.h, this.bgColor);
	
	if (display)
	{
		this.debugFont.drawText(0, 0, "Internal Redering Resolution:");
		this.debugFont.drawText(0, 15, "	Width - " + this.size.w);
		this.debugFont.drawText(0, 30, "	Height - " + this.size.h);
		this.debugFont.drawText(0, 45, "Display Resoltuon:")
		this.debugFont.drawText(0, 60, "	Width - " + GetScreenWidth());
		this.debugFont.drawText(0, 75, "	Height - " + GetScreenHeight());
	};
	
	FlipScreen();
};

microSurface.prototype.line = function(x, y, xa, ya, color)
{
	this.surface.line(x, y, xa, ya, color);
}

// An integrated enhanced line function, draws lines with the origin at the center of the screen.
microSurface.prototype.eLine = function (x1, y1, x2, y2, color)
{
		cX = this.size.w / 2;
		cY = this.size.h / 2;
		this.surface.line(cX + x1, cY + y1, cX + x2, cY + y2, color);
};

function eLine(x1, y1, x2, y2, color)
{
        Line(centerX + x1, centerY + y1, centerX + x2, centerY + y2, color);
}

// An integrated transformblit.
microSurface.prototype.transformBlit = function(source, x1, y1, x2, y2, x3, y3, x4, y4)
{
	this.surface.transformBlitSurface(source, x1, y1, x2, y2, x3, y3, x4, y4);
};

// An enhanced version of microsurface.prototype.transformBlit.
microSurface.prototype.eTransformBlit = function (source, x1, y1, x2, y2, x3, y3, x4, y4)
{
	// Center our coordinates.
	let eX1 = x1 + this.center.x;
	let eY1 = y1 + this.center.y;
	let eX2 = x2 + this.center.x;
	let eY2 = y2 + this.center.y;
	let eX3 = x3 + this.center.x;
	let eY3 = y3 + this.center.y;
	let eX4 = x4 + this.center.x;
	let eY4 = y4 + this.center.y;
	
	this.surface.transformBlitSurface(source, eX1, eY1, eX2, eY2, eX3, eY3, eX4, eY4);
};

microSurface.prototype.blit = function(source, x, y)
{
	let w = source.width;
	let h = source.height;
	let ew = x + w;
	let eh = y + h;
	this.surface.transformBlitSurface(source, x, y, ew, y, ew, eh, x, eh);
}

microSurface.prototype.drawText = function(x, y, text)
{
	this.debugFont.drawText(x, y, text);
};
let canvas = new microSurface(displayScale.width, displayScale.height);

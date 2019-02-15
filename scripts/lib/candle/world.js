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

let worldSpace = function()
{
	
	this.objects = [];
	
	this.bounds = [];
}

// Initialize the default worldspace. comment out this line to utilize multiple worldspaces.
let world = new worldSpace();

Print("    ...Loaded World.js");

Print("    Loaded scale.js");

var scaleFactor = function(amplifier)
{
	this.width = Math.ceil(GetScreenWidth() / amplifier);
	this.height = Math.ceil(GetScreenHeight() / amplifier);
	Print("      Internal Width set to " + this.width + "px");
	Print("      Internal Height set to " +  this.height + "px");
}
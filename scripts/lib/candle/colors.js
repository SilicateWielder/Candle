let fastColors = function()
{
    this.ref = CreateColor(0, 0, 0, 0);
    this.colors = [];
}

fastColors.prototype = {};

fastColors.prototype.get = function(r, g, b, a = 255)
{
    let id = r + (g * 255) + (b * 65025) + (a * 26581375);

    if (this.colors[id] == null)
    {
        this.colors[id] = CreateColor(r, g, b, a);
    }
    return this.colors[id];
}

fastColors.prototype.getTemp = function(r, g, b, a = 255)
{
    this.ref.red = r;
    this.ref.green = g; 
    this.ref.blue = b; 
    this.ref.alpha = a;

    return this.ref;
}

Print("    " + bobRossPref + "Loaded colors.js");

let colors = new fastColors();

let fastColors = function()
{
    this.colors = [];
}

fastColors.prototype = {};

fastColors.prototype.get = function(r, g, b, a = 255)
{
    let id = r + (g * 255) + (b * 65025) + (a * 26581375);

    if (this.colors[id] == undefined)
    {
        this.colors[id] = CreateColor(r, g, b, a);
    }
    return this.colors[id];
}

Print("    " + bobRossPref + "Loaded colors.js");

let colors = new fastColors();

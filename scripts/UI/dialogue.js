const DIALOGUE_END = "00000000";
const DIALOGUE_BG = CreateColor(40, 40, 40, 125);
const DIALOGUE_FR = CreateColor(200, 200, 200);

let dialogueSystem = function()
{
	this.w = canvas.size.w * 0.9;
	this.h = canvas.size.h * 0.2;
	
	let cw = this. w - 1;
	let ch = this. h - 1;
	
	let sw = GetScreenWidth();
	let sh = GetScreenHeight();
	
	this.x = (canvas.size.w - this.w) / 2;
	this.y = canvas.size.h - this.h;
	
	this.imageFull = CreateSurface(this.w, this.h, DIALOGUE_BG);
	this.imageFull.line(0, 0, this.w, 0, DIALOGUE_FR);
	this.imageFull.line(cw, 0, cw, ch, DIALOGUE_FR);
	this.imageFull.line(cw, ch, 0, ch, DIALOGUE_FR);
	this.imageFull.line(0, ch, 0, 0, DIALOGUE_FR);
}

dialogueSystem.prototype.blit = function(data)
{
	canvas.blit(this.imageFull, this.x, this.y);
}
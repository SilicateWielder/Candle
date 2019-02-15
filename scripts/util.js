function render3dStats()
{
	//Draw mode settings.
    canvas.drawText(0, 0, "Candle - A Lightweight software-level rendering engine");
	Line(0, 13, 200, 13, canvas.defaultColor);
	canvas.drawText(0, 15, "Version: 0.3.5");
	Line(0, 28, 200, 28, canvas.defaultColor);
	
	canvas.drawText(0, 30, "Wireframes Enforced: " + wireframesForced);
	canvas.drawText(0, 45, "Bobross Mode: " + bobRossMode);
	canvas.drawText(0, 60, "Lighting Enabled: " + lightingEnabled);
	
	Line(0, 88, 200, 88, canvas.defaultColor);
	canvas.drawText(0, 90, "Camera Stats");
	Line(0, 103, 200, 103, canvas.defaultColor);
	
	canvas.drawText(0, 105, "X-Pos: " + globalCamera.pos.x);
    canvas.drawText(0, 120, "Y-Pos: " + globalCamera.pos.y);
	canvas.drawText(0, 135, "Z-Pos: " + globalCamera.pos.z);
	canvas.drawText(0, 150, "X-Rot: " + globalCamera.rot.x);
    canvas.drawText(0, 165, "Y-Rot: " + globalCamera.rot.y);
	canvas.drawText(0, 180, "Z-Rot: " + globalCamera.rot.z);
}

function setPixel(x, y, color)
{
	let xp = (GetScreenWidth() / 2) + x;
	let yp = (GetScreenHeight() / 2) + y;
	Line(xp, yp, xp + 1, yp, color);
}

function rotate2 (x, y, r)
{
	let lx = (fastCos(r) * x) - (fastSin(r) * y);
	let ly = (fastSin(r) * x) + (fastCos(r) * y);
	
	return([lx, ly]);
}

function rotate(x, y, z, rx, ry, rz)
{
	let l = rotate2(x, y, rx);
	return (l);
}

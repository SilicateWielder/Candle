function render3dStats()
{
	let font = GetSystemFont();
	let defaultColor = colors.getTemp(255, 255, 255);
	//Draw mode settings.
    font.drawText(0, 0, "Candle - A Lightweight software-level rendering engine");
	Line(0, 13, 200, 13, defaultColor);
	font.drawText(0, 15, "Version: 0.4.4 DEMO");
	Line(0, 28, 200, 28, defaultColor);
	
	font.drawText(0, 30, "Wireframes Enforced: " + wireframesForced);
	font.drawText(0, 45, "Bobross Mode: " + bobRossMode);
	font.drawText(0, 60, "Lighting Enabled: " + lightingEnabled);
	
	Line(0, 88, 200, 88, defaultColor);
	font.drawText(0, 90, "Camera Stats");
	Line(0, 103, 200, 103, defaultColor);
	
	font.drawText(0, 105, "X-Pos: " + globalCamera.pos.x);
    font.drawText(0, 120, "Y-Pos: " + globalCamera.pos.y);
	font.drawText(0, 135, "Z-Pos: " + globalCamera.pos.z);
	font.drawText(0, 150, "X-Rot: " + globalCamera.rot.x);
    font.drawText(0, 165, "Y-Rot: " + globalCamera.rot.y);
	font.drawText(0, 180, "Z-Rot: " + globalCamera.rot.z);
	font.drawText(0, 195, "FOV: " + globalCamera.fov);
	
	font.drawText(0, 210, "Sun R:" + sun.r + " | Sun X Pos:" + sun.x);
	font.drawText(0, 225, "Sun G:" + sun.g + " | Sun Y Pos:" + sun.y);
	font.drawText(0, 240, "Sun B:" + sun.b + " | Sun Z Pos:" + sun.z);
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

// I don't know what I was doing with this
function rotate(x, y, z, rx, ry, rz)
{
	let l = rotate2(x, y, rx);
	return (l);
}

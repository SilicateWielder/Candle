let surf = CreateSurface(GetScreenWidth(), GetScreenHeight(), CreateColor(112,149,209));

let cr = 114;
let cg = 168;
let cb = 255;

RequireScript("sprng.js");

function setPixel(x, y, color)
{
	surf.line(x, y, x+1, y, color);
}


function renderStatic(xp, yp, wid = surf.width, hgt = surf.height, seed, res) 
{	
	surf.blit(0, 0);
	for (y = 0; y < hgt; y++)
	{
		for (x = 0; x < wid; x++)
		{
			let val = 0;
			if (res > 1)
			{
				val = sprng(x + xp, y + yp, seed, res);
			} else {
				val = prng(x + xp, y + yp, seed, res);
			}
			
			let c = sprng(x + xp, y + yp, seed, res * 1000);
			let cr = Math.cos(c) * 2;
			let cg = Math.sin(c) * 200;
			let cb = Math.tan(c) * Math.cos(c) * 125;
			
			setPixel(x, y, CreateColor(cr * (1 - val), cg * val, cb * Math.tan(val * 3.14)));
			//setPixel(x, y, CreateColor(cr * val, cg * val, cb * val));
		}
	}
}

let i = 1;

let mx = 0;
let my = 0;
let r = 1;

print("I'm a map, I'm a map, I'm a map, I'm a map, I'M A MAAAAAP");

while (true)
{
	if(IsKeyPressed(KEY_LEFT))
	{
		mx -= 1;
	} else if (IsKeyPressed(KEY_RIGHT))
	{
		mx += 1;
	}
	
	if(IsKeyPressed(KEY_UP))
	{
		my -= 1;
	} else if (IsKeyPressed(KEY_DOWN))
	{
		my += 1;
	}
	
	if(IsKeyPressed(KEY_Z))
	{
		r -= 0.25;
	} else if (IsKeyPressed(KEY_X))
	{
		r += 0.25;
	}
	
	renderStatic(mx, my, surf.width, surf.height, 52334234, Math.floor(r));
	
	GetSystemFont().drawText(5, 5, "X: " + mx);
	GetSystemFont().drawText(5, 20, "Y: " + my);
	GetSystemFont().drawText(5, 85, "Zoom: " + Math.floor(r) + "x");
	
	i += 0.1;
	
	FlipScreen();
}

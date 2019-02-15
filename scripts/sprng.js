//PRNG and SPRNG functions
// Writtten by Michael Warner December 1st 2018

//Basic prng function, needs work.
function prng (posx, posy, seed)
{
	
	let px1 = Math.cos(posx/seed) * (5432345 + seed);
	let py1 = Math.tan((posy + 1)/(seed + posx)) * px1;
	let val = Math.abs(Math.tan(px1 * py1));
	let res = val - Math.floor(val); // added to keep values within range.

	return(res);
}
/*
function smoothify (edge0, edge1, x)
{
    x = clamp((x - edge0) - (edge1 - edge0), 0.0, 1.0);

    return (x * x * x * (x * (x * 6 - 15) + 10));
}
*/

function smoothify(val)
{
    
return Math.sin(Math.sin((val-0.5)*3.14159265359));
    //return Math.tan(Math.sin(val));
}

function clamp(x, lower, upper)
{
    let y = 0;
    if (x < lower)
    {
        y = lower;
    }
    if (x > upper)
    {
        y = upper;
    }

    return y;
}

/*
smoothed pseudo random number gen, relies on prng() for values.
any subsititute prng function must return a value between 0 and 1.

function format is as follows.
prng(position_x, position_y, seed).
*/
function sprng (posx, posy, seed, steps)
{
	// Sooo much maaaaaaaaaath
	
	//calculate position and stepping.
	let posiX = Math.floor(posx / steps);
	let posiY = Math.floor(posy / steps);
	
	let stepX = posx % steps;
	let stepY = posy % steps;
	
	// Determine values to mix;
	let coln = prng(posiX, posiY, seed); // Top Left
	let colm = prng(posiX + 1, posiY + 1, seed); // Bottom Right
	let colX = prng(posiX + 1, posiY, seed); // Top Right
	let colY = prng(posiX, posiY + 1, seed); // Bottom Left
	
	//Determine mixing along Xmin. 
	let xAn = colX - coln; // Top Left, to Top Right
	let xBn = xAn / steps; // Determine 
	let xCn = xBn * stepX;
	let xDn = coln + xCn;
	
	//Determine mixing along Xmax. // Figure out how to reverse xMin
	let xAm = (colY - colm); // Bottom Left, to Bottom Right
	let xBm = xAm / steps;
	let xCm = xBm * (steps - stepX);
	let xDm = colm + xCm;
	
	//Determine Mixing along Ymin.
	let yAn = colY - coln; // Top Left, to Bottom Left
	let yBn = yAn / steps;
	let yCn = yBn * stepY;
	let yDn = coln + yCn;
	
	//Determine mixing along Ymax.
	let yAm = colX - colm; // Top Right, to Bottom Right
	let yBm = yAm / steps;
	let yCm = yBm * (steps - stepY);
	let yDm = colm + yCm;
	
	// Determine edge mixing along X.
	let xA = xDm - xDn;
	let xB = xA / steps;
	let xC = xB * stepY;
	let xD = xDn + xC;
	//xD = Math.sin((xD-0.5)*3.14159265359);
    xD = smoothify(xD);
	
	// Determine edge mixing along Y.
	let yA = yDm - yDn;
	let yB = yA / steps;
	let yC = yB * stepX;
	let yD = yDn + yC;
	//yD = Math.sin(Math.tan((yD-0.5)*3.14159265359));
    yD = smoothify(yD);
	

	// Determine mixing between edges.
	let fA = yD - xD;
	let fB = fA / 2;
	let fC = yD + fB;
	let fD = (fC + yD + xD) / 3;

	return(fD);
}

function tprng(posX, posY, seed, chunkSize)
{
    let factorA = 7 * sprng(posX, posY, seed>>11, chunkSize);
    let factorB = (factorA * prng(posX, posY, seed<<11, Math.floor(chunkSize/2))) / 200;


    let smooth = factorA * sprng(posX, posY, seed, chunkSize);
    let rough = sprng(posX, posY, ~seed, Math.floor(chunkSize/2));
    let fine = 0.75 * sprng(posX, posY, ~seed, Math.floor(chunkSize/4));

    return((smooth*2) + (rough / 2) + (~fine));
}

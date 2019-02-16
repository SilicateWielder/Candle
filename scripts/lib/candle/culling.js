// Culls polygons outside of the field of view.
function oobCull(vA, vB, vC, vD)
{
    let doCull = true;

    let limX = GetScreenWidth() / 2;
    let limY = GetScreenHeight() / 2;

    if ((Math.abs(vA.x) > limX && Math.abs(vB.x)  > limX) && (Math.abs(vC.x) > limX && Math.abs(vD.x) > limX))
    {
        doCull = false;
    }
    
    
    if ((Math.abs(vA.y) > limY && Math.abs(vD.y) > limY) && (Math.abs(vB.y) > limY && Math.abs(vC.y) > limY))
    {
        doCull = false;
    }

    return doCull;
}

// WIP

/* 
* For a quadrilateral, calculate the 
*/
function backfaceCull(poly, cache)
{
    let cullable = true;
    let cullVal = -5

    let caseA = (poly[1].x - poly[0].x) * (poly[1].y + poly[0].y);
    let caseB = (poly[2].x - poly[1].x) * (poly[2].y + poly[1].y);
    let caseC = (poly[3].x - poly[2].x) * (poly[3].y + poly[2].y);
    let caseD = (poly[0].x - poly[3].x) * (poly[0].y + poly[3].y);
    let sum = caseA + caseB + caseC + caseD;
    if (sum < cullVal)
    {
        cullable = false;
    }

    return (cullable);
}

Print("         " + bobRossPref + "Loaded culling.js");

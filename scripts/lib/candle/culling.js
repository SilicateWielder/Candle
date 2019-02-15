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
    let cull = true;

    //print('0 - ' + poly[0].x + ', ' + poly[0].y);
    //print('1 - ' + poly[1].x + ', ' + poly[1].y);
    //print('2 - ' + poly[2].x + ', ' + poly[2].y);
    //print('3 - ' + poly[3].x + ', ' + poly[3].y);

    sizeA = (poly[3].x - poly[0].x);
    sizeB = (poly[2].x - poly[1].x);
    sizeC = (poly[1].y - poly[0].y);
    sizeD = (poly[2].y - poly[3].y);
    
    //print(sizeA + ', ' + sizeB);
    //print(sizeC + ', ' + sizeD);
    
    let cullVal = 0;

    if(sizeA < cullVal && sizeB < cullVal)
    {
        //print('cull');
        cull = false;
    }

    if(sizeC < cullVal && sizeD < cullVal)
    {
        //print('cull');
        cull = false;
    }

    return (cull);
}

Print("         " + bobRossPref + "Loaded culling.js");

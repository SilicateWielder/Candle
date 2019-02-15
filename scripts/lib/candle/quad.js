//Useful for define quadrilaterals within a mesh.

// Utility to determine orientation of a quad.
function findQuadOrientation(cA, cB, cC, cD)
{
        /*
        Top    = tA, tD
        Bottom =  tB, tC
        Left   = tA, tB
        Right  = tC, tD
    */

    // Top
    let risA = cA.z - cD.z;
    let runA = cA.x - cD.x;
    let angA = Math.atan(risA/runA);
    angA = angA * (180/Math.PI);
    
    // Bottom
    let risB = cB.z - cC.z;
    let runB = cB.x - cC.x;
    let angB = Math.atan(risB/runB);
    angB = angB * (180/Math.PI);

    // Left
    let risC = cA.z - cB.z;
    let runC = cA.y - cB.y;
    let angC = Math.atan(risC/runC);
    angC = angC * (180/Math.PI);

    // Right
    let risD = cC.z - cD.z;
    let runD = cC.y - cD.y;
    let angD = Math.atan(risD/runD);
    angD = angD * (180/Math.PI);

    // Quadrilateral's averaged orientation
    let avgX = (angA + angB) / 2;
    let avgY = (angC + angD) / 2;

    // calculate difference between the camera's angle and quad.
    let dif = {};
    dif.x = avgX;
    dif.y = avgY;
    return(dif);
}

let quad = function(p1, p2, p3, p4, texture, pointCache)
{
    this.cache = pointCache;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;

    let point1 = pointCache[p1];
    let point2 = pointCache[p2];
    let point3 = pointCache[p3];
    let point4 = pointCache[p4];

    this.pointA = p1;
    this.pointB = p2;
    this.pointC = p3;
    this.pointD = p4;
    
    this.texture = texture;

    let rotCache = findQuadOrientation(point1, point2, point3, point4);

    this.rot = {
        "x":rotCache.x,
        "y":rotCache.y,
        "z":0
    };

    let avgXpos = (point1.x + point2.x + point3.x + point4.x)/4;
    let avgYpos = (point1.y + point2.y + point3.y + point4.y)/4;
    let avgZpos = (point1.z + point2.z + point3.z + point4.z)/4;

    this.pos = {
        "x":avgXpos,
        "y":avgYpos,
        "z":avgZpos
    };
}

quad.prototype = {};
quad.prototype.getCamPos = function()
{
    let point1 = this.cache[this.p1];
    let point2 = this.cache[this.p2];
    let point3 = this.cache[this.p3];
    let point4 = this.cache[this.p4];
    //print(point1);

    let avgXpos = (point1.xp + point2.xp + point3.xp + point4.xp)/4;
    let avgYpos = (point1.yp + point2.yp + point3.yp + point4.yp)/4;
    let avgZpos = (point1.zp + point2.zp + point3.zp + point4.zp)/4;

    let posCache = {}
    posCache.x = avgXpos;
    posCache.y = avgYpos;
    posCache.z = avgZpos;
    
    return(posCache);
}

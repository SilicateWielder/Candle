function getAngleSimilarity(vectA, vectB, range)
{
    let dif = {};
    dif.x = Math.abs((vectA.x - vectB.x) / range);
    dif.y = Math.abs((vectA.y - vectB.y) / range);

    return(dif);
}

function findAngle(xA, yA, xB, yB)
{
    let ris = yA - yB;
    let run = xA - xB;
    let rads = (Math.atan(ris/run));
    let angle = rads * (180 / Math.PI);
    if(isNaN(angle))
    {
        angle = 0;
    }
    return (angle);
}

function findAngleThree(xA, yA, zA, xB, yB, zB)
{
    let num = (xA * xB) + (yA * yB) + (zA * zB)
    let den = Math.sqrt((xA * xA) + (yA * yA) + (zA * zA)) * ((xB * xB) + (yB * yB) + (zB * zB)); //Typed longhand rather than using Math.pow for sake of less spaghett.
    
    return (Math.acos(num/den));
}

function angleSum (valA, valB)
{
    let newVal = valA + valB;
    if (newVal > 360)
    {
        newVal -= 360;
    }

    return (newVal);
}

function angleSub(valA, valB)
{
    let newVal = valA - valB;
    if (newVal < 0)
    {
        newVal += 360;
    }

    return (newVal);
}

Print("         " + bobRossPref + "Loaded angles.js");

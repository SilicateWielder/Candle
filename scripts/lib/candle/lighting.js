// Calculates the light level of a quad based on it's angle along the X and Y axis.
function findLightLevel(vectA, vectB)
{
    let rawLevel = getAngleSimilarity(vectA, vectB, 135);
    let levelX = rawLevel.x * 255 + 0.00001;
    let levelY = rawLevel.y * 255 + 0.00001;

    if (levelX > 255)
    {
        levelX = 255 - (levelX - 255);
    }

    if (levelY > 255)
    {
        levelY = 255 - (levelY - 255);
    }

    let level = ((levelX + levelY) / 2);
    return(level);
}

Print("         " + bobRossPref + "Loaded lighting.js");


let textureCache = function(dir)
{
    let defaultTexture = new Texture(10, 10); // Fix this, do it. Now.
    this.textures = {"default": defaultTexture};
    this.basePath = dir;
}

textureCache.prototype = {};

textureCache.prototype.get = function(path)
{
    if(this.textures[path] === undefined)
    {
        this.textures[path] = LoadImage(path);
    }
    
    return(this.textures[path]);
}

let textures = new textureCache('images');

Print("    " + bobRossPref + "Loaded textures.js");

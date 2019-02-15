const spdfwd = 1 * ((45) / 90);
const spddwd = 1 * ((45) / 90);


function playerControl()
{
	if(IsKeyPressed(KEY_E))
	{
		globalCamera.rot.z += rotspeed;
	}

	if(IsKeyPressed(KEY_Q))
	{
		globalCamera.rot.z -= rotspeed;
	}

	if(IsKeyPressed(KEY_LEFT))
	{
		globalCamera.rot.y += rotspeed;
	}
	
	if(IsKeyPressed(KEY_RIGHT))
	{
		globalCamera.rot.y -= rotspeed;
	}
	
	if(IsKeyPressed(KEY_UP))
	{
		globalCamera.rot.x += rotspeed;
	}
	
	if(IsKeyPressed(KEY_DOWN))
	{
		globalCamera.rot.x -= rotspeed;
	}
	
	if(IsKeyPressed(KEY_A))
	{
		globalCamera.pos.x += movspeed;
	}
	
	if(IsKeyPressed(KEY_D))
	{
		globalCamera.pos.x -= movspeed;
	}
	
	if(IsKeyPressed(KEY_W))
	{
		globalCamera.pos.y -= movspeed;
	}
	
	if(IsKeyPressed(KEY_S))
	{
		globalCamera.pos.y += movspeed;
	}
	
	if(IsKeyPressed(KEY_X))
	{
		globalCamera.pos.z += movspeed;
	}
	
	if(IsKeyPressed(KEY_Z))
	{
		globalCamera.pos.z -= movspeed;
	}	
}

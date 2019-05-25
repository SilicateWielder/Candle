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
	
	// Sun Color control
	if(IsKeyPressed(KEY_I))
	{
		if(sun.r < 255)
		{
			sun.r ++;
		}
	}
	if(IsKeyPressed(KEY_J))
	{
		if(sun.r > 0)
		{
			sun.r --;
		}
	}
	
	if(IsKeyPressed(KEY_O))
	{
		if(sun.g < 255)
		{
			sun.g ++;
		}
	}
	if(IsKeyPressed(KEY_K))
	{
		if(sun.g > 0)
		{
			sun.g --;
		}
	}
	
	if(IsKeyPressed(KEY_P))
	{
		if(sun.b < 255)
		{
			sun.b ++;
		}
	}
	if(IsKeyPressed(KEY_L))
	{
		if(sun.b > 0)
		{
			sun.b --;
		}
	}
	
	//Sun Position control
	if(IsKeyPressed(KEY_T))
	{
		if(sun.x < 360)
		{
			sun.x ++;
		}
	}
	if(IsKeyPressed(KEY_F))
	{
		if(sun.x > -360)
		{
			sun.x --;
		}
	}
	
	if(IsKeyPressed(KEY_Y))
	{
		if(sun.y < 360)
		{
			sun.y ++;
		}
	}
	if(IsKeyPressed(KEY_G))
	{
		if(sun.y > -360)
		{
			sun.y --;
		}
	}
	
	if(IsKeyPressed(KEY_U))
	{
		if(sun.z < 360)
		{
			sun.z ++;
		}
	}
	if(IsKeyPressed(KEY_H))
	{
		if(sun.z > -360)
		{
			sun.z --;
		}
	}
	
	if(IsKeyPressed(KEY_N))
	{
		if(globalCamera.fov > 100)
		{
			globalCamera.fov = globalCamera.fov - 10;
		}
	}
	if(IsKeyPressed(KEY_M))
	{
		if(globalCamera.fov < 3000)
		{
			globalCamera.fov += 10;
		}
	}
}

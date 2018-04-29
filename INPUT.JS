canvas.addEventListener("mousemove", updateMouse);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("click", onMouseClick);
window.addEventListener("keydown", onKeyPress);

function updateMouse(event)
{
	var rect = canvas.getBoundingClientRect();
	mouse.x = event.clientX - rect.left;
	mouse.y = event.clientY - rect.top;
}

function onKeyPress(event)
{
	activeKey = event.keyCode;
	if (cfg.waitNewKey)
	{
		if (activeKey >= 48 && activeKey <= 90)
		{
			activeKey = String.fromCharCode(activeKey);
			switch (toRemap)
			{
				case "left":
				cfg.input[0].key = activeKey;
				break;
				case "right":
				cfg.input[1].key = activeKey;
				break;
				case "jump":
				cfg.input[2].key = activeKey;
				break;
				case "slide":
				cfg.input[3].key = activeKey;
				break;
				case "grapple":
				cfg.input[4].key = activeKey;
				break;
				case "ovrdrv":
				cfg.input[5].key = activeKey;
				break;
			}
			cfg.waitNewKey = false;
			loadBtns();
		}
	}
}

function onMouseClick()
{
	switch (gameState.type)
	{
		case "splash":
		(gameState.first) ? gameState.first = false : mainMenu.init();
		break;
		default:
		if (dropMenu.active)
		{
			for (var i = 0; i < dropMenu.btns.length; i++)
			{
				if (dropMenu.btns[i].over)
				{
					dropMenu.select(dropMenu.btns[i].source,dropMenu.btns[i].text);
					break;
				}
			}
			dropMenu.close();
		}

		else
		{
			for (var i = 0; i < gameState.btns.length; i++)
			{
				if (gameState.btns[i].over)
				{
					if (gameState.btns[i].type == "drop" && !dropMenu.active)
					{
						dropMenu.open(gameState.btns[i].source,gameState.btns[i].x,gameState.btns[i].y);
						break;
					}
					if (gameState.btns[i].type == "key" && !dropMenu.active)
					{
						cfg.remap(gameState.btns[i].source);
					}
					else
					{
						(gameState.btns[i].click.init === undefined) ? gameState.btns[i].click() : gameState.btns[i].click.init();
						break;
					}
				}
			}
		}
	}
}

function onMouseDown()
{
	mousehold = true;
}

function onMouseUp()
{
	mousehold = false;
}

function checkButtons()
{
	for (var i = 0; i < gameState.btns.length; i++)
	{
		gameState.btns[i].over = false;
		if (gameState.btns[i].al == "center")
		{
			if (!(mouse.x < gameState.btns[i].x-gameState.btns[i].w/2 ||
				mouse.x > gameState.btns[i].x+gameState.btns[i].w/2 ||
				mouse.y > gameState.btns[i].y ||
				mouse.y < gameState.btns[i].y-gameState.btns[i].h))
				{
					gameState.btns[i].over = true;
				}
			}
			else if (gameState.btns[i].al == "left")
			{
				if (!(mouse.x < gameState.btns[i].x ||
					mouse.x > gameState.btns[i].x+gameState.btns[i].w ||
					mouse.y > gameState.btns[i].y ||
					mouse.y < gameState.btns[i].y-gameState.btns[i].h))
					{
						gameState.btns[i].over = true;
					}
				}
			}
		}

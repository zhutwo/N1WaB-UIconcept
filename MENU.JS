var splashScrn =
{
    type: "splash",
    first: true,
    init: function()
    {
        surface.shadowBlur = 0;
        surface.shadowColor = "white";
        this.first = true;
        gameState = splashScrn;
    },
    render: function()
    {
        if (this.first)
        {
            surface.drawImage(splash1, 0, 0);
        }
        else
        {
            surface.shadowBlur = 20;
            surface.clearRect(0, 0, canvas.width, canvas.height);
            surface.drawImage(splash2, 0, 0);
        }
    },
    update: function()
    {
        this.render();
    }
};

var slider =
{
    data:
    [
        {type: "music", x: 640, y: 252, w: 160, h: 20, over: false, pos: 120},
        {type: "sound", x: 640, y: 302, w: 160, h: 20, over: false, pos: 120},
        {type: "swears", x: 640, y: 352, w: 160, h: 20, over: false, pos: 120}
    ],
    check: function()
    {
        for (var i = 0; i < this.data.length; i++)
        {
            this.data[i].over = false;
            if (!(mouse.x < this.data[i].x ||
            mouse.x > this.data[i].x+this.data[i].w ||
            mouse.y > this.data[i].y ||
            mouse.y < this.data[i].y-this.data[i].h))
            {
                this.data[i].over = true;
                if (mousehold)
                {
                    slider.data[i].pos = mouse.x - slider.data[i].x;
                    cfg.vol[i].data = Math.ceil(100*slider.data[i].pos/slider.data[i].w);
                    console.log(cfg.vol[i].type + " volume: " + cfg.vol[i].data);
                }
            }
        }
    },
    render: function()
    {
        surface.beginPath();
        for (var i = 0; i < this.data.length; i++)
        {
            surface.moveTo(this.data[i].x, this.data[i].y);
            surface.lineTo(this.data[i].x+this.data[i].w, this.data[i].y);
            surface.lineTo(this.data[i].x+this.data[i].w, this.data[i].y-this.data[i].h);
            surface.lineTo(this.data[i].x, this.data[i].y);
        }
        surface.strokeStyle = "white";
        surface.stroke();
        surface.beginPath();
        for (var i = 0; i < this.data.length; i++)
        {
            surface.moveTo(this.data[i].x, this.data[i].y);
            surface.lineTo(this.data[i].x+this.data[i].pos, this.data[i].y);
            surface.lineTo(this.data[i].x+this.data[i].pos, this.data[i].y-this.data[i].h*this.data[i].pos/this.data[i].w);
            surface.lineTo(this.data[i].x, this.data[i].y);
        }
        surface.fillStyle = "rgba(255,255,255,0.2)";
        surface.fill();
        surface.fillStyle = "white";
    }
};

var dropMenu =
{
active: false,
btns: [],
open: function(source,x,y)
{
    for (var i = 0; i < source.length; i++)
    {
        this.btns.push({text: source[i], align: "left", x: x, y: y+(i+1)*48, w: 128, h: 24, over: false, type: "list", source: source});
    }
    this.active = true;
},
select: function(source, select)
{
    switch (source)
    {
        case cfg.deviceList:
        cfg.dev = select;
        break;
        case cfg.resList:
        cfg.res = select;
        break;
        case cfg.gqList:
        cfg.gq = select;
        break;
        case cfg.peList:
        cfg.pe = select;
        break;
        case cfg.lqList:
        cfg.lq = select;
        break;
        case cfg.aaList:
        cfg.aa = select;
        break;
    }
    loadBtns();
    this.close();
},
close: function()
{
    this.active = false;
    this.btns = [];
},
check: function()
{
    for (var i = 0; i < this.btns.length; i++)
    {
        this.btns[i].over = false;
        if (!(mouse.x < this.btns[i].x ||
        mouse.x > this.btns[i].x+this.btns[i].w ||
        mouse.y > this.btns[i].y ||
        mouse.y < this.btns[i].y-this.btns[i].h))
        {
            this.btns[i].over = true;
        }
    }
},
    render: function()
    {
        surface.beginPath();
        surface.clearRect(640, dropMenu.btns[0].y-84, 200, 260);
        for (var i = 0; i < this.btns.length; i++)
        {
            if (this.btns[i].over)
            {
                surface.shadowColor = "white";
                surface.shadowBlur = 20;
            }
            else
            {
                surface.shadowColor = "white";
                surface.shadowBlur = 10;
            }
            surface.font = (this.btns[i].font === undefined) ? "24px eightbit" : this.btns[i].font;
            surface.textAlign = "left";
            surface.fillText(this.btns[i].text, this.btns[i].x, this.btns[i].y);
        }
        surface.rect(660, dropMenu.btns[0].y-76, 170, 244);
        surface.rect(660, dropMenu.btns[0].y-76, 170, 40);
        surface.stroke();

    }
};

var mainMenu =
{
    type: "main",
    init: function()
    {
        gameState = mainMenu;
        lastState = mainMenu;
        stage.style.backgroundImage = menuBG;
    },
    render: function()
    {
        surface.clearRect(0, 0, canvas.width, canvas.height);
        surface.font = "48px eightbit";
        surface.fillStyle = "white";
        surface.textAlign = "center";
        surface.shadowColor = "white";
        surface.shadowBlur = 10;
        surface.fillText("number One with a bullet", canvas.width/2, 120);
    },
    update: function()
    {
        checkButtons();
        this.render();
        renderBtns();
    }
};

var optMenu =
{
    type: "option",
    init: function()
    {
        gameState = optMenu;
    },
    render: function()
    {
        surface.clearRect(0, 0, canvas.width, canvas.height);
        surface.font = "32px eightbit";
        surface.fillStyle = "white";
        surface.textAlign = "center";
        surface.shadowColor = "white";
        surface.shadowBlur = 10;
        surface.fillText("SETTINGS", canvas.width/2, 120);
    },
    update: function()
    {
        checkButtons();
        this.render();
        renderBtns();
    }
};

var audioMenu =
{
    type: "audio",
    init: function()
    {
        gameState = audioMenu;
    },
    render: function()
    {
        surface.clearRect(0, 0, canvas.width, canvas.height);
        surface.font = "32px eightbit";
        surface.textAlign = "center";
        surface.shadowColor = "white";
        surface.shadowBlur = 10;
        surface.fillText("AUDIO", canvas.width/2, 120);
        slider.check();
        slider.render();
    },
    update: function()
    {
        checkButtons();
        this.render();
        renderBtns();
    }
};

var videoMenu =
{
    type: "video",
    init: function()
    {
        gameState = videoMenu;
    },
    render: function()
    {
        surface.clearRect(0, 0, canvas.width, canvas.height);
        surface.font = "32px eightbit";
        surface.textAlign = "center";
        surface.shadowColor = "white";
        surface.shadowBlur = 10;
        surface.fillText("VIDEO", canvas.width/2, 120);
        surface.strokeStyle = "white";
        surface.beginPath();
        surface.rect(660, 172, 170, 40);
        surface.rect(660, 222, 170, 40);
        surface.rect(660, 272, 170, 40);
        surface.rect(660, 322, 170, 40);
        surface.rect(660, 372, 170, 40);
        surface.stroke();
    },
    update: function()
    {
        checkButtons();
        if (dropMenu.active)
            dropMenu.check();
        this.render();
        renderBtns();
        if (dropMenu.active)
            dropMenu.render();
    }
};

var inputMenu =
{
    type: "input",
    init: function()
    {
        gameState = inputMenu;
    },
    render: function()
    {
        surface.clearRect(0, 0, canvas.width, canvas.height);
        surface.font = "32px eightbit";
        surface.textAlign = "center";
        surface.shadowColor = "white";
        surface.shadowBlur = 10;
        surface.fillText("INPUT", canvas.width/2, 120);
        surface.textAlign = "left";
        surface.font = "italic 24px eightbit";
        if (cfg.waitNewKey)
        {
            surface.fillText(cfg.waitText, 250, 200);
        }
        else
        {
            surface.fillText(cfg.remapText, 250, 200);
        }
        surface.strokeStyle = "white";
        surface.beginPath();
        surface.rect(660, 172, 170, 40);
        surface.rect(250, 272, 40, 40);
        surface.rect(250, 322, 40, 40);
        surface.rect(250, 372, 40, 40);
        surface.rect(670, 372, 40, 40);
        surface.rect(670, 272, 40, 40);
        surface.rect(670, 322, 40, 40);
        surface.stroke();
    },
    update: function()
    {
        checkButtons();
        if (dropMenu.active)
            dropMenu.check();
        this.render();
        renderBtns();
        if (dropMenu.active)
            dropMenu.render();
    }
};

var pauseMenu =
{
    type: "pause",
    init: function()
    {
        gameState = pauseMenu;
        lastState = pauseMenu;
        stage.style.backgroundImage = menuBG;
        loadBtns();
    },
    render: function()
    {
        surface.clearRect(0, 0, canvas.width, canvas.height);
        surface.font = "32px eightbit";
        surface.textAlign = "center";
        surface.fillStyle = "white";
        surface.shadowColor = "white";
        surface.shadowBlur = 10;
        surface.fillText("PAUSED", canvas.width/2, 120);
        surface.font = "48px eightbit";
        surface.fillText("❚❚", canvas.width/2, 200);
    },
    update: function()
    {
        checkButtons();
        this.render();
        renderBtns();
    }
};

var loadGame = {
    init: function()
    {
        alert("No game to load m8...");
    }
};

function loadBtns()
{
    mainMenu.btns = [
        {text: "new game", al: "center", x: canvas.width/2, y: 350, w: 128, h: 24, over: false, click: newGame},
        {text: "load game", al: "center", x: canvas.width/2, y: 400, w: 128, h: 24, over: false, click: loadGame},
        {text: "settings", al: "center", x: canvas.width/2, y: 450, w: 128, h: 24, over: false, click: optMenu},
        {text: "quit", al: "center", x: canvas.width/2, y: 500, w: 128, h: 24, over: false, click: exit}
    ];
    optMenu.btns = [
        {text: "audio", al: "center", x: canvas.width/2, y: 350, w: 128, h: 24, over: false, click: audioMenu},
        {text: "video", al: "center", x: canvas.width/2, y: 400, w: 128, h: 24, over: false, click: videoMenu},
        {text: "input", al: "center", x: canvas.width/2, y: 450, w: 128, h: 24, over: false, click: inputMenu},
        {text: "back", al: "center", x: canvas.width/2, y: 500, w: 128, h: 24, over: false, click: back}
    ];
    audioMenu.btns = [
        {text: "Music Volume", al: "left", x: 250, y: 250, w: 0, h: 0, over: false},
        {text: "Sound Effects", al: "left", x: 250, y: 300, w: 0, h: 0, over: false},
        {text: "Expletives", al: "left", x: 250, y: 350, w: 0, h: 0, over: false},
        {text: "back", al: "center", x: canvas.width/2, y: 500, w: 128, h: 24, over: false, click: optMenu}
    ];
    videoMenu.btns = [
        {text: "Resolution", al: "left", x: 250, y: 200, w: 0, h: 0, over: false},
        {text: "⮟ " + cfg.res, al: "left", x: 670, y: 200, w: 128, h: 24, over: false, type: "drop", source: cfg.resList},
        {text: "Graphics Quality", al: "left", x: 250, y: 250, w: 0, h: 0, over: false},
        {text: "⮟ " + cfg.gq, al: "left", x: 670, y: 250, w: 128, h: 24, over: false, type: "drop", source: cfg.gqList},
        {text: "Particle Effects", al: "left", x: 250, y: 300, w: 0, h: 0, over: false},
        {text: "⮟ " + cfg.pe, al: "left", x: 670, y: 300, w: 128, h: 24, over: false, type: "drop", source: cfg.peList},
        {text: "Lighting Quality", al: "left", x: 250, y: 350, w: 0, h: 0, over: false},
        {text: "⮟ " + cfg.lq, al: "left", x: 670, y: 350, w: 128, h: 24, over: false, type: "drop", source: cfg.lqList},
        {text: "Antialiasing", al: "left", x: 250, y: 400, w: 0, h: 0, over: false},
        {text: "⮟ " + cfg.aa, al: "left", x: 670, y: 400, w: 128, h: 24, over: false, type: "drop", source: cfg.aaList},
        {text: "back", al: "center", x: canvas.width/2, y: 500, w: 128, h: 24, over: false, click: optMenu}
    ];
    inputMenu.btns = [
        {text: "⮟ " + cfg.dev, al: "left", x: 670, y: 200, w: 128, h: 24, over: false, type: "drop", source: cfg.deviceList},
        {text: "Left", al: "left", x: 300, y: 300, w: 128, h: 24, over: false, type: "key", source: "left"},
        {text: cfg.input[0].key, al: "center", x: 270, y: 300, w: 32, h: 32, over: false, font: "32px eightbit", type: "key", source: "left"},
        {text: "Right", al: "left", x: 720, y: 300, w: 128, h: 24, over: false, type: "key", source: "right"},
        {text: cfg.input[1].key, al: "center", x: 690, y: 300, w: 32, h: 32, over: false, font: "32px eightbit", type: "key", source: "right"},
        {text: "Jump", al: "left", x: 300, y: 350, w: 128, h: 24, over: false, type: "key", source: "jump"},
        {text: cfg.input[2].key, al: "center", x: 270, y: 350, w: 32, h: 32, over: false, font: "32px eightbit", type: "key", source: "jump"},
        {text: "Slide", al: "left", x: 720, y: 350, w: 128, h: 24, over: false, type: "key", source: "slide"},
        {text: cfg.input[3].key, al: "center", x: 690, y: 350, w: 32, h: 32, over: false, font: "32px eightbit", type: "key", source: "slide"},
        {text: "Grapple", al: "left", x: 300, y: 400, w: 128, h: 24, over: false, type: "key", source: "grapple"},
        {text: cfg.input[4].key, al: "center", x: 270, y: 400, w: 32, h: 32, over: false, font: "32px eightbit", type: "key", source: "grapple"},
        {text: "OVRDRV", al: "left", x: 720, y: 400, w: 128, h: 24, over: false, type: "key", source: "ovrdrv"},
        {text: cfg.input[5].key, al: "center", x: 690, y: 400, w: 32, h: 32, over: false, font: "32px eightbit", type: "key", source: "ovrdrv"},
        {text: "back", al: "center", x: canvas.width/2, y: 500, w: 128, h: 24, over: false, click: optMenu}
    ];
    pauseMenu.btns = [
        {text: "play", al: "center", x: canvas.width/2, y: 400, w: 128, h: 24, over: false, click: saveState},
        {text: "settings", al: "center", x: canvas.width/2, y: 450, w: 128, h: 24, over: false, click: optMenu},
        {text: "main menu", al: "center", x: canvas.width/2, y: 500, w: 128, h: 24, over: false, click: mainMenu}
    ],
    resultScrn.btns = [
        {text: "CONTINUE", al: "left", x: 800, y: 600, w: 128, h: 24, over: false, click: saveGame, font: "42px eightbit"}
    ],
    newGame.btns = [
        {al: "left", x: 240, y: 607, w: 138, h: 108, over: false, click: shop}
    ]
}

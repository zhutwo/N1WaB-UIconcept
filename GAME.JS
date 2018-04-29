function shop()
{
    alert("Under renovations!");
}

var newGame = {
    new: true,
    cash: 100000,
    fans: 50000,
    chart: 200,
    timer: 0,
    amps: [],
    guitars: [],
    fx: [],
    shop:
    {
        amps: [],
        guitars: [],
        fx: []
    },
    venues: {
        msg: {
            done: false
        }
    },
    init: function()
    {
        this.new = false;
        stage.style.backgroundImage = mapBG;
        gameState = newGame;
        nyc.load();
        lax.load();
        tex.load();
        dc.load();
        spfld.load();
    },
    render: function()
    {
        surface.clearRect(0, 0, canvas.width, canvas.height);
        surface.font = "24px eightbit";
        surface.fillStyle = "white";
        surface.textAlign = "left";
        surface.shadowBlur = 0;
        surface.fillText("CASH: c" + this.cash, 40.5, 466.5);
        surface.fillText("FANS: " + this.fans, 40.5, 528.5);
        surface.fillText("CHART POS: " + this.chart, 40.5, 590.5);
        if (this.timer == 5 || this.timer == 6 || this.timer == 7 || this.timer == 13 || this.timer == 14|| this.timer > 100)
            surface.drawImage(neonOff, 240, 500);
        else
            surface.drawImage(neonOn, 240, 500);
    },
    hover: function(venue)
    {
        surface.globalAlpha = 0.8;
        surface.fillStyle = "black";
        surface.fillRect(venue.mapData.x, venue.mapData.y - 25, 204, 178);
        surface.globalAlpha = 1.0;
        surface.fillStyle = "white";
        surface.strokeStyle = "white";
        surface.beginPath();
        surface.rect(venue.mapData.x, venue.mapData.y - 25, 204, 178);
        surface.stroke();
        surface.shadowColor = "white";
        surface.shadowBlur = 10;
        surface.font = "32px eightbit";
        surface.fillText(venue.city, venue.mapData.x + 10, venue.mapData.y);
        surface.font = "24px eightbit";
        surface.fillText(venue.name, venue.mapData.x + 10, venue.mapData.y + 20);
        surface.fillText("Difficulty: " + venue.difficulty, venue.mapData.x + 10, venue.mapData.y + 50);
        surface.fillText("Audience: " + venue.audience, venue.mapData.x + 10, venue.mapData.y + 70);
        surface.fillText("Payout: " + venue.pay, venue.mapData.x + 10, venue.mapData.y + 90);
        surface.fillText("Required Fanbase:", venue.mapData.x + 10, venue.mapData.y + 120);
        surface.fillText(venue.reqFans, venue.mapData.x + 10, venue.mapData.y + 140);
    },
    update: function()
    {
        if (activeKey !== null)
        {
            switch (activeKey)
            {
                case mainGame.input.pause:
                mainMenu.init();
                break;
            }
            activeKey = null;
        }
        if (this.timer == 120)
            this.timer = 0;
        this.timer++;
        checkButtons();
        if (dropMenu.active)
            dropMenu.check();
        this.render();
        surface.shadowBlur = 0;
        renderBtns();
        if (dropMenu.active)
            dropMenu.render();
        for (var i = 0; i < this.btns.length; i++)
        {
            if (this.btns[i].over && this.btns[i].click != shop)
            {
                this.hover(this.btns[i].click);
            }
        }
    }
};

var mainGame = {
    first: true,
    pay: 0,
    ovrdrv: false,
    fans: 0,
    gain: 1,
    power: 100,
    tubes: 4,
    streak: 0,
    timer: 0,
    totalNotes: 0,
    hitNotes: 0,
    longestStreak: 0,
    input: {
        hit: 49,
        miss: 50,
        dmg: 51,
        ovrdrv: 52,
        pass: 53,
        fail: 54,
        pause: 27
    },
    Sprite: function(src)
    {
        this.img = new Image();
        this.img.src = "img/"+src+".png";
    },
    init: function(venue)
    {
        gameState = mainGame;
        this.venue = venue;
        stage.style.backgroundImage = gameBG;
        surface.shadowBlur = 0;
        if (this.first)
        {
            this.ovrdrv = false;
            this.fans = 0;
            this.gain = 1;
            this.power = 100;
            this.tubes = 4;
            this.streak = 0;
            this.timer = 0;
        }
        if (this.first)
        {
            alert("This is a UI demo and game concept presentation.\nNo actual gameplay is present.\n\nControls:\n\n1 - Hit Note\n2 - Miss Note\n3 - Take Damage\n4 - Use OVRDRV\n5 - Pass Level\n6 - Fail Stage\nEsc - Pause Menu");
            this.first = false;
        }
    },
    render: function()
    {
        surface.clearRect(0, 0, canvas.width, canvas.height);
        surface.font = "32px eightbit";
        surface.fillStyle = "white";
        surface.textAlign = "left";
        surface.fillText("+" + this.fans, 55.5, 390.5);
        for (i = 0; i < this.tubes; i++)
        {
            surface.drawImage(this.tubelit.img, 420 + i * 50, 520);
        }
        for (i = 4; i > this.tubes; i--)
        {
            surface.drawImage(this.tubedim.img, 370 + i * 50, 520);
        }
        surface.drawImage(this.head.img, 360, 496);

        surface.shadowColor = "#3b00ff";
        surface.shadowBlur = 100;
        if (this.timer > 140)
            surface.globalAlpha = (150-this.timer)/10;
        else
            surface.globalAlpha = this.timer/140;
        surface.drawImage(this.flash.img, 310, 460);
        surface.shadowBlur = 0;
        surface.globalAlpha = 1;
        surface.save();
        surface.translate(120, 566);
        surface.rotate(((this.gain-1)/11)*2*Math.PI);
        surface.drawImage(this.knob.img, -41, -41);
        surface.restore();
        surface.save();
        surface.translate(900, 619);
        surface.rotate((0.8*this.power-40)*Math.PI/180);
        surface.drawImage(this.dial.img, -2, -82);
        surface.restore();
    },
    update: function()
    {
        if (this.streak > this.longestStreak)
        {
            this.longestStreak = this.streak;
        }
        if (this.streak >= 100)
            this.gain = 11;
        else if (this.streak >= 90)
            this.gain = 10;
        else if (this.streak >= 80)
            this.gain = 9;
        else if (this.streak >= 70)
            this.gain = 8;
        else if (this.streak >= 60)
            this.gain = 7;
        else if (this.streak >= 50)
            this.gain = 6;
        else if (this.streak >= 40)
            this.gain = 5;
        else if (this.streak >= 30)
            this.gain = 4;
        else if (this.streak >= 20)
            this.gain = 3;
        else if (this.streak >= 10)
            this.gain = 2;
        else
            this.gain = 1;
        if (activeKey !== null)
        {
            switch (activeKey)
            {
                case this.input.hit:
                this.streak++;
                this.hitNotes++;
                this.totalNotes++;
                if (this.fans <= 9999999)
                    this.fans += 5 * this.gain;
                break;
                case this.input.miss:
                this.gain = 1;
                this.streak = 0;
                this.totalNotes++;
                break;
                case this.input.dmg:
                this.power -= 10;
                break;
                case this.input.ovrdrv:
                if (this.tubes > 0 && !this.ovrdrv)
                {
                    this.ovrdrv = true;
                    this.timer = 150;
                    this.tubes--;
                }
                break;
                case this.input.pause:
                saveState = gameState;
                pauseMenu.init();
                break;
                case this.input.pass:
                resultScrn.init(true, this.hitNotes, this.totalNotes, this.longestStreak, this.fans, this.pay);
                break;
                case this.input.fail:
                resultScrn.init(false, this.hitNotes, this.totalNotes, this.longestStreak, 0, 0);
                break;
            }
            activeKey = null;
        }
        if (this.ovrdrv)
        {
            this.timer--;
            this.gain = 11;
            this.power = 100;
            if (this.timer == 0)
            {
                this.ovrdrv = false;
            }
        }
        if (this.power <= 0)
        {
            resultScrn.init(false, this.hitNotes, this.totalNotes, this.longestStreak, 0, 0);
        }
        this.render();
    }
};
mainGame.head = new mainGame.Sprite("head");
mainGame.tubelit = new mainGame.Sprite("tubelit");
mainGame.tubedim = new mainGame.Sprite("tubedim");
mainGame.knob = new mainGame.Sprite("knob");
mainGame.flash = new mainGame.Sprite("flash");
mainGame.dial = new mainGame.Sprite("dial");

var resultScrn = {
    pass: false,
    pay: 50000,
    fans: 0,
    hitNotes: 0,
    totalNotes: 0,
    longestStreak: 0,
    init: function(pass, hit, total, streak, fans, pay)
    {
        if (pass)
        {
            newGame.chart -= 5;
            this.pass = true;
        }
        this.pay = pay;
        this.fans = fans;
        this.hitNotes = hit;
        this.totalNotes = total;
        this.longestStreak = streak;
        newGame.fans += this.fans;
        newGame.cash += this.pay*0.88;
        newGame.chart += 5;
        gameState = resultScrn;
        stage.style.backgroundImage = stageBG;
    },
    render: function()
    {
        surface.clearRect(0, 0, canvas.width, canvas.height);
        surface.font = "32px eightbit";
        surface.textAlign = "center";
        surface.fillStyle = "white";
        surface.shadowColor = "white";
        surface.shadowBlur = 10;
        surface.fillText("Notes Hit: "+this.hitNotes+"/"+this.totalNotes+" ("+(100*this.hitNotes/this.totalNotes)+"%)", canvas.width/2, 220);
        surface.fillText("Longest Streak: "+this.longestStreak, canvas.width/2, 260);
        surface.fillText("Fans Gained: +"+this.fans, canvas.width/2, 300);
        surface.fillText("Payout: c"+this.pay, canvas.width/2, 360);
        if (this.pass)
        {
            surface.font = "italic 32px eightbit";
            surface.fillText("Hotel Trashed: -c"+this.pay*0.1, canvas.width/2, 400);
            surface.fillText("Afterparty Tab: -c"+this.pay*0.02, canvas.width/2, 440);
        }
        surface.font = "32px eightbit";
        surface.fillText("Cash Pocketed: c"+this.pay*0.88, canvas.width/2, 480);
        if (this.pass)
            surface.fillText("Chart Position: "+(newGame.chart-5)+"(⭡5)", canvas.width/2, 540);
        else
            surface.fillText("Chart Position: "+(newGame.chart+5)+"(⭣5)", canvas.width/2, 540);
        surface.font = "italic 24px eightbit";
        surface.textAlign = "left";
        surface.fillText("Saving...", 800, 570);
        surface.fillStyle = "yellow";
    },
    update: function()
    {
        checkButtons();
        this.render();
        renderBtns();
    }
};

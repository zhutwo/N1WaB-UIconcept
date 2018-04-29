const fps = 30;
const fpsMS = 1/fps*1000;

var stage = document.getElementById("stage");
var canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 640;
var surface = canvas.getContext("2d");

var splash1 = new Image();
var splash2 = new Image();
splash1.src = "img/BNS.png";
splash2.src = "img/HGS.png";

var starOnBig = new Image();
var starOffBig = new Image();
var starOnSm = new Image();
var starOffSm = new Image();
var neonOn = new Image();
var neonOff = new Image();
starOnBig.src = "img/starOnBig.png";
starOffBig.src = "img/starOffBig.png";
starOnSm.src = "img/starOnSm.png";
starOffSm.src = "img/starOffSm.png";
neonOn.src = "img/NeonOn.png";
neonOff.src = "img/NeonOff.png";

menuBG = "url(img/menuBG.gif)";
mapBG = "url(img/mapBG.png)";
stageBG = "url(img/stageBG.png)";
gameBG = "url(img/gameBG.png)";

var mouse = {x:0, y:0};
var mousehold = false;
var activeKey = null;
var gameState;
var saveState;
var lastState;

var cfg =
{
    waitNewKey: false,
    toRemap: null,
    remapText: "Click to remap...",
    waitText: "Waiting for input...",
    dev: "Keyboard",
    deviceList: ["Keyboard", "Gamepad", "Race Wheel", "Power Glove"],
    input:
    [
        {name: "left", key: "A"},
        {name: "right", key: "D"},
        {name: "jump", key: "W"},
        {name: "slide", key: "S"},
        {name: "grapple", key: "Q"},
        {name: "ovrdrv", key: "E"}
    ],
    res: "640 x 480",
    resList: ["640 x 480", "320 x 240", "320 x 200", "240 x 160"],
    gq: "Medium",
    gqList: ["Medium", "Low", "1992", "1988"],
    pe: "Very High",
    peList: ["Epileptic", "Very High", "High", "Medium"],
    lq: "Glam",
    lqList: ["Psychadelic", "Glam", "Punk", "Goth"],
    aa: "1x",
    aaList: ["You", "must", "be", "joking."],
    vol: [{type: "music", data: 0}, {type: "sound", data: 0}, {type: "swears", data: 0}],
    remap: function(source)
    {
        this.waitNewKey = true;
        activeKey = null;
        toRemap = source;
    }
};

window.onload = start;

function debug()
{
    console.log("!");
}

function back()
{
    lastState.init();
}

function saveGame()
{
    loadGame = newGame;
    newGame.init();
}

function exit()
{
    location.reload();
}

function start()
{
    loadBtns();
    splashScrn.init();
    setInterval(update, fpsMS);
}

function update()
{
    gameState.update();
}

function renderBtns()
{
    for (var i = 0; i < gameState.btns.length; i++)
    {
        if (gameState.btns[i].glow == false)
        {
            surface.shadowBlur = 0;
        }
        else
        {
            if (gameState.btns[i].over)
            {
                surface.shadowColor = "white";
                surface.shadowBlur = 20;
            }
            else
            {
                surface.shadowColor = "white";
                surface.shadowBlur = 10;
            }
        }
        surface.font = (gameState.btns[i].font === undefined) ? "24px eightbit" : gameState.btns[i].font;
        surface.textAlign = gameState.btns[i].al;
        if (gameState.btns[i].img !== undefined)
            surface.drawImage(gameState.btns[i].img, gameState.btns[i].x, gameState.btns[i].y - gameState.btns[i].h);
        else if (gameState.btns[i].text !== undefined)
            surface.fillText(gameState.btns[i].text, gameState.btns[i].x, gameState.btns[i].y);
    }
}

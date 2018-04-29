/*

var guitars = [
  {name: "Startercaster", price: 0, stat: "First 10 missed notes are free.", text: "Come on, he's just a kid."},
  {name: "Twangmaster", price: 2000, stat: "Increased grapple range.", text: "Lasso like a rodeo clown."},
  {name: "Lester B Goode", price: 5000, stat: "Move slower, hit harder.", text: "Chiro visits sold separately."},
  {name: "Mile-High Club", price: 5000, stat: "Hold jump to glide.", text: "I'm flying Jack!"},
  {name: "Warcraft", price: 6000, stat: "Enemies bleed on contact.", text: "Give peace a chance."},
  {name: "Magma5150", price: 10000, stat: "Gain 10 fans every time you jump.", text: "Might as well jump."},
  {name: "Bass", price: 500, stat: "Too heavy to jump.", text: "Why would you buy this?"}
];

var amps = [
  {name: "Prince", price: 0, stat: "", text: "Just can't wait to be king."},
  {name: "Voxhaul", price: 1000, stat: "", text: ""},
  {name: "Tweed", price: 2000, stat: "", text: ""},
  {name: "Platemail", price: 5000, stat: "Take no damage for 20s.", text: ""},
  {name: "Stack", price: 10000, stat: "", text: ""}
];

var fx = [
  {name: "Fuzz", price: 500, stat: "Lose less energy for missed notes.", text: ""},
  {name: "Delay", price: 500, stat: "Gain a decoy that follows you.", text: ""},
  {name: "Chorus", price: 1000, stat: "", text: ""},
  {name: "Phaser", price: 1000, stat: "", text: ""},
  {name: "Wah", price: 2000, stat: "", text: ""},
  {name: "Screamer", price: 5000, stat: "", text: ""}
];

*/

function Venue (city, name, audience, reqFans, pay, difficulty, x, y)
{
    this.city = city;
    this.name = name;
    this.audience = audience;
    this.reqFans = reqFans;
    this.pay = pay;
    this.difficulty = difficulty;
    this.cleared = false;
    this.init = function()
    {
        if (this.canPlay)
        {
            mainGame.init(this);
        }
    };
    this.mapData = {al: "left", w: 66, h: 66, x: x, y: y, over: false, glow: false, click: this};
    this.load = function()
    {
        this.reqCheck();
        if (this.audience < 10000)
        {
            if (this.canPlay)
            {
                this.mapData.img = starOnSm;
            }
            else
            {
                this.mapData.img = starOffSm;
            }
        }
        else
        {
            if (this.canPlay)
            {
                this.mapData.img = starOnBig;
            }
            else
            {
                this.mapData.img = starOffBig;
            }
        }
        newGame.btns.push(this.mapData);
    };
    this.reqCheck = function()
    {
        if (!this.cleared && newGame.fans >= this.reqFans)
        {
            this.canPlay = true;
        }
        else
        {
            this.canPlay = false;
        }
    };
};

var nyc = new Venue("New York City", "Madison Sq Garden", 40000, 500000, 1000000, "Hard", 816, 285);
var lax = new Venue("Hollywood", "Sunset Strip", 5000, 50000, 20000, "Medium", 160, 380);
var tex = new Venue("Austin", "City Limits", 10000, 200000, 50000, "Hard", 480, 480);
var dc = new Venue("Washington DC", "The Capitol", 4000, 45000, 10000, "Easy", 800, 360);
var spfld = new Venue("Springfield", "Flaming Moe's", 500, 10000, 2000, "Easy", 600, 300);

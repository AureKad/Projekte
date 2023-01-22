var passive = 0; //passive Income
var coolStuff = 0; //ressource
var ticks = 60;

setInterval(update, 1000/ticks);

function manual() {
    coolStuff +=1;
    paint();
}

function buy(collectorID) {
    col = getCollector(collectorID)
    if (col.cost<=coolStuff) {
        col.amount+=1;
        coolStuff -= col.cost;
        col.cost = Math.round(col.cost**1.1);
        updatePassive(collectorID);
        updateCollector(collectorID);
    }
} 

function upgrade(collectorID, upgrade, htmlElemID) {
    col = getCollector(collectorID);
    if (col.upgrades[upgrade][0]<=coolStuff && col.upgrades[upgrade][2]==0) {
        col.oneProd = col.oneProd*col.upgrades[upgrade][1];
        coolStuff-= col.upgrades[upgrade][0]
        col.upgrades[upgrade][2]=1;

        document.getElementById(htmlElemID).setAttribute("class", "down");
        updatePassive(collectorID);
        updateCollector(collectorID);    
    }
}

function getCollector(collectorID) {
    switch (collectorID) {
        case 0:
            return coolGuy;
        case 1: 
            return farmer;
        case 2:
            return salesman;
    }
}

function update() {
    coolStuff += passive;
    paint();
}

function paint() {
    document.getElementById("ngu").innerHTML = parseInt(coolStuff);
}


function updateCollector(collector) {
    switch (collector) {
        case 0: 
            document.getElementById("coolGuy__prod").innerHTML = parseFloat((coolGuy.prod*ticks).toFixed(2)) + "/s" 
            document.getElementById("coolGuy__cost").innerHTML = "For " +coolGuy.cost + " Cool Stuff";
            document.getElementById("coolGuy__amount").innerHTML = "You have: " + coolGuy.amount + " Cool Guy(s)";
            break;
        case 1: 
            document.getElementById("farmer__prod").innerHTML = parseFloat((farmer.prod*ticks).toFixed(2)) + "/s" 
            document.getElementById("farmer__cost").innerHTML = "For " +farmer.cost + " Cool Stuff";
            document.getElementById("farmer__amount").innerHTML = "You have: " + farmer.amount + " Farm Boi(s)";
            break;
        case 2:
            document.getElementById("salesman__prod").innerHTML = parseFloat((salesman.prod*ticks).toFixed(2)) + "/s" 
            document.getElementById("salesman__cost").innerHTML = "For " +salesman.cost + " Cool Stuff";
            document.getElementById("salesman__amount").innerHTML = "You have: " + salesman.amount + " Sales Men";
            break;
    }
}

function updatePassive(collectorID) {
    col = getCollector(collectorID);
    passive -= col.prod;
    col.prod = col.amount * col.oneProd /ticks;
    passive +=col.prod;
}

class Collector {
    constructor(id, cost, oneProd, upgrades) {
        this.id = id;
        this.amount = 0;
        this.cost = cost;
        this.prod = 0;
        this.oneProd = oneProd;
        this.upgrades = upgrades; //upgrades 2d-array (cost, multiplier, already bought)
    }
}
const coolGuy = new Collector(0,10,1, [[50,2,0],[100,2,0],[500,10,0]]); 
const farmer = new Collector(1,100,5,[[200,2,0],[1000,2,0],[5000,10,0]]);
const salesman = new Collector(2,1000,20,[[5000,2,0],[20000,4,0],[50000,8,0]])




var c = document.getElementById("spacegame");
c.width = window.innerWidth*0.4;
c.height = window.innerWidth*0.3
var ctx = c.getContext("2d");
ctx.font = "2rem Arial";
ctx.fillStyle = "white";
ctx.textAlign = "center";
var txt = 'Use AD to move\n\n\n\n Use Space or left mouse\n\n\nto shoot';
var lines = txt.split('\n');
var lineheight = 11;
var x = c.width/2;
var y = c.height/2 - (lines.length-1)*lineheight/2;

for (var i = 0; i<lines.length; i++)
    ctx.fillText(lines[i], x, y + (i*lineheight) );


function resizeCanvas() {
}
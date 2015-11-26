/**
 * Created by Wukai on 2015/11/24.
 */


var canvas = document.getElementById("drawing");
var context = canvas.getContext("2d");
/* Disable default right click on canvas */
canvas.oncontextmenu = function() { return false};

var gridWidth, gridHeight;
var towers = [];
var monsters = [];
var size = 10;      // how many columns and rows
var towerCosts = [40, 200, 1000, 10];

var playerHealth = 10;

var ingameXSelect = 0;
var ingameYSelect = 0;
var ctower = false;
var count = 0;

init();
requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000/30);

            };
    })();
 requestAnimFrame(draw);

function init() {
    // calculate grid size by canvas's size and cols/rows num
    gridWidth = Math.floor((canvas.width -size) / size);
    gridHeight = Math.floor((canvas.width -size) / size);

    controlsUpdate();

    document.getElementById("cTower1Bt").value = "Place laser tower(" + numberFormat(towerCosts[0]) + ")";
    document.getElementById("cTower2Bt").value = "Place AOE tower(" + numberFormat(towerCosts[1]) + ")";
    document.getElementById("cTower3Bt").value = "Place slow tower(" + numberFormat(towerCosts[2]) + ")";
    document.getElementById("cTower4Bt").value = "Place wall(" + numberFormat(towerCosts[3]) + ")";

    generatePath();
}

function draw() {
    requestAnimFrame(draw);
    if (playerHealth <= 0) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    //alert();
    context.globalAlpha = 1;

    // TODO: Draw the path
    context.fillStyle = "#f00";

    // If you select a tower, fill the grid where mouse is
    if (ctower) {
        context.fillStyle = "#1fa";
        context.fillRect(ingameXSelect * (gridWidth+1), ingameYSelect * (gridHeight + 1), gridWidth, gridHeight );
    }



    context.strokeStyle = "#000";
    context.lineWidth = 1;
    context.beginPath();
    // Draw vertical lines
    for (var i = 0; i < 11; i++) {
        context.moveTo(i * (gridWidth + 1), 0);
        context.lineTo(i * (gridWidth + 1), canvas.height);
    }
    context.stroke();

    // Draw horizontal lines
    for (i = 0; i < 11; i++) {
        context.moveTo(0, i * gridWidth + i);
        context.lineTo(canvas.width, i * gridWidth + i);
    }
    context.stroke();

    count++;

    /* Draw towers */
    for (i = 0; i < towers.length; i++) {
        towers[i].draw();
    }
}

function mouseDown(e) {
    if (playerHealth <= 0) return;
    var mouseX, mouseY;

    if (ctower) {
        if (e.button == 2) {
            ctower = false;
            return false;
        }

        switch (towerType) {
            case 4:
                towers.push(new wallTower(ingameXSelect, ingameYSelect));
                // ctower = false;
                break;
        }

    }
    return false;
}

function sell() {

}

function mouseMove(e) {
    var mouseX, mouseY;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }

    // Calculate which grid mouse is in
    ingameXSelect = Math.floor(mouseX / (gridWidth+1));
    // console.log(mouseX, gridWidth, ingameXSelect);
    ingameYSelect = Math.floor(mouseY / (gridHeight+1));


}

function upgrade() {

}

function controlsUpdate() {
    document.getElementById("cTower4Bt").disabled = false;
}

function restart() {

}


/** Format the number, add ',' every 3 digits **/
function numberFormat(val) {
    string = '' + val;

    var regex = /^([0-9]+)([0-9]{3})/;
    while (regex.test(string)) {
        string = string.replace(regex, '$1, $2');
    }
}

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.equals = function(p) {
        if (p == null) return false;
        else return p.x == this.x && p.y == this.y;
    }
}

function VisPoint(x, y) {
    this.from = null;
    this.loc = new Point(x, y);
}

var directions;

function calculatePath(startPoint, endPoint, obstacles) {

}

var path;
function generatePath() {

}

document.onkeydown = function(e) {

};

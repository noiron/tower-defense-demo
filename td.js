/**
 * Created by Wukai on 2015/11/24.
 */


var canvas = document.getElementById("drawing");
var context = canvas.getContext("2d");


var gridWidth, gridHeight;
var towers = [];
var monsters = [];
var size = 10;      // how many columns and rows
var towerCosts = [40, 200, 1000, 10];

var playerHealth = 10;

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

function snowParticle(dir, x, y) {

}

function wallTower(x, y) {

}

function slowTower(x, y) {

}

function aoeTower(x, y) {

}

function laserTower(x, y) {

}

function monster(level) {

}

function draw() {
    requestAnimFrame(draw);
    if (playerHealth <= 0) return;
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.globalAlpha = 1;
    context.fillStyle = "#aaaaaa";

    context.strokeStyle = "#000";
    context.lineWidth = 1;
    context.beginPath();

    // Draw vertical lines
    for (var i = 0; i < 21; i++) {
        context.moveTo(i * gridWidth + i, 0);
        context.lineTo(i * gridWidth + i, canvas.height);
    }
    context.stroke();

    // Draw horizontal lines
    for (i = 0; i < 21; i++) {
        context.moveTo(0, i * gridWidth + i);
        context.lineTo(canvas.width, i * gridWidth + i);
    }
    context.stroke();
}

//draw();

function mouseDown(e) {

}

function sell() {

}

function mouseMove(e) {
    var mouseX, mouseY;
}

function upgrade() {

}

function controlsUpdate() {

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

}

function VisPoint(x, y) {

}

var directions;

function calculatePath(startPoint, endPoint, obstacles) {

}

var path;
function generatePath() {

}

document.onkeydown = function(e) {

};
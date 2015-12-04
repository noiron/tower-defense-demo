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

var xGrid = 0;
var yGrid = 0;
var ctower = false;
var count = 0;

var entrance = [0, 0];
var exit = [size-1, size-1];
var map = new Graph(size, size);
var initWalls = [[1, 1],[1, 2],[1, 4],[1, 5],[1, 6],[1, 7],[1, 8],
    [3, 9],[3, 8],[3, 7],[3, 6],[3, 5],[3, 4],[3, 3],[2, 0],[3, 2],
    [5, 7],[5, 8],[7, 9],[7, 8],[7, 0], [7, 1],[7, 2],[9, 5],[8, 5],
    [7, 5],[6, 5],[1, 3],[5, 4]];

for (var i = 0; i < initWalls.length; i++) {
    map.walls.push(initWalls[i]);
    towers.push(new WallTower(initWalls[i][0], initWalls[i][1]));
}

var path;
var searchMap = new BreadthFirstSearch(map, exit);
var monsterDelay = 0;


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
    context.globalAlpha = 1;

    generatePath();
    drawPath(path);

    if (monsterDelay-- <= 0) {
        monsterDelay = 100;

        monsters.push(new Monster(1));  // create a new monster
    }

    for (var i  = 0; i < monsters.length; i++) {
        monsters[i].draw();
        if(!monsters[i].update()) {
            monsters.splice(i, 1);
        }
    }

    // If you select a tower, fill the grid where mouse is
    if (ctower) {
        context.fillStyle = "#1fa";
        context.fillRect(xGrid * (gridWidth+1), yGrid * (gridHeight + 1), gridWidth, gridHeight );
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

    for(var i = 0; i < towers.length; i++) {
        if (towers[i].x == xGrid && towers[i].y == yGrid) {
            towers[i].selected = true;
            controlsUpdate();
            ctower = false;
        } else {
            towers[i].selected = false;
        }
    }


    if (ctower) {
        if (e.button == 2) {
            ctower = false;
            return false;
        }

        switch (towerType) {
            case 4:
                towers.push(new WallTower(xGrid, yGrid));
                if (!map.walls.hasArray([xGrid, yGrid])) {
                    map.walls.push([xGrid, yGrid]);
                }
                // ctower = false;
                break;
        }
    }
    return false;
}

function sell() {
    for (var i = 0; i < towers.length; i++) {
        if (towers[i].selected) {
            // TODO: Gold++

            map.walls.removeArray([towers[i].x, towers[i].y]);
            towers.splice(i, 1);

            generatePath();
            controlsUpdate();
            break;
        }
    }
}

function mouseMove(e) {
    var mouseX, mouseY;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }

    // Calculate which grid mouse is in
    xGrid = Math.floor(mouseX / (gridWidth+1));
    yGrid = Math.floor(mouseY / (gridHeight+1));

}

function upgrade() {

}

function controlsUpdate() {
    document.getElementById('sellbutton').disabled = true;
    document.getElementById("cTower4Bt").disabled = false;
    for (var i = 0; i < towers.length; i++) {
        if (towers[i].selected) {
            document.getElementById("sellbutton").disabled = false;
            break;
        }
    }
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

function generatePath() {
    searchMap = new BreadthFirstSearch(map, exit);
    path = searchMap.findPath(entrance);
}

function drawPath(path) {

    for (i = 0; i < path.length; i++) {
        fillGrid(path[i][0], path[i][1], "#98fb98");
    }

}

function fillGrid(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * (gridWidth+1), y * (gridHeight + 1), gridWidth, gridHeight);
}
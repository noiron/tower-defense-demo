function Monster(level) {
    this.level = level;
    this.index = 0;
    this.path = searchMap.findPath(entrance);
    this.a = this.path[0];
    this.slowDuration = 0;
    this.x = this.a[0];
    this.y = this.a[1];

    this.speed = 0.4;

    this.getXCenter = function(x) {
        return x * gridWidth + x + gridWidth / 2 + 0.5;
    };
    this.getYCenter = function(y) {
        return y * gridHeight + y + gridHeight / 2 + 0.5;
    };

    this.xPos = this.getXCenter(this.x);
    this.yPos = this.getYCenter(this.y);

    this.hp = Math.pow(1.20, this.level - 1) * 5.5 + 50 * this.level;
    this.maxhp = this.hp;

    var currentGrid = [];
    var nextGrid = [];
    var proportion = 0;

    this.draw = function() {
        context.save();
        context.translate(this.xPos, this.yPos);
        context.fillStyle = "#0aa";
        context.beginPath();
        context.arc(0, 0, Math.floor(Math.min(gridWidth, gridHeight) * 0.2), 0, Math.PI*2, false);
        context.fill();

        // TODO:
        // if (this.hp < this.maxhp) {}
        context.restore();
    };

    this.update = function() {
        if (this.hp <= 0) {
            // TODO: Update gold and controls
            return false;
        }

        currentGrid = this.path[0];
        nextGrid = this.path[1];

        var dx = this.getXCenter(nextGrid[0]) - this.getXCenter(currentGrid[0]);
        var dy = this.getXCenter(nextGrid[1]) - this.getXCenter(currentGrid[1]);
        var dis = Math.abs(dx) + Math.abs(dy);

        if (proportion < 1) {
            proportion += this.speed / dis;
        } else {
            proportion = 0;

            this.x = this.path[1][0];
            this.y = this.path[1][1];
            this.xPos = this.getXCenter(this.x);
            this.yPos = this.getYCenter(this.y);
            this.path = searchMap.findPath(this.path[1]);
        }

        if (map.walls.hasArray(nextGrid)) {
            this.path = searchMap.findPath(this.path[0]);
        } else {
            this.xPos = this.getXCenter(this.x) + dx * proportion;
            this.yPos = this.getYCenter(this.y) + dy * proportion;
        }
        if (this.x === exit[0] && this.y === exit[1]) {
            this.hp = 0;
        }

        return true;

    };

}
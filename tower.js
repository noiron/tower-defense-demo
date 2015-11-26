function snowParticle(dir, x, y) {

}

function wallTower(x, y) {
    this.selected = false;

    this.x = x;
    this.y = y;
    this.getXCenter = function() {
        return this.x * gridWidth + this.x + gridWidth / 2 + 0.5;
    };
    this.getYCenter = function() {
        return this.y * gridHeight + this.y + gridHeight / 2 + 0.5;
    };

    this.getSellValue = function() { return 0; };

    this.draw = function() {
        context.save();
        context.translate(Math.floor(this.getXCenter()), Math.floor(this.getYCenter()));

        if (this.selected) {
            // If this tower is selected, draw rect around it
            // TODO:
        }

        context.fillStyle = "#222";
        context.fillRect(-0.4 * gridWidth, -0.4 * gridHeight, 0.8 * gridWidth, 0.8 * gridHeight);

        context.restore();
    }
}

function slowTower(x, y) {

}

function aoeTower(x, y) {

}

function laserTower(x, y) {

}

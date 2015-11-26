function monster(level) {
    this.level = level;
    this.index = 0;
    this.a = path[0];
    this.slowDuration = 0;
    this.x = this.a.x;
    this.y = this.a.y;
    this.xoffset = Math.floor((2*Math.random()-1)*0.6*(gridWidth/2));
    this.yoffset = Math.floor((2*Math.random()-1)*0.6*(gridHeight/2));

    this.hp = Math.pow(1.20, this.level - 1) * 5.5 + 50 * this.level;
    this.maxhp = this.hp;

    this.getXCenter = function() {
        return this.x * gridWidth + this.x + gridWidth / 2 + 0.5;
    };
    this.getYCenter = function() {
        return this.y * gridHeight + this.y + gridHeight / 2 + 0.5;
    };

    this.draw = function() {
        context.save();
        context.translate(Math.floor(this.getXCenter()), Math.floor(this.getYCenter()));
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


    }


}
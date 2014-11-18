// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.yValues = [220, 137, 54];
    //sets the initial position for the enemy
    this.setVariables();
}

Enemy.prototype.setVariables = function () {
    this.x = -101;
    this.y = this.yValues[Math.floor(Math.random() * this.yValues.length)];
    this.velocity = Math.floor((Math.random() * 300) + 200);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.velocity * dt);
    this.checkOutOfBounds();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.checkOutOfBounds = function() {
    if (this.x > 404) {
        this.setVariables();
    };
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    //sets the origin position for the player
    this.setToOrigin();
    this.score = 0;
}

Player.prototype.update = function() {
    this.checkOutOfBounds();
    this.collisionDetection(allEnemies);
    this.increaseScore();
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.collisionDetection = function(enemies) {
    for (enemy in enemies) {
        if (enemies[enemy].y == this.y && (Math.abs(enemies[enemy].x - this.x) <= 60)) {
            this.setToOrigin();
        };
    }
}

Player.prototype.setToOrigin = function() {
    this.x = 202;
    this.y = 386;
}

Player.prototype.checkOutOfBounds = function() {
    if (this.x < 0) {
        this.x = 0;
    };

    if (this.x > 404) {
        this.x = 404;
    };

    if (this.y < 54) {
        this.setToOrigin();
    };

    if (this.y > 386) {
        this.y = 386;
    };

}

//handles directional input for the player
Player.prototype.handleInput = function(input) {
    if (input === "left") {
        this.x -= 101;
        console.log(this.x + ", " + this.y);
    };

    if (input === "right") {
        this.x += 101;
        console.log(this.x + ", " + this.y);
    };

    if (input === "up") {
        this.y -= 83;
        console.log(this.x + ", " + this.y);
    };

    if (input === "down") {
        this.y += 83;
        console.log(this.x + ", " + this.y);
    };
}

Player.prototype.increaseScore = function(dt) {
    if (this.y <= 220 && this.y >= 54) {
        this.score += 1;
        ctx.fillText("Score: " + player.score, 5, 40);
        //ctx.fillText(this.score, 5, 40);
    };
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

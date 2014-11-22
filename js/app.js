// Enemies the player must avoid
var Enemy = function() {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';

    //array holds the three possible y values for enemies
    this.yValues = [220, 137, 54];
}

//initializes enemies
Enemy.prototype.init = function () {
    //sets x value
    this.x = -101;
    //randomly chooses one of the three values from yValues
    this.y = this.yValues[Math.floor(Math.random() * this.yValues.length)];
    //randomly sets a velocity between 200 & 300
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

//checks for enemy leaving the screen and reinitializes
Enemy.prototype.checkOutOfBounds = function() {
    if (this.x > 505) {
        this.init();
    };
}

//class for the gem treasures
var Treasure = function() {
    this.sprites = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];
    this.yValues = [220, 137, 54];
    this.xValues = [0, 101, 202, 303, 404];
}

//initializes the treasures with a random sprite and random 
Treasure.prototype.init = function() {
    this.sprite = this.sprites[Math.floor(Math.random() * this.sprites.length)];
    this.x = this.xValues[Math.floor(Math.random() * this.xValues.length)];
    this.y = this.yValues[Math.floor(Math.random() * this.yValues.length)];

}

//render gem
Treasure.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//player class
var Player = function() {
    //array to hold all player sprites
    this.sprites = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png']
}

//initializes the player with a random character sprite, sets to origin point, and sets score to zero
Player.prototype.init = function() {
    this.sprite = this.sprites[Math.floor(Math.random() * this.sprites.length)];
    this.setToOrigin();
    this.score = 0;
}

//player update function
Player.prototype.update = function() {
    this.checkOutOfBounds();
    this.collisionDetection(allEnemies, treasure);
    this.increaseScore();
}

//player render
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//checks player collisions with enemies and gems
Player.prototype.collisionDetection = function(enemies, treasure) {
    for (enemy in enemies) {
        //if player collides with enemies it is reinitialized
        if (enemies[enemy].y == this.y && (Math.abs(enemies[enemy].x - this.x) <= 60)) {
            this.init();
        };
    }

    //checks collision with the treasure and adds 10000 to score
    if (treasure.y == this.y && treasure.x == this.x) {
        this.score += 10000;
        treasure.init();
    };

}

//sets the player back to the origin point
Player.prototype.setToOrigin = function() {
    this.x = 202;
    this.y = 386;   
}

//forces the player sprite back into the screen if it's outside and resets to the origin point if
//it is in the water
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
    if (input === 'left') {
        this.x -= 101;
        console.log(this.x + ', ' + this.y);
    };

    if (input === 'right') {
        this.x += 101;
        console.log(this.x + ', ' + this.y);
    };

    if (input === 'up') {
        this.y -= 83;
        console.log(this.x + ', ' + this.y);
    };

    if (input === 'down') {
        this.y += 83;
        console.log(this.x + ', ' + this.y);
    };
}

//if the player is on the stones then the score is increased
Player.prototype.increaseScore = function(dt) {
    if (this.y <= 220 && this.y >= 54) {
        this.score += 1;
    };
}

//takes a number and creates a corresponding number of enemies
function createEnemies(numEnemies) {
    for (i = 0; i < numEnemies; i++) {
        var enemy = new Enemy();
        enemy.init()
        allEnemies.push(enemy);
    }
}

//initialize game variables
var allEnemies = [];
var treasure = new Treasure();
treasure.init();
var player = new Player();
player.init();

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

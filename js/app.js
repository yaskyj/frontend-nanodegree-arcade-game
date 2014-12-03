/* App.js
 * This file provides the classes and functions
 * for use in the game engine. 
 */

/* This object hold the initial values and attributes
 * for Enemies the player must avoid.
 */
var Enemy = function() {
    /* The sprite for the enemy is initialized.
     */
    this.sprite = 'images/enemy-bug.png';
    /* An array is then initialized to hold the three possible
     * values for the enemies.
     */
    this.yValues = [220, 137, 54];
};

/* Enemy prototype function that sets the initial
 * values for enemies objects.
 */
Enemy.prototype.init = function () {
    /* Sets the enemies x value upon
     * initialization.
     */
    this.x = -101;
    /* Randomly chooses one of the three values
     * from the yValues array created in the Enemy object.
     */
    this.y = this.yValues[Math.floor(Math.random() * this.yValues.length)];
    /* Randomly sets a velocity between 
     * 200 & 300.
     */
    this.velocity = Math.floor((Math.random() * 300) + 200);
};

/* Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks.
 */
Enemy.prototype.update = function(dt) {
    /* You should multiply any movement by the dt parameter
     * which will ensure the game runs at the same speed for
     * all computers.
    */
    this.x += (this.velocity * dt);
    
    /* Call the function which checks
     * the position of the enemy.
    */
    this.checkOutOfBounds();
};

/* Draws the enemy on the screen.
 * This required for the game engine.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Checks the enemy to see if its x value
 * is a bit farther beyond the bounds of the canvas.
 * If it has gone beyond the x value then the init
 * function is called on the enemy.
 */
Enemy.prototype.checkOutOfBounds = function() {
    if (this.x > 505) {
        this.init();
    }
};

/* This object hold the initial values and attributes
 * for Enemies the player must avoid.
 */
var Treasure = function() {
    this.sprites = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];
    this.yValues = [220, 137, 54];
    this.xValues = [0, 101, 202, 303, 404];
};

/* Treasure prototype function that sets the initial
 * values for treasure's attributes.
 */
Treasure.prototype.init = function() {
    /* Treasure prototype function that sets the initial
     * values for treasures objects.
     * A random sprite from the sprites values is chosen.
     * Random x and y values are selected from the yValues
     * and xValues arrays set in the initial object declaration.
     */
    this.sprite = this.sprites[Math.floor(Math.random() * this.sprites.length)];
    this.x = this.xValues[Math.floor(Math.random() * this.xValues.length)];
    this.y = this.yValues[Math.floor(Math.random() * this.yValues.length)];

};

/* Draws the treasure on the screen.
 * This required for the game engine.
 */
Treasure.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* This object hold the initial values and attributes
 * for Player object.
 */
var Player = function() {
    /* The array for all of the player
     * sprites.
     */
    this.sprites = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png']
};

/* Player prototype function that sets the initial
 * values for player's attributes.
 */
 Player.prototype.init = function() {
    /* Player prototype function that sets the initial
     * values for Player objects.
     * A random sprite from the sprites values is chosen.
     * The Player is set to its origin point.
     * The score is reset to 0.
     */
    this.sprite = this.sprites[Math.floor(Math.random() * this.sprites.length)];
    this.setToOrigin();
    this.score = 0;
};

/* Runs the out of bounds, collision dectection
 * and increase score functions.
 */
Player.prototype.update = function() {
    this.checkOutOfBounds();
    this.collisionDetection(allEnemies, treasure);
    this.increaseScore();
};

/* Draws the player on the screen.
 * This required for the game engine.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Checks is the Player object collides with 
 * enemies and gems.
 */
Player.prototype.collisionDetection = function(enemies, treasure) {
    for (enemy in enemies) {
        /* If a collision with the enemy is detected then the Player's init function
         * is run.
        */
        if (enemies[enemy].y == this.y && (Math.abs(enemies[enemy].x - this.x) <= 60)) {
            this.init();
        }
    }

    /* If a collision with the treasure is detected then the Player's 10000
     * is added to the score.
    */
    if (treasure.y == this.y && treasure.x == this.x) {
        this.score += 10000;
        treasure.init();
    }

};

/* Sets the Player back to the origin 
 * point 
 */
Player.prototype.setToOrigin = function() {
    this.x = 202;
    this.y = 386;   
};

/* Forces the player sprite back into the screen if it's outside
 * the canvas area and resets to the Player to the origin point if
 * it is in the water
 */
Player.prototype.checkOutOfBounds = function() {
    if (this.x < 0) {
        this.x = 0;
    }

    if (this.x > 404) {
        this.x = 404;
    }

    if (this.y < 54) {
        this.setToOrigin();
    }

    if (this.y > 386) {
        this.y = 386;
    }

};

/* Handles the directional input from the cursors
 * and moves the the Player in the proper directions.
 */
Player.prototype.handleInput = function(input) {
    if (input === 'left') {
        this.x -= 101;
    }

    if (input === 'right') {
        this.x += 101;
    }

    if (input === 'up') {
        this.y -= 83;
    }

    if (input === 'down') {
        this.y += 83;
    }
};

/* If the player is on the stones then the score 
 * is increased.
 */
Player.prototype.increaseScore = function(dt) {
    if (this.y <= 220 && this.y >= 54) {
        this.score += 1;
    }
};

/* Takes a number and creates a corresponding
 * number of enemies.
 */
function createEnemies(numEnemies) {
    for (i = 0; i < numEnemies; i++) {
        var enemy = new Enemy();
        enemy.init()
        allEnemies.push(enemy);
    }
}

/* Initializes the Enemies array which holds the enemies objects, Treasure object,
 * and the Player object
 */
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

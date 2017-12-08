
// Enemies our player must avoid

var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    //Enemies' random speed -- used Math.random as suggested my forum mentor on discussion forum 
    this.speed = Math.floor((Math.random() * 250) + 100);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //If enemy goes out of canvas,reset position of enemy
    if (this.x > 505) {
        this.x = 0;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';

};
//This is to reset the player's position 
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//This checks for collisions and resets the player position- Collision check function was based on several inputs given by forum mentors and co-students on the 
//discussion forum.
Player.prototype.update = function(dt) {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x && this.y < allEnemies[i].y + 37 && this.y + 37 > allEnemies[i].y) {
            this.reset();
        }
    }

    if (this.y > 400) {
        this.reset();
    }
};

//This enables the player to move left,right,up and down
Player.prototype.handleInput = function(pressedKey) {
    if (pressedKey === "up" && this.y > 0) {
        this.y = this.y - 100;
    } else if (pressedKey === "down" && this.y < 400) {
        this.y = this.y + 100;
    } else if (pressedKey === "left" && this.x > 0) {
        this.x = this.x - 100;
    } else if (pressedKey === "right" && this.x < 400) {
        this.x = this.x + 100;
    }
    //If player reaches water, reset game and update score
    if (this.y < 25) {
        this.reset();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(400, 300), new Enemy(200, 100), new Enemy(100, 200)];
var player = new Player(400, 400);
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

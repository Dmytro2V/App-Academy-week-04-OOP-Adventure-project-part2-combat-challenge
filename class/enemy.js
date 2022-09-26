const {Character} = require('./character');
let time1, time2

class Enemy extends Character {
  constructor(name, description, startingRoom) {
    // Fill this in
    super(name, description, startingRoom)
    this.newCooldown = 3000;
    this.cooldown = this.newCooldown;
    this.attackTarget = null;
  }
  setTarget() {
    this.attackTarget = 6// player;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    // Fill this in
    // first let calc exits
    let room = this.currentRoom
    let roomExits = Object.keys(room.exits);
    let existQuantity = roomExits.length;
    // choose random exit
    let rndIndex = Math.floor(Math.random() * existQuantity)
    let direction = roomExits[rndIndex];
    // move 
    const nextRoom = this.currentRoom.getRoomInDirection(direction);
    this.currentRoom = nextRoom;
    nextRoom.printRoom(this);
    // when enter new room new cooldown
    this.cooldown = this.newCooldown
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    time1 = new Date()
    console.log(0);
    const resetCooldown = function() {
      console.log('starting resetC');
      enemy.cooldown = 0;
      enemy.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    // Fill this in
    this.applyDamage(10)    
    this.cooldown = this.newCooldown;
  }

  applyDamage(amount) {
    // Fill this in
    this.player.health -= amount;
  }



  act() {
    console.log('starting act')
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
       
      this.rest();
    } else {      
      this.scratchNose();
      this.rest();
    }  

    // Fill this in
    
  }


  scratchNose() {
    this.cooldown += 3000;

    this.alert(`${this.name} scratches its nose`);

  }


}

//let enemy = new Enemy('Enemy', 'test enemy', {rooom:'room'})
//console.log(enemy);
//enemy.description = 'test descr'
//enemy.attackTarget = 'newTarget'
//console.log(enemy);
//enemy.rest()
/**************************
 ***************************/
module.exports = {
  Enemy,
};

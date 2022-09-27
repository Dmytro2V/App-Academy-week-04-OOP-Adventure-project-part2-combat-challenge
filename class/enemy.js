const {Character} = require('./character');
//let time1, time2 debug

class Enemy extends Character {
  constructor(name, description, startingRoom) {
    // Fill this in
    super(name, description, startingRoom)
    this.newCooldown = 3000;
    this.cooldown = this.newCooldown;
    this.attackTarget = null;    
    this.isActive = true;
    this.actCounter = 0;
    //this.time0 = new Date() debug
  }
  setTarget() {
    this.attackTarget =  this.player;   

  }

  setPlayer(player) {
    this.player = player;
  }

  randomMove() {
    // Fill this in
    // first let calc exits
    let wasSameRoom = this.currentRoom === this.player.currentRoom
    let room = this.currentRoom
    let roomExits = Object.keys(room.exits);
    let existQuantity = roomExits.length;
    // choose random exit
    let rndIndex = Math.floor(Math.random() * existQuantity)
    let direction = roomExits[rndIndex];
    // move 
    const nextRoom = this.currentRoom.getRoomInDirection(direction);
    this.currentRoom = nextRoom;
    if (wasSameRoom) console.log(`${this.name} leaving room going ${roomExits[rndIndex]}`);
    if (this.currentRoom === this.player.currentRoom) console.log(`${this.name} joining room`);
      // when enter new room new cooldown
      this.cooldown = this.newCooldown
  }

  takeSandwich(sandw = 'sandwich') {
    // Fill this in    
    this.health +=10; // adding to enemy
    console.log(`Oh ${this.name} found ${sandw} He became stronger to +10`);
    //removing from room
    let roomItems = this.currentRoom.items
    //let sandwich = this.currentRoom.getItemByName(sandw)
    this.currentRoom.items = roomItems.filter(roomItem =>roomItem.name !=sandw);  

  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    //let time1 = new Date()
    //console.log('rest time, cooldown', (time1 - this.time0)/1000, this.cooldown/1000);
    const resetCooldown = function() {      
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown.bind(this), this.cooldown);
  }

  attack() {
    // Fill this in
    if (this.currentRoom === this.player.currentRoom) {   
      console.log(`${this.name} attacking ${this.player.name}!!!`); 
      this.player.health -= 10;
      console.log(`${this.player.name} receives -10 hit. ${this.player.name}'s health is now ${this.player.health}`);
      if (this.player.health <= 0) {
        this.player.die();
      }
      this.cooldown = this.newCooldown; // for test
    } else { //different rooms - player is gone
         // no attack
    }
  }

  applyDamage(amount) {
    // Fill this in
    this.health -= amount;
    console.log(`${this.name} receives -10 hit. ${this.name} health is now ${this.health}`);
  }



  act() {    
    //let time1 = new Date() debug
    //    console.log('                   act time, cooldown - ', (time1 - this.time0)/1000, this.cooldown/1000);
    // console.log('act!!!');

    if (this.health <= 0) return // Dead, do nothing;
    
    let isSandwichInRoom = null
    if (this.currentRoom.items.length > 0) { // check if contains sanwich in notime
      //console.log('enemy room has items', this.currentRoom.items ); //debug
      let roomItems = this.currentRoom.items
      let sandwich = this.currentRoom.getItemByName('sandwich')
      //console.log(sandwich);
      if (roomItems.includes(sandwich)) {
        isSandwichInRoom = true        
      }
    }
    
    if (this.cooldown > 0) {            
      
    } else if (isSandwichInRoom) {
      this.takeSandwich();
    } else if (this.actCounter % 6 < 3) {  
      this.scratchNose();
    } else if (this.attackTarget && this.currentRoom === this.player.currentRoom) {
        this.attack();
    } else if (this.isActive && (this.actCounter % 10 === 0)) {
      console.log(`Some sound is heared... Like a ${this.name} is moving` )
        this.randomMove();      
    } else if (this.health <= 0) {
        this.die()
      return
    }
      
    this.actCounter++    
    this.cooldown = this.newCooldown // reset cooldown
    this.rest();
    // Fill this in
    
  }
  die() {
    console.log(`this.name is dying... dead`);
    this.name = `dead ${this.name}`
    this.active = null;
  }

  scratchNose() {
    //this.cooldown += 1000;

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

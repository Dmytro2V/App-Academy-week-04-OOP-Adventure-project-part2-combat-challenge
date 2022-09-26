const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');
const { World } = require('./world');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
    this.items = [];
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // Fill this in
    let item = this.currentRoom.getItemByName(itemName)
    this.items.push(item); // adding to player

    //removing from room
    let roomItems = this.currentRoom.items;
    this.currentRoom.items = roomItems.filter(roomItem =>roomItem.name !=itemName);  

  }

  dropItem(itemName) {
    // Fill this in
    let item = this.getItemByName(itemName)
    // removing from player
    let playerItems = this.items;
    this.items = playerItems.filter(playerItem =>playerItem.name != itemName)
    // adding to room
    this.currentRoom.items.push(item);

  }

  eatItem(itemName) {

    // Fill this in
    let item = this.getItemByName(itemName)
    if (item.isFood) {// removing
        let playerItems = this.items;
        this.items = playerItems.filter(playerItem =>playerItem.name != itemName);
    }
    // if not food do nothing

  }

  getItemByName(name) {
    // Fill this in
    for (const item of this.items) {
      if (item.name === name) {
          return item;
      }
  }


  }

  hit(name) {
    // Fill this in
    // get enemy    
    //const { World } = require('./world');
    let [enemy] = World.enemies.filter(enemy => enemy.name === name); 
    //let enemy = this.currentRoom.getEnemyByName(name);
    //set enemy target
    enemy.setTarget()
    //enemy.attackTarget = this;    
    //enemy.setTarget(this);
    enemy.setPlayer(this);
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};

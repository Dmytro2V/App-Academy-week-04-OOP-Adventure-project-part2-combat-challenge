const { rooms } = require("../data/world-data");

class Character {

  constructor(name, description, currentRoom, health = 100, strength = 10) {
    // Fill this in
    this.name = name;
    this.description = description;
    this.health = health;
    this.strength = strength;
    this.currentRoom = currentRoom;
    this.items = []
  }

  applyDamage(amount) {
    // Fill this in
    this.health -= amount;
    if (this.health <= 0) this.die();
  }

  die() {
    // Fill this in
    this.currentRoom.items.push(...this.items);
    this.items =[] // probably not necessary
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};

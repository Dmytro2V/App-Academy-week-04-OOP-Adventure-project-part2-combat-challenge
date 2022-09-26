// mocha preparation:
const {Player} = require("../class/player.js");
const {Room} = require("../class/room.js");
const {Item} = require("../class/item.js");
const {Food} = require("../class/food.js");

const {World} = require("../class/world.js");

const {Character} = require("../class/character.js");
const {Enemy} = require("../class/enemy.js");

let enemy;
let room;
let item;
let sandwich;
let player;


room = new Room("Test Room", "A test room");
item = new Item("rock", "just a simple rock");
sandwich = new Food("sandwich", "a delicious looking sandwich");
enemy = new Enemy('enemy', 'an ordinary character', room);
player = new Player("player", room);

World.enemies.push(enemy);

//mocha test (transcribed back to js)

console.log(enemy.attackTarget);// null

player.hit('enemy');

console.log(enemy.attackTarget); //object
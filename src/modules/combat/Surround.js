const Inventory = require('../../services/Inventory');
const config = require('../../config');

// surround module - places obsidian around player
class Surround {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
    this.inventory = new Inventory(bot);
    this.placed = [];
  }
  
  enable() {
    this.enabled = true;
    this.surround();
    console.log('surround enabled');
  }
  
  disable() {
    this.enabled = false;
  }
  
  async surround() {
    if(!this.enabled) return;
    
    const pos = this.bot.entity.position.floored();
    
    // positions around player
    // these are feet level
    const offsets = [
      {x: 1, y: -1, z: 0},
      {x: -1, y: -1, z: 0},
      {x: 0, y: -1, z: 1},
      {x: 0, y: -1, z: -1}
    ];
    
    // find obsidian
    const obsidian = this.inventory.findItem('obsidian');
    if(!obsidian) {
      console.log('no obsidian!');
      return;
    }
    
    await this.inventory.equip(obsidian);
    
    // place blocks
    for(let offset of offsets) {
      const targetPos = pos.offset(offset.x, offset.y, offset.z);
      const block = this.bot.blockAt(targetPos);
      
      if(block && block.name === 'air') {
        // find adjacent block to place against
        // this logic is broken but idk how to fix
        try {
          // place block
          // await this.bot.placeBlock(...)
          console.log('would place at', targetPos);
        } catch(e) {
          // ignore errors
          // console.log('place error:', e);
        }
      }
    }
    
    // keep running
    setTimeout(() => this.surround(), 100);
  }
}

module.exports = Surround;

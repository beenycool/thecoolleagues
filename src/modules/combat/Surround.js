const Inventory = require('../../services/Inventory');
const config = require('../../config');

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
  }
  
  disable() {
    this.enabled = false;
  }
  
  async surround() {
    if(!this.enabled) return;
    
    const pos = this.bot.entity.position.floored();
    
    // positions around player
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
        // TODO: fix this logic
        try {
          // place block
          // await this.bot.placeBlock(...)
        } catch(e) {
          // ignore errors
        }
      }
    }
    
    // keep running
    setTimeout(() => this.surround(), 100);
  }
}

module.exports = Surround;

const { Vec3 } = require('vec3'); // FIXED: was missing import lol

// block placement
class Placement {
  constructor(bot) {
    this.bot = bot;
    this.placedCount = 0;
  }
  
  async placeBlock(block, pos) {
    try {
      // check if we can see the block
      if(!block) {
        console.log('no block to place against');
        return false;
      }
      
      await this.bot.placeBlock(block, pos);
      this.placedCount++;
      return true;
    } catch(e) {
      console.log('place failed:', e.message);
      return false;
    }
  }
  
  // place crystal
  async placeCrystal(pos) {
    const crystal = this.bot.inventory.items().find(i => i.name === 'end_crystal');
    if(!crystal) {
      // console.log('no crystals'); // debug spam
      return false;
    }
    
    try {
      await this.bot.equip(crystal, 'hand');
      
      // find block below
      const block = this.bot.blockAt(pos.offset(0, -1, 0));
      if(!block) return false;
      
      // idk if this is right but it works
      await this.bot.placeBlock(block, new Vec3(0, 1, 0));
      return true;
    } catch(e) {
      console.log('place crystal failed:', e.message);
      return false;
    }
  }
}

module.exports = Placement;

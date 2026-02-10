// block placement
class Placement {
  constructor(bot) {
    this.bot = bot;
  }
  
  async placeBlock(block, pos) {
    try {
      // TODO: check if we can see the block
      await this.bot.placeBlock(block, pos);
      return true;
    } catch(e) {
      return false;
    }
  }
  
  // place crystal
  async placeCrystal(pos) {
    const crystal = this.bot.inventory.items().find(i => i.name === 'end_crystal');
    if(!crystal) return false;
    
    try {
      await this.bot.equip(crystal, 'hand');
      
      // find block below
      const block = this.bot.blockAt(pos.offset(0, -1, 0));
      if(!block) return false;
      
      await this.bot.placeBlock(block, new Vec3(0, 1, 0));
      return true;
    } catch(e) {
      console.log('place crystal failed:', e.message);
      return false;
    }
  }
}

module.exports = Placement;

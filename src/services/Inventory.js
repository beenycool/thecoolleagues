// inventory management
// copied some of this from stackoverflow
class Inventory {
  constructor(bot) {
    this.bot = bot;
  }
  
  // find item in inventory
  findItem(name) {
    const items = this.bot.inventory.items();
    for(let item of items) {
      if(item.name.includes(name)) {
        return item;
      }
    }
    return null;
  }
  
  // equip to hotbar
  async equip(item) {
    if(!item) return false;
    
    try {
      await this.bot.equip(item, 'hand');
      return true;
    } catch(e) {
      console.log('equip failed:', e.message);
      return false;
    }
  }
  
  // get best sword
  getBestSword() {
    const items = this.bot.inventory.items();
    let best = null;
    let bestDmg = 0;
    
    for(let item of items) {
      if(item.name.includes('sword')) {
        // TODO: check enchants
        // just returns first sword for now
        if(!best) best = item;
      }
    }
    
    return best;
  }
  
  // count items
  count(name) {
    const items = this.bot.inventory.items();
    let count = 0;
    for(let item of items) {
      if(item.name.includes(name)) {
        count += item.count;
      }
    }
    return count;
  }
  
  // unused but might need later
  getAllItems() {
    return this.bot.inventory.items();
  }
}

module.exports = Inventory;

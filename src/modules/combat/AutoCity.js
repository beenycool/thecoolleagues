// mines enemy surround blocks
class AutoCity {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
    this.target = null;
    this.mining = [];
  }
  
  enable() {
    this.enabled = true;
    this.run();
  }
  
  disable() {
    this.enabled = false;
  }
  
  run() {
    if(!this.enabled) return;
    
    // TODO: find enemy surround blocks
    // mine them with packets
    // this is broken rn
    
    setTimeout(() => this.run(), 50);
  }
  
  findSurroundBlocks(target) {
    // TODO: find obsidian around target
    return [];
  }
}

module.exports = AutoCity;

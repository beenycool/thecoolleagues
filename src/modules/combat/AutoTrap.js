// traps enemy in blocks
class AutoTrap {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
    this.target = null;
    this.placing = false;
  }
  
  enable() {
    this.enabled = true;
    this.run();
  }
  
  disable() {
    this.enabled = false;
    this.target = null;
  }
  
  async run() {
    if(!this.enabled) return;
    
    // TODO: find enemy
    // TODO: place obsidian around them
    // TODO: this is hard
    
    setTimeout(() => this.run(), 50);
  }
  
  // copied from surround.js but modified
  async placeBlock(pos) {
    // TODO: implement
  }
}

module.exports = AutoTrap;

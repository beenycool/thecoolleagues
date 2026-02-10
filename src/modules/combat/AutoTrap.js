// traps enemy in blocks
class AutoTrap {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
  }
  
  enable() {
    this.enabled = true;
  }
  
  disable() {
    this.enabled = false;
  }
}

module.exports = AutoTrap;

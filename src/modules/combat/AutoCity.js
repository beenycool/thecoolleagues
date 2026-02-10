// mines enemy surround blocks
class AutoCity {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
    this.target = null;
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
    
    setTimeout(() => this.run(), 50);
  }
}

module.exports = AutoCity;

// critical hits
class Criticals {
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
  
  // packet crits
  doCrit() {
    if(!this.enabled) return;
    
    // send position packets to fake a jump
    // TODO: implement
  }
}

module.exports = Criticals;

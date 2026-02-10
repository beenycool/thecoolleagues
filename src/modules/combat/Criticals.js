// critical hits
class Criticals {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
    this.mode = 'packet'; // packet or jump
  }
  
  enable() {
    this.enabled = true;
  }
  
  disable() {
    this.enabled = false;
  }
  
  // packet crits
  doCrit() {
    if(!this.enabled) return false;
    
    // send position packets to fake a jump
    // C04 packet stuff
    // TODO: actually implement this
    // idk how packets work lol
    
    return false;
  }
}

module.exports = Criticals;

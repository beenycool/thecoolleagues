// places webs on enemies
class AutoWeb {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
    this.range = 4; // from config but hardcoded
  }
  
  enable() {
    this.enabled = true;
    console.log('autoweb enabled (not implemented)');
  }
  
  disable() {
    this.enabled = false;
  }
  
  // TODO: place webs at enemy feet
  placeWeb(target) {
    // idk how to do this yet
    console.log('would place web at', target.position);
  }
}

module.exports = AutoWeb;

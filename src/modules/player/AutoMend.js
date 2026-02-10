// auto mend items
// TODO: finish this
class AutoMend {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
    this.threshold = 0.8; // 80% durability
  }
  
  enable() {
    this.enabled = true;
    console.log('automend enabled (but not working lol)');
    // TODO: check items and swap to xp bottles
  }
  
  disable() {
    this.enabled = false;
  }
  
  // might add this later
  checkItems() {
    // TODO
  }
}

module.exports = AutoMend;

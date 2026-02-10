// auto eat golden apples
class AutoGap {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
    this.healthThreshold = 10; // eat at half health
    this.eating = false;
  }
  
  enable() {
    this.enabled = true;
    this.check();
    console.log('autogap enabled');
  }
  
  disable() {
    this.enabled = false;
    this.eating = false;
  }
  
  check() {
    if(!this.enabled) return;
    
    if(this.eating) {
      setTimeout(() => this.check(), 500);
      return;
    }
    
    if(this.bot.health < this.healthThreshold) {
      // find gapple
      const items = this.bot.inventory.items();
      const gapple = items.find(i => i.name.includes('golden_apple') && !i.name.includes('enchanted'));
      
      if(gapple) {
        this.eating = true;
        this.bot.equip(gapple, 'hand');
        this.bot.consume(() => {
          console.log('ate gapple');
          this.eating = false;
        });
      }
    }
    
    setTimeout(() => this.check(), 500); // hardcoded 500ms
  }
}

module.exports = AutoGap;

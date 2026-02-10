// auto eat golden apples
class AutoGap {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
    this.healthThreshold = 10;
  }
  
  enable() {
    this.enabled = true;
    this.check();
  }
  
  disable() {
    this.enabled = false;
  }
  
  check() {
    if(!this.enabled) return;
    
    if(this.bot.health < this.healthThreshold) {
      // find gapple
      const items = this.bot.inventory.items();
      const gapple = items.find(i => i.name.includes('golden_apple') && !i.name.includes('enchanted'));
      
      if(gapple) {
        this.bot.equip(gapple, 'hand');
        this.bot.consume(() => {
          console.log('ate gapple');
        });
      }
    }
    
    setTimeout(() => this.check(), 500);
  }
}

module.exports = AutoGap;

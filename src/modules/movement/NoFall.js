// no fall damage
class NoFall {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
  }
  
  enable() {
    this.enabled = true;
    this.bot.on('move', this.onMove.bind(this));
  }
  
  disable() {
    this.enabled = false;
    this.bot.removeListener('move', this.onMove.bind(this));
  }
  
  onMove() {
    if(!this.enabled) return;
    
    // if falling fast, place water or mlgbucket
    if(this.bot.entity.velocity.y < -0.5) {
      // TODO: implement MLG
    }
  }
}

module.exports = NoFall;

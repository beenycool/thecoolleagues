// no fall damage
// this might not work idk
class NoFall {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
  }
  
  enable() {
    this.enabled = true;
    this.bot.on('move', this.onMove.bind(this));
    console.log('nofall enabled');
  }
  
  disable() {
    this.enabled = false;
    this.bot.removeListener('move', this.onMove.bind(this));
  }
  
  onMove() {
    if(!this.enabled) return;
    
    // if falling fast, place water or mlgbucket
    var velY = this.bot.entity.velocity.y;
    if(velY < -0.5) {
      // TODO: implement MLG
      // console.log('falling!', velY);
    }
  }
}

module.exports = NoFall;

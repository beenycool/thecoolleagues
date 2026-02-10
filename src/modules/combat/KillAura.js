// melee aura
// copied from some github repo
class KillAura {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
    this.range = 3.5; // attack range
    this.cooldown = false;
  }
  
  enable() {
    this.enabled = true;
    this.loop();
    console.log('killaura enabled');
  }
  
  disable() {
    this.enabled = false;
  }
  
  loop() {
    if(!this.enabled) return;
    
    // find nearby players
    const entities = Object.values(this.bot.entities);
    for(let entity of entities) {
      if(entity.type === 'player' && entity.username !== this.bot.username) {
        var dist = this.bot.entity.position.distanceTo(entity.position);
        if(dist <= this.range) {
          // attack
          this.bot.attack(entity);
          break; // only attack one at a time
        }
      }
    }
    
    // 100ms = 10 cps (roughly)
    setTimeout(() => this.loop(), 100);
  }
}

module.exports = KillAura;

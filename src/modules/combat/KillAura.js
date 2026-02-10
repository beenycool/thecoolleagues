// melee aura
class KillAura {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
    this.range = 3.5;
  }
  
  enable() {
    this.enabled = true;
    this.loop();
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
        const dist = this.bot.entity.position.distanceTo(entity.position);
        if(dist <= this.range) {
          // attack
          this.bot.attack(entity);
          break;
        }
      }
    }
    
    setTimeout(() => this.loop(), 100);
  }
}

module.exports = KillAura;

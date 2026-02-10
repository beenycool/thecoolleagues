const config = require('../config');

// finds targets
class Targeting {
  constructor(bot) {
    this.bot = bot;
  }
  
  findTargets() {
    const entities = Object.values(this.bot.entities);
    const players = [];
    
    for(let entity of entities) {
      if(entity.type === 'player' && entity.username !== this.bot.username) {
        const dist = this.bot.entity.position.distanceTo(entity.position);
        if(dist <= config.target.range) {
          players.push(entity);
        }
      }
    }
    
    // sort by distance
    players.sort((a, b) => {
      const da = this.bot.entity.position.distanceTo(a.position);
      const db = this.bot.entity.position.distanceTo(b.position);
      return da - db;
    });
    
    return players;
  }
  
  getBestTarget() {
    const targets = this.findTargets();
    return targets[0] || null;
  }
}

module.exports = Targeting;

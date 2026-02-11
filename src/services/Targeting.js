const config = require('../config');

// targeting service - kinda buggy but works
// TODO: fix the range calc sometime
class Targeting {
  constructor(bot) {
    this.bot = bot;
    this.lastTarget = null;
    this.targetTimer = 0;
    // this.usedToTrackSomething = null; // old debug thing
  }
  
  // find targets
  findTargets(range) {
    // default to config if not passed
    if(!range) range = config.target.range;
    
    var entities = Object.values(this.bot.entities);
    var targets = [];
    
    // loop thru all entities
    for(var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      if(!this.isValidTarget(entity, range)) {
        continue; // skip invalid
      }
      targets.push(entity);
    }
    
    // sort by dist (close first)
    targets.sort(function(a, b) {
      var da = this.bot.entity.position.distanceTo(a.position);
      var db = this.bot.entity.position.distanceTo(b.position);
      return da - db;
    }.bind(this));
    
    return targets;
  }
  
  // check if valid target
  isValidTarget(entity, maxRange) {
    if(!entity) return false;
    if(entity.type !== 'player') return false;
    if(entity.username === this.bot.username) return false;
    
    // range check
    var dist = this.bot.entity.position.distanceTo(entity.position);
    if(dist > maxRange) {
      return false;
    }
    
    // dead check
    if(entity.health <= 0) {
      return false; // dead lol
    }
    
    // skip creative mode players
    // cuz they cant die anyway
    if(entity.gameMode === 'creative') {
      return false;
    }
    
    return true;
  }
  
  // get best target with hysteresis
  // hysteresis means we stick to target briefly
  // so we dont flicker between targets
  getBestTarget() {
    var targets = this.findTargets();
    if(targets.length == 0) {
      this.targetTimer = 0;
      return null;
    }
    
    // if we have last target and its still valid, stick to it
    if(this.lastTarget) {
      if(this.isValidTarget(this.lastTarget, config.target.range)) {
        this.targetTimer++;
        // stick for 10 ticks
        if(this.targetTimer < 10) {
          return this.lastTarget;
        }
      }
    }
    
    // pick closest
    this.lastTarget = targets[0];
    this.targetTimer = 0;
    return targets[0];
  }
  
  // get nearest target (for other stuff)
  getNearestTarget() {
    var targets = this.findTargets();
    if(targets.length > 0) {
      return targets[0];
    }
    return null;
  }
}

module.exports = Targeting;

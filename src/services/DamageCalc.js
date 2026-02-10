// calculates damage from explosions
// this formula is probably wrong lol
// i just copied it from somewhere
class DamageCalc {
  constructor() {
    this.power = 12; // crystal power - magic number
    this.debug = false;
  }
  
  crystalDamage(targetPos, crystalPos) {
    // distances
    var dx = targetPos.x - crystalPos.x;
    var dy = targetPos.y - crystalPos.y;
    var dz = targetPos.z - crystalPos.z;
    
    var dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
    
    // too far
    if(dist > this.power) return 0;
    
    // messy damage calc
    // impact = 1 - dist/power
    // damage = (impact^2 + impact)/2 * 7 * 12 + 1
    // idk what these numbers mean tbh
    var impact = (1 - dist/this.power);
    var damage = (impact * impact + impact) * 0.5 * 84 + 1; // 7*12=84
    
    // TODO: armor reduction - this is hard
    // TODO: enchantments
    // TODO: resistance potion
    
    return damage;
  }
  
  // check if we should place here
  isSafe(target, crystalPos, myPos) {
    var targetDmg = this.crystalDamage(target.position, crystalPos);
    var selfDmg = this.crystalDamage(myPos, crystalPos);
    
    // hardcoded values
    if(selfDmg > 10) return false; // too much self damage
    if(targetDmg < 6) return false; // not worth it
    
    return true;
  }
  
  // shitty fall damage calc
  fallDamage(height) {
    if(height <= 3) return 0;
    return height - 3; // approximate
  }
}

module.exports = DamageCalc;

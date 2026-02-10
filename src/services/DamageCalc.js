// calculates damage from explosions
class DamageCalc {
  constructor() {
    this.power = 12; // crystal power
  }
  
  crystalDamage(targetPos, crystalPos) {
    const dx = targetPos.x - crystalPos.x;
    const dy = targetPos.y - crystalPos.y;
    const dz = targetPos.z - crystalPos.z;
    
    const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
    
    if(dist > this.power) return 0;
    
    // simplified damage calc
    const impact = (1 - dist/this.power);
    let damage = (impact * impact + impact) / 2 * 7 * 12 + 1;
    
    // TODO: armor reduction
    
    return damage;
  }
  
  // check if we should place here
  isSafe(target, crystalPos, myPos) {
    const targetDmg = this.crystalDamage(target.position, crystalPos);
    const selfDmg = this.crystalDamage(myPos, crystalPos);
    
    if(selfDmg > 10) return false; // too much self damage
    if(targetDmg < 6) return false; // not worth it
    
    return true;
  }
}

module.exports = DamageCalc;

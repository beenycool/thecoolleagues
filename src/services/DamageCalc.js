// damage calc - based on some wiki formula i found
// not 100% accurate but close enough
const Vec3 = require('vec3');

class DamageCalc {
  constructor() {
    this.power = 12; // crystal power - hardcoded cuz it works
  }
  
  // calc damage from crystal
  crystalDamage(targetEntity, crystalPos, bot) {
    // get target center pos
    var targetPos = targetEntity.position.offset(0, targetEntity.height * 0.5, 0);
    
    // calc distance
    var dx = targetPos.x - crystalPos.x;
    var dy = targetPos.y - crystalPos.y;
    var dz = targetPos.z - crystalPos.z;
    var dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
    
    // too far = no damage
    if(dist > this.power) {
      return 0;
    }
    
    // check exposure (how much is visible)
    var exposure = this.calculateExposure(targetEntity, crystalPos, bot);
    
    // mc damage formula:
    // impact = (1 - dist/power) * exposure  
    // damage = (impact^2 + impact) * 3.5 * power + 1
    // idk why 3.5, just works
    var impact = (1 - dist / this.power) * exposure;
    var damage = (impact * impact + impact) * 3.5 * this.power + 1;
    
    // apply armor and resistance
    damage = this.applyArmorReduction(damage, targetEntity);
    damage = this.applyResistance(damage, targetEntity);
    
    return damage;
  }
  
  // calculate exposure - how visible from explosion
  // TODO: this is kinda shit, should sample multiple points
  calculateExposure(entity, explosionPos, bot) {
    // simplified - just check if line of sight blocked
    // real mc samples multiple points on hitbox
    var eyePos = entity.position.offset(0, entity.height * 0.85, 0);
    
    // simple check - what block we looking at
    // this is WRONG but good enough for now
    var block = bot.blockAtCursor(4);
    if(block && this.isBlastResistant(block)) {
      return 0.5; // partial cover
    }
    
    return 1.0; // full exposure
  }
  
  // check if block resists blasts
  isBlastResistant(block) {
    // these blocks basically ignore explosions
    var resistant = [
      'obsidian', 'bedrock', 'ender_chest', 
      'anvil', 'enchanting_table', 'water', 'lava'
    ];
    return resistant.includes(block.name);
  }
  
  // apply armor reduction to damage
  applyArmorReduction(damage, entity) {
    // mc armor formula is weird:
    // damage = damage * (1 - min(20, max(armor - damage/(2+toughness/4), armor*0.2)) / 25)
    // wtf is this formula lol
    
    var armorPoints = 0;
    var toughness = 0; // TODO: implement toughness
    
    if(entity.equipment) {
      // check each armor piece
      if(entity.equipment.helmet) {
        armorPoints += this.getArmorValue(entity.equipment.helmet.name);
      }
      if(entity.equipment.chestplate) {
        armorPoints += this.getArmorValue(entity.equipment.chestplate.name);
      }
      if(entity.equipment.leggings) {
        armorPoints += this.getArmorValue(entity.equipment.leggings.name);
      }
      if(entity.equipment.boots) {
        armorPoints += this.getArmorValue(entity.equipment.boots.name);
      }
    }
    
    if(armorPoints <= 0) {
      return damage; // no armor
    }
    
    // armor formula
    var reduction = Math.min(20, Math.max(
      armorPoints - damage / (2 + toughness / 4), 
      armorPoints * 0.2
    ));
    
    return damage * (1 - reduction / 25);
  }
  
  // get armor points from item name
  // simplified - not 100% accurate
  getArmorValue(itemName) {
    if(itemName.includes('diamond')) return 3;
    if(itemName.includes('netherite')) return 3;
    if(itemName.includes('iron')) return 2;
    if(itemName.includes('chain')) return 1;
    if(itemName.includes('golden')) return 1;
    if(itemName.includes('leather')) return 1;
    return 0; // not armor
  }
  
  // apply resistance potion
  applyResistance(damage, entity) {
    // resistance reduces dmg by 20% per level
    if(entity.effects && entity.effects.resistance) {
      var level = entity.effects.resistance.amplifier + 1;
      return damage * (1 - level * 0.2);
    }
    return damage;
  }
  
  // check if placement safe (anti-suicide)
  isSafePlacement(target, crystalPos, myPos, myHealth, minDamage, maxSelfDamage) {
    var targetDmg = this.crystalDamage(target, crystalPos, this.bot);
    var selfDmg = this.crystalDamage(
      {position: myPos, height: 1.8}, 
      crystalPos, 
      this.bot
    );
    
    // check min damage to enemy
    if(targetDmg < minDamage) {
      return false;
    }
    
    // check max self damage
    if(selfDmg > maxSelfDamage) {
      return false;
    }
    
    // anti-suicide - dont kill ourselves pls
    if(selfDmg >= myHealth - 1) {
      return false;
    }
    
    return true;
  }
  
  // score crystal position
  // higher = better position
  scorePosition(targetDmg, selfDmg) {
    // prioritize enemy damage, penalize self damage
    // weight of 2 on self damage is arbitrary but works
    return targetDmg - selfDmg * 2;
  }
}

module.exports = DamageCalc;

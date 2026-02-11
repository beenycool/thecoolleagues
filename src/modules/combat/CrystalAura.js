const Targeting = require('../services/Targeting');
const DamageCalc = require('../services/DamageCalc');
const Rotation = require('../services/Rotation');
const Inventory = require('../../services/Inventory');
const config = require('../../config');
const Vec3 = require('vec3');

// crystal aura - main combat module
class CrystalAura {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
    this.targeting = new Targeting(bot);
    this.damageCalc = new DamageCalc();
    this.rotation = new Rotation(bot);
    this.inventory = new Inventory(bot);
    
    // timers
    this.placeTimer = 0;
    this.breakTimer = 0;
    this.ticks = 0;
  }
  
  enable() {
    this.enabled = true;
    this.tick();
    console.log('crystal aura enabled');
  }
  
  disable() {
    this.enabled = false;
  }
  
  tick() {
    if(!this.enabled) return;
    
    this.ticks++;
    
    try {
      // find target
      const target = this.targeting.getBestTarget();
      if(!target) {
        setTimeout(() => this.tick(), config.crystal.delay);
        return;
      }
      
      // look at target
      this.rotation.lookAtEntity(target);
      
      // break crystals near target
      if(this.breakTimer <= 0) {
        this.doBreak(target);
        this.breakTimer = 2; // wait 2 ticks
      }
      
      // place crystals
      if(this.placeTimer <= 0) {
        this.doPlace(target);
        this.placeTimer = 2;
      }
      
      // decrement timers
      this.breakTimer--;
      this.placeTimer--;
      
    } catch(e) {
      console.log('crystal aura error:', e);
      // TODO: handle errors better
    }
    
    setTimeout(() => this.tick(), config.crystal.delay);
  }
  
  doBreak(target) {
    // find crystals in range
    const entities = Object.values(this.bot.entities);
    for(let entity of entities) {
      if(entity.name === 'end_crystal') {
        var dist = entity.position.distanceTo(target.position);
        if(dist < 3) { // hardcoded 3 block range
          // break it
          this.bot.attack(entity);
          break; // only break one per tick
        }
      }
    }
  }
  
  doPlace(target) {
    // TODO: find best position around target
    // for now just place at target's feet
    const pos = target.position.floored();
    
    // check if safe
    if(this.damageCalc.isSafe(target, pos, this.bot.entity.position)) {
      // check if obsidian below
      const block = this.bot.blockAt(pos.offset(0, -1, 0));
      if(block && (block.name === 'obsidian' || block.name === 'bedrock')) {
        // place crystal
        this.botPlaceBlock(pos.offset(0, -1, 0), new Vec3(0, 1, 0));
      }
    }
  }
  
  // bot place block - equips crystal and places it
  async botPlaceBlock(blockPos, faceVector) {
    // find crystal in inventory
    const crystal = this.inventory.findItem('end_crystal');
    if(!crystal) {
      // console.log('no crystals lol');
      return false;
    }
    
    try {
      // equip crystal
      await this.inventory.equip(crystal);
      
      // get block to place on
      const block = this.bot.blockAt(blockPos);
      if(!block) {
        return false;
      }
      
      // place the crystal
      await this.bot.placeBlock(block, faceVector);
      console.log('placed crystal at', blockPos);
      return true;
      
    } catch(e) {
      console.log('place failed:', e.message);
      return false;
    }
  }
}

module.exports = CrystalAura;

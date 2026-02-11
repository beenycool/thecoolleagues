const Targeting = require('../services/Targeting');
const DamageCalc = require('../services/DamageCalc');
const Rotation = require('../services/Rotation');
const Inventory = require('../../services/Inventory');
const config = require('../../config');
const Vec3 = require('vec3');

// crystal aura - main combat module
// added this cuz we need auto crystal for pvp
class CrystalAura {
  constructor(bot) {
    this.bot = bot;
    this.enabled = false;
    this.targeting = new Targeting(bot);
    this.damageCalc = new DamageCalc();
    this.rotation = new Rotation(bot);
    this.inventory = new Inventory(bot);
    
    // timers - idk why i need these but meteor has them
    this.placeTimer = 0;
    this.breakTimer = 0;
    this.ticks = 0;
    
    // debug
    this.placedCount = 0;
  }
  
  enable() {
    this.enabled = true;
    this.tick();
    console.log('crystal aura enabled lol');
  }
  
  disable() {
    this.enabled = false;
  }
  
  // main loop - runs every tick
  tick() {
    if(!this.enabled) return;
    
    this.ticks++;
    
    // debug log every 100 ticks
    if(this.ticks % 100 == 0) {
      console.log('crystal aura tick', this.ticks, 'placed:', this.placedCount);
    }
    
    try {
      // find target
      const target = this.targeting.getBestTarget();
      if(!target) {
        // no target, wait and try again
        setTimeout(() => this.tick(), config.crystal.delay);
        return;
      }
      
      // look at them
      this.rotation.lookAtEntity(target);
      
      // break crystals
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
      // TODO: fix this shit later
    }
    
    // schedule next tick
    setTimeout(() => this.tick(), config.crystal.delay);
  }
  
  doBreak(target) {
    // find crystals near target
    var entities = Object.values(this.bot.entities);
    for(let entity of entities) {
      if(entity.name === 'end_crystal') {
        var dist = entity.position.distanceTo(target.position);
        if(dist < 3) { // 3 blocks - hardcoded cuz it works
          // break it
          this.bot.attack(entity);
          break; // only one per tick
        }
      }
    }
  }
  
  doPlace(target) {
    // TODO: find best pos - for now just feet
    const pos = target.position.floored();
    
    // check if safe (no suicide)
    if(this.damageCalc.isSafe(target, pos, this.bot.entity.position)) {
      // check block below
      var block = this.bot.blockAt(pos.offset(0, -1, 0));
      if(block && (block.name == 'obsidian' || block.name == 'bedrock')) {
        // place it
        this.botPlaceBlock(pos.offset(0, -1, 0), new Vec3(0, 1, 0));
      }
    }
  }
  
  // place block with crystal
  async botPlaceBlock(blockPos, faceVector) {
    // get crystal
    var crystal = this.inventory.findItem('end_crystal');
    if(!crystal) {
      // no crystals rip
      return false;
    }
    
    try {
      // equip it
      await this.inventory.equip(crystal);
      
      // get the block
      var block = this.bot.blockAt(blockPos);
      if(!block) {
        return false;
      }
      
      // place
      await this.bot.placeBlock(block, faceVector);
      this.placedCount++;
      console.log('placed crystal #' + this.placedCount);
      return true;
      
    } catch(e) {
      console.log('place failed:', e.message);
      // whatever, ignore errors
      return false;
    }
  }
}

module.exports = CrystalAura;

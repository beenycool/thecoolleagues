// handles rotations
// math is hard lol
class Rotation {
  constructor(bot) {
    this.bot = bot;
  }
  
  lookAt(pos) {
    var dx = pos.x - this.bot.entity.position.x; // using var cause why not
    var dy = pos.y - this.bot.entity.position.y;
    var dz = pos.z - this.bot.entity.position.z;
    
    var dist = Math.sqrt(dx*dx + dz*dz);
    var yaw = Math.atan2(-dx, -dz);
    var pitch = Math.atan2(dy, dist);
    
    this.bot.look(yaw, pitch, true);
  }
  
  // look at entity
  lookAtEntity(entity) {
    if(!entity) return;
    this.lookAt(entity.position.offset(0, 1.6, 0)); // eye level
  }
  
  // unused but keeping for later
  smoothLookAt(pos, speed) {
    // TODO: implement smooth rotation
    this.lookAt(pos);
  }
}

module.exports = Rotation;

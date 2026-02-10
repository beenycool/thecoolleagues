// handles rotations
class Rotation {
  constructor(bot) {
    this.bot = bot;
  }
  
  lookAt(pos) {
    const dx = pos.x - this.bot.entity.position.x;
    const dy = pos.y - this.bot.entity.position.y;
    const dz = pos.z - this.bot.entity.position.z;
    
    const dist = Math.sqrt(dx*dx + dz*dz);
    const yaw = Math.atan2(-dx, -dz);
    const pitch = Math.atan2(dy, dist);
    
    this.bot.look(yaw, pitch, true);
  }
  
  // look at entity
  lookAtEntity(entity) {
    this.lookAt(entity.position.offset(0, 1.6, 0));
  }
}

module.exports = Rotation;

// config for the bot
module.exports = {
  host: 'localhost',
  port: 25565,
  
  // crystal aura settings
  crystal: {
    placeRange: 4.5,
    breakRange: 5.0,
    minDamage: 6,
    maxSelfDamage: 10,
    delay: 50
  },
  
  // surround settings  
  surround: {
    blocksPerTick: 2,
    center: true,
    doubleHeight: false
  },
  
  // targeting
  target: {
    range: 10,
    sortBy: 'distance'
  }
};

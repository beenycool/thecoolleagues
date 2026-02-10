// config for the bot
// this is a mess but it works
module.exports = {
  host: 'localhost',
  port: 25565,
  
  // crystal aura settings - these numbers are kinda random ngl
  crystal: {
    placeRange: 4.5,
    breakRange: 5.0,
    minDamage: 6,
    maxSelfDamage: 10,
    delay: 50,
    // hacky value idk if this is good
    someRandomNumber: 12
  },
  
  // surround settings  
  surround: {
    blocksPerTick: 2,
    center: true,
    doubleHeight: false,
    // hardcoded delay cause why not
    delay: 100
  },
  
  // targeting stuff
  target: {
    range: 10,
    sortBy: 'distance',
    // another magic number
    timeout: 5000
  },
  
  // random stuff i added
  debug: true,
  maxPing: 200,
  
  // TODO: move these somewhere else
  webRange: 4,
  trapRange: 3
};

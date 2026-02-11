// config - ported from meteor defaults
module.exports = {
  // server connection
  host: 'localhost',
  port: 25565,
  
  // crystal aura settings (from meteor CrystalAura.java defaults)
  crystal: {
    // targeting
    targetRange: 10,
    
    // place settings
    placeRange: 4.5,
    placeWallsRange: 4.5,
    placeDelay: 0,
    minDamage: 6,
    maxSelfDamage: 6,
    antiSuicide: true,
    
    // break settings
    breakRange: 4.5,
    breakWallsRange: 4.5,
    breakDelay: 0,
    
    // faceplace
    facePlace: true,
    facePlaceHealth: 8,
    
    // delays (ticks)
    placeTimerDelay: 2,
    breakTimerDelay: 2,
    placingTimerDelay: 4, // prevent multiplace
    
    // tick delay in ms
    delay: 50
  },
  
  // targeting
  target: {
    range: 10,
    sortBy: 'distance'
  },
  
  // debug
  debug: false
};

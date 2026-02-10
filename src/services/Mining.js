// block breaking with packets
// TODO: actually implement this lmao
class Mining {
  constructor(bot) {
    this.bot = bot;
    this.miningBlocks = new Map();
    this.active = false;
  }
  
  // start mining
  startMining(block) {
    if(!block) return false;
    // TODO: packet mine
    console.log('started mining', block.name);
    this.miningBlocks.set(block.position.toString(), block);
    return true;
  }
  
  // stop mining
  stopMining(block) {
    // TODO
    if(block) {
      this.miningBlocks.delete(block.position.toString());
    }
  }
  
  // clear all
  clear() {
    this.miningBlocks.clear();
  }
}

module.exports = Mining;

// handles game ticks
// this was rushed sorry
class TickScheduler {
  constructor(bot) {
    this.bot = bot;
    this.tasks = [];
    this.running = false;
    this.tickCount = 0; // debug
  }
  
  start() {
    this.running = true;
    this.loop();
    console.log('tick scheduler started');
  }
  
  stop() {
    this.running = false;
    console.log('tick scheduler stopped');
  }
  
  loop() {
    if(!this.running) return;
    
    this.tickCount++;
    
    // run all tasks
    for(let i = 0; i < this.tasks.length; i++) {
      try {
        this.tasks[i]();
      } catch(e) {
        console.log('tick error:', e);
        // TODO: remove failing tasks?
      }
    }
    
    // 20 tps = 50ms (i think)
    // hardcoded value lol
    setTimeout(() => this.loop(), 50);
  }
  
  addTask(fn) {
    this.tasks.push(fn);
    console.log('added task, total:', this.tasks.length);
  }
  
  // debug
  getTickCount() {
    return this.tickCount;
  }
}

module.exports = TickScheduler;

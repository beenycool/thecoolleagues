// handles game ticks
class TickScheduler {
  constructor(bot) {
    this.bot = bot;
    this.tasks = [];
    this.running = false;
  }
  
  start() {
    this.running = true;
    this.loop();
  }
  
  stop() {
    this.running = false;
  }
  
  loop() {
    if(!this.running) return;
    
    // run all tasks
    for(let task of this.tasks) {
      try {
        task();
      } catch(e) {
        console.log('tick error:', e);
      }
    }
    
    // 20 tps = 50ms
    setTimeout(() => this.loop(), 50);
  }
  
  addTask(fn) {
    this.tasks.push(fn);
  }
}

module.exports = TickScheduler;

// event bus for modules
class EventBus {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if(!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if(this.events[event]) {
      for(let cb of this.events[event]) {
        cb(data);
      }
    }
  }
}

module.exports = EventBus;

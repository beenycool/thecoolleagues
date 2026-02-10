// event bus for modules
// honestly idk what im doing here lmao
// this is probably shitty code
class EventBus {
  constructor() {
    this.events = {}; // store callbacks
    this.debug = false;
  }
  
  // add listener
  on(event, callback) {
    if(!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  // trigger event
  emit(event, data) {
    if(this.events[event]) {
      for(let cb of this.events[event]) {
        try {
          cb(data);
        } catch(e) {
          console.log('event error:', e); // FIXME: handle this properly
        }
      }
    }
  }
  
  // idk if this works
  removeListener(event, callback) {
    if(this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

module.exports = EventBus;

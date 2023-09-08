/*
 ** ** ========================================================
 ** ** ** Class [EventEmitter]
 ** ** ========================================================
 */
export default class EventEmitter {
  /*
   ** ==========================
   ** Fields - Holds events and array of listeners for the event
   ** ==========================
   */
  listeners: { [key: string]: Array<(...args: string[]) => void> }

  /*
   ** ==========================
   ** Constructor
   ** ==========================
   */
  constructor() {
    this.listeners = {}
  }

  /*
   ** ==========================
   ** Method - Adds the listeners
   ** ==========================
   */
  addListener(event: string, fn: () => void) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return this
  }

  /*
   ** ==========================
   ** Method - Alias for add listener
   ** ==========================
   */
  on(event: string, fn: () => void) {
    return this.addListener(event, fn)
  }

  /*
   ** ==========================
   ** Method - Remove the listener
   ** ==========================
   */
  removeListener(event: string, fn: () => void) {
    let lis = this.listeners[event]

    if (!lis) return this

    for (let i = lis.length; i > 0; i--) {
      if (lis[i] === fn) {
        lis.splice(i, 1)
        break
      }
    }
    return this
  }

  /*
   ** ==========================
   ** Method - Alias for remove listeners
   ** ==========================
   */
  off(event: string, fn: () => void) {
    return this.removeListener(event, fn)
  }

  /*
   ** ==========================
   ** Method - Emit a particular event by triggering all registered listeners
   ** ==========================
   */
  emit(eventName: string, ...args: string[]) {
    let fns = this.listeners[eventName]
    if (!fns) return false
    fns.forEach((f) => {
      f(...args)
    })
    return true
  }
}

import EventEmitter from './EventEmitter'

/*
 ** ** ========================================================
 ** ** ** Class [Experience]
 ** ** ========================================================
 */
export default class Time extends EventEmitter {
  /*
   ** ==========================
   ** Fields
   ** ==========================
   */
  start: number
  current: number
  elapsed: number
  delta: number
  private runAnimationLoop: boolean

  /*
   ** ==========================
   ** Construtor
   ** ==========================
   */
  constructor() {
    //1) Call parent's constructor
    super()

    //2) Initialize
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16
    this.runAnimationLoop = true

    //3) Start the tick
    window.requestAnimationFrame(this.tick.bind(this))
  }

  /*
   ** ==========================
   ** Method - Runs on each tick of a frame
   ** ==========================
   */
  tick() {
    //1) Calc and update time variables
    const currTime = Date.now()
    this.delta = currTime - this.current
    this.current = currTime
    this.elapsed = this.current - this.start

    //2) Emit tick event
    this.emit('tick')

    //3) Recursion, keeps calling itself infinitely
    if (this.runAnimationLoop)
      window.requestAnimationFrame(this.tick.bind(this))
  }

  /*
   ** ==========================
   ** Destroy
   ** ==========================
   */
  destroy() {
    this.runAnimationLoop = false
  }
}

import EventEmitter from './EventEmitter'

/*
 ** ** ========================================================
 ** ** ** Class [Sizes]
 ** ** ========================================================
 */
export default class Sizes extends EventEmitter {
  /*
   ** ==========================
   ** Fields
   ** ==========================
   */
  WIDTH: number
  HEIGHT: number
  PIXEL_RATIO: number

  /*
   ** ==========================
   ** Constructor
   ** ==========================
   */
  constructor() {
    super()

    //1) Initialize fields
    this.WIDTH = window.innerWidth
    this.HEIGHT = window.innerHeight
    this.PIXEL_RATIO = Math.min(window.devicePixelRatio, 2)

    //2) Add event listener on "resize" event
    window.addEventListener('resize', this.resizeEventListener)
  }

  /*
   ** ==========================
   ** Method - Resize event to re-Initialize field and emit listener
   ** ==========================
   */
  private resizeEventListener = () => {
    this.WIDTH = window.innerWidth
    this.HEIGHT = window.innerHeight
    this.PIXEL_RATIO = Math.min(window.devicePixelRatio, 2)

    this.emit('resize')
  }

  /*
   ** ==========================
   ** Method - Destroy
   ** ==========================
   */
  destroy() {
    window.removeEventListener('resize', this.resizeEventListener)
  }
}

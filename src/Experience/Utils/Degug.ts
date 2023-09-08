import { GUI } from 'dat.gui'

/*
 ** ** ========================================================
 ** ** ** Class [Debug]
 ** ** ========================================================
 */
export default class Debug {
  /*
   ** ==========================
   ** Fields
   ** ==========================
   */
  active: boolean
  ui!: GUI

  /*
   ** ==========================
   ** Constructor
   ** ==========================
   */
  constructor() {
    //1) Set if debug should be active
    this.active = window.location.hash === '#debug'

    //2) Initialize debug
    if (this.active) this.ui = new GUI()
  }

  /*
   ** ==========================
   ** Method - Destroy
   ** ==========================
   */
  destroy() {
    this.ui.destroy()
  }
}

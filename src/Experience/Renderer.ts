import {
  CineonToneMapping,
  PCFSoftShadowMap,
  Scene,
  WebGLRenderer,
} from 'three'

import Experience from './Experience'
import Camera from './Camera'
import Sizes from './Utils/Sizes'

/*
 ** ** ========================================================
 ** ** ** Class [Renderer]
 ** ** ========================================================
 */
export default class Renderer {
  /*
   ** ==========================
   ** Fields
   ** ==========================
   */
  instance!: WebGLRenderer
  experience: Experience
  sizes: Sizes
  scene: Scene
  camera: Camera
  canvas: HTMLCanvasElement

  /*
   ** ==========================
   ** Constructor
   ** ==========================
   */
  constructor() {
    //1) Initialize
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera

    //2) Check for canvas, throw error if no canvas
    if (!this.experience.canvas) {
      throw new Error('No canvas was provided for the Experience.')
    }

    //3) Set canvas
    this.canvas = this.experience.canvas

    //4) Set webgl renderer instance
    this.setInstance()
  }

  /*
   ** ==========================
   ** Method - Set the webgl renderer instance
   ** ==========================
   */
  setInstance() {
    //1) Create instance
    this.instance = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })

    //2) Tweaks
    this.instance.setSize(this.sizes.WIDTH, this.sizes.HEIGHT)
    this.instance.setPixelRatio(this.sizes.PIXEL_RATIO)
    this.instance.toneMapping = CineonToneMapping
    this.instance.toneMappingExposure = 1.75
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = PCFSoftShadowMap
  }

  /*
   ** ==========================
   ** Method - Resize
   ** ==========================
   */
  resize() {
    this.instance.setSize(this.sizes.WIDTH, this.sizes.HEIGHT)
    this.instance.setPixelRatio(this.sizes.PIXEL_RATIO)
  }

  /*
   ** ==========================
   ** Method - Update
   ** ==========================
   */
  update() {
    this.instance.render(this.scene, this.camera.instance)
  }

  /*
   ** ==========================
   ** Method - Destroy
   ** ==========================
   */
  destroy() {
    this.instance.dispose()
  }
}

import { Scene } from 'three'

import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from './Utils/Resources'
import sources from './sources'
import Debug from './Utils/Degug'

/*
 ** ** ========================================================
 ** ** ** Class [Experience]
 ** ** ========================================================
 */
let instance: Experience
export default class Experience {
  /*
   ** ==========================
   ** Fields
   ** ==========================
   */
  debug: Debug
  canvas?: HTMLCanvasElement
  sizes: Sizes
  time: Time
  scene: Scene
  resources: Resources
  camera: Camera
  renderer: Renderer
  world: World

  /*
   ** ==========================
   ** Constructor
   ** ==========================
   */
  constructor(canvas?: HTMLCanvasElement) {
    //1) If class already initialized, return the same instance
    if (instance) {
      this.canvas = instance.canvas
      this.debug = instance.debug
      this.sizes = instance.sizes
      this.time = instance.time
      this.scene = instance.scene
      this.resources = instance.resources
      this.camera = instance.camera
      this.renderer = instance.renderer
      this.world = instance.world

      return instance
    }

    //2) Initialize
    instance = this
    this.canvas = canvas
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    //3) Register events
    this.sizes.on('resize', this.resize.bind(this))
    this.time.on('tick', this.update.bind(this))
  }

  /*
   ** ==========================
   ** Resize
   ** ==========================
   */
  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  /*
   ** ==========================
   ** Update
   ** ==========================
   */
  update() {
    this.camera.update()
    this.renderer.update()
  }

  /*
   ** ==========================
   ** Destroy
   ** ==========================
   */
  destroy() {
    this.sizes.destroy()
    this.time.destroy()
    this.camera.destroy()
    this.renderer.destroy()
    this.world.destroy()
  }
}

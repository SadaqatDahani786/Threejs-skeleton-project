import { PerspectiveCamera, Scene } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import Experience from './Experience'
import Sizes from './Utils/Sizes'

/*
 ** ** ========================================================
 ** ** ** Class [Experience]
 ** ** ========================================================
 */
export default class Camera {
  /*
   ** ==========================
   ** Fields
   ** ==========================
   */
  experience: Experience
  canvas: HTMLCanvasElement
  scene: Scene
  sizes: Sizes
  instance!: PerspectiveCamera
  orbitControls!: OrbitControls

  /*
   ** ==========================
   ** Constructor
   ** ==========================
   */
  constructor() {
    this.experience = new Experience()

    if (!this.experience.canvas) {
      throw new Error('No canvas was provided for the Experience.')
    }

    this.canvas = this.experience.canvas
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes

    this.setInstance()
    this.setControls()
  }

  /*
   ** ==========================
   ** Method - Set camera instance
   ** ==========================
   */
  setInstance() {
    this.instance = new PerspectiveCamera(
      45,
      this.sizes.WIDTH / this.sizes.HEIGHT,
      0.01,
      100
    )
    this.instance.position.set(6, 4, 8)
    this.scene.add(this.instance)
  }

  /*
   ** ==========================
   ** Method - Set orbit controls
   ** ==========================
   */
  setControls() {
    this.orbitControls = new OrbitControls(this.instance, this.canvas)
    this.orbitControls.enableDamping = true
  }

  /*
   ** ==========================
   ** Method - Resize
   ** ==========================
   */
  resize() {
    this.instance.aspect = this.sizes.WIDTH / this.sizes.HEIGHT
    this.instance.updateProjectionMatrix()
  }

  /*
   ** ==========================
   ** Method - Update
   ** ==========================
   */
  update() {
    this.orbitControls.update()
  }

  /*
   ** ==========================
   ** Method - Destroy
   ** ==========================
   */
  destroy() {
    this.orbitControls.dispose()
  }
}

import EventEmitter from './EventEmitter'
import { CubeTexture, CubeTextureLoader, Texture, TextureLoader } from 'three'
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import { ISourceType } from '../sources'

/*
 ** ** ========================================================
 ** ** ** Class [Resource]
 ** ** ========================================================
 */
export default class Resource extends EventEmitter {
  /*
   ** ==========================
   ** Fields
   ** ==========================
   */
  sources: ISourceType[]
  items: { [name: string]: Texture | CubeTexture | GLTF }
  toLoad: number
  loaded: number
  loaders!: {
    gltfLoader: GLTFLoader
    textureLoader: TextureLoader
    cubeTextureLoader: CubeTextureLoader
  }

  /*
   ** ==========================
   ** Constructor
   ** ==========================
   */
  constructor(sources: ISourceType[]) {
    //1) Call parent's constructor
    super()

    //2) Set defaults
    this.sources = sources
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    //3) Initialize loaders and start loading
    this.setLoaders()
    this.startLoading()
  }

  /*
   ** ==========================
   ** Method - Set loaders
   ** ==========================
   */
  setLoaders() {
    //1) Initialize loaders
    const gltfLoader = new GLTFLoader()
    const textureLoader = new TextureLoader()
    const cubeTextureLoader = new CubeTextureLoader()

    //2) Save
    this.loaders = {
      gltfLoader,
      cubeTextureLoader,
      textureLoader,
    }
  }

  /*
   ** ==========================
   ** Method - Start loading
   ** ==========================
   */
  startLoading() {
    //=> Load each resourse file by it's corresponding loader
    for (const source of this.sources) {
      switch (source.type) {
        case 'GLTF_MODEL':
          this.loaders.gltfLoader.load(source.path as string, (file) =>
            this.sourceLoaded(source, file)
          )
          break
        case 'CUBE_TEXTURE':
          this.loaders.cubeTextureLoader.load(source.path as string[], (file) =>
            this.sourceLoaded(source, file)
          )
          break
        case 'TEXTURE':
          this.loaders.textureLoader.load(source.path as string, (file) =>
            this.sourceLoaded(source, file)
          )
          break
      }
    }
  }

  /*
   ** ==========================
   ** Method - Source loaded
   ** ==========================
   */
  sourceLoaded(source: ISourceType, file: Texture | CubeTexture | GLTF) {
    //1) Save loaded file
    this.items[source.name] = file

    //2) Inc loaded count by 1
    this.loaded += 1

    //3) Once everything loaded, emit "ready" event
    if (this.loaded === this.sources.length) {
      this.emit('ready')
    }
  }
}

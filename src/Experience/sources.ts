/*
 ** ** ========================================================
 ** ** ** Interface [ISourceType]
 ** ** ========================================================
 */
export interface ISourceType {
  name: string
  type: 'CUBE_TEXTURE' | 'TEXTURE' | 'GLTF_MODEL'
  path: string[] | string
}

/*
 ** ** ========================================================
 ** ** ** Object [sources]
 ** ** ========================================================
 */
const sources: ISourceType[] = [
  {
    name: 'environmentMapTexture',
    type: 'CUBE_TEXTURE',
    path: [
      'textures/environment maps/px.jpg',
      'textures/environment maps/py.jpg',
      'textures/environment maps/nx.jpg',
      'textures/environment maps/ny.jpg',
      'textures/environment maps/pz.jpg',
      'textures/environment maps/nz.jpg',
    ],
  },
]

export default sources

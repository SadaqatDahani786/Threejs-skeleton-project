import './style.css'
import Experience from './Experience/Experience'

//1) Get canvas
const canvas = document.querySelector<HTMLCanvasElement>(
  '.artboard'
) as HTMLCanvasElement

//2) Instantiate the experience
new Experience(canvas)

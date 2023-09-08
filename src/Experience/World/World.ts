import {
  BoxGeometry,
  BufferGeometry,
  Mesh,
  MeshStandardMaterial,
  Scene,
} from "three";

import Experience from "../Experience";
import Environment from "./Environment";
import Resources from "../Utils/Resources";

/*
 ** ** ========================================================
 ** ** ** Class [World]
 ** ** ========================================================
 */
export default class World {
  /*
   ** ==========================
   ** Fields
   ** ==========================
   */
  experince: Experience;
  scene: Scene;
  environment!: Environment;
  resources: Resources;

  /*
   ** ==========================
   ** Constructor
   ** ==========================
   */
  constructor() {
    //1) Initialize
    this.experince = new Experience();
    this.scene = this.experince.scene;
    this.resources = this.experince.resources;

    //2) Test mesh
    const testMesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshStandardMaterial({ color: 0xffffff })
    );

    //3) Add to the scene
    this.experince.scene.add(testMesh);

    //4) Set environment when ready event fired
    this.resources.on("ready", () => {
      this.environment = new Environment();
    });
  }

  /*
   ** ==========================
   ** Method - Destroy
   ** ==========================
   */
  destroy() {
    //=> Traverse through each child in scene and dispose the disposable objects
    this.scene.traverse((child) => {
      if (child instanceof Mesh && child.geometry instanceof BufferGeometry) {
        child.geometry.dispose();

        for (const key in child.material) {
          const matKey = child.material[key];
          if (matKey && typeof matKey.dispose === "function") matKey.dispose();
        }
      }
    });
  }
}

import {
  CubeTexture,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  Scene,
} from "three";

import Experience from "../Experience";
import Resource from "../Utils/Resources";
import Debug from "../Utils/Degug";

/*
 ** ** ========================================================
 ** ** ** Class [World]
 ** ** ========================================================
 */
export default class Environment {
  /*
   ** ==========================
   ** Fields
   ** ==========================
   */
  experience: Experience;
  scene: Scene;
  resources: Resource;
  sunlight!: DirectionalLight;
  envMap!: {
    intensity: number;
    texture: CubeTexture;
  };
  debug: Debug;

  /*
   ** ==========================
   ** Constructor
   ** ==========================
   */
  constructor() {
    //1) Initialize
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    //2) Setup
    this.setSunlight();
    this.setEnvironmentMap();
    this.updateEnvironmentMap();

    //3) Debug UI
    if (this.debug.active)
      this.debug.ui.__folders.Environment.add(this.envMap, "intensity")
        .name("envMapIntensity")
        .min(0)
        .max(5)
        .step(0.001)
        .onChange(this.updateEnvironmentMap.bind(this));
  }

  /*
   ** ==========================
   ** Method - Set the sunlight
   ** ==========================
   */
  setSunlight() {
    //1) Create an instance
    this.sunlight = new DirectionalLight(0xffffff, 4);

    //2) Tweaks settings
    this.sunlight.castShadow = true;
    this.sunlight.shadow.normalBias = 0.05;
    this.sunlight.shadow.camera.far = 15;
    this.sunlight.shadow.mapSize.set(1024, 1024);
    this.sunlight.position.set(3.5, 2, -1.25);

    //3) Add to the scene
    this.scene.add(this.sunlight);

    //4) Debug UI
    if (this.debug.active) {
      this.debug.ui
        .addFolder("Environment")
        .add(this.sunlight, "intensity")
        .min(0)
        .max(5)
        .step(0.001)
        .name("sunlightIntensity");

      this.debug.ui.__folders.Environment.add(this.sunlight.position, "x")
        .min(-5)
        .max(5)
        .step(0.001)
        .name("sunlightPosX");

      this.debug.ui.__folders.Environment.add(this.sunlight.position, "y")
        .min(-5)
        .max(5)
        .step(0.001)
        .name("sunlightPosY");

      this.debug.ui.__folders.Environment.add(this.sunlight.position, "z")
        .min(-5)
        .max(5)
        .step(0.001)
        .name("sunlightPosZ");
    }
  }

  /*
   ** ==========================
   ** Method - Set the environment map
   ** ==========================
   */
  setEnvironmentMap() {
    //1) Initialize default values
    this.envMap = {
      intensity: 0.3,
      texture: this.resources.items.environmentMapTexture as CubeTexture,
    };

    //2) Set environment on the scene
    this.scene.environment = this.envMap.texture;
  }

  /*
   ** ==========================
   ** Method - Update the environment map
   ** ==========================
   */
  updateEnvironmentMap() {
    //=> Traverse through each child in scene and apply the environment map
    this.scene.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof MeshStandardMaterial
      ) {
        child.material.envMap = this.envMap.texture;
        child.material.envMapIntensity = this.envMap.intensity;
      }
    });
  }
}

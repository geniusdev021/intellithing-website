// import { DRACOLoader } from '/dependencies/three/loaders/DRACOLoader.js';

// const DRACO_PATH = '/dependencies/three/draco/';
// const draco_loader = new DRACOLoader().setDecoderPath(DRACO_PATH);

// import { GLTFLoader as _GLTFLoader } from '/dependencies/three/loaders/GLTFLoader.js';
import { OBJLoader } from '/dependencies/three/loaders/OBJLoader.js';

class GLTFLoader {
   #gltf;
   #counter = 0;

   constructor() {
      this.#gltf = new OBJLoader();
      // this.#gltf.setDRACOLoader(draco_loader);
   }

   load(path, dst_model, handler) {
      this.#gltf.load(path, src_model => {
         handler(dst_model, src_model);
         this.loadDone();
      });
   }

   loadDone() {
      this.#counter += 1;
   }

   get getLoadedCount() {
      return this.#counter;
   }
};

const GLTF = new GLTFLoader();

export default GLTF;
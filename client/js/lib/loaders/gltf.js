import { DRACOLoader } from '/dependencies/three/loaders/DRACOLoader.js';
import { GLTFLoader as _GLTFLoader } from '/dependencies/three/loaders/GLTFLoader.js';

const DRACO_PATH = '/dependencies/three/draco/';
const draco_loader = new DRACOLoader().setDecoderPath(DRACO_PATH);

class GLTFLoader {
   #gltf;
   #counter = 0;

   constructor() {
      this.#gltf = new _GLTFLoader();
      this.#gltf.setDRACOLoader(draco_loader);
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
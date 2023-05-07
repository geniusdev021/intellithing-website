import { PLYLoader as _PLYLoader } from '/dependencies/three/loaders/PLYLoader.js';

class PLYLoader {
   #ply;
   #counter = 0;

   constructor() {
      this.#ply = new _PLYLoader();
   }

   load(path, dst_model, handler) {
      this.#ply.load(path, src_model => {
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

const PLY = new PLYLoader();

export default PLY;
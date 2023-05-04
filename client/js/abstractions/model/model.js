import GLTF from '/js/lib/loaders/gltf.js';
import loadModelHandler from '/js/load/handlers/models.js';

class Model {
   #name;
   model = {};
   
   constructor(name, url) {
      this.#name = name;
      GLTF.load(url, this.model, loadModelHandler);
   }

   get scene() {
      return this.model.scene;
   } 
};

export default Model;
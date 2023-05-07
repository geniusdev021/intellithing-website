import PLY from '/js/lib/loaders/ply.js';
import loadModelHandler from '/js/load/handlers/models.js';

class Model {
   #name;
   model = {};
   
   constructor(name, url) {
      this.#name = name;
      PLY.load(url, this.model, loadModelHandler);
   }

   get scene() {
      return this.model.scene;
   } 
};

export default Model;
import GLTF from '/js/lib/loaders/gltf.js';
import handler from '/js/abstractions/handlers/example.js';

const ACTIVE_CLIP_NAME = 'walk';

class Example {
   #name;

   model = {
      animations: {},
      mixer: null,
   };

   constructor(name, url) {
      this.#name = name;
      GLTF.load(url, this.model, handler);
   }

   extensions() {
      const clip = this.model.animations[ACTIVE_CLIP_NAME];
      const action = this.model.mixer.clipAction(clip);
      action.play();
   }

   updateMixer(time) {
      this.model.mixer.update(time);
   }
};

export default Example;
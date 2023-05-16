import CScene from "/js/lib/controls/scene.js";
import instance from "/js/lib/instancing/instance.js";

class Workspace extends CScene {
   #pool = {};
   #pool_keys = [];

   morphTriangles(time) {
      const step = Math.sin(time * 0.0004);
      this.active_scene.morphTargetInfluences[0] = Math.abs(step);
   }

   rotateTriangles(_time) {
      const time = ~~(_time) * 0.0002;
      instance.rotate(time);
   }

   rotateActiveScene(period) {
      this.active_scene.rotation.y = period;
   }

   scaleActiveScene(period) {
      const scale_rate = 1.0 + (period * 0.3);
      this.active_scene.scale.set(scale_rate, scale_rate, scale_rate);
   }

   moveActiveScene(period) {
      const t = (period - 1.2) * 3.33; // 0 - 1 
      this.active_scene.position.x = 10 - (t * 10);
      this.active_scene.position.y = -2 + t;
      this.active_scene.updateMatrix();
      const scale_rate = 1.0 + (period - 0.3) * 0.3;
      this.active_scene.scale.set(scale_rate, scale_rate, scale_rate);
   }

   pool(time) {
      for (let i = 0; i < this.#pool_keys.length; i++) {
         const key = this.#pool_keys[i];
         this.#pool[key](time);
      };
   }

   addToPool(i, fn) {
      this.#pool[i] = fn;
      this.updatePoolKeys();
   }

   delFromPool(i) {
      delete this.#pool[i];
      this.updatePoolKeys();
   }
   
   updatePoolKeys() {
      this.#pool_keys = Object.keys(this.#pool);
   }
};

export default Workspace;
import CScene from "/js/lib/controls/scene.js";
import instance from "/js/lib/instancing/instance.js";

class Workspace extends CScene {
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
};

export default Workspace;
import CScene from "/js/lib/controls/scene.js";
import instance from "/js/lib/instancing/instance.js";

class Workspace extends CScene {
   morphTriangles(time) {
      const step = Math.sin(time * 0.0004);
      this.active_scene.morphTargetInfluences[0] = Math.abs(step);
   }

   rotateTriangles(_time) {
      const time = ~~(_time) * 0.0001;
      instance.rotate(this.active_scene, time);
   }
};

export default Workspace;
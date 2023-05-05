import CScene from "/js/lib/controls/scene.js";

class Workspace extends CScene {
   morphTriangles(time) {
      const step = Math.sin(time * 0.0004);
      this.active_scene.morphTargetInfluences[0] = Math.abs(step);
   }
};

export default Workspace;
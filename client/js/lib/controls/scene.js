class CScene {
   #src_scene;
   #active_scene;

   setSrcScene(src_scene) {
      this.#src_scene = src_scene;
   }

   setActiveScene(scene) {
      this.#active_scene = scene;
   }

   addSceneAndSave(scene) {
      this.addScene(scene);
      this.setActiveScene(scene);
   }

   addScene(scene) {
      this.#src_scene.add(scene);
   }

   delScene(scene) {
      scene.traverse(o => {
         if (o.geometry) o.geometry.dispose();
         if (o.material) {
            if (o.material.length) {
               for (let i = 0; i < o.material.length; ++i) o.material[i].dispose();
               return;
            };
            o.material.dispose();
         }
      });
      this.src_scene.remove(scene);
      this.#active_scene = null;
   }

   get active_scene() {
      return this.#active_scene;
   }
};

export default CScene;
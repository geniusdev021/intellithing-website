class CScene {
   src_target;
   dst_target;
   collection;
   scene;

   constructor(collection) {
      this.collection = collection;
   }

   setScene(scene) {
      this.scene = scene;
   }

   setTarget(name) {
      this.src_target = this.collection.getObject(name);
   }

   addTarget(name) {
      this.setDstTarget(name);
      if (this.src_target == this.dst_target) return;
      this.replaceScene();
      if (this.src_target.extensions) this.src_target.extensions();
   }

   initFirstTarget(first_name = this.getCollectionKeys[0]) {
      this.setDstTarget(first_name);
      this.addScene();
      this.swapTarget();
      if (this.src_target.extensions) this.src_target.extensions();
   }

   setDstTarget(name) {
      this.dst_target = this.collection.getObject(name); 
   }

   addScene(model = this.dst_target.model.scene) {
      this.scene.add(model);
   }

   delScene(model = this.src_target.model.scene) {
      model.traverse(o => {
         if (o.geometry) o.geometry.dispose();
         if (o.material) {
            if (o.material.length) {
               for (let i = 0; i < o.material.length; ++i) o.material[i].dispose();
               return;
            };
            o.material.dispose();
         }
      });
      this.scene.remove(model);
   }

   swapTarget() {
      this.src_target = this.dst_target;
   }

   replaceScene() {
      this.delScene();
      this.addScene();
      this.swapTarget();
   }

   get getCurrentTarget() {
      return this.src_target;
   }

   get getCollectionKeys() {
      return this.collection.getObjectKeys;
   }
};

export default CScene;
function loadModelHandler(dst_model, src_model) {
   saveSceneLink(dst_model, src_model);
   applyMaterial(dst_model);
   generateFigure(dst_model);
};

function saveSceneLink(dst_model, src_model) {
   dst_model.scene = src_model.scene;
};

function applyMaterial(dst_model) {
   const material = new THREE.MeshStandardMaterial({
      color: 0xc49f5f,
      roughness: 0.01,
      metalness: 0.5,
   });
   dst_model.scene.children[0].material = material;
};

function generateFigure(dst_model) {
   const { scene } = dst_model;
   const clone_scenes = [];
   for (let i = 0; i <= 4; i++) {
      const clone_scene = scene.clone();
      clone_scene.translateX(i * 1.2);
      clone_scenes.push(clone_scene);
   };
   for (let i = 0; i <= 4; i++) {
      const clone_scene = scene.clone();
      clone_scene.translateX(-i * 1.2);
      clone_scenes.push(clone_scene);
   };
   dst_model.clone_scenes = clone_scenes;
};

export default loadModelHandler;
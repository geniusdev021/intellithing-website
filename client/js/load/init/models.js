function initModels() {
   const {
      collections,
      workspace,
   } = INTELLITHING;

   const model_scene = collections.models.getObject('triangle');
   workspace.addScene(model_scene.scene);
   for (const scene of model_scene.model.clone_scenes) {
      workspace.addScene(scene);
   };
};

export default initModels;
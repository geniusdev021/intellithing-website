import instance from "/js/lib/instancing/instance.js";

function initModels() {
   const {
      collections,
      workspace,
   } = INTELLITHING;

   const triangle_model = collections.models.getObject('triangle').model;
   const E_model = collections.models.getObject('E').model;
   const random_model = collections.models.getObject('random').model;
   const E_model_scales = collections.models.getObject('E_scales').model;
   instance.create(triangle_model, E_model, E_model_scales, random_model);

   workspace.addSceneAndSave(triangle_model.mesh);
};

export default initModels;
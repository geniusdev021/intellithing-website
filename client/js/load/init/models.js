import triangle_meshes from "/js/lib/meshes/triangles.js";
import instance from "/js/lib/instancing/instance.js";
import action_0 from "/js/lib/instancing/actions/action0.js";
import action_1 from "/js/lib/instancing/actions/action1.js";
import action_2 from "/js/lib/instancing/actions/action2.js";

function initModels() {
   const {
      collections,
      workspace,
   } = INTELLITHING;

   const
      triangle_model = collections.models.getObject('triangle').model,
      chart_model = collections.models.getObject('chart').model,
      random_model = collections.models.getObject('random').model,
      chart_model_scales = collections.models.getObject('chart_scales').model;

   triangle_meshes.create(triangle_model);
   instance.create(triangle_model, chart_model, chart_model_scales, random_model);
   action_0.setPositionSrcArr(chart_model);
   action_0.setPositionDstArr(random_model);
   action_1.setPositionSrcArr(chart_model);
   action_2.setPositionSrcArr(chart_model);

   workspace.addSceneAndSave(triangle_model.mesh);
};

export default initModels;
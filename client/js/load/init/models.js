import instance from "/js/lib/instancing/instance.js";

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

   instance.create(triangle_model, chart_model, chart_model_scales, random_model);
   instance.setAssembleSrcArr(chart_model);
   instance.setAssembleDstArr(random_model);
   instance.setDisassembleSrcArr(chart_model);
   instance.setDisassembleDstArr(random_model);

   workspace.addSceneAndSave(triangle_model.mesh);
};

export default initModels;
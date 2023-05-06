import morph from "/js/lib/morphling/morph.js";
import instance from "/js/lib/instancing/instance.js";

function initModels() {
   const {
      collections,
      workspace,
   } = INTELLITHING;

   const triangle_model = collections.models.getObject('triangle');
   const cube_model = collections.models.getObject('cube');
   const star_model = collections.models.getObject('star');
   // morph.generate(triangle_model, cube_model, star_model);
   instance.create(triangle_model, cube_model, star_model);

   // workspace.addScene(triangle_model.mesh_1);
   workspace.addScene(triangle_model.mesh);
};

export default initModels;
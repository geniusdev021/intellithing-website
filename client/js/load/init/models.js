import morph from "/js/lib/morphling/morph.js";

function initModels() {
   const {
      collections,
      workspace,
   } = INTELLITHING;

   const triangle_model = collections.models.getObject('triangle');
   const cube_model = collections.models.getObject('cube');
   const star_model = collections.models.getObject('star');
   morph.generate(triangle_model, cube_model, star_model);

   workspace.addScene(triangle_model.mesh_1);
};

export default initModels;
function loadModelHandler(dst_model, src_model) {
   saveSceneLink(dst_model, src_model);
};

function saveSceneLink(dst_model, src_model) {
   // dst_model.scene = src_model.scene;
   dst_model.scene = src_model;
};

export default loadModelHandler;
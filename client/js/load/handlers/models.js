function loadModelHandler(dst_model, src_geometry) {
   saveSceneLink(dst_model, src_geometry);
};

function saveSceneLink(dst_model, src_geometry) {
   dst_model.geometry = src_geometry;
};

export default loadModelHandler;
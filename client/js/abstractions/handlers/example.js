function handler(_model, model) {
   saveScene(_model, model);
   saveClips(_model, model);
   createMixer(_model, model);
};

function saveScene(_model, model) {
   _model.scene = model.scene;
};

function saveClips(_model, model) {
   for (const clip of model.animations) 
      _model.animations[clip.name] = clip
};

function createMixer(_model, model) {
   _model.mixer = new THREE.AnimationMixer(model.scene);
}; 

export default handler;
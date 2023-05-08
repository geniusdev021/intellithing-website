import models from '/js/storage/models.js';
import PLY from '/js/lib/loaders/ply.js';
import Model from '/js/abstractions/model/model.js';
import base_stage from '/js/stages/base-stage.js';

let _interval;
const INTERVAL_MS = 100;

const load = {
   start,
};

function loadModels() {
   const models_collection = INTELLITHING.collections.models;
   for (const key in models) {
      const url = models[key].url, model = new Model(key, url);
      models_collection.setObject(key, model);
   };
};

function loadResources() {
   loadModels();
};

function start() {
   loadResources();
   checkLoadStatus();
};

function checkLoadStatus() {
   const models_count = INTELLITHING.collections.models.getObjectCount;

   _interval = setInterval(() => {
      if (models_count == PLY.getLoadedCount) {
         base_stage.start();
         window.render.start();
         clearInterval(_interval);
      };
   }, INTERVAL_MS);
};

export default load;
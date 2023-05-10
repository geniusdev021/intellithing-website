import initModels from '/js/load/init/models.js';
import initUI from '/js/UI/ui.js';
import instance from '/js/lib/instancing/instance.js';

const base_stage = {
   start,
};

function start() {
   initModels();
   initUI();
   instance.assemble();
};

export default base_stage;
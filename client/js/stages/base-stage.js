import initModels from '/js/load/init/models.js';
import initUI from '/js/UI/ui.js';

const base_stage = {
   start,
};

function start() {
   initModels();
   initUI();
};

export default base_stage;
import element from '/js/lib/helpers/elements.js';

const {
   GEBI,
   // GEBCN,
} = element; 

const 
   canvas = GEBI('canvas'),
   main_block_1 = GEBI('main-block-1'),
   main_block_2 = GEBI('main-block-2'),
   main_block_3 = GEBI('main-block-3'),
   main_panel = GEBI('main-panel'); 

const DOM = {
   canvas,
   main_block_1,
   main_block_2,
   main_block_3,
   main_panel,
};

export default DOM;
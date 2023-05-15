import element from '/js/lib/helpers/elements.js';

const {
   GEBI,
   GEBCN,
} = element; 

const 
   canvas = GEBI('canvas'),
   main_block_1 = GEBI('main-block-1'),
   main_block_2 = GEBI('main-block-2'),
   main_block_3 = GEBI('main-block-3'),
   main_block_4 = GEBI('main-block-4'),
   main_panel = GEBI('main-panel'),
   slider_container = GEBI('slider-container'),
   slider_btn_left = GEBI('slider-btn-left'),
   slider_btn_right = GEBI('slider-btn-right'); 

const 
   img_slider = GEBCN('img-slider');

const DOM = {
   canvas,
   main_block_1,
   main_block_2,
   main_block_3,
   main_block_4,
   main_panel,
   slider_container,
   slider_btn_left,
   slider_btn_right,

   img_slider,
};

export default DOM;
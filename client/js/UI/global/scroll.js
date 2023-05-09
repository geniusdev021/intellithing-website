import listener from '/js/lib/helpers/listener.js';
import DOM from '/js/storage/dom.js';
import math from '/js/lib/helpers/math.js';

const {
   addEv,
} = listener;

const {
   main_panel,
   main_block_1,
   main_block_2,
} = DOM;

const scroll_ui = {
   register,
};

const
   model_continues_time = 0.04,
   text_continues_time = 0.03;

let _dst_offset = 0;
let _src_offset = 0, _src_offset_1 = 0, _rAF;

const { lerp } = math;
const { round } = Math;

function smoothScroll() {
   _src_offset = lerp(_src_offset, _dst_offset, model_continues_time);
   _src_offset_1 = round(lerp(_src_offset_1, _dst_offset, text_continues_time));
   const scroll = "translateY(-" + ~~(_src_offset_1 * 0.3) + "px)";
   main_block_1.style.transform = scroll;
   main_block_2.style.transform = scroll;

   if (round(_src_offset) == _dst_offset) {
      cancelAnimationFrame(_rAF);
      _rAF = null;
      return;
   };

   const period = _src_offset / window.innerHeight;
   const { camera } = INTELLITHING.system;
   const { workspace } = INTELLITHING;
   camera.rotateAround(period);
   workspace.rotateActiveScene(period);
   workspace.scaleActiveScene(period);
   _rAF = requestAnimationFrame(smoothScroll);
};

function _scrollHandler() {
   const { scrollTop, scrollHeight, offsetHeight } = main_panel;
   _dst_offset = scrollTop;
   if (!_rAF) smoothScroll();
};

function register() {
   addEv(main_panel, 'scroll', _scrollHandler);
};

export default scroll_ui;
import listener from '/js/lib/helpers/listener.js';
import DOM from '/js/storage/dom.js';
import math from '/js/lib/helpers/math.js';
import instance from '/js/lib/instancing/instance.js';

const {
   addEv,
} = listener;

const {
   main_panel,
   main_block_1,
   main_block_2,
   main_block_3,
   main_block_4,
} = DOM;

const scroll_ui = {
   register,
};

const
   model_continues_time = 0.04,
   text_continues_time = 0.03;

const
   P_OFFSET_ACTION_1 = 0.5,
   P_OFFSET_ACTION_2 = 1.2;

let _dst_offset = 0;
let _src_offset = 0, _src_offset_1 = 0, _rAF;

const
   { lerp } = math,
   { round } = Math;

let _last_period = 0;

function action_1(period) {
   const dir = period - _last_period;
   const _period = Math.sin((period - P_OFFSET_ACTION_1) * 2);
   if (dir < 0) {
      instance.assemble_action_1(_period);
      const dp = Math.abs(period - _last_period);
      if (period - dp <= P_OFFSET_ACTION_1) instance.assemble_action_1(0);
      return;
   };
   instance.disassemble_action_1(_period, dir);
};

function action_2(period) {
   const dir = period - _last_period;
   // const _period = Math.sin((period - P_OFFSET_ACTION_2) * 2);
   const _period = (period - P_OFFSET_ACTION_2) * 1.25;
   if (dir < 0) {
      instance.assemble_action_2(_period);
      const dp = Math.abs(period - _last_period);
      if (period - dp <= P_OFFSET_ACTION_2) instance.assemble_action_2(0);
      return;
   };
   instance.disassemble_action_2(_period, dir);
};

function smoothScroll() {
   _src_offset = lerp(_src_offset, _dst_offset, model_continues_time);
   _src_offset_1 = round(lerp(_src_offset_1, _dst_offset, text_continues_time));

   const translte_style = "translateY(-" + ~~(_src_offset_1 * 0.3) + "px)";

   main_block_1.style.transform = translte_style;
   main_block_2.style.transform = translte_style;
   main_block_3.style.transform = translte_style;
   main_block_4.style.transform = translte_style;

   if (round(_src_offset) == _dst_offset) {
      cancelAnimationFrame(_rAF);
      _rAF = null;
      return;
   };

   const
      period = _src_offset / window.innerHeight,
      { camera } = INTELLITHING.system,
      { workspace } = INTELLITHING;

   if (period > 0.5 && period < 1.3) action_1(period);

   if (period < 0.9) {
      camera.rotateAround(period);
      workspace.rotateActiveScene(period);
      workspace.scaleActiveScene(period);
   };

   if (period >= 1.2 && period < 1.5) {
      camera.moveAround(period);
      workspace.moveActiveScene(period);
   };

   if (period >= 1.2 && period < 2.1) action_2(period);

   _last_period = period;
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
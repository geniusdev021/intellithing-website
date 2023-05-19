import listener from '/js/lib/helpers/listener.js';
import DOM from '/js/storage/dom.js';
import math from '/js/lib/helpers/math.js';
import instance from '/js/lib/instancing/instance.js';
import triangle_meshes from '/js/lib/meshes/triangles.js';

const {
   addEv,
} = listener;

const {
   main_panel,
} = DOM;

const scroll_ui = {
   register,
};

const
   scene_continues_time = 0.04,
   text_continues_time = 0.03;

const
   P_OFFSET_ACTION_1 = 0.5,
   P_OFFSET_ACTION_2 = 1.2;

let _dst_offset = 0;
let _src_offset = 0, _src_offset_1 = 0, _rAF;
let _last_period = 0;

const
   { lerp } = math,
   { round } = Math;

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
   const _period = (period - P_OFFSET_ACTION_2) * 1.25;
   if (dir < 0) {
      instance.assemble_action_2(_period);
      const dp = Math.abs(period - _last_period);
      if (period - dp <= P_OFFSET_ACTION_2) instance.assemble_action_2(0);
      return;
   };
   instance.disassemble_action_2(_period, dir);
};

let _block_5_bit_1 = false, _block_5_bit_2 = false, _block_5_bit_3 = false;

function smoothScroll() {
   _src_offset = lerp(_src_offset, _dst_offset, scene_continues_time);
   // _src_offset_1 = round(lerp(_src_offset_1, _dst_offset, text_continues_time));

   if (round(_src_offset) == _dst_offset) {
      cancelAnimationFrame(_rAF);
      _rAF = null;
      return;
   };

   const translate_style = `translateY(${-_src_offset}px) translateZ(0)`;
   main_panel.style.transform = translate_style;

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

   if (period >= 3.75 && !_block_5_bit_1) {
      _block_5_bit_1 = true;
      triangle_meshes.appear_1();
   };

   if (period >= 3.8 && !_block_5_bit_2) {
      _block_5_bit_2 = true;
      triangle_meshes.appear_2();
   };

   if (period >= 3.85 && !_block_5_bit_3) {
      _block_5_bit_3 = true;
      triangle_meshes.appear_3();
   };

   _last_period = period;
   _rAF = requestAnimationFrame(smoothScroll);
};

function _scrollHandler() {
   const { scrollTop } = document.documentElement;
   _dst_offset = scrollTop;
   if (!_rAF) smoothScroll();
};

function register() {
   const height = main_panel.getBoundingClientRect().height - 1;
   root.style.height = Math.floor(height) + 'px'; 
   addEv(document, 'scroll', _scrollHandler);
};

export default scroll_ui;
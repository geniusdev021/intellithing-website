import listener from '/js/lib/helpers/listener.js';
import HTMLNode from '/js/lib/helpers/HTMLNode.js';
import DOM from '/js/storage/dom.js';

const {
   addEv,
} = listener;

const {
   toggleClass,
} = HTMLNode;

const {
   main_panel
} = DOM;

const scroll_ui = {
   register,
};

function _scrollHandler() {
   const { scrollTop, scrollHeight, offsetHeight } = main_panel;
   const { camera } = INTELLITHING.system;
   const { workspace } = INTELLITHING;
   const period = scrollTop / window.innerHeight;
   if (period >= 1) return;
   camera.rotateAround(period);
   // workspace.active_scene.rotation.y = Math.sin(time);
   workspace.active_scene.rotation.y = period;
   const scale_rate = 1.0 + (period * 0.3);
   workspace.active_scene.scale.set(scale_rate, scale_rate, scale_rate);
};

function register() {
   addEv(main_panel, 'scroll', _scrollHandler);
};

export default scroll_ui;
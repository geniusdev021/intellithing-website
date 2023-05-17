import listener from '/js/lib/helpers/listener.js';
import DOM from '/js/storage/dom.js';
import HTMLNode from '/js/lib/helpers/HTMLNode.js';

const {
   addEv,
} = listener;

const {
   addClass,
   rmClass,
   insertAdjacent,
} = HTMLNode;

const {
   slider_container,
   slider_btn_left,
   slider_btn_right,
   img_slider,
} = DOM;

const slider_ui = {
   register,
};

let _pointer = 5;

function _to_left_handler() {
   if (_pointer == 0) {
      rmClass(slider_container, `active-${_pointer}`);
      rmClass(img_slider[_pointer]);
      _pointer = 9;
      addClass(slider_container, `active-${_pointer}`);
      addClass(img_slider[_pointer]);
      return;
   };
   rmClass(slider_container, `active-${_pointer}`);
   rmClass(img_slider[_pointer]);
   _pointer -= 1;
   addClass(slider_container, `active-${_pointer}`);
   addClass(img_slider[_pointer]);
};

function _to_right_handler() {
   if (_pointer == 9) {
      rmClass(slider_container, `active-${_pointer}`);
      rmClass(img_slider[_pointer]);
      _pointer = 0;
      addClass(slider_container, `active-${_pointer}`);
      addClass(img_slider[_pointer]);
      return;
   };
   rmClass(slider_container, `active-${_pointer}`);
   rmClass(img_slider[_pointer]);
   _pointer += 1;
   addClass(slider_container, `active-${_pointer}`);
   addClass(img_slider[_pointer]);
};

function register() {
   addEv(slider_btn_left, 'click', _to_left_handler);
   addEv(slider_btn_right, 'click', _to_right_handler);
   addClass(img_slider[_pointer]);
};

export default slider_ui;
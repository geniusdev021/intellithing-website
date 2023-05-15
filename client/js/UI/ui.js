import scroll_ui from '/js/UI/global/scroll.js';
import raycast_ui from '/js/UI/global/raycast.js';
import slider_ui from '/js/UI/global/slider.js';

function initUI() {
   scroll_ui.register();
   raycast_ui.register();
   slider_ui.register();
};

export default initUI;
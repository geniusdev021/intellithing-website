import listener from '/js/lib/helpers/listener.js';
import checkMeshesUnderCursor from '/js/lib/mouse/meshes.js';

const {
   addEv,
} = listener;

const raycast_ui = {
   register,
};

function register() {
   addEv(window, 'mousemove', checkMeshesUnderCursor);
};

export default raycast_ui;
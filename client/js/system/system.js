import DOM from '/js/storage/dom.js';
import SYSTEM_PRESETS from '/js/system/presets.js';
import Configer from '/js/lib/configer/configer.js';
import Camera from '/js/lib/camera/camera.js';
import OrbitControl from '/js/lib/camera/controls/orbit.js';
import HemisphereLight from '/js/lib/light/hemisphere.js';

const 
   { canvas } = DOM,
   { CTX_PRESETS,
     CHARACTER_CAMERA_PRESETS,
     ORBIT_CONTROL_PRESETS,
     HEMISPHERE_LIGHT_PRESETS,
   } = SYSTEM_PRESETS;

const 
   configer = new Configer(),
   scene = new THREE.Scene(),
   renderer = new THREE.WebGLRenderer({
      canvas,
      ...CTX_PRESETS,
   });

configer.setRenderer(renderer);

example_controller.setScene(scene);

const 
   camera = new Camera(CHARACTER_CAMERA_PRESETS),
   orbit_control = new OrbitControl(camera.src, canvas, ORBIT_CONTROL_PRESETS),
   hemisphere_light = new HemisphereLight(HEMISPHERE_LIGHT_PRESETS); 

orbit_control.src.update();

scene.add(hemisphere_light);

const system = {
   scene,
   renderer,
   camera,
};

export default system;

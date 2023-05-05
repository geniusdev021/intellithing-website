import DOM from '/js/storage/dom.js';
import SYSTEM_PRESETS from '/js/system/presets.js';
import Configer from '/js/lib/configer/configer.js';
import Camera from '/js/lib/camera/camera.js';
import OrbitControl from '/js/lib/camera/controls/orbit.js';
import HemisphereLight from '/js/lib/light/hemisphere.js';
import SpotLight from '/js/lib/light/spot.js';

const 
   { canvas } = DOM,
   { CTX_PRESETS,
     CHARACTER_CAMERA_PRESETS,
     ORBIT_CONTROL_PRESETS,
     HEMISPHERE_LIGHT_PRESETS,
     SPOT_LIGHT_TOP_PRESETS,
   } = SYSTEM_PRESETS;

const 
   configer = new Configer(),
   scene = new THREE.Scene(),
   renderer = new THREE.WebGLRenderer({
      canvas,
      ...CTX_PRESETS,
   });

configer.setRenderer(renderer);
INTELLITHING.workspace.setSrcScene(scene);

const 
   camera = new Camera(CHARACTER_CAMERA_PRESETS),
   orbit_control = new OrbitControl(camera.src, canvas, ORBIT_CONTROL_PRESETS),
   hemisphere_light = new HemisphereLight(HEMISPHERE_LIGHT_PRESETS),
   spot_light_top = new SpotLight(SPOT_LIGHT_TOP_PRESETS);

orbit_control.src.update();

scene.add(hemisphere_light).add(spot_light_top);

const system = {
   scene,
   renderer,
   camera,
};

INTELLITHING.system = system;

export default system;

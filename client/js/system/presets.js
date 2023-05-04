const CTX_PRESETS = {
   antialias: true,
};

const CHARACTER_CAMERA_PRESETS = {
   fov: 100,
   aspect: 2,
   near: .25,
   far: 100,
   pos: [0, 1.7, -20],
   lookAt: [0, 1, 0],
};

const ORBIT_CONTROL_PRESETS = {
   minDistance: 4,
   maxDistance: 10,
   rotateSpeed: 0.4,
   zoomSpeed: 0.4,
   maxPolarAngle: (Math.PI / 2) - 0.05,
   enablePan: false,
};

const HEMISPHERE_LIGHT_PRESETS = {
   skyColor: 0xdef1fc,
   groundColor: 0xa39c91,
   intensity: 1,
};

const SPOT_LIGHT_TOP_PRESETS = {
   color: 0xffffff,
   intensity: 2.8,
   // position: [0, 20, 10],
   position: [5, 20, 20],
};

const SYSTEM_PRESETS = {
   CTX_PRESETS,
   CHARACTER_CAMERA_PRESETS,
   ORBIT_CONTROL_PRESETS,
   HEMISPHERE_LIGHT_PRESETS,
   SPOT_LIGHT_TOP_PRESETS,
};

export default SYSTEM_PRESETS;

const CTX_PRESETS = {
   antialias: true,
};

const CHARACTER_CAMERA_PRESETS = {
   fov: 100,
   aspect: 2,
   near: .25,
   far: 100,
   pos: [0, 1.7, -2],
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
   skyColor: 0xB1E1FF,
   groundColor: 0xB97A20,
   intensity: 1.3,
};

const SYSTEM_PRESETS = {
   CTX_PRESETS,
   CHARACTER_CAMERA_PRESETS,
   ORBIT_CONTROL_PRESETS,
   HEMISPHERE_LIGHT_PRESETS,
};

export default SYSTEM_PRESETS;

import pointer from '/js/lib/helpers/pointer.js';

const { getPos } = pointer;

const raycaster = new THREE.Raycaster();
const coords = new THREE.Vector2(1, 1);
const coords_1 = new THREE.Vector2(1, 1);
const color = new THREE.Color();

function test(coords, camera, active_scene) {
   raycaster.setFromCamera(coords, camera.src);
   const intersection  = raycaster.intersectObject(active_scene);
   if (intersection.length > 0) {
      const instanceId = intersection[0].instanceId;
      active_scene.getColorAt( instanceId, color );
      active_scene.setColorAt( instanceId, color.setHex( Math.random() * 0xffffff ) );
      active_scene.instanceColor.needsUpdate = true;
   };
};

function checkMeshesUnderCursor(ev) {
   const pos = getPos(ev);
   const { system, workspace } = INTELLITHING;
   const { camera } = system;
   const { active_scene } = workspace;
   coords.x = (pos[0] / window.innerWidth) * 2 - 1;
   coords.y = -(pos[1] / window.innerHeight) * 2 + 1;
   for (let i = 0; i <= 5; i++) {
      coords_1.x = coords.x + i * 0.01;
      test(coords_1, camera, active_scene);

      coords_1.x = coords.x - i * 0.01;
      test(coords_1, camera, active_scene);

      coords_1.y = coords.y + i * 0.01;
      test(coords_1, camera, active_scene);

      coords_1.y = coords.y - i * 0.01;
      test(coords_1, camera, active_scene);
   };
};

export default checkMeshesUnderCursor;
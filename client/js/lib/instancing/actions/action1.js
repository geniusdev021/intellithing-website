import target from "../target.js";
import { dummy, matrix } from "../dummy.js";

const { getInstancedMesh } = target;

const MESHES_COUNT = 400;
let count, _arr, _src_model_arr;

function disassemble_action_1(period, dir) {
   const instanced_mesh = getInstancedMesh();
   const t = period * 2.5; // 0 - 1
   count = ~~(t * MESHES_COUNT);
   const _t = dir * 100;
   const arr = [];

   for (let i = 0; i <= count; i++) {
      instanced_mesh.getMatrixAt(i, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      dummy.position.y += _t * 0.1;
      dummy.position.x += Math.sin(i) * _t * 2;
      dummy.position.z += Math.cos(i) * _t * 2;

      dummy.updateMatrix();

      const { x, y, z } = dummy.position;

      arr.push(x, y, z);

      instanced_mesh.setMatrixAt(i, dummy.matrix);
   };

   _arr = arr;
   instanced_mesh.instanceMatrix.needsUpdate = true;
};

function assemble_action_1(period) {
   const instanced_mesh = getInstancedMesh();
   const t = period * 2.5; // 1 - 0 

   for (let i = 0, j = 0; i <= count; i++, j += 3) {
      instanced_mesh.getMatrixAt(i, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      const pos_1 = new THREE.Vector3(
         _src_model_arr[j],
         _src_model_arr[j + 1],
         _src_model_arr[j + 2],
      );

      const pos_2 = new THREE.Vector3(
         _arr[j],
         _arr[j + 1],
         _arr[j + 2],
      );

      dummy.position.copy(pos_1.lerp(pos_2, t));

      dummy.updateMatrix();
      instanced_mesh.setMatrixAt(i, dummy.matrix);
   };

   instanced_mesh.instanceMatrix.needsUpdate = true;
};

function setPositionSrcArr(model) {
   _src_model_arr = model.geometry.attributes.position.array;
};

const action_1 = {
   setPositionSrcArr,
};

export default action_1;
export { assemble_action_1, disassemble_action_1 };
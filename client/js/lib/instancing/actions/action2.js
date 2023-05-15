import target from "../target.js";
import { dummy, matrix } from "../dummy.js";

const { getInstancedMesh } = target;

let count_1, count_2, count_3, _src_model_arr;
let obj = {};
let _tr;

function disassemble_action_2(period, dir) {
   const instanced_mesh = getInstancedMesh();
   const t = period * 1.25; // 0 - 1
   count_1 = ~~(t * 232);
   count_2 = ~~(t * 408);
   count_3 = ~~(t * 632);
   const _t = dir * 100;
   
   if (count_1 > 232) count_1 = 232;
   if (count_2 > 408) count_2 = 408;
   if (count_3 > 632) count_3 = 632;

   for (let i = 0; i <= count_1; i++) {
      const ir = 631 - i;
      instanced_mesh.getMatrixAt(ir, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      dummy.position.y += _t * 0.1;
      dummy.position.x += Math.sin(ir) * _t;
      dummy.position.z += Math.cos(ir) * _t;

      dummy.updateMatrix();

      obj[ir] = dummy.position.clone();

      instanced_mesh.setMatrixAt(ir, dummy.matrix);
   };

   for (let i = 0; i <= count_2; i++) {
      const ir = 1039 - i;
      instanced_mesh.getMatrixAt(ir, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      dummy.position.y += _t * 0.2;
      dummy.position.x += Math.sin(ir) * _t;
      dummy.position.z += Math.cos(ir) * _t;

      dummy.updateMatrix();

      obj[ir] = dummy.position.clone();

      instanced_mesh.setMatrixAt(ir, dummy.matrix);
   };

   for (let i = 0; i <= count_3; i++) {
      const ir = 1671 - i;
      instanced_mesh.getMatrixAt(ir, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      dummy.position.y += -_t * 0.1;
      dummy.position.x += Math.sin(ir) * _t;
      dummy.position.z += Math.cos(ir) * _t;

      dummy.updateMatrix();

      obj[ir] = dummy.position.clone();

      instanced_mesh.setMatrixAt(ir, dummy.matrix);
   };

   _tr = 1 / t; 
   instanced_mesh.instanceMatrix.needsUpdate = true;
};

function assemble_action_2(period) {
   const instanced_mesh = getInstancedMesh();
   let t = period * 1.25; // 0 - 1

   for (const i in obj) {
      instanced_mesh.getMatrixAt(i, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      const j = i * 3;

      const pos_1 = new THREE.Vector3(
         _src_model_arr[j],
         _src_model_arr[j + 1],
         _src_model_arr[j + 2],
      );

      if (dummy.position.equals(pos_1)) continue;

      const pos = obj[i];
      dummy.position.copy(pos_1.lerp(pos, t * _tr));
      dummy.updateMatrix();
      instanced_mesh.setMatrixAt(i, dummy.matrix);
   };

   instanced_mesh.instanceMatrix.needsUpdate = true;
};

function setPositionSrcArr(model) {
   _src_model_arr = model.geometry.attributes.position.array;
};

const action_2 = {
   setPositionSrcArr,
};

export default action_2;
export { assemble_action_2, disassemble_action_2 };
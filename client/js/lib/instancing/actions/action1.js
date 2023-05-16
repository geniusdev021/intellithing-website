import target from "../target.js";
import { dummy, matrix } from "../dummy.js";

const { getInstancedMesh } = target;

const MESHES_COUNT = 399;
let count, _src_model_arr;
let obj = {}, src_clone_obj = {};
let _tr;

function disassemble_action_1(period, dir) {
   const instanced_mesh = getInstancedMesh();
   const pt = period * 1.8;
   const t = (pt > 1) ? 1 : pt;
   const _t = period * 1.25; // 0 - 1
   count = ~~(t * MESHES_COUNT);
   const spread = dir * 40;

   for (let i = 0; i <= count; i++) {
      instanced_mesh.getMatrixAt(i, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      dummy.position.y += spread * 0.1;
      dummy.position.x += Math.sin(i) * spread * 2;
      dummy.position.z += Math.cos(i) * spread * 2;

      dummy.updateMatrix();
      obj[i] = dummy.position.clone();
      instanced_mesh.setMatrixAt(i, dummy.matrix);
   };

   _tr = 1 / _t;
   Object.assign(src_clone_obj, obj);
   instanced_mesh.instanceMatrix.needsUpdate = true;
};

function assemble_action_1(period) {
   const instanced_mesh = getInstancedMesh();
   // const t = period * 2; // 1 - 0 
   const t = period * 1.25; // 1 - 0 

   for (const i in obj) {
      instanced_mesh.getMatrixAt(i, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      const j = i * 3;

      const pos_1 = new THREE.Vector3(
         _src_model_arr[j],
         _src_model_arr[j + 1],
         _src_model_arr[j + 2],
      );

      const ttr = t * _tr;

      const 
         pos = obj[i],
         src_pos = src_clone_obj[i],
         interm_lerp = pos.lerp(src_pos, ttr);

      dummy.position.copy(pos_1.lerp(interm_lerp, ttr));

      dummy.updateMatrix();
      obj[i] = dummy.position.clone();
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
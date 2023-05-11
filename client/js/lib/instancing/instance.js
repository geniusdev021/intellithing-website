import generateInstances from "./generate.js";
import setInstancesMetadata from "./metadata.js";
import assemble from "./assemble.js";
import rotate from "./rotate.js";
import target from "./target.js";
import { setAssembleSrcArr, setAssembleDstArr } from "./assemble.js";
import math from '/js/lib/helpers/math.js';

import { dummy, matrix } from "./dummy.js";

const { lerp } = math;

const { getInstancedMesh } = target;

const instance = {
   create,
   rotate,
   assemble,
   setAssembleSrcArr,
   setAssembleDstArr,
   disassemble,
   disassemble_test,
   setDisassembleSrcArr,
   setDisassembleDstArr,
};

const _get_vertices_count = ({ geometry }) => geometry.attributes.position.array.length / 3;

let _src_model_arr;
let _dst_model_arr;

function setDisassembleSrcArr(model) {
   _src_model_arr = model.geometry.attributes.position.array;
};

function setDisassembleDstArr(model) {
   _dst_model_arr = model.geometry.attributes.position.array;
};

let count;
let _arr;

function disassemble_step(period, dir) {
   const instanced_mesh = getInstancedMesh();
   const t = period * 2.5; // 0 - 1
   count = ~~(t * 400);
   // count = ~~(period * 1000);
   const tt = 0.2;
   const _t = dir * 100;
   const arr = [];

   for (let i = 0, j = 0; i <= count; i++, j += 3) {
      instanced_mesh.getMatrixAt(i, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      dummy.position.y += _t * 0.1;
      dummy.position.x += Math.sin(i) * _t * 2;
      dummy.position.z += Math.cos(i) * _t * 2;

      // dummy.position.x = _src_model_arr[j] + (Math.sin(i * 1) * (count - i) * tt);
      // dummy.position.y = _src_model_arr[j + 1] + (count - i) * 0.01;
      // dummy.position.z = _src_model_arr[j + 2] + (Math.cos(i * 1) * (count - i) * tt);

      dummy.updateMatrix();
      arr.push(
         dummy.position.x,
         dummy.position.y,
         dummy.position.z,
      );

      instanced_mesh.setMatrixAt(i, dummy.matrix);
   };

   _arr = arr;
   instanced_mesh.instanceMatrix.needsUpdate = true;
};

function disassemble_test(period) {
   const instanced_mesh = getInstancedMesh();
   const t = period * 2.5; // 0 - 1

   for (let i = 0, j = 0; i <= _arr.length / 3; i++, j += 3) {
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

function disassemble(period, dir) {
   disassemble_step(period, dir);
};

function create(triangle_model, E_model, E_model_scales) {
   const vertices_count = _get_vertices_count(E_model);
   generateInstances(triangle_model, vertices_count);
   const instanced_mesh = getInstancedMesh();
   instanced_mesh.position.set(10, -2, 0);
   setInstancesMetadata(E_model, E_model_scales);
   triangle_model.mesh = instanced_mesh;
};

export default instance;
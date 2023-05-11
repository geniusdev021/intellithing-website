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

function disassemble_step(period) {
   const instanced_mesh = getInstancedMesh();
   count = ~~(period * 1000);
   // const tt = period * 2.5; // 0 - 1
   const tt = 0.2;

   for (let i = 0, j = 0; i <= count; i++, j += 3) {
      instanced_mesh.getMatrixAt(i, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      // dummy.position.y += 0.03;
      // dummy.position.x += Math.sin(i) * 0.1;
      // dummy.position.z += Math.cos(i) * 0.1;

      dummy.position.x = _src_model_arr[j] + (Math.sin(i * 1) * (count - i) * tt);
      dummy.position.y = _src_model_arr[j + 1] + (count - i) * 0.01;
      dummy.position.z = _src_model_arr[j + 2] + (Math.cos(i * 1) * (count - i) * tt);


      dummy.updateMatrix();
      instanced_mesh.setMatrixAt(i, dummy.matrix);
   };

   instanced_mesh.instanceMatrix.needsUpdate = true;
};

function disassemble_test() {
   const instanced_mesh = getInstancedMesh();

   for (let i = 0, j = 0; i <= _src_model_arr.length; i++, j += 3) {
      instanced_mesh.getMatrixAt(i, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      dummy.position.x = _src_model_arr[j];
      dummy.position.y = _src_model_arr[j + 1];
      dummy.position.z = _src_model_arr[j + 2];


      dummy.updateMatrix();
      instanced_mesh.setMatrixAt(i, dummy.matrix);
   };

   instanced_mesh.instanceMatrix.needsUpdate = true;
};

function disassemble(period) {
   disassemble_step(period);
};

// window.addEventListener('click', () => {
// const instanced_mesh = getInstancedMesh();
// for (let i = 0, j = 0; i <= 63 +28; i++, j+=3) {
//    instanced_mesh.getMatrixAt(i, matrix);
//    matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

//    dummy.position.x -= 5;

//    dummy.updateMatrix();
//    instanced_mesh.setMatrixAt(i, dummy.matrix);
// };

// instanced_mesh.instanceMatrix.needsUpdate = true;
// });

function create(triangle_model, E_model, E_model_scales) {
   const vertices_count = _get_vertices_count(E_model);
   generateInstances(triangle_model, vertices_count);
   const instanced_mesh = getInstancedMesh();
   instanced_mesh.position.set(10, -2, 0);
   setInstancesMetadata(E_model, E_model_scales);
   triangle_model.mesh = instanced_mesh;
};

export default instance;
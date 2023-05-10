import generateInstances from "./generate.js";
import setInstancesMetadata from "./metadata.js";
import assemble from "./assemble.js";
import rotate from "./rotate.js";
import target from "./target.js";
import { setAssembleSrcArr, setAssembleDstArr } from "./assemble.js";

import { dummy, matrix } from "./dummy.js";

const { getInstancedMesh } = target;

const instance = {
   create,
   rotate,
   assemble,
   setAssembleSrcArr,
   setAssembleDstArr,
   disassemble,
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

function disassemble(period) {
   console.log(period);
   const instanced_mesh = getInstancedMesh();
   const count = ~~(period * 1000);
   // const count = 100;
   for (let i = 0, j = 0; i <= count; i++, j+=3) {
      instanced_mesh.getMatrixAt(i, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      dummy.position.y += 0.1;
      dummy.position.x += Math.sin(i) * 0.1;
      dummy.position.z += Math.cos(i) * 0.1;

      // const pos_1 = new THREE.Vector3(
      //    _src_model_arr[j],
      //    _src_model_arr[j + 1],
      //    _src_model_arr[j + 2],
      // );

      // const pos_2 = new THREE.Vector3(
      //    _dst_model_arr[j],
      //    _dst_model_arr[j + 1],
      //    _dst_model_arr[j + 2],
      // );

      // dummy.position.copy(pos_2.lerp(pos_1, period));

      dummy.updateMatrix();
      instanced_mesh.setMatrixAt(i, dummy.matrix);
   };

   instanced_mesh.instanceMatrix.needsUpdate = true;
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
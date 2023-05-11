import { dummy, matrix } from "./dummy.js";
import target from "./target.js";

const { getInstancedMesh } = target;

const { sin } = Math;

let _raF;
let _x = 0;
let _time = 0;
let _src_model_arr;
let _dst_model_arr;

function setAssembleSrcArr(model) {
   _src_model_arr = model.geometry.attributes.position.array; 
};

function setAssembleDstArr(model) {
   _dst_model_arr = model.geometry.attributes.position.array; 
};

function assembling_step(time) {
   const 
      instanced_mesh = getInstancedMesh(),
      { count } = instanced_mesh;

   for (let i = 0, j = 0; i <= count; i++, j+=3) {
      instanced_mesh.getMatrixAt(i, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      const pos_1 = new THREE.Vector3(
         _src_model_arr[j],
         _src_model_arr[j + 1],
         _src_model_arr[j + 2],
      );

      const pos_2 = new THREE.Vector3(
         _dst_model_arr[j],
         _dst_model_arr[j + 1],
         _dst_model_arr[j + 2],
      );

      dummy.position.copy(pos_2.lerp(pos_1, time));

      dummy.updateMatrix();
      instanced_mesh.setMatrixAt(i, dummy.matrix);
   };

   instanced_mesh.instanceMatrix.needsUpdate = true;
};

function assemble() {
   _x += 0.007;
   _time = _x * sin(_x);
   // _x += 0.01;
   // _time = sin(_x) * _x * _x / 3.9;

   assembling_step(_time);

   // if (_x >= 2.38) {
   if (_x >= 1.11) {
      assembling_step(1);
      cancelAnimationFrame(_raF);
      return;
   };

   _raF = requestAnimationFrame(assemble);
};

export default assemble;
export { setAssembleSrcArr, setAssembleDstArr };
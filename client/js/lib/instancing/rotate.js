import { dummy, matrix } from "./dummy.js";
import target from "./target.js";

const { getInstancedMesh } = target;

function rotate(time) {
   const 
      instanced_mesh = getInstancedMesh(),
      { count } = instanced_mesh;

   for (let i = 0, j = 0; i <= count; i++, j+=3) {
      instanced_mesh.getMatrixAt(i, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      dummy.rotation.x = i + time;
      dummy.rotation.y = i + time;
      dummy.rotation.z = time;

      dummy.updateMatrix();
      instanced_mesh.setMatrixAt(i, dummy.matrix);
   };

   instanced_mesh.instanceMatrix.needsUpdate = true;
};


export default rotate;
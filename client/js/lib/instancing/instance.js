import generateInstances from "./generate.js";
import setInstancesMetadata from "./metadata.js";
import assemble from "./assemble.js";
import rotate from "./rotate.js";
import target from "./target.js";
import { setAssembleSrcArr, setAssembleDstArr } from "./assemble.js";

const { getInstancedMesh } = target;

const instance = {
   create,
   rotate,
   assemble,
   setAssembleSrcArr,
   setAssembleDstArr,
};

const _get_vertices_count = ({ geometry }) => geometry.attributes.position.array.length / 3;

// window.addEventListener('click', () => {
//    const { count } = _instanced_mesh;
//    console.log('click', count);
//    for (let i = 0, j = 0; i <= count; i++, j+=3) {
//       _instanced_mesh.getMatrixAt(i, matrix);
//       matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

//       dummy.position.x -= 5;

//       dummy.updateMatrix();
//       _instanced_mesh.setMatrixAt(i, dummy.matrix);
//    };

//    _instanced_mesh.instanceMatrix.needsUpdate = true;
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
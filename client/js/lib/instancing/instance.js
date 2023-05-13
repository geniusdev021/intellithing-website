import generateInstances from "./generate.js";
import setInstancesMetadata from "./metadata.js";
import { assemble_action_0 } from "./actions/action0.js";
import rotate from "./rotate.js";
import target from "./target.js";
import { assemble_action_1, disassemble_action_1 } from "./actions/action1.js";
import { assemble_action_2, disassemble_action_2 } from "./actions/action2.js";

const { getInstancedMesh } = target;

const instance = {
   create,
   rotate,
   assemble_action_0,
   disassemble_action_1,
   disassemble_action_2,
   assemble_action_1,
   assemble_action_2,
};

const _get_vertices_count = ({ geometry }) => geometry.attributes.position.array.length / 3;

function create(triangle_model, E_model, E_model_scales) {
   const vertices_count = _get_vertices_count(E_model);
   generateInstances(triangle_model, vertices_count);
   const instanced_mesh = getInstancedMesh();
   instanced_mesh.position.set(10, -2, 0);
   setInstancesMetadata(E_model, E_model_scales);
   triangle_model.mesh = instanced_mesh;
};

export default instance;
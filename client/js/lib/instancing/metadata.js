import { dummy } from "./dummy.js";
import target from "./target.js";

const { getInstancedMesh } = target;

function setInstanceMetadata(dst_model, dst_model_scales) {
   const
      instanced_mesh = getInstancedMesh(),
      { count } = instanced_mesh, 
      { color, position } = dst_model.geometry.attributes,
      dst_pos_arr = position.array,
      dst_color_arr = color.array,
      dst_scale_arr = dst_model_scales.geometry.attributes.color.array;

   for (let i = 0, j = 0; i <= count; i++, j+=3) {
      const 
         x = dst_pos_arr[j],
         y = dst_pos_arr[j + 1],
         z = dst_pos_arr[j + 2];

      dummy.position.set(x, y, z);
      dummy.scale.set(
         dst_scale_arr[j],
         dst_scale_arr[j + 1],
         dst_scale_arr[j + 2],
      );
      dummy.updateMatrix();
      instanced_mesh.setMatrixAt(i, dummy.matrix);
      instanced_mesh.setColorAt(i, new THREE.Color(
         dst_color_arr[j],
         dst_color_arr[j + 1],
         dst_color_arr[j + 2],
      ));
   };
};

export default setInstanceMetadata;
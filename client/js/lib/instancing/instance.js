const instance = {
   create,
   rotate,
};

let _cube_model_arr;
let _star_model_arr;

const matrix = new THREE.Matrix4();
const dummy = new THREE.Object3D();

const _get_vertices_count = scene => scene.children[0].geometry.attributes.position.array.length / 3;

function generateInstances(src_model, instance_count) {
   const src_geometry = src_model.scene.children[0].geometry.clone();
   const material = new THREE.MeshStandardMaterial({
      color: 0xc49f5f,
      roughness: 0.01,
      metalness: 0.5,
   });
   return new THREE.InstancedMesh(src_geometry, material, instance_count);
};

function setInstancesPosition(instanced_mesh, dst_model) {
   const
      { count } = instanced_mesh,
      dst_pos_arr = dst_model.scene.children[0].geometry.attributes.position.array;

   for (let i = 0, j = 0; i <= count; i++, j+=3) {
      const 
         x = dst_pos_arr[j],
         y = dst_pos_arr[j + 1],
         z = dst_pos_arr[j + 2];

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      instanced_mesh.setMatrixAt(i, dummy.matrix);
      instanced_mesh.setColorAt(i, new THREE.Color(x, y, z));
   };
   return instanced_mesh;
};

function rotate(instanced_mesh, time) {
   const { count } = instanced_mesh;
   const sin_time = Math.abs(Math.sin(time * 2));
   for (let i = 0, j = 0; i <= count; i++, j+=3) {
      instanced_mesh.getMatrixAt(i, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

      dummy.rotation.x = time * i / count;
      dummy.rotation.y = time * count / i;
      dummy.rotation.z = time;

      const pos_1 = new THREE.Vector3(
         _cube_model_arr[j],
         _cube_model_arr[j + 1],
         _cube_model_arr[j + 2],
      );

      const pos_2 = new THREE.Vector3(
         _star_model_arr[j],
         _star_model_arr[j + 1],
         _star_model_arr[j + 2],
      );

      dummy.position.copy(pos_1.lerp(pos_2, sin_time));

      dummy.updateMatrix();
      instanced_mesh.setMatrixAt(i, dummy.matrix);
   };

   instanced_mesh.instanceMatrix.needsUpdate = true;
};

function create(triangle_model, cube_model, star_model) {
   const vertices_count = _get_vertices_count(cube_model.scene);
   const instanced_mesh = generateInstances(triangle_model, vertices_count);
   const t = setInstancesPosition(instanced_mesh, cube_model);
   _cube_model_arr = cube_model.scene.children[0].geometry.attributes.position.array;
   _star_model_arr = star_model.scene.children[0].geometry.attributes.position.array;
   triangle_model.mesh = t;
};

export default instance;
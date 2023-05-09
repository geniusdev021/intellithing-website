const instance = {
   create,
   rotate,
   assembling,
};

let _e_model_arr;
let _e_after_model_arr;

const matrix = new THREE.Matrix4();
const dummy = new THREE.Object3D();

const _get_vertices_count = ({ geometry }) => geometry.attributes.position.array.length / 3;

function generateInstances(src_model, instance_count) {
   const src_geometry = src_model.geometry.clone();
   const material = new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalness: 0.5,
   });
   return new THREE.InstancedMesh(src_geometry, material, instance_count);
};

function setInstancesPosition(instanced_mesh, dst_model, dst_model_scales) {
   const
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

   return instanced_mesh;
};

let _instanced_mesh;
let _raF;
let _time = 0;
let _x = 0;
let _y = 0;

function assembling() {
   const { count } = _instanced_mesh;
   _x += 0.005;
   _y =  _x * Math.sin(_x);
   _time = _y;
   for (let i = 0, j = 0; i <= count; i++, j+=3) {
      _instanced_mesh.getMatrixAt(i, matrix);
      matrix.decompose(dummy.position, dummy.rotation, dummy.scale);


      const pos_1 = new THREE.Vector3(
         _e_model_arr[j],
         _e_model_arr[j + 1],
         _e_model_arr[j + 2],
      );

      const pos_2 = new THREE.Vector3(
         _e_after_model_arr[j],
         _e_after_model_arr[j + 1],
         _e_after_model_arr[j + 2],
      );

      dummy.position.copy(pos_2.lerp(pos_1, _time));

      dummy.updateMatrix();
      _instanced_mesh.setMatrixAt(i, dummy.matrix);
   };

   // _instanced_mesh.rotation.x = 1 - _time;
   // _instanced_mesh.rotation.y = _time - 1;
   // _instanced_mesh.rotation.z = _time - 1;


   _instanced_mesh.instanceMatrix.needsUpdate = true;

   if (_time >= 1) {
      cancelAnimationFrame(_raF);
      return;
   };

   _raF = requestAnimationFrame(assembling);
};

function rotate(instanced_mesh, time) {
   const { count } = instanced_mesh;
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

function create(triangle_model, E_model, E_model_scales, random_model) {
   const vertices_count = _get_vertices_count(E_model);
   const instanced_mesh = generateInstances(triangle_model, vertices_count);
   instanced_mesh.position.set(10, -2, 0);
   _instanced_mesh = instanced_mesh;
   const t = setInstancesPosition(instanced_mesh, E_model, E_model_scales);
   _e_model_arr = E_model.geometry.attributes.position.array;
   _e_after_model_arr = random_model.geometry.attributes.position.array;
   triangle_model.mesh = t;
};

export default instance;
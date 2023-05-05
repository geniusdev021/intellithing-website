import { mergeGeometries } from '/dependencies/three/utils/BufferGeometryUtils.js';

const morph = {
   generate,
};

function cloneModelForEachVertex(src_model, dst_model) {
   const 
      src_geometry = src_model.scene.children[0].geometry,
      dst_pos_arr = dst_model.scene.children[0].geometry.attributes.position.array,
      geometries = [];

   for (let i = 0; i < dst_pos_arr.length; i+=3) {
      const 
         x = dst_pos_arr[i],
         y = dst_pos_arr[i + 1],
         z = dst_pos_arr[i + 2];

      const src_clone_geometry = src_geometry.clone();
      const src_clone_pos_arr = src_clone_geometry.attributes.position.array;
      for (let j = 0; j < src_clone_pos_arr.length; j+=3) {
         src_clone_pos_arr[j] += x;
         src_clone_pos_arr[j + 1] += y;
         src_clone_pos_arr[j + 2] += z;
      };
      geometries.push(src_clone_geometry);
   };

   const merged_geometry = mergeGeometries(geometries);
   return merged_geometry;
};

function generate(triangle_model, cube_model, star_model) {
   const geometry_1 = cloneModelForEachVertex(triangle_model, cube_model);
   const geometry_2 = cloneModelForEachVertex(triangle_model, star_model);
   geometry_1.morphAttributes.position = [];
   geometry_1.morphAttributes.position[0] = new THREE.Float32BufferAttribute(geometry_2.attributes.position.array, 3);
   const material = new THREE.MeshStandardMaterial({
      color: 0xc49f5f,
      roughness: 0.01,
      metalness: 0.5,
   });
   const mesh = new THREE.Mesh(geometry_1, material);
   triangle_model.mesh_1 = mesh;
};

export default morph;
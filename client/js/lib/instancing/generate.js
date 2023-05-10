import target from "./target.js";

const { setInstancedMesh } = target;

function generateInstances(src_model, instance_count) {
   const src_geometry = src_model.geometry.clone();
   const material = new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalness: 0.5,
   });
   setInstancedMesh(new THREE.InstancedMesh(src_geometry, material, instance_count));
};

export default generateInstances;
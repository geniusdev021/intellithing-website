let _instanced_mesh;

const target = {
   setInstancedMesh,
   getInstancedMesh,
};

function setInstancedMesh(mesh) {
   _instanced_mesh = mesh
};

function getInstancedMesh() {
   return _instanced_mesh;
};

export default target;
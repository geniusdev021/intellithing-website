import DOM from '/js/storage/dom.js';

const fov = 35;
const aspect = 1;
const near = 0.1;
const far = 5;

class TRIANGLE_ELEMENT {
   #canvas;
   #renderer;
   #camera;
   #scene;
   #triangle_mesh;
   #presets;

   constructor(triangle_model, canvas_name, presets) {
      this.#canvas = DOM[canvas_name];
      this.#renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: this.#canvas });
      // this.#renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.#canvas });
      this.#camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.#camera.position.z = 2; 
      this.#scene = new THREE.Scene();
      this.#presets = presets;

      const { src_pos, color } = this.#presets;

      const 
         src_geometry = triangle_model.geometry.clone(),
         material = new THREE.MeshBasicMaterial({
            color,
         });

      this.#triangle_mesh = new THREE.Mesh(src_geometry, material); 

      this.#triangle_mesh.scale.set(1.8, 1.8, 1.8);

      this.#scene.add(this.#triangle_mesh);

      this.#canvas.style.top = src_pos.x + '%'; 
      this.#canvas.style.left = src_pos.y + '%'; 
      this.#renderer.setSize(200, 200, false);
      this.#renderer.render(this.#scene, this.#camera);
   }

   rotate(t) {
      this.#triangle_mesh.rotation.y = t;
      this.#triangle_mesh.rotation.z = t;
      this.#renderer.render(this.#scene, this.#camera);
   }

   translate(t) {
      const { src_pos, int_pos, end_pos } = this.#presets;
      const int_lerp = src_pos.clone().lerp(int_pos, t);
      const end_lerp = int_lerp.clone().lerp(end_pos, t);

      this.#canvas.style.top = end_lerp.x + '%'; 
      this.#canvas.style.left = end_lerp.y + '%'; 
   }
};

const trinagles_system = {
   TRIANGLE_ELEMENT,
};

export default trinagles_system;
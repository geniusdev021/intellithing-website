class Camera {
   #camera;
   #distance;
   #origin_pos = new THREE.Vector3(0, 0, 0);
   #offset = new THREE.Vector3();
   #last_pos;
   #action_2_pos = new THREE.Vector3(-31, 0, -32);

   constructor({ fov, aspect, near, far, pos, lookAt }) {
      this.#camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.setPositionXYZ(pos);
      this.setLookAt(lookAt);
   }

   setAspect(aspect) {
      this.#camera.aspect = aspect;
   }

   setPositionXYZ(pos) {
      this.#camera.position.set(...pos);
      this.#distance = pos[2];
   }

   setLookAt(lookAt) {
      this.#camera.lookAt(...lookAt);
   }

   rotateAround(period) {
      const speed_rate = 2.84;
      this.#offset.x = -Math.sin(period * speed_rate) * this.#distance;
      this.#offset.z = Math.cos(period * speed_rate) * this.#distance; 
      this.#camera.position.copy(this.#origin_pos).add(this.#offset);
      this.#camera.lookAt(this.#origin_pos);
      this.#last_pos = this.#camera.position.clone();
   }

   moveAround(period) {
      const t = (period - 0.9) * 3.33; // 0 - 1 
      this.#camera.position.lerpVectors(this.#last_pos, this.#action_2_pos, t);
      this.#camera.lookAt(this.#origin_pos);
   }

   get src() {
      return this.#camera;
   }
};

export default Camera;
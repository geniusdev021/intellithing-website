class SpotLight {
   light;

   constructor({ color, intensity, position }) {
      this.light = new THREE.SpotLight(color);
      this.light.position.set(...position);
      this.light.intensity = intensity; 
      this.light.penumbra = 0.9; 
      this.light.decay = 1.8; 
      this.light.distance = 99; 
      this.light.angle = 0.9; 
      return this.light;
   }
};

export default SpotLight;
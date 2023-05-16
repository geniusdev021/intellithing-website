import trinagles_system from "/js/system/triangles-system.js";

const { TRIANGLE_ELEMENT } = trinagles_system;

const triangle_meshes = {
   create,
   appear_1,
   appear_2,
   appear_3,
};

const
   C_T_1 = 'canvas_triangle_1',
   C_T_2 = 'canvas_triangle_2',
   C_T_3 = 'canvas_triangle_3';

const presets = {
   [C_T_1]: {
      src_pos: new THREE.Vector2(-1400, 200), // top, left (vw, vh);
      int_pos: new THREE.Vector2(-100, -100),
      end_pos: new THREE.Vector2(0, 0),
      color: new THREE.Color(0xfcba03),
   },
   [C_T_2]: {
      src_pos: new THREE.Vector2(-1400, 250),
      int_pos: new THREE.Vector2(200, -100),
      end_pos: new THREE.Vector2(0, 0),
      color: new THREE.Color(0x4a17b0),
   },
   [C_T_3]: {
      src_pos: new THREE.Vector2(-1400, 150),
      int_pos: new THREE.Vector2(200, 100),
      end_pos: new THREE.Vector2(0, 0),
      color: new THREE.Color(0x1ca3ad),
   }
};

let
   triangle_el_1,
   triangle_el_2,
   triangle_el_3,
   triangle_el_4;

function create(triangle_model) {
   triangle_el_1 = new TRIANGLE_ELEMENT(triangle_model, C_T_1, presets[C_T_1]);
   triangle_el_2 = new TRIANGLE_ELEMENT(triangle_model, C_T_2, presets[C_T_2]);
   triangle_el_3 = new TRIANGLE_ELEMENT(triangle_model, C_T_3, presets[C_T_3]);
};

let t_1 = 0, x_1 = 0, t_2 = 0, x_2 = 0, t_3 = 0, x_3 = 0;

function appear_1() {
   const {
      workspace,
   } = INTELLITHING;

   workspace.addToPool(0, translate_1);
   workspace.addToPool(1, rotate_1);
};

function translate_1() {
   x_1 += 0.014;
   if (x_1 >= 1.62) INTELLITHING.workspace.delFromPool(0);
   t_1 = Math.sin(x_1);
   triangle_el_1.translate(t_1);
};

function rotate_1(time) {
   const t = ~~(time) * 0.00012;
   triangle_el_1.rotate(t);
};

function appear_2() {
   const {
      workspace,
   } = INTELLITHING;

   workspace.addToPool(2, translate_2);
   workspace.addToPool(3, rotate_2);
};

function translate_2() {
   x_2 += 0.014;
   if (x_2 >= 1.6) INTELLITHING.workspace.delFromPool(2);
   t_2 = Math.sin(x_2);
   triangle_el_2.translate(t_2);
};

function rotate_2(time) {
   const t = ~~(time) * 0.00012;
   triangle_el_2.rotate(t + 1);
};

function appear_3() {
   const {
      workspace,
   } = INTELLITHING;

   workspace.addToPool(4, translate_3);
   workspace.addToPool(5, rotate_3);
};

function translate_3() {
   x_3 += 0.014;
   if (x_3 >= 1.62) INTELLITHING.workspace.delFromPool(4);
   t_3 = Math.sin(x_3);
   triangle_el_3.translate(t_3);
};

function rotate_3(time) {
   const t = ~~(time) * 0.00012;
   triangle_el_3.rotate(t + 2);
};

export default triangle_meshes;
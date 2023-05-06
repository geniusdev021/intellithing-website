import DOM from '/js/storage/dom.js';
import listener from '/js/lib/helpers/listener.js';
import Resize from '/js/lib/resize/resize.js';
import system from '/js/system/system.js';

let _rAF;

const
   { canvas } = DOM,
   { scene, renderer, camera } = system,
   { addEv } = listener;

const resize = new Resize(system, canvas);

const render = {
   start,
   stop,
};

const _checkResize = () => { resize.check(); };

function tick(time) {
   renderer.render(scene, camera.src);
   _rAF = requestAnimationFrame(tick, canvas);
   // INTELLITHING.workspace.morphTriangles(time);
   INTELLITHING.workspace.rotateTriangles(time);
};

function start() {
   tick();
   addEv(window, 'resize', _checkResize);
   _checkResize();
};

function stop() {
   cancelAnimationFrame(_rAF);
};

window.render = render;
export default render;
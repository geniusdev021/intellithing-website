import scaler from "./scaler.js";

const { scaleByDPR } = scaler;

const pointer = {
   getPos,
};

function getPos(ev) {
   const x = ev.clientX, y = ev.clientY;
   return [scaleByDPR(x), scaleByDPR(y)];
};

export default pointer;
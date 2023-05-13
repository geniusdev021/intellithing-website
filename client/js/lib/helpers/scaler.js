const scaler = {
   scaleByDPR,
};

function scaleByDPR(input) {
   return ~~(input * window.devicePixelRatio || 1);
};

export default scaler;
const 
   lerp = (pS, pE, diff) => (1 - diff) * pS + diff * pE;

const math = {
   lerp,
};

export default math;
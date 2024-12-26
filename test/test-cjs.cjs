const {
  instantiate,
  INTENT_RELATIVE_COLORIMETRIC,
} = require("../dist/lcms.min.cjs");

(async () => {
  const m = await instantiate();
  // should print some defined values
  console.log(INTENT_RELATIVE_COLORIMETRIC, m.cmsDoTransform);
})();

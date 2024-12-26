// This file is only for CJS export support, which is a bit
// fudgey due to the import.meta.url + node requirements in Emscripten
// this file is copied to tmp/ along with the CJS build `module.cjs`
// and then esbuild creates a proper CJS build that wraps and exports it all together
const instantiate = require("./lcms.cjs");

export * from "../lib/constants.js";
export { instantiate };

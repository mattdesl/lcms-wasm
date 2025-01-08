import fs from "node:fs";

import {
  instantiate,
  INTENT_RELATIVE_COLORIMETRIC,
  cmsFLAGS_NOCACHE,
  cmsFLAGS_HIGHRESPRECALC,
  cmsFLAGS_NOOPTIMIZE,
  cmsFLAGS_BLACKPOINTCOMPENSATION,
} from "../dist/lcms.js";

const lcms = await instantiate();

const types = [
  { ArrayType: Uint16Array, bytes: 2, float: false, max: 2 ** 16 - 1 },
  { ArrayType: Uint8Array, bytes: 1, float: false, max: 2 ** 8 - 1 },
  { ArrayType: Float32Array, bytes: 4, float: true, max: 3.4e38 - 1 },
  // don't seem to be supported by underlying LittleCMS
  // { ArrayType: Uint32Array, bytes: 4, float: false, max: 2 ** 32 - 1 },
  // { ArrayType: Float64Array, bytes: 8, float: true, max: Number.MAX_VALUE - 1 },
];

for (let inputType of types) {
  // https://www.adobe.com/support/downloads/iccprofiles/iccprofiles_win.html
  const cmykProfileBuffer = fs.readFileSync("test/JapanColor2001Coated.icc");
  const cmykProfile = lcms.cmsOpenProfileFromMem(
    cmykProfileBuffer,
    cmykProfileBuffer.byteLength
  );
  const cmykFormatter = lcms.cmsFormatterForColorspaceOfProfile(
    cmykProfile,
    inputType.bytes,
    inputType.float
  );

  const srgbProfile = lcms.cmsCreate_sRGBProfile();
  const srgbFormatter = lcms.cmsFormatterForColorspaceOfProfile(
    srgbProfile,
    1,
    false
  );

  const blackPointCompensation = true;

  const intent = INTENT_RELATIVE_COLORIMETRIC;
  const flags =
    cmsFLAGS_NOCACHE |
    cmsFLAGS_HIGHRESPRECALC |
    cmsFLAGS_NOOPTIMIZE |
    (blackPointCompensation ? cmsFLAGS_BLACKPOINTCOMPENSATION : 0);

  const transformCMYKto_sRGB = lcms.cmsCreateTransform(
    cmykProfile,
    cmykFormatter,
    srgbProfile,
    srgbFormatter,
    intent,
    flags
  );

  const cmyk = new inputType.ArrayType([inputType.max, 0, 0, 0]);
  const srgb = lcms.cmsDoTransform(transformCMYKto_sRGB, cmyk, 1);
  console.log("Type:", inputType.ArrayType.name);
  console.log("CMYK:", cmyk);
  console.log("sRGB:", srgb);

  lcms.cmsDeleteTransform(transformCMYKto_sRGB);
  lcms.cmsCloseProfile(srgbProfile);
  lcms.cmsCloseProfile(cmykProfile);
}

import {
  instantiate,
  INTENT_RELATIVE_COLORIMETRIC,
  cmsFLAGS_NOCACHE,
  cmsFLAGS_HIGHRESPRECALC,
  cmsFLAGS_NOOPTIMIZE,
  cmsFLAGS_BLACKPOINTCOMPENSATION,
  cmsInfoDescription,
} from "../dist/lcms.js";

const lcms = await instantiate();

function getProfileName(profile) {
  return lcms.cmsGetProfileInfoASCII(profile, cmsInfoDescription, "en", "US");
}

const profile_sRGB = lcms.cmsCreate_sRGBProfile();
const profile_LAB = lcms.cmsCreateLab4Profile();

const profiles = [profile_sRGB, profile_LAB];
profiles.forEach((c) =>
  console.log(
    `Loaded ${getProfileName(c)} (Color Space: ${lcms.cmsGetColorSpaceASCII(
      c
    )})`
  )
);
const BLACK_POINT_COMPENSATION = true;

const intent = INTENT_RELATIVE_COLORIMETRIC;
let flags = cmsFLAGS_NOCACHE | cmsFLAGS_HIGHRESPRECALC | cmsFLAGS_NOOPTIMIZE;
if (BLACK_POINT_COMPENSATION) {
  flags |= cmsFLAGS_BLACKPOINTCOMPENSATION;
}

const inputProfile = profile_sRGB;
const outputProfile = profile_LAB;
const inputFormat = lcms.cmsFormatterForColorspaceOfProfile(
  inputProfile,
  1,
  false
);
const outputFormat = lcms.cmsFormatterForColorspaceOfProfile(
  outputProfile,
  4,
  true
);

const transform = lcms.cmsCreateTransform(
  inputProfile,
  inputFormat,
  outputProfile,
  outputFormat,
  intent,
  flags
);

// Clean up the profiles once the transform is created
lcms.cmsCloseProfile(inputProfile);
lcms.cmsCloseProfile(outputProfile);

// Expects Lab [ 35, -13, -27 ] according to Photoshop
const data = new Uint8ClampedArray([0, 89, 125]);
const nPixels = 1;
const labf32 = lcms.cmsDoTransform(transform, data, nPixels);
const lab = [...labf32].map((c) => Math.round(c));
console.log(`sRGB`, [...data]);
console.log(`CIE L*a*b*`, lab);

// cleanup transform
lcms.cmsDeleteTransform(transform);

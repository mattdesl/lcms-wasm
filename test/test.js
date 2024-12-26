import {
  instantiate,
  INTENT_RELATIVE_COLORIMETRIC,
  cmsFLAGS_NOCACHE,
  cmsFLAGS_HIGHRESPRECALC,
  cmsFLAGS_NOOPTIMIZE,
  cmsFLAGS_BLACKPOINTCOMPENSATION,
  cmsInfoDescription,
} from "../dist/lcms.js";

import test from "tape";

const lcms = await instantiate();

function getProfileName(profile) {
  return lcms.cmsGetProfileInfoASCII(profile, cmsInfoDescription, "en", "US");
}

test("should convert sRGB to LAB", async (t) => {
  const profile_sRGB = lcms.cmsCreate_sRGBProfile();
  const profile_LAB = lcms.cmsCreateLab4Profile();

  const profiles = [profile_sRGB, profile_LAB];
  const names = ["sRGB built-in", "Lab identity built-in"];
  const spaces = ["RGB", "Lab"];
  t.deepEqual(
    profiles.map((c) => getProfileName(c)),
    names,
    "names match"
  );
  t.deepEqual(
    profiles.map((c) => lcms.cmsGetColorSpaceASCII(c)),
    spaces,
    "spaces match"
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
    1 /* bytes per element, i.e. 1 for one u8 channel */,
    false /* sRGB is not float */
  );
  const outputFormat = lcms.cmsFormatterForColorspaceOfProfile(
    outputProfile,
    4 /* bytes per element, i.e. 4 for float per channel */,
    true /* output is float */
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
  const pixel = [0, 89, 125];
  const channels = pixel.length;
  const nPixels = 512;
  const data = new Uint8ClampedArray(channels * nPixels);
  for (let i = 0; i < nPixels; i++) {
    for (let c = 0; c < channels; c++) {
      data[i * channels + c] = pixel[c];
    }
  }
  console.time("transform");
  const labf32 = lcms.cmsDoTransform(transform, data, nPixels);
  console.timeEnd("transform");
  const lab = [...labf32].map((c) => Math.round(c));
  const expected = [];
  for (let i = 0; i < nPixels; i++) {
    expected.push(35, -13, -27);
  }
  t.deepEqual(lab, expected, "RGB to Lab converts as expected");

  // cleanup transform
  lcms.cmsDeleteTransform(transform);
});

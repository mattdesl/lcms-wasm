import { readFile } from "fs/promises";
import {
  instantiate,
  INTENT_RELATIVE_COLORIMETRIC,
  cmsFLAGS_NOCACHE,
  cmsFLAGS_HIGHRESPRECALC,
  cmsFLAGS_NOOPTIMIZE,
  cmsFLAGS_BLACKPOINTCOMPENSATION,
  cmsInfoDescription,
} from "../dist/lcms.js";

/* 

  Note: The ICC files have not been included in this repository for licensing reasons.
  You can save them in the test/ folder yourself and re-run this script. These are
  two common profiles that you would also see in Photoshop.

*/

async function ColorProfiles(lcms) {
  async function loadProfile(path) {
    const buf = (await readFile(path)).buffer;
    const profile = lcms.cmsOpenProfileFromMem(
      new Uint8Array(buf),
      buf.byteLength
    );
    if (!profile) throw new Error(`could not open profile ${path}`);
    return profile;
  }

  function getProfileName(profile) {
    return lcms.cmsGetProfileInfoASCII(profile, cmsInfoDescription, "en", "US");
  }

  const profile_sRGB = await loadProfile("test/sRGB IEC61966-2.1.icc");
  const profile_CMYK = await loadProfile("test/U.S. Web Coated (SWOP) v2.icc");

  const profiles = [profile_sRGB, profile_CMYK];
  profiles.forEach((c) =>
    console.log(
      `Loaded ${getProfileName(c)} (Color Space: ${lcms.cmsGetColorSpaceASCII(
        c
      )})`
    )
  );

  const BLACK_POINT_COMPENSATION = true;
  const IS_FLOAT = false;

  const intent = INTENT_RELATIVE_COLORIMETRIC;
  let flags = cmsFLAGS_NOCACHE | cmsFLAGS_HIGHRESPRECALC | cmsFLAGS_NOOPTIMIZE;
  if (BLACK_POINT_COMPENSATION) {
    flags |= cmsFLAGS_BLACKPOINTCOMPENSATION;
  }

  const inputProfile = profile_CMYK;
  const outputProfile = profile_sRGB;
  const inputFormat = lcms.cmsFormatterForColorspaceOfProfile(
    inputProfile,
    IS_FLOAT ? 4 : 1,
    IS_FLOAT
  );
  const outputFormat = lcms.cmsFormatterForColorspaceOfProfile(
    outputProfile,
    IS_FLOAT ? 4 : 1,
    IS_FLOAT
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

  // Expected CMYK to sRGB
  // Testing CMYK [100, 50, 25, 25]
  // Expected Result: [(0, 89, 125)]

  // Simulate a large image...
  const width = 1024;
  const height = 1024;

  const CMYK = [100, 50, 25, 25];

  const nPixels = width * height;
  const cmyk = Array(width * height).fill(0);
  for (let i = 0; i < nPixels; i++) {
    cmyk[i * 4 + 0] = CMYK[0];
    cmyk[i * 4 + 1] = CMYK[1];
    cmyk[i * 4 + 2] = CMYK[2];
    cmyk[i * 4 + 3] = CMYK[3];
  }

  console.time("doTransform");
  if (IS_FLOAT) {
    const data = new Float32Array(cmyk);
    const sRGBf = lcms.cmsDoTransform(transform, data, nPixels);
    const sRGB = sRGBf.map((s) => Math.round(s * 0xff));
    console.log(`sRGB (float)`, sRGBf.slice(0, 3));
    console.log(`sRGB (byte)`, sRGB.slice(0, 3));
  } else {
    const data = new Uint8ClampedArray(
      cmyk.map((c) => Math.round((c / 100) * 0xff))
    );
    const sRGB = lcms.cmsDoTransform(transform, data, nPixels);
    console.log(`sRGB (byte)`, sRGB.slice(0, 3));
  }
  console.timeEnd("doTransform");

  lcms.cmsDeleteTransform(transform);
}

const lcms = await instantiate();
await ColorProfiles(lcms);

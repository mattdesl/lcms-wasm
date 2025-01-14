/*
 * Originally written by yoya:
 * 2018/03/06- (c) yoya@awm.jp
 *
 * With modifications by @mattdesl for ES6 and updated Emscripten
 */

Module.cmsOpenProfileFromMem = cwrap("cmsOpenProfileFromMem", "number", [
  "array",
  "number",
]);

Module.cmsCloseProfile = cwrap("cmsCloseProfile", undefined, ["number"]);

Module.cmsCreate_sRGBProfile = cwrap("cmsCreate_sRGBProfile", "number", []);

Module.cmsCreateXYZProfile = cwrap("cmsCreateXYZProfile", "number", [], []);

Module.cmsGetHeaderRenderingIntent = cwrap(
  "cmsGetHeaderRenderingIntent",
  "number",
  ["number"]
);

Module.cmsCreateLab4Profile = cmsCreateLab4Profile;
function cmsCreateLab4Profile(wpArr) {
  var whitePoint = 0;
  if (wpArr) {
    whitePoint = _malloc(8 * 3); // cmsCIExyY* WhitePoint
    for (var i = 0; i < 3; i++) {
      setValue(whitePoint + i * 8, wpArr[i], "double");
    }
  }
  var prof = ccall("cmsCreateLab4Profile", "number", ["number"], [whitePoint]);
  if (whitePoint) {
    _free(whitePoint);
  }
  return prof;
}

/*
  usage: hInput, cmsInfoDescription, "en", "US"
*/
Module.cmsGetProfileInfoASCII = cmsGetProfileInfoASCII;
function cmsGetProfileInfoASCII(hProfile, info, languageCode, countryCode) {
  var len = ccall(
    "cmsGetProfileInfoASCII",
    "number",
    ["number", "number", "string", "string", "number", "number"],
    [hProfile, info, languageCode, countryCode, 0, 0]
  );
  var ptr = _malloc(len);
  var len = ccall(
    "cmsGetProfileInfoASCII",
    "number",
    ["number", "number", "string", "string", "number", "number"],
    [hProfile, info, languageCode, countryCode, ptr, len]
  );
  var text = UTF8ToString(ptr, len);
  _free(ptr);
  return text;
}

Module.cmsGetColorSpace = cwrap("cmsGetColorSpace", "number", ["number"]);

Module.cmsGetColorSpaceASCII = (profile) => {
  const table = {
    /*cmsSigXYZData*/ 0x58595a20: "XYZ",
    /*cmsSigLabData*/ 0x4c616220: "Lab",
    /*cmsSigLuvData*/ 0x4c757620: "Luv",
    /*cmsSigYCbCrData*/ 0x59436272: "YCbr",
    /*cmsSigYxyData*/ 0x59787920: "Yxy",
    /*cmsSigRgbData*/ 0x52474220: "RGB",
    /*cmsSigGrayData*/ 0x47524159: "GRAY",
    /*cmsSigHsvData*/ 0x48535620: "HSV",
    /*cmsSigHlsData*/ 0x484c5320: "HLS",
    /*cmsSigCmykData*/ 0x434d594b: "CMYK",
    /*cmsSigCmyData*/ 0x434d5920: "CMY",
  };
  const ret = Module.cmsGetColorSpace(profile);
  return table[ret] || null;
};

Module.cmsFormatterForColorspaceOfProfile = cmsFormatterForColorspaceOfProfile;
function cmsFormatterForColorspaceOfProfile(hProfile, nBytes, isFloat) {
  return ccall(
    "cmsFormatterForColorspaceOfProfile",
    "number",
    ["number", "number", "number"],
    [hProfile, nBytes, isFloat]
  );
}

Module.cmsCreateTransform = cmsCreateTransform;
function cmsCreateTransform(
  hInput,
  inputFormat,
  hOutput,
  outputFormat,
  intent,
  flags
) {
  return ccall(
    "cmsCreateTransform",
    "number",
    ["number", "number", "number", "number", "number", "number"],
    [hInput, inputFormat, hOutput, outputFormat, intent, flags]
  );
}

Module.cmsCreateProofingTransform = cmsCreateProofingTransform;
function cmsCreateProofingTransform(
  hInput,
  inputFormat,
  hOutput,
  outputFormat,
  proofing,
  intent,
  proofingIntent,
  flags
) {
  return ccall(
    "cmsCreateProofingTransform",
    "number",
    [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ],
    [
      hInput,
      inputFormat,
      hOutput,
      outputFormat,
      proofing,
      intent,
      proofingIntent,
      flags,
    ]
  );
}

Module.cmsDeleteTransform = cmsDeleteTransform;
function cmsDeleteTransform(transform) {
  if (!transform) {
    throw new Error(
      "cmsDeleteTransform expects a non-false transform parameter"
    );
  }
  ccall("cmsDeleteTransform", undefined, ["number"], [transform]);
}

Module.cmsGetTransformInputFormat = cmsGetTransformInputFormat;
function cmsGetTransformInputFormat(transform) {
  return ccall("cmsGetTransformInputFormat", "number", ["number"], [transform]);
}

Module.cmsGetTransformOutputFormat = cmsGetTransformOutputFormat;
function cmsGetTransformOutputFormat(transform) {
  return ccall(
    "cmsGetTransformOutputFormat",
    "number",
    ["number"],
    [transform]
  );
}

function getArrayType(bytes, float) {
  // A quick test seems to indicate that only Uint8, 16, or Float32 work
  // Maybe this is something that could be fixed with some adjusting?
  if (float) {
    if (bytes == 8) throw new Error("Float64Array not supported by LittleCMS");
    if (bytes == 2) throw new Error("Float16Array not supported by LittleCMS");
    return Float32Array;
  }
  if (bytes === 4) throw new Error("Uint32Array not supported by LittleCMS");
  if (bytes === 2) return Uint16Array;
  return Uint8Array;
}

Module.cmsDoTransform = cmsDoTransform;
function cmsDoTransform(transform, inputArr, size) {
  var inputFormat = cmsGetTransformInputFormat(transform);
  var outputFormat = cmsGetTransformOutputFormat(transform);
  var inputIsFloat = Boolean(T_FLOAT(inputFormat)); // Float64 or Uint16
  var outputIsFloat = Boolean(T_FLOAT(outputFormat));
  var inputChannels = T_CHANNELS(inputFormat) + T_EXTRA(inputFormat); // 3(RGB) or 4(CMYK)
  var outputChannels = T_CHANNELS(outputFormat) + T_EXTRA(inputFormat);
  var inputBytes = T_BYTES(inputFormat); // Bytes per sample
  var outputBytes = T_BYTES(outputFormat);
  inputBytes = inputBytes < 1 ? 4 : inputBytes;
  outputBytes = outputBytes < 1 ? 4 : outputBytes;
  var inputLength = inputChannels * size;
  var inputBuffer = _malloc(inputLength * inputBytes);
  var dataOnHeap;
  const InputType = getArrayType(inputBytes, inputIsFloat);
  const OutputType = getArrayType(outputBytes, outputIsFloat);
  dataOnHeap = new InputType(Module.HEAPU8.buffer, inputBuffer, inputLength);
  dataOnHeap.set(inputArr);
  var outputLength = outputChannels * size;
  var outputBuffer = _malloc(outputLength * outputBytes);
  ccall(
    "cmsDoTransform",
    undefined,
    ["number", "number", "number", "number"],
    [transform, inputBuffer, outputBuffer, size]
  );
  var outputArr = new OutputType(
    Module.HEAPU8.buffer,
    outputBuffer,
    outputLength
  ).slice();
  _free(inputBuffer);
  _free(outputBuffer);
  return outputArr;
}

Module.cmsReadTag = cmsReadTag;
function cmsReadTag(hProfile, sig) {
  var ptr = ccall(
    "cmsReadTag",
    undefined,
    ["number", "number"],
    [hProfile, sig]
  );
  return ptr;
}

/* custom function */
Module.cmsReadTag_XYZ = cmsReadTag_XYZ;
function cmsReadTag_XYZ(hProfile, sig) {
  var ptr = cmsReadTag(hProfile, sig);
  if (!ptr) {
    return null;
  }
  var xyz = new Float64Array(3);
  xyz[0] = getValue(ptr, "double");
  xyz[1] = getValue(ptr + 8, "double");
  xyz[2] = getValue(ptr + 16, "double");
  return xyz;
}

Module.cmsXYZ2xyY = cmsXYZ2xyY;
function cmsXYZ2xyY(xyz) {
  var srcPtr = _malloc(8 * 3);
  var dstPtr = _malloc(8 * 3);
  setValue(srcPtr, xyz[0], "double");
  setValue(srcPtr + 8, xyz[1], "double");
  setValue(srcPtr + 16, xyz[2], "double");
  ccall("cmsXYZ2xyY", undefined, ["number", "number"], [dstPtr, srcPtr]);
  var xyY = new Float64Array(3);
  xyY[0] = getValue(dstPtr, "double");
  xyY[1] = getValue(dstPtr + 8, "double");
  xyY[2] = getValue(dstPtr + 16, "double");
  _free(srcPtr);
  _free(dstPtr);
  return xyY;
}

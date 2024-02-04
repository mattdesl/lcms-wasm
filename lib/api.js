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

Module.cmsCloseProfile = cwrap("cmsCreate_sRGBProfile", undefined, ["number"]);

Module.cmsCreate_sRGBProfile = cwrap("cmsCreate_sRGBProfile", "number", []);

Module.cmsCreateXYZProfile = cwrap("cmsCreateXYZProfile", "number", [], []);

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
    console.warn("cmsDeleteTransform: ! transform");
    return;
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

// Module.typeListByBytes = typeListByBytes;
function typeListByBytes(bytes, isFloat) {
  if (isFloat) {
    switch (bytes) {
      case 0:
      case 4:
        return "float";
      case 8:
        return "double";
    }
  } else {
    switch (bytes) {
      case 1:
        return "i8";
      case 2:
        return "i16";
      case 4:
        return "i32";
      case 0:
      case 8:
        return "i64";
    }
  }
  console.error(
    "typeListByBytes(bytes:" + bytes + ", isFloat:" + isFloat + ")"
  );
  return null;
}

Module.cmsDoTransform = cmsDoTransform;
function cmsDoTransform(transform, inputArr, size) {
  var inputFormat = cmsGetTransformInputFormat(transform);
  var outputFormat = cmsGetTransformOutputFormat(transform);
  var inputIsFloat = T_FLOAT(inputFormat); // Float64 or Uint16
  var outputIsFloat = T_FLOAT(outputFormat);
  var inputChannels = T_CHANNELS(inputFormat); // 3(RGB) or 4(CMYK)
  var outputChannels = T_CHANNELS(outputFormat);
  var inputBytes = T_BYTES(inputFormat); // Bytews per sample
  var outputBytes = T_BYTES(outputFormat);
  inputBytes = inputBytes < 1 ? 4 : inputBytes;
  outputBytes = outputBytes < 1 ? 4 : outputBytes;
  var inputType = typeListByBytes(inputBytes, inputIsFloat);
  var outputType = typeListByBytes(outputBytes, outputIsFloat);
  //
  var inputBuffer = _malloc(inputChannels * inputBytes * size);
  var outputBuffer = _malloc(outputChannels * outputBytes * size);
  for (var i = 0; i < inputChannels * size; i++) {
    setValue(inputBuffer + inputBytes * i, inputArr[i], inputType);
  }
  ccall(
    "cmsDoTransform",
    undefined,
    ["number", "number", "number", "number"],
    [transform, inputBuffer, outputBuffer, size]
  );

  if (outputIsFloat) {
    var outputArr = new Float32Array(outputChannels * size);
  } else {
    var outputArr = new Uint8Array(outputChannels * size);
  }
  for (var i = 0; i < outputChannels * size; i++) {
    outputArr[i] = getValue(outputBuffer + outputBytes * i, outputType);
  }
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

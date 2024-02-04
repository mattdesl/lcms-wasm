/*
 * Originally written by yoya:
 * 2018/03/06- (c) yoya@awm.jp
 *
 * With modifications by @mattdesl for ES6 and updated Emscripten
 */

export const LCMS_VERSION = 2160;

// Maximum number of channels in ICC Profiles
export const cmsMAXCHANNELS = 16; // L654

export const cmsSigRedColorantTag = 0x7258595a; // 'rXYZ' (L382)
export const cmsSigGreenColorantTag = 0x6758595a; // 'gXYZ'
export const cmsSigBlueColorantTag = 0x6258595a; // 'bXYZ'

// ICC Color spaces
export const cmsSigXYZData = 0x58595a20; // 'XYZ ' (L433)
export const cmsSigLabData = 0x4c616220; // 'Lab '
export const cmsSigLuvData = 0x4c757620; // 'Luv '
export const cmsSigYCbCrData = 0x59436272; // 'YCbr'
export const cmsSigYxyData = 0x59787920; // 'Yxy '
export const cmsSigRgbData = 0x52474220; // 'RGB '
export const cmsSigGrayData = 0x47524159; // 'GRAY'
export const cmsSigHsvData = 0x48535620; // 'HSV '
export const cmsSigHlsData = 0x484c5320; // 'HLS '
export const cmsSigCmykData = 0x434d594b; // 'CMYK'
export const cmsSigCmyData = 0x434d5920; // 'CMY '

// Format of pixel is defined by one cmsUInt32Number, using bit fields as follows
export const FLOAT_SH = (a) => a << 22; // (L674)
export const OPTIMIZED_SH = (s) => s << 21;
export const COLORSPACE_SH = (s) => s << 16;
export const SWAPFIRST_SH = (s) => s << 14;
export const FLAVOR_SH = (s) => s << 13;
export const PLANAR_SH = (p) => p << 12;
export const ENDIAN16_SH = (e) => e << 11;
export const DOSWAP_SH = (e) => e << 10;
export const EXTRA_SH = (e) => e << 7;
export const CHANNELS_SH = (c) => c << 3;
export const BYTES_SH = (b) => b;
// These macros unpack format specifiers into integers
export const T_FLOAT = (a) => (a >> 22) & 1;
export const T_OPTIMIZED = (o) => (o >> 21) & 1;
export const T_COLORSPACE = (s) => (s >> 16) & 31;
export const T_SWAPFIRST = (s) => (s >> 14) & 1;
export const T_FLAVOR = (s) => (s >> 13) & 1;
export const T_PLANAR = (p) => (p >> 12) & 1;
export const T_ENDIAN16 = (e) => (e >> 11) & 1;
export const T_DOSWAP = (e) => (e >> 10) & 1;
export const T_EXTRA = (e) => (e >> 7) & 7;
export const T_CHANNELS = (c) => (c >> 3) & 15;
export const T_BYTES = (b) => b & 7;

// Pixel types
export const PT_ANY = 0; // Don't check colorspace // (L701)
// 1 & 2 are reserved
export const PT_GRAY = 3;
export const PT_RGB = 4;
export const PT_CMY = 5;
export const PT_CMYK = 6;
export const PT_YCbCr = 7;
export const PT_YUV = 8; // Lu'v'
export const PT_XYZ = 9;
export const PT_Lab = 10;
export const PT_YUVK = 11; // Lu'v'K
export const PT_HSV = 12;
export const PT_HLS = 13;
export const PT_Yxy = 14;

export const PT_MCH1 = 15;
export const PT_MCH2 = 16;
export const PT_MCH3 = 17;
export const PT_MCH4 = 18;
export const PT_MCH5 = 19;
export const PT_MCH6 = 20;
export const PT_MCH7 = 21;
export const PT_MCH8 = 22;
export const PT_MCH9 = 23;
export const PT_MCH10 = 24;
export const PT_MCH11 = 25;
export const PT_MCH12 = 26;
export const PT_MCH13 = 27;
export const PT_MCH14 = 28;
export const PT_MCH15 = 29;

export const PT_LabV2 = 30; // Identical to PT_Lab, but using the V2 old encoding

export const TYPE_GRAY_8 =
  COLORSPACE_SH(PT_GRAY) | CHANNELS_SH(1) | BYTES_SH(1); // (L739)
export const TYPE_GRAY_8_REV =
  COLORSPACE_SH(PT_GRAY) | CHANNELS_SH(1) | BYTES_SH(1) | FLAVOR_SH(1);
export const TYPE_GRAY_16 =
  COLORSPACE_SH(PT_GRAY) | CHANNELS_SH(1) | BYTES_SH(2);
export const TYPE_GRAY_16_REV =
  COLORSPACE_SH(PT_GRAY) | CHANNELS_SH(1) | BYTES_SH(2) | FLAVOR_SH(1);
export const TYPE_GRAY_16_SE =
  COLORSPACE_SH(PT_GRAY) | CHANNELS_SH(1) | BYTES_SH(2) | ENDIAN16_SH(1);
export const TYPE_GRAYA_8 =
  COLORSPACE_SH(PT_GRAY) | EXTRA_SH(1) | CHANNELS_SH(1) | BYTES_SH(1);
export const TYPE_GRAYA_16 =
  COLORSPACE_SH(PT_GRAY) | EXTRA_SH(1) | CHANNELS_SH(1) | BYTES_SH(2);
export const TYPE_GRAYA_16_SE =
  COLORSPACE_SH(PT_GRAY) |
  EXTRA_SH(1) |
  CHANNELS_SH(1) |
  BYTES_SH(2) |
  ENDIAN16_SH(1);
export const TYPE_GRAYA_8_PLANAR =
  COLORSPACE_SH(PT_GRAY) |
  EXTRA_SH(1) |
  CHANNELS_SH(1) |
  BYTES_SH(1) |
  PLANAR_SH(1);
export const TYPE_GRAYA_16_PLANAR =
  COLORSPACE_SH(PT_GRAY) |
  EXTRA_SH(1) |
  CHANNELS_SH(1) |
  BYTES_SH(2) |
  PLANAR_SH(1);

export const TYPE_RGB_8 = COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(1);
export const TYPE_RGB_8_PLANAR =
  COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(1) | PLANAR_SH(1);
export const TYPE_BGR_8 =
  COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(1) | DOSWAP_SH(1);
export const TYPE_BGR_8_PLANAR =
  COLORSPACE_SH(PT_RGB) |
  CHANNELS_SH(3) |
  BYTES_SH(1) |
  DOSWAP_SH(1) |
  PLANAR_SH(1);
export const TYPE_RGB_16 = COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(2);
export const TYPE_RGB_16_PLANAR =
  COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(2) | PLANAR_SH(1);
export const TYPE_RGB_16_SE =
  COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(2) | ENDIAN16_SH(1);
export const TYPE_BGR_16 =
  COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(2) | DOSWAP_SH(1);
export const TYPE_BGR_16_PLANAR =
  COLORSPACE_SH(PT_RGB) |
  CHANNELS_SH(3) |
  BYTES_SH(2) |
  DOSWAP_SH(1) |
  PLANAR_SH(1);
export const TYPE_BGR_16_SE =
  COLORSPACE_SH(PT_RGB) |
  CHANNELS_SH(3) |
  BYTES_SH(2) |
  DOSWAP_SH(1) |
  ENDIAN16_SH(1);

export const TYPE_RGBA_8 =
  COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(1);
export const TYPE_RGBA_8_PLANAR =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(1) |
  PLANAR_SH(1);
export const TYPE_RGBA_16 =
  COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(2);
export const TYPE_RGBA_16_PLANAR =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(2) |
  PLANAR_SH(1);
export const TYPE_RGBA_16_SE =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(2) |
  ENDIAN16_SH(1);

export const TYPE_ARGB_8 =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(1) |
  SWAPFIRST_SH(1);
export const TYPE_ARGB_8_PLANAR =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(1) |
  SWAPFIRST_SH(1) |
  PLANAR_SH(1);
export const TYPE_ARGB_16 =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(2) |
  SWAPFIRST_SH(1);

export const TYPE_ABGR_8 =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(1) |
  DOSWAP_SH(1);
export const TYPE_ABGR_8_PLANAR =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(1) |
  DOSWAP_SH(1) |
  PLANAR_SH(1);
export const TYPE_ABGR_16 =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(2) |
  DOSWAP_SH(1);
export const TYPE_ABGR_16_PLANAR =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(2) |
  DOSWAP_SH(1) |
  PLANAR_SH(1);
export const TYPE_ABGR_16_SE =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(2) |
  DOSWAP_SH(1) |
  ENDIAN16_SH(1);

export const TYPE_BGRA_8 =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(1) |
  DOSWAP_SH(1) |
  SWAPFIRST_SH(1);
export const TYPE_BGRA_8_PLANAR =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(1) |
  DOSWAP_SH(1) |
  SWAPFIRST_SH(1) |
  PLANAR_SH(1);
export const TYPE_BGRA_16 =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(2) |
  DOSWAP_SH(1) |
  SWAPFIRST_SH(1);
export const TYPE_BGRA_16_SE =
  COLORSPACE_SH(PT_RGB) |
  EXTRA_SH(1) |
  CHANNELS_SH(3) |
  BYTES_SH(2) |
  ENDIAN16_SH(1) |
  DOSWAP_SH(1) |
  SWAPFIRST_SH(1);

export const TYPE_CMY_8 = COLORSPACE_SH(PT_CMY) | CHANNELS_SH(3) | BYTES_SH(1);
export const TYPE_CMY_8_PLANAR =
  COLORSPACE_SH(PT_CMY) | CHANNELS_SH(3) | BYTES_SH(1) | PLANAR_SH(1);
export const TYPE_CMY_16 = COLORSPACE_SH(PT_CMY) | CHANNELS_SH(3) | BYTES_SH(2);
export const TYPE_CMY_16_PLANAR =
  COLORSPACE_SH(PT_CMY) | CHANNELS_SH(3) | BYTES_SH(2) | PLANAR_SH(1);
export const TYPE_CMY_16_SE =
  COLORSPACE_SH(PT_CMY) | CHANNELS_SH(3) | BYTES_SH(2) | ENDIAN16_SH(1);

export const TYPE_CMYK_8 =
  COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(1);
export const TYPE_CMYKA_8 =
  COLORSPACE_SH(PT_CMYK) | EXTRA_SH(1) | CHANNELS_SH(4) | BYTES_SH(1);
export const TYPE_CMYK_8_REV =
  COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(1) | FLAVOR_SH(1);
export const TYPE_YUVK_8 = TYPE_CMYK_8_REV;
export const TYPE_CMYK_8_PLANAR =
  COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(1) | PLANAR_SH(1);
export const TYPE_CMYK_16 =
  COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2);
export const TYPE_CMYK_16_REV =
  COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2) | FLAVOR_SH(1);
export const TYPE_YUVK_16 = TYPE_CMYK_16_REV;
export const TYPE_CMYK_16_PLANAR =
  COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2) | PLANAR_SH(1);
export const TYPE_CMYK_16_SE =
  COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2) | ENDIAN16_SH(1);

export const TYPE_KYMC_8 =
  COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(1) | DOSWAP_SH(1);
export const TYPE_KYMC_16 =
  COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2) | DOSWAP_SH(1);
export const TYPE_KYMC_16_SE =
  COLORSPACE_SH(PT_CMYK) |
  CHANNELS_SH(4) |
  BYTES_SH(2) |
  DOSWAP_SH(1) |
  ENDIAN16_SH(1);

export const TYPE_KCMY_8 =
  COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(1) | SWAPFIRST_SH(1);
export const TYPE_KCMY_8_REV =
  COLORSPACE_SH(PT_CMYK) |
  CHANNELS_SH(4) |
  BYTES_SH(1) |
  FLAVOR_SH(1) |
  SWAPFIRST_SH(1);
export const TYPE_KCMY_16 =
  COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2) | SWAPFIRST_SH(1);
export const TYPE_KCMY_16_REV =
  COLORSPACE_SH(PT_CMYK) |
  CHANNELS_SH(4) |
  BYTES_SH(2) |
  FLAVOR_SH(1) |
  SWAPFIRST_SH(1);
export const TYPE_KCMY_16_SE =
  COLORSPACE_SH(PT_CMYK) |
  CHANNELS_SH(4) |
  BYTES_SH(2) |
  ENDIAN16_SH(1) |
  SWAPFIRST_SH(1);

export const TYPE_CMYK5_8 =
  COLORSPACE_SH(PT_MCH5) | CHANNELS_SH(5) | BYTES_SH(1);
export const TYPE_CMYK5_16 =
  COLORSPACE_SH(PT_MCH5) | CHANNELS_SH(5) | BYTES_SH(2);
export const TYPE_CMYK5_16_SE =
  COLORSPACE_SH(PT_MCH5) | CHANNELS_SH(5) | BYTES_SH(2) | ENDIAN16_SH(1);
export const TYPE_KYMC5_8 =
  COLORSPACE_SH(PT_MCH5) | CHANNELS_SH(5) | BYTES_SH(1) | DOSWAP_SH(1);
export const TYPE_KYMC5_16 =
  COLORSPACE_SH(PT_MCH5) | CHANNELS_SH(5) | BYTES_SH(2) | DOSWAP_SH(1);
export const TYPE_KYMC5_16_SE =
  COLORSPACE_SH(PT_MCH5) |
  CHANNELS_SH(5) |
  BYTES_SH(2) |
  DOSWAP_SH(1) |
  ENDIAN16_SH(1);
export const TYPE_CMYK6_8 =
  COLORSPACE_SH(PT_MCH6) | CHANNELS_SH(6) | BYTES_SH(1);
export const TYPE_CMYK6_8_PLANAR =
  COLORSPACE_SH(PT_MCH6) | CHANNELS_SH(6) | BYTES_SH(1) | PLANAR_SH(1);
export const TYPE_CMYK6_16 =
  COLORSPACE_SH(PT_MCH6) | CHANNELS_SH(6) | BYTES_SH(2);
export const TYPE_CMYK6_16_PLANAR =
  COLORSPACE_SH(PT_MCH6) | CHANNELS_SH(6) | BYTES_SH(2) | PLANAR_SH(1);
export const TYPE_CMYK6_16_SE =
  COLORSPACE_SH(PT_MCH6) | CHANNELS_SH(6) | BYTES_SH(2) | ENDIAN16_SH(1);
export const TYPE_CMYK7_8 =
  COLORSPACE_SH(PT_MCH7) | CHANNELS_SH(7) | BYTES_SH(1);
export const TYPE_CMYK7_16 =
  COLORSPACE_SH(PT_MCH7) | CHANNELS_SH(7) | BYTES_SH(2);
export const TYPE_CMYK7_16_SE =
  COLORSPACE_SH(PT_MCH7) | CHANNELS_SH(7) | BYTES_SH(2) | ENDIAN16_SH(1);
export const TYPE_KYMC7_8 =
  COLORSPACE_SH(PT_MCH7) | CHANNELS_SH(7) | BYTES_SH(1) | DOSWAP_SH(1);
export const TYPE_KYMC7_16 =
  COLORSPACE_SH(PT_MCH7) | CHANNELS_SH(7) | BYTES_SH(2) | DOSWAP_SH(1);
export const TYPE_KYMC7_16_SE =
  COLORSPACE_SH(PT_MCH7) |
  CHANNELS_SH(7) |
  BYTES_SH(2) |
  DOSWAP_SH(1) |
  ENDIAN16_SH(1);
export const TYPE_CMYK8_8 =
  COLORSPACE_SH(PT_MCH8) | CHANNELS_SH(8) | BYTES_SH(1);
export const TYPE_CMYK8_16 =
  COLORSPACE_SH(PT_MCH8) | CHANNELS_SH(8) | BYTES_SH(2);
export const TYPE_CMYK8_16_SE =
  COLORSPACE_SH(PT_MCH8) | CHANNELS_SH(8) | BYTES_SH(2) | ENDIAN16_SH(1);
export const TYPE_KYMC8_8 =
  COLORSPACE_SH(PT_MCH8) | CHANNELS_SH(8) | BYTES_SH(1) | DOSWAP_SH(1);
export const TYPE_KYMC8_16 =
  COLORSPACE_SH(PT_MCH8) | CHANNELS_SH(8) | BYTES_SH(2) | DOSWAP_SH(1);
export const TYPE_KYMC8_16_SE =
  COLORSPACE_SH(PT_MCH8) |
  CHANNELS_SH(8) |
  BYTES_SH(2) |
  DOSWAP_SH(1) |
  ENDIAN16_SH(1);
export const TYPE_CMYK9_8 =
  COLORSPACE_SH(PT_MCH9) | CHANNELS_SH(9) | BYTES_SH(1);
export const TYPE_CMYK9_16 =
  COLORSPACE_SH(PT_MCH9) | CHANNELS_SH(9) | BYTES_SH(2);
export const TYPE_CMYK9_16_SE =
  COLORSPACE_SH(PT_MCH9) | CHANNELS_SH(9) | BYTES_SH(2) | ENDIAN16_SH(1);
export const TYPE_KYMC9_8 =
  COLORSPACE_SH(PT_MCH9) | CHANNELS_SH(9) | BYTES_SH(1) | DOSWAP_SH(1);
export const TYPE_KYMC9_16 =
  COLORSPACE_SH(PT_MCH9) | CHANNELS_SH(9) | BYTES_SH(2) | DOSWAP_SH(1);
export const TYPE_KYMC9_16_SE =
  COLORSPACE_SH(PT_MCH9) |
  CHANNELS_SH(9) |
  BYTES_SH(2) |
  DOSWAP_SH(1) |
  ENDIAN16_SH(1);
export const TYPE_CMYK10_8 =
  COLORSPACE_SH(PT_MCH10) | CHANNELS_SH(10) | BYTES_SH(1);
export const TYPE_CMYK10_16 =
  COLORSPACE_SH(PT_MCH10) | CHANNELS_SH(10) | BYTES_SH(2);
export const TYPE_CMYK10_16_SE =
  COLORSPACE_SH(PT_MCH10) | CHANNELS_SH(10) | BYTES_SH(2) | ENDIAN16_SH(1);
export const TYPE_KYMC10_8 =
  COLORSPACE_SH(PT_MCH10) | CHANNELS_SH(10) | BYTES_SH(1) | DOSWAP_SH(1);
export const TYPE_KYMC10_16 =
  COLORSPACE_SH(PT_MCH10) | CHANNELS_SH(10) | BYTES_SH(2) | DOSWAP_SH(1);
export const TYPE_KYMC10_16_SE =
  COLORSPACE_SH(PT_MCH10) |
  CHANNELS_SH(10) |
  BYTES_SH(2) |
  DOSWAP_SH(1) |
  ENDIAN16_SH(1);
export const TYPE_CMYK11_8 =
  COLORSPACE_SH(PT_MCH11) | CHANNELS_SH(11) | BYTES_SH(1);
export const TYPE_CMYK11_16 =
  COLORSPACE_SH(PT_MCH11) | CHANNELS_SH(11) | BYTES_SH(2);
export const TYPE_CMYK11_16_SE =
  COLORSPACE_SH(PT_MCH11) | CHANNELS_SH(11) | BYTES_SH(2) | ENDIAN16_SH(1);
export const TYPE_KYMC11_8 =
  COLORSPACE_SH(PT_MCH11) | CHANNELS_SH(11) | BYTES_SH(1) | DOSWAP_SH(1);
export const TYPE_KYMC11_16 =
  COLORSPACE_SH(PT_MCH11) | CHANNELS_SH(11) | BYTES_SH(2) | DOSWAP_SH(1);
export const TYPE_KYMC11_16_SE =
  COLORSPACE_SH(PT_MCH11) |
  CHANNELS_SH(11) |
  BYTES_SH(2) |
  DOSWAP_SH(1) |
  ENDIAN16_SH(1);
export const TYPE_CMYK12_8 =
  COLORSPACE_SH(PT_MCH12) | CHANNELS_SH(12) | BYTES_SH(1);
export const TYPE_CMYK12_16 =
  COLORSPACE_SH(PT_MCH12) | CHANNELS_SH(12) | BYTES_SH(2);
export const TYPE_CMYK12_16_SE =
  COLORSPACE_SH(PT_MCH12) | CHANNELS_SH(12) | BYTES_SH(2) | ENDIAN16_SH(1);
export const TYPE_KYMC12_8 =
  COLORSPACE_SH(PT_MCH12) | CHANNELS_SH(12) | BYTES_SH(1) | DOSWAP_SH(1);
export const TYPE_KYMC12_16 =
  COLORSPACE_SH(PT_MCH12) | CHANNELS_SH(12) | BYTES_SH(2) | DOSWAP_SH(1);
export const TYPE_KYMC12_16_SE =
  COLORSPACE_SH(PT_MCH12) |
  CHANNELS_SH(12) |
  BYTES_SH(2) |
  DOSWAP_SH(1) |
  ENDIAN16_SH(1);

// Colorimetric
export const TYPE_XYZ_16 = COLORSPACE_SH(PT_XYZ) | CHANNELS_SH(3) | BYTES_SH(2);
export const TYPE_Lab_8 = COLORSPACE_SH(PT_Lab) | CHANNELS_SH(3) | BYTES_SH(1);
export const TYPE_LabV2_8 =
  COLORSPACE_SH(PT_LabV2) | CHANNELS_SH(3) | BYTES_SH(1);

export const TYPE_ALab_8 =
  COLORSPACE_SH(PT_Lab) |
  CHANNELS_SH(3) |
  BYTES_SH(1) |
  EXTRA_SH(1) |
  SWAPFIRST_SH(1);
export const TYPE_ALabV2_8 =
  COLORSPACE_SH(PT_LabV2) |
  CHANNELS_SH(3) |
  BYTES_SH(1) |
  EXTRA_SH(1) |
  SWAPFIRST_SH(1);
export const TYPE_Lab_16 = COLORSPACE_SH(PT_Lab) | CHANNELS_SH(3) | BYTES_SH(2);
export const TYPE_LabV2_16 =
  COLORSPACE_SH(PT_LabV2) | CHANNELS_SH(3) | BYTES_SH(2);
export const TYPE_Yxy_16 = COLORSPACE_SH(PT_Yxy) | CHANNELS_SH(3) | BYTES_SH(2);

// Floating point formatters.
// NOTE THAT 'BYTES' FIELD IS SET TO ZERO ON DLB because 8 bytes overflows the bitfield
export const TYPE_XYZ_DBL =
  FLOAT_SH(1) | COLORSPACE_SH(PT_XYZ) | CHANNELS_SH(3) | BYTES_SH(0); // (L916)
export const TYPE_Lab_DBL =
  FLOAT_SH(1) | COLORSPACE_SH(PT_Lab) | CHANNELS_SH(3) | BYTES_SH(0);
export const TYPE_GRAY_DBL =
  FLOAT_SH(1) | COLORSPACE_SH(PT_GRAY) | CHANNELS_SH(1) | BYTES_SH(0);
export const TYPE_RGB_DBL =
  FLOAT_SH(1) | COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(0);
export const TYPE_BGR_DBL =
  FLOAT_SH(1) |
  COLORSPACE_SH(PT_RGB) |
  CHANNELS_SH(3) |
  BYTES_SH(0) |
  DOSWAP_SH(1);
export const TYPE_CMYK_DBL =
  FLOAT_SH(1) | COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(0);

// Localized info, enum cmsInfoType
export const cmsInfoDescription = 0; // (L1503)
export const cmsInfoManufacturer = 1;
export const cmsInfoModel = 2;
export const cmsInfoCopyright = 3;

// ICC Intents
export const INTENT_PERCEPTUAL = 0; // (L1617)
export const INTENT_RELATIVE_COLORIMETRIC = 1;
export const INTENT_SATURATION = 2;
export const INTENT_ABSOLUTE_COLORIMETRIC = 3;

// Flags
export const cmsFLAGS_NOCACHE = 0x0040; // Inhibit 1-pixel cache (L1636)
export const cmsFLAGS_NOOPTIMIZE = 0x0100; // Inhibit optimizations
export const cmsFLAGS_NULLTRANSFORM = 0x0200; // Don't transform anyway

// Proofing flags
export const cmsFLAGS_GAMUTCHECK = 0x1000; // Out of Gamut alarm
export const cmsFLAGS_SOFTPROOFING = 0x4000; // Do softproofing

// Misc
export const cmsFLAGS_BLACKPOINTCOMPENSATION = 0x2000;
export const cmsFLAGS_NOWHITEONWHITEFIXUP = 0x0004; // Don't fix scum dot
export const cmsFLAGS_HIGHRESPRECALC = 0x0400; // Use more memory to give better accurancy
export const cmsFLAGS_LOWRESPRECALC = 0x0800; // Use less memory to minimize resources

# lcms-wasm

This is a reboot of [yoya/lcms.js](https://github.com/yoya/lcms.js/) (now several years old), using WASM instead of ASM.js for improved performance and memory growth. This allows for [Little-CMS](https://github.com/mm2/Little-CMS) in JavaScript, with the specific goal of parsing, loading, and transforming between color spaces defined by ICC color profiles.

# Build from source

Clone the repo, then:

```sh
cd lcms-wasm
git submodule update --init --recursive
npm install

# if not already runnable
chmod +x ./build.sh

npm run build
```

# Docs

The API is quite low-level and relatively closely matches the Little-CMS library. This project also mainly exposes the bare color profile transformation features, rather than the entire color management system. Until some docs are written, see the [Demos](#demos) for example usage.

# Demos

The `test/` folder includes two demos:

- CMYK to sRGB transform (you will need to bring your own ICC files for licensing reasons)
- sRGB to CIE L*a*b\* transform

You can also see yoya's original demo of the lcms.js library here:

- http://app.awm.jp/image.js/lcms.html
  - [HTML source](https://github.com/yoya/image.js/blob/5e43f1d1c3b248db764f764a1507eb9f3dd36f66/lcms.html)
  - [JS source](https://github.com/yoya/image.js/blob/5e43f1d1c3b248db764f764a1507eb9f3dd36f66/lcms.js)

# lcms-wasm

This is a reboot of [yoya/lcms.js](https://github.com/yoya/lcms.js/) (now several years old), using WASM instead of ASM.js for improved performance and memory growth. This allows for [Little-CMS](https://github.com/mm2/Little-CMS) in JavaScript, with the specific goal of parsing, loading, and transforming between color spaces defined by ICC color profiles.

This should work in web, Node.js, and web workers, and possibly other JavaScript environments.

# Install from npm

With npm and Node.js already installed:

```sh
npm install lcms-wasm
```

This is primarily tested against ES Modules rather than CommonJS code.

# Docs

The API is quite low-level and relatively closely matches the Little-CMS library. This project also mainly exposes the bare color profile transformation features, rather than the entire color management system. Until some docs are written, see the [Demos](#demos) for example usage.

# Example

Here is an example of loading a ICC profile into memory, and then printing its ASCII name and color space.

```js
import { readFile } from "fs/promises";
import { instantiate, cmsInfoDescription } from "lcms-wasm";

const lcms = await instantiate();
const path = "path/to/profile.icc";
const buf = (await readFile(path)).buffer;
const profile = lcms.cmsOpenProfileFromMem(new Uint8Array(buf), buf.byteLength);
if (!profile) {
  throw new Error(`could not open profile ${path}`);
}
const name = lcms.cmsGetProfileInfoASCII(
  profile,
  cmsInfoDescription,
  "en",
  "US"
);
const space = lcms.cmsGetColorSpaceASCII(profile);
console.log(name, space);
```

See the [Demos](#demos) for more complex examples.

# Web

Depending on your bundler, you may need to locate the WASM URI for correct loading, such as with Vite:

```js
import { instantiate } from "lcms-wasm";
import wasmFileURI from "lcms-wasm/dist/lcms.wasm?url";

const lcms = await instantiate({
  locateFile: function (name) {
    return wasmFileURI;
  },
});
```

# Demos

The [test/](./test/) folder includes two demos:

- CMYK to sRGB transform (you will need to bring your own ICC files for licensing reasons)
- sRGB to CIE L*a*b\* transform

You can also see yoya's original demo of the lcms.js library here:

- http://app.awm.jp/image.js/lcms.html
  - [HTML source](https://github.com/yoya/image.js/blob/5e43f1d1c3b248db764f764a1507eb9f3dd36f66/lcms.html)
  - [JS source](https://github.com/yoya/image.js/blob/5e43f1d1c3b248db764f764a1507eb9f3dd36f66/lcms.js)

# Build from source

Clone the repo, then:

```sh
cd lcms-wasm
git submodule update --init --recursive
npm install

# if not already runnable
chmod +x ./build.sh

npm run build

# run the demos
node test/lab.js
node test/cmyk.js
```

# Thanks

Thanks to [yoya/lcms.js](https://github.com/yoya/lcms.js/) who did the heavy lifting to get this working with Emscripten in the first placea.

# License

This code is MIT, see [LICENSE.md](./LICENSE.md). The submodule (Little-CMS) is also MIT.

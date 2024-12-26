var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// tmp/lcms.cjs
var require_lcms = __commonJS({
  "tmp/lcms.cjs"(exports2, module2) {
    var instantiate2 = (() => {
      var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
      if (typeof __filename !== "undefined")
        _scriptDir ||= __filename;
      return function(moduleArg = {}) {
        var Module = moduleArg;
        var readyPromiseResolve, readyPromiseReject;
        Module["ready"] = new Promise((resolve, reject) => {
          readyPromiseResolve = resolve;
          readyPromiseReject = reject;
        });
        ["_free", "_malloc", "_cmsXYZ2xyY", "_cmsReadTag", "_cmsGetHeaderRenderingIntent", "_cmsGetTransformOutputFormat", "_cmsGetTransformInputFormat", "_cmsDoTransform", "_cmsDeleteTransform", "_cmsCreateProofingTransform", "_cmsCreateTransform", "_cmsFormatterForColorspaceOfProfile", "_cmsGetColorSpace", "_cmsGetProfileInfoASCII", "_cmsCreateLab4Profile", "_cmsCreateXYZProfile", "_cmsCreate_sRGBProfile", "_cmsCloseProfile", "_cmsOpenProfileFromMem", "getExceptionMessage", "$incrementExceptionRefcount", "$decrementExceptionRefcount", "_memory", "___indirect_function_table", "onRuntimeInitialized"].forEach((prop) => {
          if (!Object.getOwnPropertyDescriptor(Module["ready"], prop)) {
            Object.defineProperty(Module["ready"], prop, { get: () => abort("You are getting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"), set: () => abort("You are setting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js") });
          }
        });
        var moduleOverrides = Object.assign({}, Module);
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = (status, toThrow) => {
          throw toThrow;
        };
        var ENVIRONMENT_IS_WEB = typeof window == "object";
        var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
        var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
        var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
        if (Module["ENVIRONMENT"]) {
          throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
        }
        var scriptDirectory = "";
        function locateFile(path) {
          if (Module["locateFile"]) {
            return Module["locateFile"](path, scriptDirectory);
          }
          return scriptDirectory + path;
        }
        var read_, readAsync, readBinary;
        if (ENVIRONMENT_IS_NODE) {
          if (typeof process == "undefined" || !process.release || process.release.name !== "node")
            throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
          var nodeVersion = process.versions.node;
          var numericVersion = nodeVersion.split(".").slice(0, 3);
          numericVersion = numericVersion[0] * 1e4 + numericVersion[1] * 100 + numericVersion[2].split("-")[0] * 1;
          if (numericVersion < 16e4) {
            throw new Error("This emscripten-generated code requires node v16.0.0 (detected v" + nodeVersion + ")");
          }
          var fs = require("fs");
          var nodePath = require("path");
          if (ENVIRONMENT_IS_WORKER) {
            scriptDirectory = nodePath.dirname(scriptDirectory) + "/";
          } else {
            scriptDirectory = __dirname + "/";
          }
          read_ = (filename, binary) => {
            filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
            return fs.readFileSync(filename, binary ? void 0 : "utf8");
          };
          readBinary = (filename) => {
            var ret = read_(filename, true);
            if (!ret.buffer) {
              ret = new Uint8Array(ret);
            }
            assert(ret.buffer);
            return ret;
          };
          readAsync = (filename, onload, onerror, binary = true) => {
            filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
            fs.readFile(filename, binary ? void 0 : "utf8", (err2, data) => {
              if (err2)
                onerror(err2);
              else
                onload(binary ? data.buffer : data);
            });
          };
          if (!Module["thisProgram"] && process.argv.length > 1) {
            thisProgram = process.argv[1].replace(/\\/g, "/");
          }
          arguments_ = process.argv.slice(2);
          quit_ = (status, toThrow) => {
            process.exitCode = status;
            throw toThrow;
          };
        } else if (ENVIRONMENT_IS_SHELL) {
          if (typeof process == "object" && typeof require === "function" || typeof window == "object" || typeof importScripts == "function")
            throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
          if (typeof read != "undefined") {
            read_ = read;
          }
          readBinary = (f) => {
            if (typeof readbuffer == "function") {
              return new Uint8Array(readbuffer(f));
            }
            let data = read(f, "binary");
            assert(typeof data == "object");
            return data;
          };
          readAsync = (f, onload, onerror) => {
            setTimeout(() => onload(readBinary(f)));
          };
          if (typeof clearTimeout == "undefined") {
            globalThis.clearTimeout = (id) => {
            };
          }
          if (typeof setTimeout == "undefined") {
            globalThis.setTimeout = (f) => typeof f == "function" ? f() : abort();
          }
          if (typeof scriptArgs != "undefined") {
            arguments_ = scriptArgs;
          } else if (typeof arguments != "undefined") {
            arguments_ = arguments;
          }
          if (typeof quit == "function") {
            quit_ = (status, toThrow) => {
              setTimeout(() => {
                if (!(toThrow instanceof ExitStatus)) {
                  let toLog = toThrow;
                  if (toThrow && typeof toThrow == "object" && toThrow.stack) {
                    toLog = [toThrow, toThrow.stack];
                  }
                  err(`exiting due to exception: ${toLog}`);
                }
                quit(status);
              });
              throw toThrow;
            };
          }
          if (typeof print != "undefined") {
            if (typeof console == "undefined")
              console = {};
            console.log = print;
            console.warn = console.error = typeof printErr != "undefined" ? printErr : print;
          }
        } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
          if (ENVIRONMENT_IS_WORKER) {
            scriptDirectory = self.location.href;
          } else if (typeof document != "undefined" && document.currentScript) {
            scriptDirectory = document.currentScript.src;
          }
          if (_scriptDir) {
            scriptDirectory = _scriptDir;
          }
          if (scriptDirectory.startsWith("blob:")) {
            scriptDirectory = "";
          } else {
            scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
          }
          if (!(typeof window == "object" || typeof importScripts == "function"))
            throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
          {
            read_ = (url) => {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.send(null);
              return xhr.responseText;
            };
            if (ENVIRONMENT_IS_WORKER) {
              readBinary = (url) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, false);
                xhr.responseType = "arraybuffer";
                xhr.send(null);
                return new Uint8Array(xhr.response);
              };
            }
            readAsync = (url, onload, onerror) => {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, true);
              xhr.responseType = "arraybuffer";
              xhr.onload = () => {
                if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                  onload(xhr.response);
                  return;
                }
                onerror();
              };
              xhr.onerror = onerror;
              xhr.send(null);
            };
          }
        } else {
          throw new Error("environment detection error");
        }
        var out = Module["print"] || console.log.bind(console);
        var err = Module["printErr"] || console.error.bind(console);
        Object.assign(Module, moduleOverrides);
        moduleOverrides = null;
        checkIncomingModuleAPI();
        if (Module["arguments"])
          arguments_ = Module["arguments"];
        legacyModuleProp("arguments", "arguments_");
        if (Module["thisProgram"])
          thisProgram = Module["thisProgram"];
        legacyModuleProp("thisProgram", "thisProgram");
        if (Module["quit"])
          quit_ = Module["quit"];
        legacyModuleProp("quit", "quit_");
        assert(typeof Module["memoryInitializerPrefixURL"] == "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
        assert(typeof Module["pthreadMainPrefixURL"] == "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
        assert(typeof Module["cdInitializerPrefixURL"] == "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
        assert(typeof Module["filePackagePrefixURL"] == "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
        assert(typeof Module["read"] == "undefined", "Module.read option was removed (modify read_ in JS)");
        assert(typeof Module["readAsync"] == "undefined", "Module.readAsync option was removed (modify readAsync in JS)");
        assert(typeof Module["readBinary"] == "undefined", "Module.readBinary option was removed (modify readBinary in JS)");
        assert(typeof Module["setWindowTitle"] == "undefined", "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
        assert(typeof Module["TOTAL_MEMORY"] == "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
        legacyModuleProp("asm", "wasmExports");
        legacyModuleProp("read", "read_");
        legacyModuleProp("readAsync", "readAsync");
        legacyModuleProp("readBinary", "readBinary");
        legacyModuleProp("setWindowTitle", "setWindowTitle");
        assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
        var wasmBinary;
        if (Module["wasmBinary"])
          wasmBinary = Module["wasmBinary"];
        legacyModuleProp("wasmBinary", "wasmBinary");
        if (typeof WebAssembly != "object") {
          abort("no native wasm support detected");
        }
        var wasmMemory;
        var ABORT = false;
        var EXITSTATUS;
        function assert(condition, text) {
          if (!condition) {
            abort("Assertion failed" + (text ? ": " + text : ""));
          }
        }
        var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
        function updateMemoryViews() {
          var b = wasmMemory.buffer;
          Module["HEAP8"] = HEAP8 = new Int8Array(b);
          Module["HEAP16"] = HEAP16 = new Int16Array(b);
          Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
          Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
          Module["HEAP32"] = HEAP32 = new Int32Array(b);
          Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
          Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
          Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
        }
        assert(!Module["STACK_SIZE"], "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
        assert(typeof Int32Array != "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray != void 0 && Int32Array.prototype.set != void 0, "JS engine does not provide full typed array support");
        assert(!Module["wasmMemory"], "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
        assert(!Module["INITIAL_MEMORY"], "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
        function writeStackCookie() {
          var max = _emscripten_stack_get_end();
          assert((max & 3) == 0);
          if (max == 0) {
            max += 4;
          }
          HEAPU32[max >> 2] = 34821223;
          HEAPU32[max + 4 >> 2] = 2310721022;
          HEAPU32[0 >> 2] = 1668509029;
        }
        function checkStackCookie() {
          if (ABORT)
            return;
          var max = _emscripten_stack_get_end();
          if (max == 0) {
            max += 4;
          }
          var cookie1 = HEAPU32[max >> 2];
          var cookie2 = HEAPU32[max + 4 >> 2];
          if (cookie1 != 34821223 || cookie2 != 2310721022) {
            abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
          }
          if (HEAPU32[0 >> 2] != 1668509029) {
            abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
          }
        }
        (function() {
          var h16 = new Int16Array(1);
          var h8 = new Int8Array(h16.buffer);
          h16[0] = 25459;
          if (h8[0] !== 115 || h8[1] !== 99)
            throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
        })();
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        function preRun() {
          if (Module["preRun"]) {
            if (typeof Module["preRun"] == "function")
              Module["preRun"] = [Module["preRun"]];
            while (Module["preRun"].length) {
              addOnPreRun(Module["preRun"].shift());
            }
          }
          callRuntimeCallbacks(__ATPRERUN__);
        }
        function initRuntime() {
          assert(!runtimeInitialized);
          runtimeInitialized = true;
          checkStackCookie();
          callRuntimeCallbacks(__ATINIT__);
        }
        function postRun() {
          checkStackCookie();
          if (Module["postRun"]) {
            if (typeof Module["postRun"] == "function")
              Module["postRun"] = [Module["postRun"]];
            while (Module["postRun"].length) {
              addOnPostRun(Module["postRun"].shift());
            }
          }
          callRuntimeCallbacks(__ATPOSTRUN__);
        }
        function addOnPreRun(cb) {
          __ATPRERUN__.unshift(cb);
        }
        function addOnInit(cb) {
          __ATINIT__.unshift(cb);
        }
        function addOnPostRun(cb) {
          __ATPOSTRUN__.unshift(cb);
        }
        assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
        assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
        assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
        assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        var runDependencyTracking = {};
        function addRunDependency(id) {
          runDependencies++;
          Module["monitorRunDependencies"]?.(runDependencies);
          if (id) {
            assert(!runDependencyTracking[id]);
            runDependencyTracking[id] = 1;
            if (runDependencyWatcher === null && typeof setInterval != "undefined") {
              runDependencyWatcher = setInterval(() => {
                if (ABORT) {
                  clearInterval(runDependencyWatcher);
                  runDependencyWatcher = null;
                  return;
                }
                var shown = false;
                for (var dep in runDependencyTracking) {
                  if (!shown) {
                    shown = true;
                    err("still waiting on run dependencies:");
                  }
                  err(`dependency: ${dep}`);
                }
                if (shown) {
                  err("(end of list)");
                }
              }, 1e4);
            }
          } else {
            err("warning: run dependency added without ID");
          }
        }
        function removeRunDependency(id) {
          runDependencies--;
          Module["monitorRunDependencies"]?.(runDependencies);
          if (id) {
            assert(runDependencyTracking[id]);
            delete runDependencyTracking[id];
          } else {
            err("warning: run dependency removed without ID");
          }
          if (runDependencies == 0) {
            if (runDependencyWatcher !== null) {
              clearInterval(runDependencyWatcher);
              runDependencyWatcher = null;
            }
            if (dependenciesFulfilled) {
              var callback = dependenciesFulfilled;
              dependenciesFulfilled = null;
              callback();
            }
          }
        }
        function abort(what) {
          Module["onAbort"]?.(what);
          what = "Aborted(" + what + ")";
          err(what);
          ABORT = true;
          EXITSTATUS = 1;
          var e = new WebAssembly.RuntimeError(what);
          readyPromiseReject(e);
          throw e;
        }
        var FS = { error() {
          abort("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM");
        }, init() {
          FS.error();
        }, createDataFile() {
          FS.error();
        }, createPreloadedFile() {
          FS.error();
        }, createLazyFile() {
          FS.error();
        }, open() {
          FS.error();
        }, mkdev() {
          FS.error();
        }, registerDevice() {
          FS.error();
        }, analyzePath() {
          FS.error();
        }, ErrnoError() {
          FS.error();
        } };
        Module["FS_createDataFile"] = FS.createDataFile;
        Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
        var dataURIPrefix = "data:application/octet-stream;base64,";
        var isDataURI = (filename) => filename.startsWith(dataURIPrefix);
        var isFileURI = (filename) => filename.startsWith("file://");
        function createExportWrapper(name) {
          return function() {
            assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
            var f = wasmExports[name];
            assert(f, `exported native function \`${name}\` not found`);
            return f.apply(null, arguments);
          };
        }
        class EmscriptenEH extends Error {
        }
        class EmscriptenSjLj extends EmscriptenEH {
        }
        class CppException extends EmscriptenEH {
          constructor(excPtr) {
            super(excPtr);
            this.excPtr = excPtr;
            const excInfo = getExceptionMessage(excPtr);
            this.name = excInfo[0];
            this.message = excInfo[1];
          }
        }
        var wasmBinaryFile;
        wasmBinaryFile = "lcms.wasm";
        if (!isDataURI(wasmBinaryFile)) {
          wasmBinaryFile = locateFile(wasmBinaryFile);
        }
        function getBinarySync(file) {
          if (file == wasmBinaryFile && wasmBinary) {
            return new Uint8Array(wasmBinary);
          }
          if (readBinary) {
            return readBinary(file);
          }
          throw "both async and sync fetching of the wasm failed";
        }
        function getBinaryPromise(binaryFile) {
          if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
            if (typeof fetch == "function") {
              return fetch(binaryFile, { credentials: "same-origin" }).then((response) => {
                if (!response["ok"]) {
                  throw `failed to load wasm binary file at '${binaryFile}'`;
                }
                return response["arrayBuffer"]();
              }).catch(() => getBinarySync(binaryFile));
            }
          }
          return Promise.resolve().then(() => getBinarySync(binaryFile));
        }
        function instantiateArrayBuffer(binaryFile, imports, receiver) {
          return getBinaryPromise(binaryFile).then((binary) => WebAssembly.instantiate(binary, imports)).then((instance) => instance).then(receiver, (reason) => {
            err(`failed to asynchronously prepare wasm: ${reason}`);
            if (isFileURI(wasmBinaryFile)) {
              err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
            }
            abort(reason);
          });
        }
        function instantiateAsync(binary, binaryFile, imports, callback) {
          if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && !ENVIRONMENT_IS_NODE && typeof fetch == "function") {
            return fetch(binaryFile, { credentials: "same-origin" }).then((response) => {
              var result = WebAssembly.instantiateStreaming(response, imports);
              return result.then(callback, function(reason) {
                err(`wasm streaming compile failed: ${reason}`);
                err("falling back to ArrayBuffer instantiation");
                return instantiateArrayBuffer(binaryFile, imports, callback);
              });
            });
          }
          return instantiateArrayBuffer(binaryFile, imports, callback);
        }
        function createWasm() {
          var info = { "env": wasmImports, "wasi_snapshot_preview1": wasmImports };
          function receiveInstance(instance, module3) {
            wasmExports = instance.exports;
            wasmMemory = wasmExports["memory"];
            assert(wasmMemory, "memory not found in wasm exports");
            updateMemoryViews();
            wasmTable = wasmExports["__indirect_function_table"];
            assert(wasmTable, "table not found in wasm exports");
            addOnInit(wasmExports["__wasm_call_ctors"]);
            removeRunDependency("wasm-instantiate");
            return wasmExports;
          }
          addRunDependency("wasm-instantiate");
          var trueModule = Module;
          function receiveInstantiationResult(result) {
            assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
            trueModule = null;
            receiveInstance(result["instance"]);
          }
          if (Module["instantiateWasm"]) {
            try {
              return Module["instantiateWasm"](info, receiveInstance);
            } catch (e) {
              err(`Module.instantiateWasm callback failed with error: ${e}`);
              readyPromiseReject(e);
            }
          }
          instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
          return {};
        }
        function legacyModuleProp(prop, newName, incomming = true) {
          if (!Object.getOwnPropertyDescriptor(Module, prop)) {
            Object.defineProperty(Module, prop, { configurable: true, get() {
              let extra = incomming ? " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)" : "";
              abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);
            } });
          }
        }
        function ignoredModuleProp(prop) {
          if (Object.getOwnPropertyDescriptor(Module, prop)) {
            abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
          }
        }
        function isExportedByForceFilesystem(name) {
          return name === "FS_createPath" || name === "FS_createDataFile" || name === "FS_createPreloadedFile" || name === "FS_unlink" || name === "addRunDependency" || name === "FS_createLazyFile" || name === "FS_createDevice" || name === "removeRunDependency";
        }
        function missingGlobal(sym, msg) {
          if (typeof globalThis !== "undefined") {
            Object.defineProperty(globalThis, sym, { configurable: true, get() {
              warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
              return void 0;
            } });
          }
        }
        missingGlobal("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
        missingGlobal("asm", "Please use wasmExports instead");
        function missingLibrarySymbol(sym) {
          if (typeof globalThis !== "undefined" && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
            Object.defineProperty(globalThis, sym, { configurable: true, get() {
              var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
              var librarySymbol = sym;
              if (!librarySymbol.startsWith("_")) {
                librarySymbol = "$" + sym;
              }
              msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
              if (isExportedByForceFilesystem(sym)) {
                msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
              }
              warnOnce(msg);
              return void 0;
            } });
          }
          unexportedRuntimeSymbol(sym);
        }
        function unexportedRuntimeSymbol(sym) {
          if (!Object.getOwnPropertyDescriptor(Module, sym)) {
            Object.defineProperty(Module, sym, { configurable: true, get() {
              var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
              if (isExportedByForceFilesystem(sym)) {
                msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
              }
              abort(msg);
            } });
          }
        }
        function ExitStatus(status) {
          this.name = "ExitStatus";
          this.message = `Program terminated with exit(${status})`;
          this.status = status;
        }
        var callRuntimeCallbacks = (callbacks) => {
          while (callbacks.length > 0) {
            callbacks.shift()(Module);
          }
        };
        var withStackSave = (f) => {
          var stack = stackSave();
          var ret = f();
          stackRestore(stack);
          return ret;
        };
        var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : void 0;
        var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
          var endIdx = idx + maxBytesToRead;
          var endPtr = idx;
          while (heapOrArray[endPtr] && !(endPtr >= endIdx))
            ++endPtr;
          if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
            return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
          }
          var str = "";
          while (idx < endPtr) {
            var u0 = heapOrArray[idx++];
            if (!(u0 & 128)) {
              str += String.fromCharCode(u0);
              continue;
            }
            var u1 = heapOrArray[idx++] & 63;
            if ((u0 & 224) == 192) {
              str += String.fromCharCode((u0 & 31) << 6 | u1);
              continue;
            }
            var u2 = heapOrArray[idx++] & 63;
            if ((u0 & 240) == 224) {
              u0 = (u0 & 15) << 12 | u1 << 6 | u2;
            } else {
              if ((u0 & 248) != 240)
                warnOnce("Invalid UTF-8 leading byte " + ptrToString(u0) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!");
              u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
            }
            if (u0 < 65536) {
              str += String.fromCharCode(u0);
            } else {
              var ch = u0 - 65536;
              str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            }
          }
          return str;
        };
        var UTF8ToString = (ptr, maxBytesToRead) => {
          assert(typeof ptr == "number", `UTF8ToString expects a number (got ${typeof ptr})`);
          return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
        };
        var getExceptionMessageCommon = (ptr) => withStackSave(() => {
          var type_addr_addr = stackAlloc(4);
          var message_addr_addr = stackAlloc(4);
          ___get_exception_message(ptr, type_addr_addr, message_addr_addr);
          var type_addr = HEAPU32[type_addr_addr >> 2];
          var message_addr = HEAPU32[message_addr_addr >> 2];
          var type = UTF8ToString(type_addr);
          _free(type_addr);
          var message;
          if (message_addr) {
            message = UTF8ToString(message_addr);
            _free(message_addr);
          }
          return [type, message];
        });
        var getExceptionMessage = (ptr) => getExceptionMessageCommon(ptr);
        Module["getExceptionMessage"] = getExceptionMessage;
        function getValue(ptr, type = "i8") {
          if (type.endsWith("*"))
            type = "*";
          switch (type) {
            case "i1":
              return HEAP8[ptr >> 0];
            case "i8":
              return HEAP8[ptr >> 0];
            case "i16":
              return HEAP16[ptr >> 1];
            case "i32":
              return HEAP32[ptr >> 2];
            case "i64":
              abort("to do getValue(i64) use WASM_BIGINT");
            case "float":
              return HEAPF32[ptr >> 2];
            case "double":
              return HEAPF64[ptr >> 3];
            case "*":
              return HEAPU32[ptr >> 2];
            default:
              abort(`invalid type for getValue: ${type}`);
          }
        }
        var noExitRuntime = Module["noExitRuntime"] || true;
        var ptrToString = (ptr) => {
          assert(typeof ptr === "number");
          ptr >>>= 0;
          return "0x" + ptr.toString(16).padStart(8, "0");
        };
        function setValue(ptr, value, type = "i8") {
          if (type.endsWith("*"))
            type = "*";
          switch (type) {
            case "i1":
              HEAP8[ptr >> 0] = value;
              break;
            case "i8":
              HEAP8[ptr >> 0] = value;
              break;
            case "i16":
              HEAP16[ptr >> 1] = value;
              break;
            case "i32":
              HEAP32[ptr >> 2] = value;
              break;
            case "i64":
              abort("to do setValue(i64) use WASM_BIGINT");
            case "float":
              HEAPF32[ptr >> 2] = value;
              break;
            case "double":
              HEAPF64[ptr >> 3] = value;
              break;
            case "*":
              HEAPU32[ptr >> 2] = value;
              break;
            default:
              abort(`invalid type for setValue: ${type}`);
          }
        }
        var warnOnce = (text) => {
          warnOnce.shown ||= {};
          if (!warnOnce.shown[text]) {
            warnOnce.shown[text] = 1;
            if (ENVIRONMENT_IS_NODE)
              text = "warning: " + text;
            err(text);
          }
        };
        var ___assert_fail = (condition, filename, line, func) => {
          abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]);
        };
        var exceptionCaught = [];
        var uncaughtExceptionCount = 0;
        var ___cxa_begin_catch = (ptr) => {
          var info = new ExceptionInfo(ptr);
          if (!info.get_caught()) {
            info.set_caught(true);
            uncaughtExceptionCount--;
          }
          info.set_rethrown(false);
          exceptionCaught.push(info);
          ___cxa_increment_exception_refcount(info.excPtr);
          return info.get_exception_ptr();
        };
        var exceptionLast = 0;
        class ExceptionInfo {
          constructor(excPtr) {
            this.excPtr = excPtr;
            this.ptr = excPtr - 24;
          }
          set_type(type) {
            HEAPU32[this.ptr + 4 >> 2] = type;
          }
          get_type() {
            return HEAPU32[this.ptr + 4 >> 2];
          }
          set_destructor(destructor) {
            HEAPU32[this.ptr + 8 >> 2] = destructor;
          }
          get_destructor() {
            return HEAPU32[this.ptr + 8 >> 2];
          }
          set_caught(caught) {
            caught = caught ? 1 : 0;
            HEAP8[this.ptr + 12 >> 0] = caught;
          }
          get_caught() {
            return HEAP8[this.ptr + 12 >> 0] != 0;
          }
          set_rethrown(rethrown) {
            rethrown = rethrown ? 1 : 0;
            HEAP8[this.ptr + 13 >> 0] = rethrown;
          }
          get_rethrown() {
            return HEAP8[this.ptr + 13 >> 0] != 0;
          }
          init(type, destructor) {
            this.set_adjusted_ptr(0);
            this.set_type(type);
            this.set_destructor(destructor);
          }
          set_adjusted_ptr(adjustedPtr) {
            HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
          }
          get_adjusted_ptr() {
            return HEAPU32[this.ptr + 16 >> 2];
          }
          get_exception_ptr() {
            var isPointer = ___cxa_is_pointer_type(this.get_type());
            if (isPointer) {
              return HEAPU32[this.excPtr >> 2];
            }
            var adjusted = this.get_adjusted_ptr();
            if (adjusted !== 0)
              return adjusted;
            return this.excPtr;
          }
        }
        var ___resumeException = (ptr) => {
          if (!exceptionLast) {
            exceptionLast = new CppException(ptr);
          }
          throw exceptionLast;
        };
        var findMatchingCatch = (args) => {
          var thrown = exceptionLast?.excPtr;
          if (!thrown) {
            setTempRet0(0);
            return 0;
          }
          var info = new ExceptionInfo(thrown);
          info.set_adjusted_ptr(thrown);
          var thrownType = info.get_type();
          if (!thrownType) {
            setTempRet0(0);
            return thrown;
          }
          for (var arg in args) {
            var caughtType = args[arg];
            if (caughtType === 0 || caughtType === thrownType) {
              break;
            }
            var adjusted_ptr_addr = info.ptr + 16;
            if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
              setTempRet0(caughtType);
              return thrown;
            }
          }
          setTempRet0(thrownType);
          return thrown;
        };
        var ___cxa_find_matching_catch_2 = () => findMatchingCatch([]);
        var ___cxa_find_matching_catch_3 = (arg0) => findMatchingCatch([arg0]);
        var SYSCALLS = { varargs: void 0, get() {
          assert(SYSCALLS.varargs != void 0);
          var ret = HEAP32[+SYSCALLS.varargs >> 2];
          SYSCALLS.varargs += 4;
          return ret;
        }, getp() {
          return SYSCALLS.get();
        }, getStr(ptr) {
          var ret = UTF8ToString(ptr);
          return ret;
        } };
        function ___syscall_fcntl64(fd, cmd, varargs) {
          SYSCALLS.varargs = varargs;
          return 0;
        }
        function ___syscall_ioctl(fd, op, varargs) {
          SYSCALLS.varargs = varargs;
          return 0;
        }
        function ___syscall_openat(dirfd, path, flags, varargs) {
          SYSCALLS.varargs = varargs;
          abort("it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM");
        }
        var ___syscall_rmdir = (path) => {
          abort("it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM");
        };
        var ___syscall_unlinkat = (dirfd, path, flags) => {
          abort("it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM");
        };
        var convertI32PairToI53Checked = (lo, hi) => {
          assert(lo == lo >>> 0 || lo == (lo | 0));
          assert(hi === (hi | 0));
          return hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN;
        };
        function __gmtime_js(time_low, time_high, tmPtr) {
          var time = convertI32PairToI53Checked(time_low, time_high);
          var date = new Date(time * 1e3);
          HEAP32[tmPtr >> 2] = date.getUTCSeconds();
          HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes();
          HEAP32[tmPtr + 8 >> 2] = date.getUTCHours();
          HEAP32[tmPtr + 12 >> 2] = date.getUTCDate();
          HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth();
          HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
          HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
          var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
          var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
          HEAP32[tmPtr + 28 >> 2] = yday;
        }
        var lengthBytesUTF8 = (str) => {
          var len = 0;
          for (var i = 0; i < str.length; ++i) {
            var c = str.charCodeAt(i);
            if (c <= 127) {
              len++;
            } else if (c <= 2047) {
              len += 2;
            } else if (c >= 55296 && c <= 57343) {
              len += 4;
              ++i;
            } else {
              len += 3;
            }
          }
          return len;
        };
        var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
          assert(typeof str === "string", `stringToUTF8Array expects a string (got ${typeof str})`);
          if (!(maxBytesToWrite > 0))
            return 0;
          var startIdx = outIdx;
          var endIdx = outIdx + maxBytesToWrite - 1;
          for (var i = 0; i < str.length; ++i) {
            var u = str.charCodeAt(i);
            if (u >= 55296 && u <= 57343) {
              var u1 = str.charCodeAt(++i);
              u = 65536 + ((u & 1023) << 10) | u1 & 1023;
            }
            if (u <= 127) {
              if (outIdx >= endIdx)
                break;
              heap[outIdx++] = u;
            } else if (u <= 2047) {
              if (outIdx + 1 >= endIdx)
                break;
              heap[outIdx++] = 192 | u >> 6;
              heap[outIdx++] = 128 | u & 63;
            } else if (u <= 65535) {
              if (outIdx + 2 >= endIdx)
                break;
              heap[outIdx++] = 224 | u >> 12;
              heap[outIdx++] = 128 | u >> 6 & 63;
              heap[outIdx++] = 128 | u & 63;
            } else {
              if (outIdx + 3 >= endIdx)
                break;
              if (u > 1114111)
                warnOnce("Invalid Unicode code point " + ptrToString(u) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
              heap[outIdx++] = 240 | u >> 18;
              heap[outIdx++] = 128 | u >> 12 & 63;
              heap[outIdx++] = 128 | u >> 6 & 63;
              heap[outIdx++] = 128 | u & 63;
            }
          }
          heap[outIdx] = 0;
          return outIdx - startIdx;
        };
        var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
          assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
          return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
        };
        var stringToNewUTF8 = (str) => {
          var size = lengthBytesUTF8(str) + 1;
          var ret = _malloc(size);
          if (ret)
            stringToUTF8(str, ret, size);
          return ret;
        };
        var __tzset_js = (timezone, daylight, tzname) => {
          var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
          var winter = new Date(currentYear, 0, 1);
          var summer = new Date(currentYear, 6, 1);
          var winterOffset = winter.getTimezoneOffset();
          var summerOffset = summer.getTimezoneOffset();
          var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
          HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
          HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
          function extractZone(date) {
            var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
            return match ? match[1] : "GMT";
          }
          var winterName = extractZone(winter);
          var summerName = extractZone(summer);
          var winterNamePtr = stringToNewUTF8(winterName);
          var summerNamePtr = stringToNewUTF8(summerName);
          if (summerOffset < winterOffset) {
            HEAPU32[tzname >> 2] = winterNamePtr;
            HEAPU32[tzname + 4 >> 2] = summerNamePtr;
          } else {
            HEAPU32[tzname >> 2] = summerNamePtr;
            HEAPU32[tzname + 4 >> 2] = winterNamePtr;
          }
        };
        var _abort = () => {
          abort("native code called abort()");
        };
        var _emscripten_date_now = () => Date.now();
        var _emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);
        var getHeapMax = () => 2147483648;
        var growMemory = (size) => {
          var b = wasmMemory.buffer;
          var pages = (size - b.byteLength + 65535) / 65536;
          try {
            wasmMemory.grow(pages);
            updateMemoryViews();
            return 1;
          } catch (e) {
            err(`growMemory: Attempted to grow heap from ${b.byteLength} bytes to ${size} bytes, but got error: ${e}`);
          }
        };
        var _emscripten_resize_heap = (requestedSize) => {
          var oldSize = HEAPU8.length;
          requestedSize >>>= 0;
          assert(requestedSize > oldSize);
          var maxHeapSize = getHeapMax();
          if (requestedSize > maxHeapSize) {
            err(`Cannot enlarge memory, requested ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
            return false;
          }
          var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
          for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
            var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
            overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
            var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
            var replacement = growMemory(newSize);
            if (replacement) {
              return true;
            }
          }
          err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
          return false;
        };
        var _fd_close = (fd) => {
          abort("fd_close called without SYSCALLS_REQUIRE_FILESYSTEM");
        };
        var _fd_read = (fd, iov, iovcnt, pnum) => {
          abort("fd_read called without SYSCALLS_REQUIRE_FILESYSTEM");
        };
        function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
          var offset = convertI32PairToI53Checked(offset_low, offset_high);
          return 70;
        }
        var printCharBuffers = [null, [], []];
        var printChar = (stream, curr) => {
          var buffer = printCharBuffers[stream];
          assert(buffer);
          if (curr === 0 || curr === 10) {
            (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
            buffer.length = 0;
          } else {
            buffer.push(curr);
          }
        };
        var flush_NO_FILESYSTEM = () => {
          _fflush(0);
          if (printCharBuffers[1].length)
            printChar(1, 10);
          if (printCharBuffers[2].length)
            printChar(2, 10);
        };
        var _fd_write = (fd, iov, iovcnt, pnum) => {
          var num = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            for (var j = 0; j < len; j++) {
              printChar(fd, HEAPU8[ptr + j]);
            }
            num += len;
          }
          HEAPU32[pnum >> 2] = num;
          return 0;
        };
        var wasmTableMirror = [];
        var wasmTable;
        var getWasmTableEntry = (funcPtr) => {
          var func = wasmTableMirror[funcPtr];
          if (!func) {
            if (funcPtr >= wasmTableMirror.length)
              wasmTableMirror.length = funcPtr + 1;
            wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
          }
          assert(wasmTable.get(funcPtr) == func, "JavaScript-side Wasm function table mirror is out of date!");
          return func;
        };
        var getCFunc = (ident) => {
          var func = Module["_" + ident];
          assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
          return func;
        };
        var writeArrayToMemory = (array, buffer) => {
          assert(array.length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)");
          HEAP8.set(array, buffer);
        };
        var stringToUTF8OnStack = (str) => {
          var size = lengthBytesUTF8(str) + 1;
          var ret = stackAlloc(size);
          stringToUTF8(str, ret, size);
          return ret;
        };
        var ccall = (ident, returnType, argTypes, args, opts) => {
          var toC = { "string": (str) => {
            var ret2 = 0;
            if (str !== null && str !== void 0 && str !== 0) {
              ret2 = stringToUTF8OnStack(str);
            }
            return ret2;
          }, "array": (arr) => {
            var ret2 = stackAlloc(arr.length);
            writeArrayToMemory(arr, ret2);
            return ret2;
          } };
          function convertReturnValue(ret2) {
            if (returnType === "string") {
              return UTF8ToString(ret2);
            }
            if (returnType === "boolean")
              return Boolean(ret2);
            return ret2;
          }
          var func = getCFunc(ident);
          var cArgs = [];
          var stack = 0;
          assert(returnType !== "array", 'Return type should not be "array".');
          if (args) {
            for (var i = 0; i < args.length; i++) {
              var converter = toC[argTypes[i]];
              if (converter) {
                if (stack === 0)
                  stack = stackSave();
                cArgs[i] = converter(args[i]);
              } else {
                cArgs[i] = args[i];
              }
            }
          }
          var ret = func.apply(null, cArgs);
          function onDone(ret2) {
            if (stack !== 0)
              stackRestore(stack);
            return convertReturnValue(ret2);
          }
          ret = onDone(ret);
          return ret;
        };
        var cwrap = (ident, returnType, argTypes, opts) => function() {
          return ccall(ident, returnType, argTypes, arguments, opts);
        };
        function checkIncomingModuleAPI() {
          ignoredModuleProp("fetchSettings");
        }
        var wasmImports = { __assert_fail: ___assert_fail, __cxa_begin_catch: ___cxa_begin_catch, __cxa_find_matching_catch_2: ___cxa_find_matching_catch_2, __cxa_find_matching_catch_3: ___cxa_find_matching_catch_3, __resumeException: ___resumeException, __syscall_fcntl64: ___syscall_fcntl64, __syscall_ioctl: ___syscall_ioctl, __syscall_openat: ___syscall_openat, __syscall_rmdir: ___syscall_rmdir, __syscall_unlinkat: ___syscall_unlinkat, _gmtime_js: __gmtime_js, _tzset_js: __tzset_js, abort: _abort, emscripten_date_now: _emscripten_date_now, emscripten_memcpy_js: _emscripten_memcpy_js, emscripten_resize_heap: _emscripten_resize_heap, fd_close: _fd_close, fd_read: _fd_read, fd_seek: _fd_seek, fd_write: _fd_write, invoke_ii, invoke_iii, invoke_v, invoke_vi, invoke_vii, invoke_viii, invoke_viiii };
        var wasmExports = createWasm();
        var ___wasm_call_ctors = createExportWrapper("__wasm_call_ctors");
        var _cmsGetColorSpace = Module["_cmsGetColorSpace"] = createExportWrapper("cmsGetColorSpace");
        var _cmsXYZ2xyY = Module["_cmsXYZ2xyY"] = createExportWrapper("cmsXYZ2xyY");
        var _cmsCloseProfile = Module["_cmsCloseProfile"] = createExportWrapper("cmsCloseProfile");
        var _cmsDeleteTransform = Module["_cmsDeleteTransform"] = createExportWrapper("cmsDeleteTransform");
        var _cmsDoTransform = Module["_cmsDoTransform"] = createExportWrapper("cmsDoTransform");
        var _malloc = Module["_malloc"] = createExportWrapper("malloc");
        var _free = Module["_free"] = createExportWrapper("free");
        var _cmsFormatterForColorspaceOfProfile = Module["_cmsFormatterForColorspaceOfProfile"] = createExportWrapper("cmsFormatterForColorspaceOfProfile");
        var _cmsGetHeaderRenderingIntent = Module["_cmsGetHeaderRenderingIntent"] = createExportWrapper("cmsGetHeaderRenderingIntent");
        var _cmsOpenProfileFromMem = Module["_cmsOpenProfileFromMem"] = createExportWrapper("cmsOpenProfileFromMem");
        var _cmsReadTag = Module["_cmsReadTag"] = createExportWrapper("cmsReadTag");
        var _cmsGetProfileInfoASCII = Module["_cmsGetProfileInfoASCII"] = createExportWrapper("cmsGetProfileInfoASCII");
        var _cmsCreateTransform = Module["_cmsCreateTransform"] = createExportWrapper("cmsCreateTransform");
        var _cmsCreateXYZProfile = Module["_cmsCreateXYZProfile"] = createExportWrapper("cmsCreateXYZProfile");
        var _cmsCreateLab4Profile = Module["_cmsCreateLab4Profile"] = createExportWrapper("cmsCreateLab4Profile");
        var _cmsCreate_sRGBProfile = Module["_cmsCreate_sRGBProfile"] = createExportWrapper("cmsCreate_sRGBProfile");
        var _cmsCreateProofingTransform = Module["_cmsCreateProofingTransform"] = createExportWrapper("cmsCreateProofingTransform");
        var _cmsGetTransformInputFormat = Module["_cmsGetTransformInputFormat"] = createExportWrapper("cmsGetTransformInputFormat");
        var _cmsGetTransformOutputFormat = Module["_cmsGetTransformOutputFormat"] = createExportWrapper("cmsGetTransformOutputFormat");
        var _fflush = createExportWrapper("fflush");
        var _setThrew = createExportWrapper("setThrew");
        var setTempRet0 = createExportWrapper("setTempRet0");
        var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports["emscripten_stack_init"])();
        var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports["emscripten_stack_get_free"])();
        var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports["emscripten_stack_get_base"])();
        var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports["emscripten_stack_get_end"])();
        var stackSave = createExportWrapper("stackSave");
        var stackRestore = createExportWrapper("stackRestore");
        var stackAlloc = createExportWrapper("stackAlloc");
        var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"])();
        var ___cxa_free_exception = createExportWrapper("__cxa_free_exception");
        var ___cxa_increment_exception_refcount = createExportWrapper("__cxa_increment_exception_refcount");
        var ___cxa_decrement_exception_refcount = createExportWrapper("__cxa_decrement_exception_refcount");
        var ___get_exception_message = createExportWrapper("__get_exception_message");
        var ___cxa_can_catch = createExportWrapper("__cxa_can_catch");
        var ___cxa_is_pointer_type = createExportWrapper("__cxa_is_pointer_type");
        var dynCall_jiji = Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji");
        function invoke_ii(index, a1) {
          var sp = stackSave();
          try {
            return getWasmTableEntry(index)(a1);
          } catch (e) {
            stackRestore(sp);
            if (!(e instanceof EmscriptenEH))
              throw e;
            _setThrew(1, 0);
          }
        }
        function invoke_v(index) {
          var sp = stackSave();
          try {
            getWasmTableEntry(index)();
          } catch (e) {
            stackRestore(sp);
            if (!(e instanceof EmscriptenEH))
              throw e;
            _setThrew(1, 0);
          }
        }
        function invoke_vii(index, a1, a2) {
          var sp = stackSave();
          try {
            getWasmTableEntry(index)(a1, a2);
          } catch (e) {
            stackRestore(sp);
            if (!(e instanceof EmscriptenEH))
              throw e;
            _setThrew(1, 0);
          }
        }
        function invoke_vi(index, a1) {
          var sp = stackSave();
          try {
            getWasmTableEntry(index)(a1);
          } catch (e) {
            stackRestore(sp);
            if (!(e instanceof EmscriptenEH))
              throw e;
            _setThrew(1, 0);
          }
        }
        function invoke_viiii(index, a1, a2, a3, a4) {
          var sp = stackSave();
          try {
            getWasmTableEntry(index)(a1, a2, a3, a4);
          } catch (e) {
            stackRestore(sp);
            if (!(e instanceof EmscriptenEH))
              throw e;
            _setThrew(1, 0);
          }
        }
        function invoke_iii(index, a1, a2) {
          var sp = stackSave();
          try {
            return getWasmTableEntry(index)(a1, a2);
          } catch (e) {
            stackRestore(sp);
            if (!(e instanceof EmscriptenEH))
              throw e;
            _setThrew(1, 0);
          }
        }
        function invoke_viii(index, a1, a2, a3) {
          var sp = stackSave();
          try {
            getWasmTableEntry(index)(a1, a2, a3);
          } catch (e) {
            stackRestore(sp);
            if (!(e instanceof EmscriptenEH))
              throw e;
            _setThrew(1, 0);
          }
        }
        Module["ccall"] = ccall;
        Module["cwrap"] = cwrap;
        var missingLibrarySymbols = ["writeI53ToI64", "writeI53ToI64Clamped", "writeI53ToI64Signaling", "writeI53ToU64Clamped", "writeI53ToU64Signaling", "readI53FromI64", "readI53FromU64", "convertI32PairToI53", "convertU32PairToI53", "zeroMemory", "exitJS", "isLeapYear", "ydayFromDate", "arraySum", "addDays", "inetPton4", "inetNtop4", "inetPton6", "inetNtop6", "readSockaddr", "writeSockaddr", "initRandomFill", "randomFill", "getCallstack", "emscriptenLog", "convertPCtoSourceLocation", "readEmAsmArgs", "jstoi_q", "getExecutableName", "listenOnce", "autoResumeAudioContext", "dynCallLegacy", "getDynCaller", "dynCall", "handleException", "keepRuntimeAlive", "runtimeKeepalivePush", "runtimeKeepalivePop", "callUserCallback", "maybeExit", "asmjsMangle", "asyncLoad", "alignMemory", "mmapAlloc", "HandleAllocator", "getNativeTypeSize", "STACK_SIZE", "STACK_ALIGN", "POINTER_SIZE", "ASSERTIONS", "uleb128Encode", "sigToWasmTypes", "generateFuncType", "convertJsFunctionToWasm", "getEmptyTableSlot", "updateTableMap", "getFunctionAddress", "addFunction", "removeFunction", "reallyNegative", "unSign", "strLen", "reSign", "formatString", "intArrayFromString", "intArrayToString", "AsciiToString", "stringToAscii", "UTF16ToString", "stringToUTF16", "lengthBytesUTF16", "UTF32ToString", "stringToUTF32", "lengthBytesUTF32", "registerKeyEventCallback", "maybeCStringToJsString", "findEventTarget", "getBoundingClientRect", "fillMouseEventData", "registerMouseEventCallback", "registerWheelEventCallback", "registerUiEventCallback", "registerFocusEventCallback", "fillDeviceOrientationEventData", "registerDeviceOrientationEventCallback", "fillDeviceMotionEventData", "registerDeviceMotionEventCallback", "screenOrientation", "fillOrientationChangeEventData", "registerOrientationChangeEventCallback", "fillFullscreenChangeEventData", "registerFullscreenChangeEventCallback", "JSEvents_requestFullscreen", "JSEvents_resizeCanvasForFullscreen", "registerRestoreOldStyle", "hideEverythingExceptGivenElement", "restoreHiddenElements", "setLetterbox", "softFullscreenResizeWebGLRenderTarget", "doRequestFullscreen", "fillPointerlockChangeEventData", "registerPointerlockChangeEventCallback", "registerPointerlockErrorEventCallback", "requestPointerLock", "fillVisibilityChangeEventData", "registerVisibilityChangeEventCallback", "registerTouchEventCallback", "fillGamepadEventData", "registerGamepadEventCallback", "registerBeforeUnloadEventCallback", "fillBatteryEventData", "battery", "registerBatteryEventCallback", "setCanvasElementSize", "getCanvasElementSize", "demangle", "jsStackTrace", "stackTrace", "getEnvStrings", "checkWasiClock", "wasiRightsToMuslOFlags", "wasiOFlagsToMuslOFlags", "createDyncallWrapper", "safeSetTimeout", "setImmediateWrapped", "clearImmediateWrapped", "polyfillSetImmediate", "getPromise", "makePromise", "idsToPromises", "makePromiseCallback", "Browser_asyncPrepareDataCounter", "setMainLoop", "getSocketFromFD", "getSocketAddress", "heapObjectForWebGLType", "heapAccessShiftForWebGLHeap", "webgl_enable_ANGLE_instanced_arrays", "webgl_enable_OES_vertex_array_object", "webgl_enable_WEBGL_draw_buffers", "webgl_enable_WEBGL_multi_draw", "emscriptenWebGLGet", "computeUnpackAlignedImageSize", "colorChannelsInGlTextureFormat", "emscriptenWebGLGetTexPixelData", "__glGenObject", "emscriptenWebGLGetUniform", "webglGetUniformLocation", "webglPrepareUniformLocationsBeforeFirstUse", "webglGetLeftBracePos", "emscriptenWebGLGetVertexAttrib", "__glGetActiveAttribOrUniform", "writeGLArray", "registerWebGlEventCallback", "runAndAbortIfError", "SDL_unicode", "SDL_ttfContext", "SDL_audio", "ALLOC_NORMAL", "ALLOC_STACK", "allocate", "writeStringToMemory", "writeAsciiToMemory", "setErrNo"];
        missingLibrarySymbols.forEach(missingLibrarySymbol);
        var unexportedSymbols = ["run", "addOnPreRun", "addOnInit", "addOnPreMain", "addOnExit", "addOnPostRun", "addRunDependency", "removeRunDependency", "FS_createFolder", "FS_createPath", "FS_createLazyFile", "FS_createLink", "FS_createDevice", "FS_readFile", "out", "err", "callMain", "abort", "wasmMemory", "wasmExports", "stackAlloc", "stackSave", "stackRestore", "getTempRet0", "setTempRet0", "writeStackCookie", "checkStackCookie", "convertI32PairToI53Checked", "ptrToString", "getHeapMax", "growMemory", "ENV", "MONTH_DAYS_REGULAR", "MONTH_DAYS_LEAP", "MONTH_DAYS_REGULAR_CUMULATIVE", "MONTH_DAYS_LEAP_CUMULATIVE", "ERRNO_CODES", "ERRNO_MESSAGES", "DNS", "Protocols", "Sockets", "timers", "warnOnce", "UNWIND_CACHE", "readEmAsmArgsArray", "jstoi_s", "wasmTable", "noExitRuntime", "getCFunc", "freeTableIndexes", "functionsInTableMap", "setValue", "getValue", "PATH", "PATH_FS", "UTF8Decoder", "UTF8ArrayToString", "UTF8ToString", "stringToUTF8Array", "stringToUTF8", "lengthBytesUTF8", "UTF16Decoder", "stringToNewUTF8", "stringToUTF8OnStack", "writeArrayToMemory", "JSEvents", "specialHTMLTargets", "findCanvasEventTarget", "currentFullscreenStrategy", "restoreOldWindowedStyle", "ExitStatus", "flush_NO_FILESYSTEM", "promiseMap", "uncaughtExceptionCount", "exceptionLast", "exceptionCaught", "ExceptionInfo", "findMatchingCatch", "getExceptionMessageCommon", "incrementExceptionRefcount", "decrementExceptionRefcount", "getExceptionMessage", "Browser", "wget", "SYSCALLS", "tempFixedLengthArray", "miniTempWebGLFloatBuffers", "miniTempWebGLIntBuffers", "GL", "emscripten_webgl_power_preferences", "AL", "GLUT", "EGL", "GLEW", "IDBStore", "SDL", "SDL_gfx", "allocateUTF8", "allocateUTF8OnStack"];
        unexportedSymbols.forEach(unexportedRuntimeSymbol);
        var calledRun;
        dependenciesFulfilled = function runCaller() {
          if (!calledRun)
            run();
          if (!calledRun)
            dependenciesFulfilled = runCaller;
        };
        function stackCheckInit() {
          _emscripten_stack_init();
          writeStackCookie();
        }
        function run() {
          if (runDependencies > 0) {
            return;
          }
          stackCheckInit();
          preRun();
          if (runDependencies > 0) {
            return;
          }
          function doRun() {
            if (calledRun)
              return;
            calledRun = true;
            Module["calledRun"] = true;
            if (ABORT)
              return;
            initRuntime();
            readyPromiseResolve(Module);
            if (Module["onRuntimeInitialized"])
              Module["onRuntimeInitialized"]();
            assert(!Module["_main"], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
            postRun();
          }
          if (Module["setStatus"]) {
            Module["setStatus"]("Running...");
            setTimeout(function() {
              setTimeout(function() {
                Module["setStatus"]("");
              }, 1);
              doRun();
            }, 1);
          } else {
            doRun();
          }
          checkStackCookie();
        }
        if (Module["preInit"]) {
          if (typeof Module["preInit"] == "function")
            Module["preInit"] = [Module["preInit"]];
          while (Module["preInit"].length > 0) {
            Module["preInit"].pop()();
          }
        }
        run();
        Module.cmsOpenProfileFromMem = cwrap("cmsOpenProfileFromMem", "number", ["array", "number"]);
        Module.cmsCloseProfile = cwrap("cmsCloseProfile", void 0, ["number"]);
        Module.cmsCreate_sRGBProfile = cwrap("cmsCreate_sRGBProfile", "number", []);
        Module.cmsCreateXYZProfile = cwrap("cmsCreateXYZProfile", "number", [], []);
        Module.cmsGetHeaderRenderingIntent = cwrap("cmsGetHeaderRenderingIntent", "number", ["number"]);
        Module.cmsCreateLab4Profile = cmsCreateLab4Profile;
        function cmsCreateLab4Profile(wpArr) {
          var whitePoint = 0;
          if (wpArr) {
            whitePoint = _malloc(8 * 3);
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
        Module.cmsGetProfileInfoASCII = cmsGetProfileInfoASCII;
        function cmsGetProfileInfoASCII(hProfile, info, languageCode, countryCode) {
          var len = ccall("cmsGetProfileInfoASCII", "number", ["number", "number", "string", "string", "number", "number"], [hProfile, info, languageCode, countryCode, 0, 0]);
          var ptr = _malloc(len);
          var len = ccall("cmsGetProfileInfoASCII", "number", ["number", "number", "string", "string", "number", "number"], [hProfile, info, languageCode, countryCode, ptr, len]);
          var text = UTF8ToString(ptr, len);
          _free(ptr);
          return text;
        }
        Module.cmsGetColorSpace = cwrap("cmsGetColorSpace", "number", ["number"]);
        Module.cmsGetColorSpaceASCII = (profile) => {
          const table = { 1482250784: "XYZ", 1281450528: "Lab", 1282766368: "Luv", 1497588338: "YCbr", 1501067552: "Yxy", 1380401696: "RGB", 1196573017: "GRAY", 1213421088: "HSV", 1212961568: "HLS", 1129142603: "CMYK", 1129142560: "CMY" };
          const ret = Module.cmsGetColorSpace(profile);
          return table[ret] || null;
        };
        Module.cmsFormatterForColorspaceOfProfile = cmsFormatterForColorspaceOfProfile;
        function cmsFormatterForColorspaceOfProfile(hProfile, nBytes, isFloat) {
          return ccall("cmsFormatterForColorspaceOfProfile", "number", ["number", "number", "number"], [hProfile, nBytes, isFloat]);
        }
        Module.cmsCreateTransform = cmsCreateTransform;
        function cmsCreateTransform(hInput, inputFormat, hOutput, outputFormat, intent, flags) {
          return ccall("cmsCreateTransform", "number", ["number", "number", "number", "number", "number", "number"], [hInput, inputFormat, hOutput, outputFormat, intent, flags]);
        }
        Module.cmsCreateProofingTransform = cmsCreateProofingTransform;
        function cmsCreateProofingTransform(hInput, inputFormat, hOutput, outputFormat, proofing, intent, proofingIntent, flags) {
          return ccall("cmsCreateProofingTransform", "number", ["number", "number", "number", "number", "number", "number", "number", "number"], [hInput, inputFormat, hOutput, outputFormat, proofing, intent, proofingIntent, flags]);
        }
        Module.cmsDeleteTransform = cmsDeleteTransform;
        function cmsDeleteTransform(transform) {
          if (!transform) {
            throw new Error("cmsDeleteTransform expects a non-false transform parameter");
          }
          ccall("cmsDeleteTransform", void 0, ["number"], [transform]);
        }
        Module.cmsGetTransformInputFormat = cmsGetTransformInputFormat;
        function cmsGetTransformInputFormat(transform) {
          return ccall("cmsGetTransformInputFormat", "number", ["number"], [transform]);
        }
        Module.cmsGetTransformOutputFormat = cmsGetTransformOutputFormat;
        function cmsGetTransformOutputFormat(transform) {
          return ccall("cmsGetTransformOutputFormat", "number", ["number"], [transform]);
        }
        Module.cmsDoTransform = cmsDoTransform;
        function cmsDoTransform(transform, inputArr, size) {
          var inputFormat = cmsGetTransformInputFormat(transform);
          var outputFormat = cmsGetTransformOutputFormat(transform);
          var inputIsFloat = Boolean(T_FLOAT(inputFormat));
          var outputIsFloat = Boolean(T_FLOAT(outputFormat));
          var inputChannels = T_CHANNELS(inputFormat) + T_EXTRA(inputFormat);
          var outputChannels = T_CHANNELS(outputFormat) + T_EXTRA(inputFormat);
          var inputBytes = T_BYTES(inputFormat);
          var outputBytes = T_BYTES(outputFormat);
          inputBytes = inputBytes < 1 ? 4 : inputBytes;
          outputBytes = outputBytes < 1 ? 4 : outputBytes;
          var inputLength = inputChannels * size;
          var inputBuffer = _malloc(inputLength * inputBytes);
          var dataOnHeap;
          if (inputIsFloat) {
            dataOnHeap = new Float32Array(Module.HEAPU8.buffer, inputBuffer, inputLength);
          } else {
            dataOnHeap = new Uint8Array(Module.HEAPU8.buffer, inputBuffer, inputLength);
          }
          dataOnHeap.set(inputArr);
          var outputLength = outputChannels * size;
          var outputBuffer = _malloc(outputLength * outputBytes);
          ccall("cmsDoTransform", void 0, ["number", "number", "number", "number"], [transform, inputBuffer, outputBuffer, size]);
          var outputArr;
          if (outputIsFloat) {
            outputArr = new Float32Array(Module.HEAPU8.buffer, outputBuffer, outputLength).slice();
          } else {
            outputArr = new Uint8Array(Module.HEAPU8.buffer, outputBuffer, outputLength).slice();
          }
          _free(inputBuffer);
          _free(outputBuffer);
          return outputArr;
        }
        Module.cmsReadTag = cmsReadTag;
        function cmsReadTag(hProfile, sig) {
          var ptr = ccall("cmsReadTag", void 0, ["number", "number"], [hProfile, sig]);
          return ptr;
        }
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
          ccall("cmsXYZ2xyY", void 0, ["number", "number"], [dstPtr, srcPtr]);
          var xyY = new Float64Array(3);
          xyY[0] = getValue(dstPtr, "double");
          xyY[1] = getValue(dstPtr + 8, "double");
          xyY[2] = getValue(dstPtr + 16, "double");
          _free(srcPtr);
          _free(dstPtr);
          return xyY;
        }
        return moduleArg.ready;
      };
    })();
    if (typeof exports2 === "object" && typeof module2 === "object")
      module2.exports = instantiate2;
    else if (typeof define === "function" && define["amd"])
      define([], () => instantiate2);
  }
});

// tmp/cjs-shim.js
var cjs_shim_exports = {};
__export(cjs_shim_exports, {
  BYTES_SH: () => BYTES_SH,
  CHANNELS_SH: () => CHANNELS_SH,
  COLORSPACE_SH: () => COLORSPACE_SH,
  DOSWAP_SH: () => DOSWAP_SH,
  ENDIAN16_SH: () => ENDIAN16_SH,
  EXTRA_SH: () => EXTRA_SH,
  FLAVOR_SH: () => FLAVOR_SH,
  FLOAT_SH: () => FLOAT_SH,
  INTENT_ABSOLUTE_COLORIMETRIC: () => INTENT_ABSOLUTE_COLORIMETRIC,
  INTENT_PERCEPTUAL: () => INTENT_PERCEPTUAL,
  INTENT_RELATIVE_COLORIMETRIC: () => INTENT_RELATIVE_COLORIMETRIC,
  INTENT_SATURATION: () => INTENT_SATURATION,
  LCMS_VERSION: () => LCMS_VERSION,
  OPTIMIZED_SH: () => OPTIMIZED_SH,
  PLANAR_SH: () => PLANAR_SH,
  PT_ANY: () => PT_ANY,
  PT_CMY: () => PT_CMY,
  PT_CMYK: () => PT_CMYK,
  PT_GRAY: () => PT_GRAY,
  PT_HLS: () => PT_HLS,
  PT_HSV: () => PT_HSV,
  PT_Lab: () => PT_Lab,
  PT_LabV2: () => PT_LabV2,
  PT_MCH1: () => PT_MCH1,
  PT_MCH10: () => PT_MCH10,
  PT_MCH11: () => PT_MCH11,
  PT_MCH12: () => PT_MCH12,
  PT_MCH13: () => PT_MCH13,
  PT_MCH14: () => PT_MCH14,
  PT_MCH15: () => PT_MCH15,
  PT_MCH2: () => PT_MCH2,
  PT_MCH3: () => PT_MCH3,
  PT_MCH4: () => PT_MCH4,
  PT_MCH5: () => PT_MCH5,
  PT_MCH6: () => PT_MCH6,
  PT_MCH7: () => PT_MCH7,
  PT_MCH8: () => PT_MCH8,
  PT_MCH9: () => PT_MCH9,
  PT_RGB: () => PT_RGB,
  PT_XYZ: () => PT_XYZ,
  PT_YCbCr: () => PT_YCbCr,
  PT_YUV: () => PT_YUV,
  PT_YUVK: () => PT_YUVK,
  PT_Yxy: () => PT_Yxy,
  SWAPFIRST_SH: () => SWAPFIRST_SH,
  TYPE_ABGR_16: () => TYPE_ABGR_16,
  TYPE_ABGR_16_PLANAR: () => TYPE_ABGR_16_PLANAR,
  TYPE_ABGR_16_SE: () => TYPE_ABGR_16_SE,
  TYPE_ABGR_8: () => TYPE_ABGR_8,
  TYPE_ABGR_8_PLANAR: () => TYPE_ABGR_8_PLANAR,
  TYPE_ALabV2_8: () => TYPE_ALabV2_8,
  TYPE_ALab_8: () => TYPE_ALab_8,
  TYPE_ARGB_16: () => TYPE_ARGB_16,
  TYPE_ARGB_8: () => TYPE_ARGB_8,
  TYPE_ARGB_8_PLANAR: () => TYPE_ARGB_8_PLANAR,
  TYPE_BGRA_16: () => TYPE_BGRA_16,
  TYPE_BGRA_16_SE: () => TYPE_BGRA_16_SE,
  TYPE_BGRA_8: () => TYPE_BGRA_8,
  TYPE_BGRA_8_PLANAR: () => TYPE_BGRA_8_PLANAR,
  TYPE_BGR_16: () => TYPE_BGR_16,
  TYPE_BGR_16_PLANAR: () => TYPE_BGR_16_PLANAR,
  TYPE_BGR_16_SE: () => TYPE_BGR_16_SE,
  TYPE_BGR_8: () => TYPE_BGR_8,
  TYPE_BGR_8_PLANAR: () => TYPE_BGR_8_PLANAR,
  TYPE_BGR_DBL: () => TYPE_BGR_DBL,
  TYPE_CMYK10_16: () => TYPE_CMYK10_16,
  TYPE_CMYK10_16_SE: () => TYPE_CMYK10_16_SE,
  TYPE_CMYK10_8: () => TYPE_CMYK10_8,
  TYPE_CMYK11_16: () => TYPE_CMYK11_16,
  TYPE_CMYK11_16_SE: () => TYPE_CMYK11_16_SE,
  TYPE_CMYK11_8: () => TYPE_CMYK11_8,
  TYPE_CMYK12_16: () => TYPE_CMYK12_16,
  TYPE_CMYK12_16_SE: () => TYPE_CMYK12_16_SE,
  TYPE_CMYK12_8: () => TYPE_CMYK12_8,
  TYPE_CMYK5_16: () => TYPE_CMYK5_16,
  TYPE_CMYK5_16_SE: () => TYPE_CMYK5_16_SE,
  TYPE_CMYK5_8: () => TYPE_CMYK5_8,
  TYPE_CMYK6_16: () => TYPE_CMYK6_16,
  TYPE_CMYK6_16_PLANAR: () => TYPE_CMYK6_16_PLANAR,
  TYPE_CMYK6_16_SE: () => TYPE_CMYK6_16_SE,
  TYPE_CMYK6_8: () => TYPE_CMYK6_8,
  TYPE_CMYK6_8_PLANAR: () => TYPE_CMYK6_8_PLANAR,
  TYPE_CMYK7_16: () => TYPE_CMYK7_16,
  TYPE_CMYK7_16_SE: () => TYPE_CMYK7_16_SE,
  TYPE_CMYK7_8: () => TYPE_CMYK7_8,
  TYPE_CMYK8_16: () => TYPE_CMYK8_16,
  TYPE_CMYK8_16_SE: () => TYPE_CMYK8_16_SE,
  TYPE_CMYK8_8: () => TYPE_CMYK8_8,
  TYPE_CMYK9_16: () => TYPE_CMYK9_16,
  TYPE_CMYK9_16_SE: () => TYPE_CMYK9_16_SE,
  TYPE_CMYK9_8: () => TYPE_CMYK9_8,
  TYPE_CMYKA_8: () => TYPE_CMYKA_8,
  TYPE_CMYK_16: () => TYPE_CMYK_16,
  TYPE_CMYK_16_PLANAR: () => TYPE_CMYK_16_PLANAR,
  TYPE_CMYK_16_REV: () => TYPE_CMYK_16_REV,
  TYPE_CMYK_16_SE: () => TYPE_CMYK_16_SE,
  TYPE_CMYK_8: () => TYPE_CMYK_8,
  TYPE_CMYK_8_PLANAR: () => TYPE_CMYK_8_PLANAR,
  TYPE_CMYK_8_REV: () => TYPE_CMYK_8_REV,
  TYPE_CMYK_DBL: () => TYPE_CMYK_DBL,
  TYPE_CMY_16: () => TYPE_CMY_16,
  TYPE_CMY_16_PLANAR: () => TYPE_CMY_16_PLANAR,
  TYPE_CMY_16_SE: () => TYPE_CMY_16_SE,
  TYPE_CMY_8: () => TYPE_CMY_8,
  TYPE_CMY_8_PLANAR: () => TYPE_CMY_8_PLANAR,
  TYPE_GRAYA_16: () => TYPE_GRAYA_16,
  TYPE_GRAYA_16_PLANAR: () => TYPE_GRAYA_16_PLANAR,
  TYPE_GRAYA_16_SE: () => TYPE_GRAYA_16_SE,
  TYPE_GRAYA_8: () => TYPE_GRAYA_8,
  TYPE_GRAYA_8_PLANAR: () => TYPE_GRAYA_8_PLANAR,
  TYPE_GRAY_16: () => TYPE_GRAY_16,
  TYPE_GRAY_16_REV: () => TYPE_GRAY_16_REV,
  TYPE_GRAY_16_SE: () => TYPE_GRAY_16_SE,
  TYPE_GRAY_8: () => TYPE_GRAY_8,
  TYPE_GRAY_8_REV: () => TYPE_GRAY_8_REV,
  TYPE_GRAY_DBL: () => TYPE_GRAY_DBL,
  TYPE_KCMY_16: () => TYPE_KCMY_16,
  TYPE_KCMY_16_REV: () => TYPE_KCMY_16_REV,
  TYPE_KCMY_16_SE: () => TYPE_KCMY_16_SE,
  TYPE_KCMY_8: () => TYPE_KCMY_8,
  TYPE_KCMY_8_REV: () => TYPE_KCMY_8_REV,
  TYPE_KYMC10_16: () => TYPE_KYMC10_16,
  TYPE_KYMC10_16_SE: () => TYPE_KYMC10_16_SE,
  TYPE_KYMC10_8: () => TYPE_KYMC10_8,
  TYPE_KYMC11_16: () => TYPE_KYMC11_16,
  TYPE_KYMC11_16_SE: () => TYPE_KYMC11_16_SE,
  TYPE_KYMC11_8: () => TYPE_KYMC11_8,
  TYPE_KYMC12_16: () => TYPE_KYMC12_16,
  TYPE_KYMC12_16_SE: () => TYPE_KYMC12_16_SE,
  TYPE_KYMC12_8: () => TYPE_KYMC12_8,
  TYPE_KYMC5_16: () => TYPE_KYMC5_16,
  TYPE_KYMC5_16_SE: () => TYPE_KYMC5_16_SE,
  TYPE_KYMC5_8: () => TYPE_KYMC5_8,
  TYPE_KYMC7_16: () => TYPE_KYMC7_16,
  TYPE_KYMC7_16_SE: () => TYPE_KYMC7_16_SE,
  TYPE_KYMC7_8: () => TYPE_KYMC7_8,
  TYPE_KYMC8_16: () => TYPE_KYMC8_16,
  TYPE_KYMC8_16_SE: () => TYPE_KYMC8_16_SE,
  TYPE_KYMC8_8: () => TYPE_KYMC8_8,
  TYPE_KYMC9_16: () => TYPE_KYMC9_16,
  TYPE_KYMC9_16_SE: () => TYPE_KYMC9_16_SE,
  TYPE_KYMC9_8: () => TYPE_KYMC9_8,
  TYPE_KYMC_16: () => TYPE_KYMC_16,
  TYPE_KYMC_16_SE: () => TYPE_KYMC_16_SE,
  TYPE_KYMC_8: () => TYPE_KYMC_8,
  TYPE_LabV2_16: () => TYPE_LabV2_16,
  TYPE_LabV2_8: () => TYPE_LabV2_8,
  TYPE_Lab_16: () => TYPE_Lab_16,
  TYPE_Lab_8: () => TYPE_Lab_8,
  TYPE_Lab_DBL: () => TYPE_Lab_DBL,
  TYPE_RGBA_16: () => TYPE_RGBA_16,
  TYPE_RGBA_16_PLANAR: () => TYPE_RGBA_16_PLANAR,
  TYPE_RGBA_16_SE: () => TYPE_RGBA_16_SE,
  TYPE_RGBA_8: () => TYPE_RGBA_8,
  TYPE_RGBA_8_PLANAR: () => TYPE_RGBA_8_PLANAR,
  TYPE_RGB_16: () => TYPE_RGB_16,
  TYPE_RGB_16_PLANAR: () => TYPE_RGB_16_PLANAR,
  TYPE_RGB_16_SE: () => TYPE_RGB_16_SE,
  TYPE_RGB_8: () => TYPE_RGB_8,
  TYPE_RGB_8_PLANAR: () => TYPE_RGB_8_PLANAR,
  TYPE_RGB_DBL: () => TYPE_RGB_DBL,
  TYPE_XYZ_16: () => TYPE_XYZ_16,
  TYPE_XYZ_DBL: () => TYPE_XYZ_DBL,
  TYPE_YUVK_16: () => TYPE_YUVK_16,
  TYPE_YUVK_8: () => TYPE_YUVK_8,
  TYPE_Yxy_16: () => TYPE_Yxy_16,
  T_BYTES: () => T_BYTES2,
  T_CHANNELS: () => T_CHANNELS2,
  T_COLORSPACE: () => T_COLORSPACE,
  T_DOSWAP: () => T_DOSWAP,
  T_ENDIAN16: () => T_ENDIAN16,
  T_EXTRA: () => T_EXTRA2,
  T_FLAVOR: () => T_FLAVOR,
  T_FLOAT: () => T_FLOAT2,
  T_OPTIMIZED: () => T_OPTIMIZED,
  T_PLANAR: () => T_PLANAR,
  T_SWAPFIRST: () => T_SWAPFIRST,
  cmsFLAGS_BLACKPOINTCOMPENSATION: () => cmsFLAGS_BLACKPOINTCOMPENSATION,
  cmsFLAGS_COPY_ALPHA: () => cmsFLAGS_COPY_ALPHA,
  cmsFLAGS_GAMUTCHECK: () => cmsFLAGS_GAMUTCHECK,
  cmsFLAGS_HIGHRESPRECALC: () => cmsFLAGS_HIGHRESPRECALC,
  cmsFLAGS_LOWRESPRECALC: () => cmsFLAGS_LOWRESPRECALC,
  cmsFLAGS_NOCACHE: () => cmsFLAGS_NOCACHE,
  cmsFLAGS_NOOPTIMIZE: () => cmsFLAGS_NOOPTIMIZE,
  cmsFLAGS_NOWHITEONWHITEFIXUP: () => cmsFLAGS_NOWHITEONWHITEFIXUP,
  cmsFLAGS_NULLTRANSFORM: () => cmsFLAGS_NULLTRANSFORM,
  cmsFLAGS_SOFTPROOFING: () => cmsFLAGS_SOFTPROOFING,
  cmsInfoCopyright: () => cmsInfoCopyright,
  cmsInfoDescription: () => cmsInfoDescription,
  cmsInfoManufacturer: () => cmsInfoManufacturer,
  cmsInfoModel: () => cmsInfoModel,
  cmsMAXCHANNELS: () => cmsMAXCHANNELS,
  cmsSigBlueColorantTag: () => cmsSigBlueColorantTag,
  cmsSigCmyData: () => cmsSigCmyData,
  cmsSigCmykData: () => cmsSigCmykData,
  cmsSigGrayData: () => cmsSigGrayData,
  cmsSigGreenColorantTag: () => cmsSigGreenColorantTag,
  cmsSigHlsData: () => cmsSigHlsData,
  cmsSigHsvData: () => cmsSigHsvData,
  cmsSigLabData: () => cmsSigLabData,
  cmsSigLuvData: () => cmsSigLuvData,
  cmsSigRedColorantTag: () => cmsSigRedColorantTag,
  cmsSigRgbData: () => cmsSigRgbData,
  cmsSigXYZData: () => cmsSigXYZData,
  cmsSigYCbCrData: () => cmsSigYCbCrData,
  cmsSigYxyData: () => cmsSigYxyData,
  instantiate: () => instantiate
});
module.exports = __toCommonJS(cjs_shim_exports);

// lib/constants.js
var LCMS_VERSION = 2160;
var cmsMAXCHANNELS = 16;
var cmsSigRedColorantTag = 1918392666;
var cmsSigGreenColorantTag = 1733843290;
var cmsSigBlueColorantTag = 1649957210;
var cmsSigXYZData = 1482250784;
var cmsSigLabData = 1281450528;
var cmsSigLuvData = 1282766368;
var cmsSigYCbCrData = 1497588338;
var cmsSigYxyData = 1501067552;
var cmsSigRgbData = 1380401696;
var cmsSigGrayData = 1196573017;
var cmsSigHsvData = 1213421088;
var cmsSigHlsData = 1212961568;
var cmsSigCmykData = 1129142603;
var cmsSigCmyData = 1129142560;
var FLOAT_SH = (a) => a << 22;
var OPTIMIZED_SH = (s) => s << 21;
var COLORSPACE_SH = (s) => s << 16;
var SWAPFIRST_SH = (s) => s << 14;
var FLAVOR_SH = (s) => s << 13;
var PLANAR_SH = (p) => p << 12;
var ENDIAN16_SH = (e) => e << 11;
var DOSWAP_SH = (e) => e << 10;
var EXTRA_SH = (e) => e << 7;
var CHANNELS_SH = (c) => c << 3;
var BYTES_SH = (b) => b;
var T_FLOAT2 = (a) => a >> 22 & 1;
var T_OPTIMIZED = (o) => o >> 21 & 1;
var T_COLORSPACE = (s) => s >> 16 & 31;
var T_SWAPFIRST = (s) => s >> 14 & 1;
var T_FLAVOR = (s) => s >> 13 & 1;
var T_PLANAR = (p) => p >> 12 & 1;
var T_ENDIAN16 = (e) => e >> 11 & 1;
var T_DOSWAP = (e) => e >> 10 & 1;
var T_EXTRA2 = (e) => e >> 7 & 7;
var T_CHANNELS2 = (c) => c >> 3 & 15;
var T_BYTES2 = (b) => b & 7;
var PT_ANY = 0;
var PT_GRAY = 3;
var PT_RGB = 4;
var PT_CMY = 5;
var PT_CMYK = 6;
var PT_YCbCr = 7;
var PT_YUV = 8;
var PT_XYZ = 9;
var PT_Lab = 10;
var PT_YUVK = 11;
var PT_HSV = 12;
var PT_HLS = 13;
var PT_Yxy = 14;
var PT_MCH1 = 15;
var PT_MCH2 = 16;
var PT_MCH3 = 17;
var PT_MCH4 = 18;
var PT_MCH5 = 19;
var PT_MCH6 = 20;
var PT_MCH7 = 21;
var PT_MCH8 = 22;
var PT_MCH9 = 23;
var PT_MCH10 = 24;
var PT_MCH11 = 25;
var PT_MCH12 = 26;
var PT_MCH13 = 27;
var PT_MCH14 = 28;
var PT_MCH15 = 29;
var PT_LabV2 = 30;
var TYPE_GRAY_8 = COLORSPACE_SH(PT_GRAY) | CHANNELS_SH(1) | BYTES_SH(1);
var TYPE_GRAY_8_REV = COLORSPACE_SH(PT_GRAY) | CHANNELS_SH(1) | BYTES_SH(1) | FLAVOR_SH(1);
var TYPE_GRAY_16 = COLORSPACE_SH(PT_GRAY) | CHANNELS_SH(1) | BYTES_SH(2);
var TYPE_GRAY_16_REV = COLORSPACE_SH(PT_GRAY) | CHANNELS_SH(1) | BYTES_SH(2) | FLAVOR_SH(1);
var TYPE_GRAY_16_SE = COLORSPACE_SH(PT_GRAY) | CHANNELS_SH(1) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_GRAYA_8 = COLORSPACE_SH(PT_GRAY) | EXTRA_SH(1) | CHANNELS_SH(1) | BYTES_SH(1);
var TYPE_GRAYA_16 = COLORSPACE_SH(PT_GRAY) | EXTRA_SH(1) | CHANNELS_SH(1) | BYTES_SH(2);
var TYPE_GRAYA_16_SE = COLORSPACE_SH(PT_GRAY) | EXTRA_SH(1) | CHANNELS_SH(1) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_GRAYA_8_PLANAR = COLORSPACE_SH(PT_GRAY) | EXTRA_SH(1) | CHANNELS_SH(1) | BYTES_SH(1) | PLANAR_SH(1);
var TYPE_GRAYA_16_PLANAR = COLORSPACE_SH(PT_GRAY) | EXTRA_SH(1) | CHANNELS_SH(1) | BYTES_SH(2) | PLANAR_SH(1);
var TYPE_RGB_8 = COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(1);
var TYPE_RGB_8_PLANAR = COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(1) | PLANAR_SH(1);
var TYPE_BGR_8 = COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(1) | DOSWAP_SH(1);
var TYPE_BGR_8_PLANAR = COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(1) | DOSWAP_SH(1) | PLANAR_SH(1);
var TYPE_RGB_16 = COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(2);
var TYPE_RGB_16_PLANAR = COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(2) | PLANAR_SH(1);
var TYPE_RGB_16_SE = COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_BGR_16 = COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(2) | DOSWAP_SH(1);
var TYPE_BGR_16_PLANAR = COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(2) | DOSWAP_SH(1) | PLANAR_SH(1);
var TYPE_BGR_16_SE = COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(2) | DOSWAP_SH(1) | ENDIAN16_SH(1);
var TYPE_RGBA_8 = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(1);
var TYPE_RGBA_8_PLANAR = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(1) | PLANAR_SH(1);
var TYPE_RGBA_16 = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(2);
var TYPE_RGBA_16_PLANAR = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(2) | PLANAR_SH(1);
var TYPE_RGBA_16_SE = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_ARGB_8 = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(1) | SWAPFIRST_SH(1);
var TYPE_ARGB_8_PLANAR = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(1) | SWAPFIRST_SH(1) | PLANAR_SH(1);
var TYPE_ARGB_16 = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(2) | SWAPFIRST_SH(1);
var TYPE_ABGR_8 = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(1) | DOSWAP_SH(1);
var TYPE_ABGR_8_PLANAR = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(1) | DOSWAP_SH(1) | PLANAR_SH(1);
var TYPE_ABGR_16 = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(2) | DOSWAP_SH(1);
var TYPE_ABGR_16_PLANAR = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(2) | DOSWAP_SH(1) | PLANAR_SH(1);
var TYPE_ABGR_16_SE = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(2) | DOSWAP_SH(1) | ENDIAN16_SH(1);
var TYPE_BGRA_8 = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(1) | DOSWAP_SH(1) | SWAPFIRST_SH(1);
var TYPE_BGRA_8_PLANAR = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(1) | DOSWAP_SH(1) | SWAPFIRST_SH(1) | PLANAR_SH(1);
var TYPE_BGRA_16 = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(2) | DOSWAP_SH(1) | SWAPFIRST_SH(1);
var TYPE_BGRA_16_SE = COLORSPACE_SH(PT_RGB) | EXTRA_SH(1) | CHANNELS_SH(3) | BYTES_SH(2) | ENDIAN16_SH(1) | DOSWAP_SH(1) | SWAPFIRST_SH(1);
var TYPE_CMY_8 = COLORSPACE_SH(PT_CMY) | CHANNELS_SH(3) | BYTES_SH(1);
var TYPE_CMY_8_PLANAR = COLORSPACE_SH(PT_CMY) | CHANNELS_SH(3) | BYTES_SH(1) | PLANAR_SH(1);
var TYPE_CMY_16 = COLORSPACE_SH(PT_CMY) | CHANNELS_SH(3) | BYTES_SH(2);
var TYPE_CMY_16_PLANAR = COLORSPACE_SH(PT_CMY) | CHANNELS_SH(3) | BYTES_SH(2) | PLANAR_SH(1);
var TYPE_CMY_16_SE = COLORSPACE_SH(PT_CMY) | CHANNELS_SH(3) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_CMYK_8 = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(1);
var TYPE_CMYKA_8 = COLORSPACE_SH(PT_CMYK) | EXTRA_SH(1) | CHANNELS_SH(4) | BYTES_SH(1);
var TYPE_CMYK_8_REV = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(1) | FLAVOR_SH(1);
var TYPE_YUVK_8 = TYPE_CMYK_8_REV;
var TYPE_CMYK_8_PLANAR = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(1) | PLANAR_SH(1);
var TYPE_CMYK_16 = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2);
var TYPE_CMYK_16_REV = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2) | FLAVOR_SH(1);
var TYPE_YUVK_16 = TYPE_CMYK_16_REV;
var TYPE_CMYK_16_PLANAR = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2) | PLANAR_SH(1);
var TYPE_CMYK_16_SE = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_KYMC_8 = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(1) | DOSWAP_SH(1);
var TYPE_KYMC_16 = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2) | DOSWAP_SH(1);
var TYPE_KYMC_16_SE = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2) | DOSWAP_SH(1) | ENDIAN16_SH(1);
var TYPE_KCMY_8 = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(1) | SWAPFIRST_SH(1);
var TYPE_KCMY_8_REV = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(1) | FLAVOR_SH(1) | SWAPFIRST_SH(1);
var TYPE_KCMY_16 = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2) | SWAPFIRST_SH(1);
var TYPE_KCMY_16_REV = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2) | FLAVOR_SH(1) | SWAPFIRST_SH(1);
var TYPE_KCMY_16_SE = COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(2) | ENDIAN16_SH(1) | SWAPFIRST_SH(1);
var TYPE_CMYK5_8 = COLORSPACE_SH(PT_MCH5) | CHANNELS_SH(5) | BYTES_SH(1);
var TYPE_CMYK5_16 = COLORSPACE_SH(PT_MCH5) | CHANNELS_SH(5) | BYTES_SH(2);
var TYPE_CMYK5_16_SE = COLORSPACE_SH(PT_MCH5) | CHANNELS_SH(5) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_KYMC5_8 = COLORSPACE_SH(PT_MCH5) | CHANNELS_SH(5) | BYTES_SH(1) | DOSWAP_SH(1);
var TYPE_KYMC5_16 = COLORSPACE_SH(PT_MCH5) | CHANNELS_SH(5) | BYTES_SH(2) | DOSWAP_SH(1);
var TYPE_KYMC5_16_SE = COLORSPACE_SH(PT_MCH5) | CHANNELS_SH(5) | BYTES_SH(2) | DOSWAP_SH(1) | ENDIAN16_SH(1);
var TYPE_CMYK6_8 = COLORSPACE_SH(PT_MCH6) | CHANNELS_SH(6) | BYTES_SH(1);
var TYPE_CMYK6_8_PLANAR = COLORSPACE_SH(PT_MCH6) | CHANNELS_SH(6) | BYTES_SH(1) | PLANAR_SH(1);
var TYPE_CMYK6_16 = COLORSPACE_SH(PT_MCH6) | CHANNELS_SH(6) | BYTES_SH(2);
var TYPE_CMYK6_16_PLANAR = COLORSPACE_SH(PT_MCH6) | CHANNELS_SH(6) | BYTES_SH(2) | PLANAR_SH(1);
var TYPE_CMYK6_16_SE = COLORSPACE_SH(PT_MCH6) | CHANNELS_SH(6) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_CMYK7_8 = COLORSPACE_SH(PT_MCH7) | CHANNELS_SH(7) | BYTES_SH(1);
var TYPE_CMYK7_16 = COLORSPACE_SH(PT_MCH7) | CHANNELS_SH(7) | BYTES_SH(2);
var TYPE_CMYK7_16_SE = COLORSPACE_SH(PT_MCH7) | CHANNELS_SH(7) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_KYMC7_8 = COLORSPACE_SH(PT_MCH7) | CHANNELS_SH(7) | BYTES_SH(1) | DOSWAP_SH(1);
var TYPE_KYMC7_16 = COLORSPACE_SH(PT_MCH7) | CHANNELS_SH(7) | BYTES_SH(2) | DOSWAP_SH(1);
var TYPE_KYMC7_16_SE = COLORSPACE_SH(PT_MCH7) | CHANNELS_SH(7) | BYTES_SH(2) | DOSWAP_SH(1) | ENDIAN16_SH(1);
var TYPE_CMYK8_8 = COLORSPACE_SH(PT_MCH8) | CHANNELS_SH(8) | BYTES_SH(1);
var TYPE_CMYK8_16 = COLORSPACE_SH(PT_MCH8) | CHANNELS_SH(8) | BYTES_SH(2);
var TYPE_CMYK8_16_SE = COLORSPACE_SH(PT_MCH8) | CHANNELS_SH(8) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_KYMC8_8 = COLORSPACE_SH(PT_MCH8) | CHANNELS_SH(8) | BYTES_SH(1) | DOSWAP_SH(1);
var TYPE_KYMC8_16 = COLORSPACE_SH(PT_MCH8) | CHANNELS_SH(8) | BYTES_SH(2) | DOSWAP_SH(1);
var TYPE_KYMC8_16_SE = COLORSPACE_SH(PT_MCH8) | CHANNELS_SH(8) | BYTES_SH(2) | DOSWAP_SH(1) | ENDIAN16_SH(1);
var TYPE_CMYK9_8 = COLORSPACE_SH(PT_MCH9) | CHANNELS_SH(9) | BYTES_SH(1);
var TYPE_CMYK9_16 = COLORSPACE_SH(PT_MCH9) | CHANNELS_SH(9) | BYTES_SH(2);
var TYPE_CMYK9_16_SE = COLORSPACE_SH(PT_MCH9) | CHANNELS_SH(9) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_KYMC9_8 = COLORSPACE_SH(PT_MCH9) | CHANNELS_SH(9) | BYTES_SH(1) | DOSWAP_SH(1);
var TYPE_KYMC9_16 = COLORSPACE_SH(PT_MCH9) | CHANNELS_SH(9) | BYTES_SH(2) | DOSWAP_SH(1);
var TYPE_KYMC9_16_SE = COLORSPACE_SH(PT_MCH9) | CHANNELS_SH(9) | BYTES_SH(2) | DOSWAP_SH(1) | ENDIAN16_SH(1);
var TYPE_CMYK10_8 = COLORSPACE_SH(PT_MCH10) | CHANNELS_SH(10) | BYTES_SH(1);
var TYPE_CMYK10_16 = COLORSPACE_SH(PT_MCH10) | CHANNELS_SH(10) | BYTES_SH(2);
var TYPE_CMYK10_16_SE = COLORSPACE_SH(PT_MCH10) | CHANNELS_SH(10) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_KYMC10_8 = COLORSPACE_SH(PT_MCH10) | CHANNELS_SH(10) | BYTES_SH(1) | DOSWAP_SH(1);
var TYPE_KYMC10_16 = COLORSPACE_SH(PT_MCH10) | CHANNELS_SH(10) | BYTES_SH(2) | DOSWAP_SH(1);
var TYPE_KYMC10_16_SE = COLORSPACE_SH(PT_MCH10) | CHANNELS_SH(10) | BYTES_SH(2) | DOSWAP_SH(1) | ENDIAN16_SH(1);
var TYPE_CMYK11_8 = COLORSPACE_SH(PT_MCH11) | CHANNELS_SH(11) | BYTES_SH(1);
var TYPE_CMYK11_16 = COLORSPACE_SH(PT_MCH11) | CHANNELS_SH(11) | BYTES_SH(2);
var TYPE_CMYK11_16_SE = COLORSPACE_SH(PT_MCH11) | CHANNELS_SH(11) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_KYMC11_8 = COLORSPACE_SH(PT_MCH11) | CHANNELS_SH(11) | BYTES_SH(1) | DOSWAP_SH(1);
var TYPE_KYMC11_16 = COLORSPACE_SH(PT_MCH11) | CHANNELS_SH(11) | BYTES_SH(2) | DOSWAP_SH(1);
var TYPE_KYMC11_16_SE = COLORSPACE_SH(PT_MCH11) | CHANNELS_SH(11) | BYTES_SH(2) | DOSWAP_SH(1) | ENDIAN16_SH(1);
var TYPE_CMYK12_8 = COLORSPACE_SH(PT_MCH12) | CHANNELS_SH(12) | BYTES_SH(1);
var TYPE_CMYK12_16 = COLORSPACE_SH(PT_MCH12) | CHANNELS_SH(12) | BYTES_SH(2);
var TYPE_CMYK12_16_SE = COLORSPACE_SH(PT_MCH12) | CHANNELS_SH(12) | BYTES_SH(2) | ENDIAN16_SH(1);
var TYPE_KYMC12_8 = COLORSPACE_SH(PT_MCH12) | CHANNELS_SH(12) | BYTES_SH(1) | DOSWAP_SH(1);
var TYPE_KYMC12_16 = COLORSPACE_SH(PT_MCH12) | CHANNELS_SH(12) | BYTES_SH(2) | DOSWAP_SH(1);
var TYPE_KYMC12_16_SE = COLORSPACE_SH(PT_MCH12) | CHANNELS_SH(12) | BYTES_SH(2) | DOSWAP_SH(1) | ENDIAN16_SH(1);
var TYPE_XYZ_16 = COLORSPACE_SH(PT_XYZ) | CHANNELS_SH(3) | BYTES_SH(2);
var TYPE_Lab_8 = COLORSPACE_SH(PT_Lab) | CHANNELS_SH(3) | BYTES_SH(1);
var TYPE_LabV2_8 = COLORSPACE_SH(PT_LabV2) | CHANNELS_SH(3) | BYTES_SH(1);
var TYPE_ALab_8 = COLORSPACE_SH(PT_Lab) | CHANNELS_SH(3) | BYTES_SH(1) | EXTRA_SH(1) | SWAPFIRST_SH(1);
var TYPE_ALabV2_8 = COLORSPACE_SH(PT_LabV2) | CHANNELS_SH(3) | BYTES_SH(1) | EXTRA_SH(1) | SWAPFIRST_SH(1);
var TYPE_Lab_16 = COLORSPACE_SH(PT_Lab) | CHANNELS_SH(3) | BYTES_SH(2);
var TYPE_LabV2_16 = COLORSPACE_SH(PT_LabV2) | CHANNELS_SH(3) | BYTES_SH(2);
var TYPE_Yxy_16 = COLORSPACE_SH(PT_Yxy) | CHANNELS_SH(3) | BYTES_SH(2);
var TYPE_XYZ_DBL = FLOAT_SH(1) | COLORSPACE_SH(PT_XYZ) | CHANNELS_SH(3) | BYTES_SH(0);
var TYPE_Lab_DBL = FLOAT_SH(1) | COLORSPACE_SH(PT_Lab) | CHANNELS_SH(3) | BYTES_SH(0);
var TYPE_GRAY_DBL = FLOAT_SH(1) | COLORSPACE_SH(PT_GRAY) | CHANNELS_SH(1) | BYTES_SH(0);
var TYPE_RGB_DBL = FLOAT_SH(1) | COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(0);
var TYPE_BGR_DBL = FLOAT_SH(1) | COLORSPACE_SH(PT_RGB) | CHANNELS_SH(3) | BYTES_SH(0) | DOSWAP_SH(1);
var TYPE_CMYK_DBL = FLOAT_SH(1) | COLORSPACE_SH(PT_CMYK) | CHANNELS_SH(4) | BYTES_SH(0);
var cmsInfoDescription = 0;
var cmsInfoManufacturer = 1;
var cmsInfoModel = 2;
var cmsInfoCopyright = 3;
var INTENT_PERCEPTUAL = 0;
var INTENT_RELATIVE_COLORIMETRIC = 1;
var INTENT_SATURATION = 2;
var INTENT_ABSOLUTE_COLORIMETRIC = 3;
var cmsFLAGS_NOCACHE = 64;
var cmsFLAGS_NOOPTIMIZE = 256;
var cmsFLAGS_NULLTRANSFORM = 512;
var cmsFLAGS_GAMUTCHECK = 4096;
var cmsFLAGS_SOFTPROOFING = 16384;
var cmsFLAGS_BLACKPOINTCOMPENSATION = 8192;
var cmsFLAGS_NOWHITEONWHITEFIXUP = 4;
var cmsFLAGS_HIGHRESPRECALC = 1024;
var cmsFLAGS_LOWRESPRECALC = 2048;
var cmsFLAGS_COPY_ALPHA = 67108864;

// tmp/cjs-shim.js
var instantiate = require_lcms();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BYTES_SH,
  CHANNELS_SH,
  COLORSPACE_SH,
  DOSWAP_SH,
  ENDIAN16_SH,
  EXTRA_SH,
  FLAVOR_SH,
  FLOAT_SH,
  INTENT_ABSOLUTE_COLORIMETRIC,
  INTENT_PERCEPTUAL,
  INTENT_RELATIVE_COLORIMETRIC,
  INTENT_SATURATION,
  LCMS_VERSION,
  OPTIMIZED_SH,
  PLANAR_SH,
  PT_ANY,
  PT_CMY,
  PT_CMYK,
  PT_GRAY,
  PT_HLS,
  PT_HSV,
  PT_Lab,
  PT_LabV2,
  PT_MCH1,
  PT_MCH10,
  PT_MCH11,
  PT_MCH12,
  PT_MCH13,
  PT_MCH14,
  PT_MCH15,
  PT_MCH2,
  PT_MCH3,
  PT_MCH4,
  PT_MCH5,
  PT_MCH6,
  PT_MCH7,
  PT_MCH8,
  PT_MCH9,
  PT_RGB,
  PT_XYZ,
  PT_YCbCr,
  PT_YUV,
  PT_YUVK,
  PT_Yxy,
  SWAPFIRST_SH,
  TYPE_ABGR_16,
  TYPE_ABGR_16_PLANAR,
  TYPE_ABGR_16_SE,
  TYPE_ABGR_8,
  TYPE_ABGR_8_PLANAR,
  TYPE_ALabV2_8,
  TYPE_ALab_8,
  TYPE_ARGB_16,
  TYPE_ARGB_8,
  TYPE_ARGB_8_PLANAR,
  TYPE_BGRA_16,
  TYPE_BGRA_16_SE,
  TYPE_BGRA_8,
  TYPE_BGRA_8_PLANAR,
  TYPE_BGR_16,
  TYPE_BGR_16_PLANAR,
  TYPE_BGR_16_SE,
  TYPE_BGR_8,
  TYPE_BGR_8_PLANAR,
  TYPE_BGR_DBL,
  TYPE_CMYK10_16,
  TYPE_CMYK10_16_SE,
  TYPE_CMYK10_8,
  TYPE_CMYK11_16,
  TYPE_CMYK11_16_SE,
  TYPE_CMYK11_8,
  TYPE_CMYK12_16,
  TYPE_CMYK12_16_SE,
  TYPE_CMYK12_8,
  TYPE_CMYK5_16,
  TYPE_CMYK5_16_SE,
  TYPE_CMYK5_8,
  TYPE_CMYK6_16,
  TYPE_CMYK6_16_PLANAR,
  TYPE_CMYK6_16_SE,
  TYPE_CMYK6_8,
  TYPE_CMYK6_8_PLANAR,
  TYPE_CMYK7_16,
  TYPE_CMYK7_16_SE,
  TYPE_CMYK7_8,
  TYPE_CMYK8_16,
  TYPE_CMYK8_16_SE,
  TYPE_CMYK8_8,
  TYPE_CMYK9_16,
  TYPE_CMYK9_16_SE,
  TYPE_CMYK9_8,
  TYPE_CMYKA_8,
  TYPE_CMYK_16,
  TYPE_CMYK_16_PLANAR,
  TYPE_CMYK_16_REV,
  TYPE_CMYK_16_SE,
  TYPE_CMYK_8,
  TYPE_CMYK_8_PLANAR,
  TYPE_CMYK_8_REV,
  TYPE_CMYK_DBL,
  TYPE_CMY_16,
  TYPE_CMY_16_PLANAR,
  TYPE_CMY_16_SE,
  TYPE_CMY_8,
  TYPE_CMY_8_PLANAR,
  TYPE_GRAYA_16,
  TYPE_GRAYA_16_PLANAR,
  TYPE_GRAYA_16_SE,
  TYPE_GRAYA_8,
  TYPE_GRAYA_8_PLANAR,
  TYPE_GRAY_16,
  TYPE_GRAY_16_REV,
  TYPE_GRAY_16_SE,
  TYPE_GRAY_8,
  TYPE_GRAY_8_REV,
  TYPE_GRAY_DBL,
  TYPE_KCMY_16,
  TYPE_KCMY_16_REV,
  TYPE_KCMY_16_SE,
  TYPE_KCMY_8,
  TYPE_KCMY_8_REV,
  TYPE_KYMC10_16,
  TYPE_KYMC10_16_SE,
  TYPE_KYMC10_8,
  TYPE_KYMC11_16,
  TYPE_KYMC11_16_SE,
  TYPE_KYMC11_8,
  TYPE_KYMC12_16,
  TYPE_KYMC12_16_SE,
  TYPE_KYMC12_8,
  TYPE_KYMC5_16,
  TYPE_KYMC5_16_SE,
  TYPE_KYMC5_8,
  TYPE_KYMC7_16,
  TYPE_KYMC7_16_SE,
  TYPE_KYMC7_8,
  TYPE_KYMC8_16,
  TYPE_KYMC8_16_SE,
  TYPE_KYMC8_8,
  TYPE_KYMC9_16,
  TYPE_KYMC9_16_SE,
  TYPE_KYMC9_8,
  TYPE_KYMC_16,
  TYPE_KYMC_16_SE,
  TYPE_KYMC_8,
  TYPE_LabV2_16,
  TYPE_LabV2_8,
  TYPE_Lab_16,
  TYPE_Lab_8,
  TYPE_Lab_DBL,
  TYPE_RGBA_16,
  TYPE_RGBA_16_PLANAR,
  TYPE_RGBA_16_SE,
  TYPE_RGBA_8,
  TYPE_RGBA_8_PLANAR,
  TYPE_RGB_16,
  TYPE_RGB_16_PLANAR,
  TYPE_RGB_16_SE,
  TYPE_RGB_8,
  TYPE_RGB_8_PLANAR,
  TYPE_RGB_DBL,
  TYPE_XYZ_16,
  TYPE_XYZ_DBL,
  TYPE_YUVK_16,
  TYPE_YUVK_8,
  TYPE_Yxy_16,
  T_BYTES,
  T_CHANNELS,
  T_COLORSPACE,
  T_DOSWAP,
  T_ENDIAN16,
  T_EXTRA,
  T_FLAVOR,
  T_FLOAT,
  T_OPTIMIZED,
  T_PLANAR,
  T_SWAPFIRST,
  cmsFLAGS_BLACKPOINTCOMPENSATION,
  cmsFLAGS_COPY_ALPHA,
  cmsFLAGS_GAMUTCHECK,
  cmsFLAGS_HIGHRESPRECALC,
  cmsFLAGS_LOWRESPRECALC,
  cmsFLAGS_NOCACHE,
  cmsFLAGS_NOOPTIMIZE,
  cmsFLAGS_NOWHITEONWHITEFIXUP,
  cmsFLAGS_NULLTRANSFORM,
  cmsFLAGS_SOFTPROOFING,
  cmsInfoCopyright,
  cmsInfoDescription,
  cmsInfoManufacturer,
  cmsInfoModel,
  cmsMAXCHANNELS,
  cmsSigBlueColorantTag,
  cmsSigCmyData,
  cmsSigCmykData,
  cmsSigGrayData,
  cmsSigGreenColorantTag,
  cmsSigHlsData,
  cmsSigHsvData,
  cmsSigLabData,
  cmsSigLuvData,
  cmsSigRedColorantTag,
  cmsSigRgbData,
  cmsSigXYZData,
  cmsSigYCbCrData,
  cmsSigYxyData,
  instantiate
});
//# sourceMappingURL=lcms.cjs.map

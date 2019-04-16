(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["asparse"] = factory();
	else
		root["asparse"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../host/src/ASImport.ts":
/*!*******************************!*\
  !*** ../host/src/ASImport.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ASImport {
    get __imports__() {
        let constructor = this.constructor;
        let className = constructor.name.toLowerCase();
        let __imports__ = {};
        let _this = this;
        __imports__[className] = {
            _bindMemory(memory) {
                _this.__bindMemory(memory);
            },
            _bindInstance(instance) {
                _this.instance = instance;
            }
        };
        for (let name of Object.getOwnPropertyNames(constructor.prototype)) {
            if (name !== "constructor" && !name.startsWith("__")) {
                __imports__[className][name] = this[name].bind(this);
            }
        }
        return __imports__;
    }
    get memory() {
        return (this.instance && this.instance.memory) || this._memory;
    }
    get table() {
        return this.instance.table;
    }
    __bindInstance(instance) {
        this.instance = instance;
    }
    __bindMemory(memory) {
        this._memory = memory;
    }
    static createImport(...args) {
        let imports = {};
        for (let arg of args) {
            let obj;
            if (typeof arg == "function") {
                obj = new arg();
            }
            else {
                obj = arg;
            }
            imports = Object.assign({}, imports, obj.__imports__);
        }
        return imports;
    }
}
exports.ASImport = ASImport;


/***/ }),

/***/ "../host/src/env.ts":
/*!**************************!*\
  !*** ../host/src/env.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Env {
    constructor(memory = { initial: 10000 }) {
        this.memory = new WebAssembly.Memory(memory);
    }
    static fromMemory(memory) {
        let env = new Env();
        env.memory = memory;
        return env;
    }
    get __imports__() {
        let memory = this.memory;
        return {
            "env": {
                memory
            }
        };
    }
}
exports.Env = Env;


/***/ }),

/***/ "../host/src/host.ts":
/*!***************************!*\
  !*** ../host/src/host.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ASImport_1 = __webpack_require__(/*! ./ASImport */ "../host/src/ASImport.ts");
class Host extends ASImport_1.ASImport {
    debug() {
        // tslint:disable-next-line
        debugger;
    }
    _log(start, sizeof) {
        let begin = start >> 2;
        let size = sizeof >> 2;
        let str = [];
        let len = 0;
        for (let i = begin; i < begin + size; i++) {
            let line = `| ${i} | ${this.memory.I32[i] >> 2}`;
            len = Math.max(len, line.length);
            str.push(line);
        }
        let space = " ";
        let output = str.map((v, i, a) => v + space.repeat(len - v.length + 1) + "|");
        let dash = "-";
        let line = dash.repeat(len + 2);
        Host.stdout([line, output.join('\n' + line + '\n'), line].join("\n"));
    }
    _log_str(x) {
        return Host.stdout(x);
    }
    _logi(x) { Host.stdout(x.toString()); }
    _logf(x) { Host.stdout(x.toString()); }
}
Host.stdout = console.log;
exports.Host = Host;


/***/ }),

/***/ "../host/src/index.ts":
/*!****************************!*\
  !*** ../host/src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./ASImport */ "../host/src/ASImport.ts"));
__export(__webpack_require__(/*! ./host */ "../host/src/host.ts"));
__export(__webpack_require__(/*! ./env */ "../host/src/env.ts"));


/***/ }),

/***/ "../loader/lib/index.js":
/*!******************************!*\
  !*** ../loader/lib/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** AssemblyScript module loader. */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ORIG_REF = Symbol('original');
const SELF_REF = Symbol('self');
var utils;
(function (utils) {
    utils.hasBigInt64 = typeof BigUint64Array !== 'undefined';
    function readString(U32, U16, ptr) {
        const chunkSize = 1024;
        const dataLength = U32[ptr >>> 2];
        let dataOffset = (ptr + 4) >>> 1;
        let dataRemain = dataLength;
        const parts = [];
        while (dataRemain > chunkSize) {
            const last = U16[dataOffset + chunkSize - 1];
            const size = last >= 0xD800 && last < 0xDC00 ? chunkSize - 1 : chunkSize;
            const part = U16.subarray(dataOffset, dataOffset += size);
            parts.push(String.fromCharCode.apply(String, part));
            dataRemain -= size;
        }
        const lastPart = U16.subarray(dataOffset, dataOffset + dataRemain);
        parts.push(String.fromCharCode.apply(String, lastPart));
        return parts.join('');
    }
    utils.readString = readString;
    function computeBufferSize(byteLength) {
        const HEADER_SIZE = 8;
        return 1 << (32 - Math.clz32(byteLength + HEADER_SIZE - 1));
    }
    utils.computeBufferSize = computeBufferSize;
    function hasOwnProperty(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }
    utils.hasOwnProperty = hasOwnProperty;
})(utils = exports.utils || (exports.utils = {}));
class MemoryWrapper {
    static resolve(value) {
        if (value instanceof MemoryWrapper) {
            return value;
        }
        else {
            return new MemoryWrapper(value);
        }
    }
    constructor(memory) {
        this.raw = memory;
    }
    // ASMemory conformance
    newString(str) {
        const dataLength = str.length;
        const ptr = this.allocate(4 + (dataLength << 1));
        const dataOffset = (4 + ptr) >>> 1;
        const U32 = this.U32, U16 = this.U16;
        U32[ptr >>> 2] = dataLength;
        for (let i = 0; i < dataLength; ++i) {
            U16[dataOffset + i] = str.charCodeAt(i);
        }
        return ptr;
    }
    getString(ptr) {
        return utils.readString(this.U32, this.U16, ptr);
    }
    newArray(viewOrCtor, length, unsafe) {
        let ctor;
        let view;
        if (viewOrCtor.constructor === Function) { // TypedArray constructor created in memory
            ctor = viewOrCtor;
            view = null;
        }
        else { // TypedArray instance copied into memory
            ctor = viewOrCtor.constructor;
            view = viewOrCtor;
            if (length === undefined) {
                length = viewOrCtor.length;
            }
        }
        if (length === undefined) {
            throw new Error('Length missing');
        }
        const elementSize = ctor.BYTES_PER_ELEMENT;
        if (!elementSize) {
            throw Error('Not a typed array');
        }
        const byteLength = elementSize * length;
        const ptr = this.allocate(12); // TypedArray header
        const buf = this.allocate(utils.computeBufferSize(byteLength)); // ArrayBuffer
        const U32 = this.U32;
        U32[ptr >>> 2] = buf; // .buffer
        U32[(ptr + 4) >>> 2] = 0; // .byteOffset
        U32[(ptr + 8) >>> 2] = byteLength; // .byteLength
        U32[buf >>> 2] = byteLength; // .byteLength
        U32[(buf + 4) >>> 2] = 0; // 0
        if (view) {
            new ctor(this.buffer, buf + 8, length).set(view);
            if (view.length < length && !unsafe) {
                const setLength = elementSize * view.length;
                this.fill(buf + 8 + setLength, 0, byteLength - setLength);
            }
        }
        else if (!unsafe) {
            this.fill(buf + 8, 0, byteLength);
        }
        return ptr;
    }
    getArray(ctor, ptr) {
        const elementSize = ctor.BYTES_PER_ELEMENT;
        if (!elementSize) {
            throw Error('Not a typed array');
        }
        const U32 = this.U32;
        const buf = U32[ptr >>> 2];
        const byteOffset = U32[(ptr + 4) >>> 2];
        const byteLength = U32[(ptr + 8) >>> 2];
        return new ctor(this.buffer, buf + 8 + byteOffset, (byteLength - byteOffset) / elementSize);
    }
    freeArray(ptr) {
        const buf = this.U32[ptr >>> 2];
        this.free(buf);
        this.free(ptr);
    }
    get U8() {
        if (!this._U8 || this._U8.buffer !== this.raw.buffer) {
            this._U8 = new Uint8Array(this.raw.buffer);
        }
        return this._U8;
    }
    get U16() {
        if (!this._U16 || this._U16.buffer !== this.raw.buffer) {
            this._U16 = new Uint16Array(this.raw.buffer);
        }
        return this._U16;
    }
    get U32() {
        if (!this._U32 || this._U32.buffer !== this.raw.buffer) {
            this._U32 = new Uint32Array(this.raw.buffer);
        }
        return this._U32;
    }
    get U64() {
        if (!utils.hasBigInt64) {
            return;
        }
        if (!this._U64 || this._U64.buffer !== this.raw.buffer) {
            this._U64 = new BigUint64Array(this.raw.buffer);
        }
        return this._U64;
    }
    get I8() {
        if (!this._I8 || this._I8.buffer !== this.raw.buffer) {
            this._I8 = new Int8Array(this.raw.buffer);
        }
        return this._I8;
    }
    get I16() {
        if (!this._I16 || this._I16.buffer !== this.raw.buffer) {
            this._I16 = new Int16Array(this.raw.buffer);
        }
        return this._I16;
    }
    get I32() {
        if (!this._I32 || this._I32.buffer !== this.raw.buffer) {
            this._I32 = new Int32Array(this.raw.buffer);
        }
        return this._I32;
    }
    get I64() {
        if (!utils.hasBigInt64) {
            return;
        }
        if (!this._I64 || this._I64.buffer !== this.raw.buffer) {
            this._I64 = new BigInt64Array(this.raw.buffer);
        }
        return this._I64;
    }
    get F32() {
        if (!this._F32 || this._F32.buffer !== this.raw.buffer) {
            this._F32 = new Float32Array(this.raw.buffer);
        }
        return this._F32;
    }
    get F64() {
        if (!this._F64 || this._F64.buffer !== this.raw.buffer) {
            this._F64 = new Float64Array(this.raw.buffer);
        }
        return this._F64;
    }
    allocate(size) {
        throw new Error('Memory not initialized');
    }
    compare(vl, vr, n) {
        throw new Error('Memory not initialized');
    }
    copy(dest, src, n) {
        throw new Error('Memory not initialized');
    }
    fill(ptr, value, size) {
        throw new Error('Memory not initialized');
    }
    free(ptr) {
        throw new Error('Memory not initialized');
    }
    reset() {
        throw new Error('Memory not initialized');
    }
    // WebAssembly.Memory conformance
    grow(numPages) {
        return this.raw.grow(numPages);
    }
    get buffer() {
        return this.raw.buffer;
    }
    // Internal methods
    setExports(rawExports) {
        const methods = ['allocate', 'compare', 'copy', 'fill', 'free', 'reset'];
        for (const method of methods) {
            const exportedMethod = `memory.${method}`;
            if (rawExports[exportedMethod]) {
                this[method] = rawExports[exportedMethod];
            }
            else {
                this[method] = () => { throw new Error('Method not exported'); };
            }
        }
    }
}
class TableWrapper {
    constructor(table) {
        this.raw = table;
    }
    // ASTable conformance
    getFunction(ptr) {
        return this.wrapFunction(this.get(ptr));
    }
    newFunction(fn) {
        if (typeof fn[ORIG_REF] === 'function') {
            fn = fn[ORIG_REF];
        }
        const index = this.length;
        this.grow(1);
        this.set(index, fn);
        return index;
    }
    // WebAssembly.Table conformance
    grow(numElements) {
        return this.raw.grow(numElements);
    }
    set(index, value) {
        return this.raw.set(index, value);
    }
    get(index) {
        return this.raw.get(index);
    }
    get length() {
        return this.raw.length;
    }
    // Internal methods
    setargc(n) { }
    /** Wraps a WebAssembly function while also taking care of variable arguments. */
    wrapFunction(fn) {
        const wrap = (...args) => {
            this.setargc(args.length);
            let _args = args.map(e => e[SELF_REF] | e);
            return fn(...args);
        };
        // adding a function to the table with `newFunction` is limited to actual WebAssembly functions,
        // hence we can't use the wrapper and instead need to provide a reference to the original
        wrap[ORIG_REF] = fn;
        return wrap;
    }
    setExports(rawExports) {
        if (rawExports._setargc) {
            this.setargc = rawExports._setargc;
        }
    }
}
function createContext(imports = {}) {
    const ctx = {
        imports,
        memory: imports.memory ? MemoryWrapper.resolve(imports.memory) : null,
    };
    const env = (imports.env = imports.env || {});
    const getString = (ptr) => ctx.memory ? ctx.memory.getString(ptr) : '<unknown>';
    if (!env.abort) {
        env.abort = function abort(mesg, file, line, colm) {
            throw Error(`Abort: ${getString(mesg)} at ${getString(file)}: ${line}:${colm}`);
        };
    }
    if (!env.trace) {
        env.trace = function trace(mesg, n, ...args) {
            let msg = `trace: ${getString(mesg)}`;
            if (n) {
                msg += ` ${args.slice(0, n).join(', ')}`;
            }
            console.log(msg);
        };
    }
    if (env.memory instanceof MemoryWrapper) {
        env.memory = env.memory.raw;
    }
    for (let _import in ctx.imports) {
        if (ctx.imports[_import]._bindMemory) {
            ctx.imports[_import]._bindMemory(ctx.memory);
        }
    }
    return ctx;
}
function resolveContext(instance, ctx) {
    const table = new TableWrapper(instance.exports.table);
    table.setExports(instance.exports);
    ctx.memory = MemoryWrapper.resolve(instance.exports.memory);
    ctx.memory.setExports(instance.exports);
    let resolved = {
        "String": { wrap: (x) => ctx.memory.getString(x) },
        "Uint8Array": { wrap: (x) => ctx.memory.getArray(Uint8Array, x) }
    };
    for (const internalName in instance.exports) {
        if (!utils.hasOwnProperty(instance.exports, internalName)) {
            continue;
        }
        // resolve nested objects
        const parts = internalName.split('.');
        let name = parts[0];
        // ignore internals
        if (name === 'memory' || name === 'table' || name === '_setargc') {
            continue;
        }
        let curr = resolved;
        while (parts.length > 1) {
            const part = parts.shift();
            if (!utils.hasOwnProperty(curr, part)) {
                curr[part] = {};
            }
            curr = curr[part];
        }
        const elem = instance.exports[internalName];
        const hash = name.indexOf('#');
        let bang = name.indexOf('!');
        let refType = bang > 0 ? name.substring(bang + 1) : null;
        if (refType) {
            name = name.substring(0, bang);
        }
        if (hash >= 0) {
            // resolve classes
            const className = name.substring(0, hash);
            const classElem = curr[className];
            if (typeof classElem === 'undefined' || !classElem.prototype) {
                const ctor = function (...args) {
                    let _args = args.map(e => e[SELF_REF] | e);
                    debugger;
                    return ctor.wrap(ctor.prototype.constructor(0, ..._args));
                };
                ctor.prototype = {};
                ctor.wrap = function (thisValue) {
                    return Object.create(ctor.prototype, {
                        [SELF_REF]: { value: thisValue, writable: false },
                    });
                };
                if (classElem) {
                    Object.getOwnPropertyNames(classElem).forEach((propName) => {
                        console.log(classElem.constructor.name + " " + propName);
                        Object.defineProperty(ctor, propName, Object.getOwnPropertyDescriptor(classElem, propName));
                    });
                }
                curr[className] = ctor;
            }
            name = name.substring(hash + 1);
            curr = curr[className].prototype;
            if (/^(get|set):/.test(name)) {
                name = name.substring(4);
                if (!utils.hasOwnProperty(curr, name)) {
                    const getter = instance.exports[internalName.replace('set:', 'get:')];
                    const setter = instance.exports[internalName.replace('get:', 'set:')];
                    Object.defineProperty(curr, name, {
                        get() {
                            let ptr = getter(this[SELF_REF]);
                            return refType && resolved[refType] ? resolved[refType].wrap(ptr) : ptr;
                        },
                        set(value) { setter(this[SELF_REF], value[SELF_REF] | value); },
                        enumerable: true,
                    });
                }
            }
            else {
                if (name === 'constructor') {
                    curr[name] = table.wrapFunction(elem);
                }
                else { // for methods
                    Object.defineProperty(curr, name, {
                        value(...args) {
                            table.setargc(args.length);
                            let _args = args.map(e => e[SELF_REF] | e);
                            let ptr = elem(this[SELF_REF], ..._args);
                            return refType && resolved[refType] ? resolved[refType].wrap(ptr) : ptr;
                        },
                    });
                }
            }
        }
        else {
            // resolve props
            if (/^(get|set):/.test(name)) {
                name = name.substring(4);
                if (!utils.hasOwnProperty(curr, name)) {
                    Object.defineProperty(curr, name, {
                        get: instance.exports[internalName.replace('set:', 'get:')],
                        set: instance.exports[internalName.replace('get:', 'set:')],
                        enumerable: true,
                    });
                }
            }
            else if (typeof elem === 'function') {
                curr[name] = table.wrapFunction(elem);
            }
            else {
                curr[name] = elem;
            }
        }
    }
    resolved = Object.assign({ memory: ctx.memory, table }, resolved);
    for (let _import in ctx.imports) {
        if (ctx.imports[_import]._bindInstance) {
            ctx.imports[_import]._bindInstance(resolved);
        }
    }
    return resolved;
}
/** Instantiates an AssemblyScript module using the specified imports. */
function instantiate(module, imports = {}) {
    const ctx = createContext(imports);
    const instance = new WebAssembly.Instance(module, ctx.imports);
    var res = resolveContext(instance, ctx);
    return res;
}
exports.instantiate = instantiate;
/** Instantiates an AssemblyScript module from a buffer using the specified imports. */
function instantiateBuffer(buffer, imports = {}) {
    // if (imports.pre){
    //   imports.pre.map((fn)=>{
    //     _buffer = fn(_buffer);
    //   })
    // }
    return instantiate(new WebAssembly.Module(buffer), imports);
}
exports.instantiateBuffer = instantiateBuffer;
/** Instantiates an AssemblyScript module from a response using the specified imports. */
function instantiateStreaming(response, imports = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const ctx = createContext(imports);
        const { instance } = yield WebAssembly.instantiateStreaming(response, ctx.imports);
        return resolveContext(instance, ctx);
    });
}
exports.instantiateStreaming = instantiateStreaming;
/** Creates a wrapped memory instance. */
function createMemory(descriptor) {
    return new MemoryWrapper(new WebAssembly.Memory(descriptor));
}
exports.createMemory = createMemory;
/** Demangles an AssemblyScript module's exports to a friendly object structure. */
function demangle(instance) {
    return resolveContext(instance, createContext());
}
exports.demangle = demangle;


/***/ }),

/***/ "./src/common.ts":
/*!***********************!*\
  !*** ./src/common.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** Common constants shared between AssemblyScript and TypeScript. */
Object.defineProperty(exports, "__esModule", { value: true });
/** WebAssembly types. */
var Type;
(function (Type) {
    Type[Type["i32"] = 127] = "i32";
    Type[Type["i64"] = 126] = "i64";
    Type[Type["f32"] = 125] = "f32";
    Type[Type["f64"] = 124] = "f64";
    Type[Type["anyfunc"] = 112] = "anyfunc";
    Type[Type["func"] = 96] = "func";
    Type[Type["none"] = 64] = "none";
})(Type = exports.Type || (exports.Type = {}));
/** WebAssembly section ids. */
var SectionId;
(function (SectionId) {
    SectionId[SectionId["Custom"] = 0] = "Custom";
    SectionId[SectionId["Type"] = 1] = "Type";
    SectionId[SectionId["Import"] = 2] = "Import";
    SectionId[SectionId["Function"] = 3] = "Function";
    SectionId[SectionId["Table"] = 4] = "Table";
    SectionId[SectionId["Memory"] = 5] = "Memory";
    SectionId[SectionId["Global"] = 6] = "Global";
    SectionId[SectionId["Export"] = 7] = "Export";
    SectionId[SectionId["Start"] = 8] = "Start";
    SectionId[SectionId["Element"] = 9] = "Element";
    SectionId[SectionId["Code"] = 10] = "Code";
    SectionId[SectionId["Data"] = 11] = "Data";
})(SectionId = exports.SectionId || (exports.SectionId = {}));
/** WebAssembly external kinds. */
var ExternalKind;
(function (ExternalKind) {
    ExternalKind[ExternalKind["Function"] = 0] = "Function";
    ExternalKind[ExternalKind["Table"] = 1] = "Table";
    ExternalKind[ExternalKind["Memory"] = 2] = "Memory";
    ExternalKind[ExternalKind["Global"] = 3] = "Global";
})(ExternalKind = exports.ExternalKind || (exports.ExternalKind = {}));
/** Name section types. */
var NameType;
(function (NameType) {
    NameType[NameType["Module"] = 0] = "Module";
    NameType[NameType["Function"] = 1] = "Function";
    NameType[NameType["Local"] = 2] = "Local";
})(NameType = exports.NameType || (exports.NameType = {}));
/** Maximum number of memory pages. */
exports.MAX_PAGES = 0xffff;
/** Maximum number of table elements. */
exports.MAX_ELEMS = 0xffffffff;
/** WebAssembly opcodes. */
var Opcode;
(function (Opcode) {
    Opcode[Opcode["unreachable"] = 0] = "unreachable";
    Opcode[Opcode["nop"] = 1] = "nop";
    Opcode[Opcode["block"] = 2] = "block";
    Opcode[Opcode["loop"] = 3] = "loop";
    Opcode[Opcode["if_"] = 4] = "if_";
    Opcode[Opcode["else_"] = 5] = "else_";
    Opcode[Opcode["end"] = 11] = "end";
    Opcode[Opcode["br"] = 12] = "br";
    Opcode[Opcode["br_if"] = 13] = "br_if";
    Opcode[Opcode["br_table"] = 14] = "br_table";
    Opcode[Opcode["return_"] = 15] = "return_";
    Opcode[Opcode["call"] = 16] = "call";
    Opcode[Opcode["call_indirect"] = 17] = "call_indirect";
    Opcode[Opcode["drop"] = 26] = "drop";
    Opcode[Opcode["select"] = 27] = "select";
    Opcode[Opcode["get_local"] = 32] = "get_local";
    Opcode[Opcode["set_local"] = 33] = "set_local";
    Opcode[Opcode["tee_local"] = 34] = "tee_local";
    Opcode[Opcode["get_global"] = 35] = "get_global";
    Opcode[Opcode["set_global"] = 36] = "set_global";
    Opcode[Opcode["i32_load"] = 40] = "i32_load";
    Opcode[Opcode["i64_load"] = 41] = "i64_load";
    Opcode[Opcode["f32_load"] = 42] = "f32_load";
    Opcode[Opcode["f64_load"] = 43] = "f64_load";
    Opcode[Opcode["i32_load8_s"] = 44] = "i32_load8_s";
    Opcode[Opcode["i32_load8_u"] = 45] = "i32_load8_u";
    Opcode[Opcode["i32_load16_s"] = 46] = "i32_load16_s";
    Opcode[Opcode["i32_load16_u"] = 47] = "i32_load16_u";
    Opcode[Opcode["i64_load8_s"] = 48] = "i64_load8_s";
    Opcode[Opcode["i64_load8_u"] = 49] = "i64_load8_u";
    Opcode[Opcode["i64_load16_s"] = 50] = "i64_load16_s";
    Opcode[Opcode["i64_load16_u"] = 51] = "i64_load16_u";
    Opcode[Opcode["i64_load32_s"] = 52] = "i64_load32_s";
    Opcode[Opcode["i64_load32_u"] = 53] = "i64_load32_u";
    Opcode[Opcode["i32_store"] = 54] = "i32_store";
    Opcode[Opcode["i64_store"] = 55] = "i64_store";
    Opcode[Opcode["f32_store"] = 56] = "f32_store";
    Opcode[Opcode["f64_store"] = 57] = "f64_store";
    Opcode[Opcode["i32_store8"] = 58] = "i32_store8";
    Opcode[Opcode["i32_store16"] = 59] = "i32_store16";
    Opcode[Opcode["i64_store8"] = 60] = "i64_store8";
    Opcode[Opcode["i64_store16"] = 61] = "i64_store16";
    Opcode[Opcode["i64_store32"] = 62] = "i64_store32";
    Opcode[Opcode["current_memory"] = 63] = "current_memory";
    Opcode[Opcode["grow_memory"] = 64] = "grow_memory";
    Opcode[Opcode["i32_const"] = 65] = "i32_const";
    Opcode[Opcode["i64_const"] = 66] = "i64_const";
    Opcode[Opcode["f32_const"] = 67] = "f32_const";
    Opcode[Opcode["f64_const"] = 68] = "f64_const";
    Opcode[Opcode["i32_eqz"] = 69] = "i32_eqz";
    Opcode[Opcode["i32_eq"] = 70] = "i32_eq";
    Opcode[Opcode["i32_ne"] = 71] = "i32_ne";
    Opcode[Opcode["i32_lt_s"] = 72] = "i32_lt_s";
    Opcode[Opcode["i32_lt_u"] = 73] = "i32_lt_u";
    Opcode[Opcode["i32_gt_s"] = 74] = "i32_gt_s";
    Opcode[Opcode["i32_gt_u"] = 75] = "i32_gt_u";
    Opcode[Opcode["i32_le_s"] = 76] = "i32_le_s";
    Opcode[Opcode["i32_le_u"] = 77] = "i32_le_u";
    Opcode[Opcode["i32_ge_s"] = 78] = "i32_ge_s";
    Opcode[Opcode["i32_ge_u"] = 79] = "i32_ge_u";
    Opcode[Opcode["i64_eqz"] = 80] = "i64_eqz";
    Opcode[Opcode["i64_eq"] = 81] = "i64_eq";
    Opcode[Opcode["i64_ne"] = 82] = "i64_ne";
    Opcode[Opcode["i64_lt_s"] = 83] = "i64_lt_s";
    Opcode[Opcode["i64_lt_u"] = 84] = "i64_lt_u";
    Opcode[Opcode["i64_gt_s"] = 85] = "i64_gt_s";
    Opcode[Opcode["i64_gt_u"] = 86] = "i64_gt_u";
    Opcode[Opcode["i64_le_s"] = 87] = "i64_le_s";
    Opcode[Opcode["i64_le_u"] = 88] = "i64_le_u";
    Opcode[Opcode["i64_ge_s"] = 89] = "i64_ge_s";
    Opcode[Opcode["i64_ge_u"] = 90] = "i64_ge_u";
    Opcode[Opcode["f32_eq"] = 91] = "f32_eq";
    Opcode[Opcode["f32_ne"] = 92] = "f32_ne";
    Opcode[Opcode["f32_lt"] = 93] = "f32_lt";
    Opcode[Opcode["f32_gt"] = 94] = "f32_gt";
    Opcode[Opcode["f32_le"] = 95] = "f32_le";
    Opcode[Opcode["f32_ge"] = 96] = "f32_ge";
    Opcode[Opcode["f64_eq"] = 97] = "f64_eq";
    Opcode[Opcode["f64_ne"] = 98] = "f64_ne";
    Opcode[Opcode["f64_lt"] = 99] = "f64_lt";
    Opcode[Opcode["f64_gt"] = 100] = "f64_gt";
    Opcode[Opcode["f64_le"] = 101] = "f64_le";
    Opcode[Opcode["f64_ge"] = 102] = "f64_ge";
    Opcode[Opcode["i32_clz"] = 103] = "i32_clz";
    Opcode[Opcode["i32_ctz"] = 104] = "i32_ctz";
    Opcode[Opcode["i32_popcnt"] = 105] = "i32_popcnt";
    Opcode[Opcode["i32_add"] = 106] = "i32_add";
    Opcode[Opcode["i32_sub"] = 107] = "i32_sub";
    Opcode[Opcode["i32_mul"] = 108] = "i32_mul";
    Opcode[Opcode["i32_div_s"] = 109] = "i32_div_s";
    Opcode[Opcode["i32_div_u"] = 110] = "i32_div_u";
    Opcode[Opcode["i32_rem_s"] = 111] = "i32_rem_s";
    Opcode[Opcode["i32_rem_u"] = 112] = "i32_rem_u";
    Opcode[Opcode["i32_and"] = 113] = "i32_and";
    Opcode[Opcode["i32_or"] = 114] = "i32_or";
    Opcode[Opcode["i32_xor"] = 115] = "i32_xor";
    Opcode[Opcode["i32_shl"] = 116] = "i32_shl";
    Opcode[Opcode["i32_shr_s"] = 117] = "i32_shr_s";
    Opcode[Opcode["i32_shr_u"] = 118] = "i32_shr_u";
    Opcode[Opcode["i32_rotl"] = 119] = "i32_rotl";
    Opcode[Opcode["i32_rotr"] = 120] = "i32_rotr";
    Opcode[Opcode["i64_clz"] = 121] = "i64_clz";
    Opcode[Opcode["i64_ctz"] = 122] = "i64_ctz";
    Opcode[Opcode["i64_popcnt"] = 123] = "i64_popcnt";
    Opcode[Opcode["i64_add"] = 124] = "i64_add";
    Opcode[Opcode["i64_sub"] = 125] = "i64_sub";
    Opcode[Opcode["i64_mul"] = 126] = "i64_mul";
    Opcode[Opcode["i64_div_s"] = 127] = "i64_div_s";
    Opcode[Opcode["i64_div_u"] = 128] = "i64_div_u";
    Opcode[Opcode["i64_rem_s"] = 129] = "i64_rem_s";
    Opcode[Opcode["i64_rem_u"] = 130] = "i64_rem_u";
    Opcode[Opcode["i64_and"] = 131] = "i64_and";
    Opcode[Opcode["i64_or"] = 132] = "i64_or";
    Opcode[Opcode["i64_xor"] = 133] = "i64_xor";
    Opcode[Opcode["i64_shl"] = 134] = "i64_shl";
    Opcode[Opcode["i64_shr_s"] = 135] = "i64_shr_s";
    Opcode[Opcode["i64_shr_u"] = 136] = "i64_shr_u";
    Opcode[Opcode["i64_rotl"] = 137] = "i64_rotl";
    Opcode[Opcode["i64_rotr"] = 138] = "i64_rotr";
    Opcode[Opcode["f32_abs"] = 139] = "f32_abs";
    Opcode[Opcode["f32_neg"] = 140] = "f32_neg";
    Opcode[Opcode["f32_ceil"] = 141] = "f32_ceil";
    Opcode[Opcode["f32_floor"] = 142] = "f32_floor";
    Opcode[Opcode["f32_trunc"] = 143] = "f32_trunc";
    Opcode[Opcode["f32_nearest"] = 144] = "f32_nearest";
    Opcode[Opcode["f32_sqrt"] = 145] = "f32_sqrt";
    Opcode[Opcode["f32_add"] = 146] = "f32_add";
    Opcode[Opcode["f32_sub"] = 147] = "f32_sub";
    Opcode[Opcode["f32_mul"] = 148] = "f32_mul";
    Opcode[Opcode["f32_div"] = 149] = "f32_div";
    Opcode[Opcode["f32_min"] = 150] = "f32_min";
    Opcode[Opcode["f32_max"] = 151] = "f32_max";
    Opcode[Opcode["f32_copysign"] = 152] = "f32_copysign";
    Opcode[Opcode["f64_abs"] = 153] = "f64_abs";
    Opcode[Opcode["f64_neg"] = 154] = "f64_neg";
    Opcode[Opcode["f64_ceil"] = 155] = "f64_ceil";
    Opcode[Opcode["f64_floor"] = 156] = "f64_floor";
    Opcode[Opcode["f64_trunc"] = 157] = "f64_trunc";
    Opcode[Opcode["f64_nearest"] = 158] = "f64_nearest";
    Opcode[Opcode["f64_sqrt"] = 159] = "f64_sqrt";
    Opcode[Opcode["f64_add"] = 160] = "f64_add";
    Opcode[Opcode["f64_sub"] = 161] = "f64_sub";
    Opcode[Opcode["f64_mul"] = 162] = "f64_mul";
    Opcode[Opcode["f64_div"] = 163] = "f64_div";
    Opcode[Opcode["f64_min"] = 164] = "f64_min";
    Opcode[Opcode["f64_max"] = 165] = "f64_max";
    Opcode[Opcode["f64_copysign"] = 166] = "f64_copysign";
    Opcode[Opcode["i32_wrap_i64"] = 167] = "i32_wrap_i64";
    Opcode[Opcode["i32_trunc_s_f32"] = 168] = "i32_trunc_s_f32";
    Opcode[Opcode["i32_trunc_u_f32"] = 169] = "i32_trunc_u_f32";
    Opcode[Opcode["i32_trunc_s_f64"] = 170] = "i32_trunc_s_f64";
    Opcode[Opcode["i32_trunc_u_f64"] = 171] = "i32_trunc_u_f64";
    Opcode[Opcode["i64_extend_s_i32"] = 172] = "i64_extend_s_i32";
    Opcode[Opcode["i64_extend_u_i32"] = 173] = "i64_extend_u_i32";
    Opcode[Opcode["i64_trunc_s_f32"] = 174] = "i64_trunc_s_f32";
    Opcode[Opcode["i64_trunc_u_f32"] = 175] = "i64_trunc_u_f32";
    Opcode[Opcode["i64_trunc_s_f64"] = 176] = "i64_trunc_s_f64";
    Opcode[Opcode["i64_trunc_u_f64"] = 177] = "i64_trunc_u_f64";
    Opcode[Opcode["f32_convert_s_i32"] = 178] = "f32_convert_s_i32";
    Opcode[Opcode["f32_convert_u_i32"] = 179] = "f32_convert_u_i32";
    Opcode[Opcode["f32_convert_s_i64"] = 180] = "f32_convert_s_i64";
    Opcode[Opcode["f32_convert_u_i64"] = 181] = "f32_convert_u_i64";
    Opcode[Opcode["f32_demote_f64"] = 182] = "f32_demote_f64";
    Opcode[Opcode["f64_convert_s_i32"] = 183] = "f64_convert_s_i32";
    Opcode[Opcode["f64_convert_u_i32"] = 184] = "f64_convert_u_i32";
    Opcode[Opcode["f64_convert_s_i64"] = 185] = "f64_convert_s_i64";
    Opcode[Opcode["f64_convert_u_i64"] = 186] = "f64_convert_u_i64";
    Opcode[Opcode["f64_promote_f32"] = 187] = "f64_promote_f32";
    Opcode[Opcode["i32_reinterpret_f32"] = 188] = "i32_reinterpret_f32";
    Opcode[Opcode["i64_reinterpret_f64"] = 189] = "i64_reinterpret_f64";
    Opcode[Opcode["f32_reinterpret_i32"] = 190] = "f32_reinterpret_i32";
    Opcode[Opcode["f64_reinterpret_i64"] = 191] = "f64_reinterpret_i64";
})(Opcode = exports.Opcode || (exports.Opcode = {}));


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(/*! ./common */ "./src/common.ts");
exports.Type = common_1.Type;
exports.SectionId = common_1.SectionId;
exports.ExternalKind = common_1.ExternalKind;
const loader = __webpack_require__(/*! ../../loader/lib */ "../loader/lib/index.js");
// import ASModule from "../build";
// import { ASImport } from "./asImport";
const src_1 = __webpack_require__(/*! ../../host/src */ "../host/src/index.ts");
// type Parser = {parse: (any)=> any, newParser: (any)=>any};
/** Cached compiled parser. */
var compiled = null;
var WASM_DATA; // injected by webpack
// if (typeof WASM_DATA !== "string") WASM_DATA = require("fs").readFileSync(__dirname + "/../build/index.wasm", "base64");
class WasmParser {
    constructor(binary) {
        this.binary = binary;
        // compile the parser if not yet compiled
        if (!compiled)
            compiled = new WebAssembly.Module(base64_decode(WASM_DATA));
        // use the binary as the parser's memory
        var nBytes = binary.length;
        var nPages = ((nBytes + 0xffff) & ~0xffff) >> 16;
        var imports = src_1.ASImport.createImport(src_1.Env, src_1.Host);
        debugger;
        this.instance = loader.instantiate(compiled, imports);
        var array = this.memory.newArray(binary);
        var parser = new this.instance.Parser(array);
        this.parser = parser;
        parser.parse();
        this.mod = this.instance.Module.wrap(parser.module);
        console.log(this.mod['self']);
    }
    get memory() {
        return this.instance.memory;
    }
    getByteArray(addr) {
        return this.memory.getArray(Uint8Array, addr);
    }
    get Type() {
        return this.memory.getString(this.mod.getType());
    }
    printModule() {
        this.mod.print();
    }
    removeStartFunction() {
        var binary = this.instance.removeStartFunction(this.parser.module);
        return binary;
    }
    hasSection(id) {
        return this.mod.getID(id) != 0;
    }
    removeDataSection() {
        return this.getByteArray(this.instance.removeSection(this.parser.module, common_1.SectionId.Data));
    }
    exportDataSection() {
        return this.getByteArray(this.instance.exportDataSection(this.parser.module));
    }
    hasStart() {
        return this.mod.hasStart;
    }
}
exports.WasmParser = WasmParser;
// see: https://github.com/dcodeIO/protobuf.js/tree/master/lib/base64
function base64_decode(string) {
    var length = string.length;
    if (length) {
        let n = 0, p = length;
        while (--p % 4 > 1 && string.charCodeAt(p) === 61)
            ++n;
        length = Math.ceil(length * 3) / 4 - n;
    }
    var buffer = new Uint8Array(length);
    var j = 0, o = 0, t = 0;
    for (let i = 0, k = string.length; i < k;) {
        let c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error();
        switch (j) {
            case 0: {
                t = c;
                j = 1;
                break;
            }
            case 1: {
                buffer[o++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            }
            case 2: {
                buffer[o++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            }
            case 3: {
                buffer[o++] = (t & 3) << 6 | c;
                j = 0;
                break;
            }
        }
    }
    if (j === 1)
        throw Error();
    return buffer;
}
var s64 = new Array(123);
for (let i = 0; i < 64;)
    s64[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.ts */"./src/index.ts");


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map
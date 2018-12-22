
import { Worker } from 'webworker-threads';
import {Worker as WebWorker, Lock, Mailbox} from "../assembly";
import * as loader from "../../loader";
/** Cached compiled parser. */
var compiled: WebAssembly.Module | null = null;

export {WebWorker, Lock, Mailbox};

declare var WASM_DATA: string; // injected by webpack
if (typeof WASM_DATA !== "string") WASM_DATA = require("fs").readFileSync(__dirname + "/../build/index.wasm", "base64");

type i32 = number;
type int = number;
/** Parses the contents of a WebAssembly binary according to the specified options. */
function run(): void {

  // compile the parser if not yet compiled
  if (!compiled) compiled = new WebAssembly.Module(base64_decode(WASM_DATA));

  // use the binary as the parser's memory


  var memory: WebAssembly.Memory = new (WebAssembly.Memory as any)({ shared:true });
  var buffer = new Uint8Array(memory.buffer);


  let workers: Worker[] = [];
  // instantiate the parser and return its exports
  var imports = {
    env: {
      memory,
      abort: (x)=>x
    },
    index: {
      notify: (i: i32, v: int) => {
        Atomics.notify(i, v);
      },
      wait: (i: i32, v: int, t:i32) => {

      },
      print:console.log,
      fork: (worker: Worker) => {
        workers.push(new Worker(() => {
          let instance:any = loader.instantiate(compiled, imports);
          instance.startWorker(worker);
        }))

      }
    }};
  var instance = loader.instantiate(compiled, imports);

}


// see: https://github.com/dcodeIO/protobuf.js/tree/master/lib/utf8
function utf8_read(buffer: Uint8Array, start: number, end: number): string {
  var len = end - start;
  if (len < 1) return "";
  var parts: string[] | null = null,
      chunk: number[] = [],
      i = 0, // char offset
      t = 0; // temporary
  while (start < end) {
    t = buffer[start++];
    if (t < 128) {
      chunk[i++] = t;
    } else if (t > 191 && t < 224) {
      chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
    } else if (t > 239 && t < 365) {
      t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
      chunk[i++] = 0xD800 + (t >> 10);
      chunk[i++] = 0xDC00 + (t & 1023);
    } else {
      chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
    }
    if (i > 8191) {
      (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
      i = 0;
    }
  }
  if (parts) {
    if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
    return parts.join("");
  }
  return String.fromCharCode.apply(String, chunk.slice(0, i));
}

// see: https://github.com/dcodeIO/protobuf.js/tree/master/lib/base64
function base64_decode(string: string): Uint8Array {
  var length = string.length;
  if (length) {
    let n = 0,
        p = length;
    while (--p % 4 > 1 && string.charCodeAt(p) === 61) ++n;
    length = Math.ceil(length * 3) / 4 - n;
  }
  var buffer = new Uint8Array(length);
  var j = 0, o = 0, t = 0;
  for (let i = 0, k = string.length; i < k;) {
    let c = string.charCodeAt(i++);
    if (c === 61 && j > 1) break;
    if ((c = s64[c]) === undefined) throw Error();
    switch (j) {
      case 0: { t = c; j = 1; break; }
      case 1: { buffer[o++] = t << 2 | (c & 48) >> 4; t = c; j = 2; break; }
      case 2: { buffer[o++] = (t & 15) << 4 | (c & 60) >> 2; t = c; j = 3; break; }
      case 3: { buffer[o++] = (t & 3) << 6 | c; j = 0; break; }
    }
  }
  if (j === 1) throw Error();
  return buffer;
}

var s64 = new Array(123);
for (let i = 0; i < 64;) s64[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

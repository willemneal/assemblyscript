import { Type, SectionId, ExternalKind, newParser } from "./common";
import * as assert from "assert";
export { Type, SectionId, ExternalKind };
import * as loader from "../../loader/lib";
// import ASModule from "../build";
// import { ASImport } from "./asImport";
import { ASImport, Host, Env } from "../../host/src";


type Instance = any;

interface Module {
  getType(): any;
  hasStart: boolean;
  print(): void;

}


// type Parser = {parse: (any)=> any, newParser: (any)=>any};
/** Cached compiled parser. */
var compiled: WebAssembly.Module | null = null;

var WASM_DATA: string; // injected by webpack
// if (typeof WASM_DATA !== "string") WASM_DATA = require("fs").readFileSync(__dirname + "/../build/index.wasm", "base64");

export class WasmParser {
  instance: Instance & loader.ASInstance & loader.ASExport;
  mod: any;
  parser: any;

  get memory(): loader.ASMemory {
    return this.instance.memory;
  }

  getByteArray(addr: number): Uint8Array {
    return this.memory.getArray(Uint8Array, addr);
  }

  constructor(public binary: Uint8Array) {
    // compile the parser if not yet compiled
    if (!compiled) compiled = new WebAssembly.Module(base64_decode(WASM_DATA));

    // use the binary as the parser's memory
    var nBytes = binary.length;
    var nPages = ((nBytes + 0xffff) & ~0xffff) >> 16;
    var imports = ASImport.createImport(Env, Host);
    debugger;
    this.instance = loader.instantiate(compiled, imports);
    var array: any = this.memory.newArray(binary);
    var parser = new (<any>this.instance.Parser)(array)
    this.parser = parser;
    parser.parse();
    this.mod = (<any>this.instance.Module).wrap(parser.module);
    console.log(this.mod['self']);
  }

  async parse(binary: Uint8Array){
    if (!compiled){
      let fetch
    }
  }

  get Type(): string {
    return this.memory.getString(this.mod.getType());

  }

  printModule(): void {
    this.mod.print();
  }

  removeStartFunction(): Uint8Array {
    var binary = this.instance.removeStartFunction((<any>this.parser).module);
    return binary;
  }

  hasSection(id: SectionId): boolean {
    return this.mod.getID(id) != 0;
  }

  removeDataSection(): Uint8Array {
    return this.getByteArray(<number><unknown>this.instance.removeSection(this.parser.module, SectionId.Data));
  }

  exportDataSection(): Uint8Array {
    return this.getByteArray(<number> <unknown>this.instance.exportDataSection(this.parser.module));
  }

  hasStart(): boolean {
    return this.mod.hasStart;
  }
}



// see: https://github.com/dcodeIO/protobuf.js/tree/master/lib/base64
function base64_decode(string: string): Uint8Array {
  var length = string.length;
  if (length) {
    let n = 0,
      p = length;
    while (--p % 4 > 1 && string.charCodeAt(p) === 61)++n;
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

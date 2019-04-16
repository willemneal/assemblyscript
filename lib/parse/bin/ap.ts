#!/usr/bin/env ts-node
import * as fs from "fs-extra";
import * as assert from "assert";
import {
  Type,
  SectionId,
  ExternalKind,
  WasmParser
} from "../src";

type CompileError = WebAssembly.CompileError;



if (process.argv[2].endsWith("help")){
  console.log(`AssemblyScript WebAssembly Parser.
By default a wasm file passed will have it's data section stripped so that a shared memory is only initialized once.
    Usage: ap index.wasm [index.memory]
    produces`);
  process.exit(0);
}

if (process.argv.length < 3){
  console.error(`To few arguments.
    Example: ap index.wasm index.memory`);
    process.exit(-1);
  }

async function main(filename: string, outfile: string = filename.replace(".wasm", ".memory")) {
  var parser = new WasmParser(await fs.readFile(filename))
  let strippedBinary = parser.removeDataSection()
  WebAssembly.validate(strippedBinary)
  await fs.writeFile(outfile, strippedBinary);
}


main(process.argv[2], process.argv[3])

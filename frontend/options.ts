
import * as optionsUtil from "../cli/util/options";

export const parse: (argv: string[], config: optionsUtil.Config) => Result = optionsUtil.parse as any;
export const help: (config: Options, options?: optionsUtil.HelpOptions) => string = optionsUtil.help as any;
/** Parsing result. */
export interface Result {
  /** Parsed options. */
  options: Options,
  /** Unknown options. */
  unknown: string[],
  /** Normal arguments. */
  arguments: string[],
  /** Trailing arguments. */
  trailing: string[]
}

export interface Options {
  /**
   *  Prints just the compiler's version and exits
   */
  version: boolean,
  /**
   * Prints this message and exits.
   */
  help: boolean,
  /**
   * Optimizes the module. Also has the usual shorthands:
   *  -O     Uses defaults. Equivalent to -O2s
   * -O0    Equivalent to --optimizeLevel 0
   * -O1    Equivalent to --optimizeLevel 1
   * -O2    Equivalent to --optimizeLevel 2
   * -O3    Equivalent to --optimizeLevel 3
   * -Oz    Equivalent to -O but with --shrinkLevel 2
   * -O3s   Equivalent to -O3 with --shrinkLevel 1 etc.
   */
  optimize: boolean,
  /**
   * How much to focus on optimizing code. [0-3]
   */
  optimizeLevel: number,
  /**
   * How much to focus on shrinking code size. [0-2, s=1, z=2]
   */
  shrinkLevel: number,
  /**
   * Validates the module using Binaryen. Exits if invalid.
   */
  validate: boolean,
  /**
   * Specifies the base directory of input and output files.
   */
  baseDir: string,
  /**
   * Specifies the output file. File extension indicates format.
   */
  outFile: string,
  /**
   * Specifies the binary output file (.wasm).
   */
  binaryFile: string,
  /**
   * Specifies the text output file (.wat).
   */
  textFile: string,
  /**
   * Specifies the asm.js output file (.js).
   */
  asmjsFile: string,
  /**
   * Specifies the WebIDL output file (.webidl).
   */
  idlFile: string,
  /**
   * Specifies the TypeScript definition output file (.d.ts).
   */
  tsdFile: string,
  /**
   * Enables source map generation. Optionally takes the URL
   * used to reference the source map from the binary file
   */
  sourceMap: string,
  /**
   * Enables debug information in emitted binaries.
   */
  debug: boolean,
  /**
   * Replaces assertions with just their value without trapping.
   */
  noAssert: boolean,
  /**
   * Performs compilation as usual but does not emit code.
   */
  noEmit: boolean,
  /**
   * Imports the memory instance provided by the embedder.
   */
  importMemory: boolean,
  /**
   * Declare memory as shared by settings the max shared memory.
   */
  sharedMemory: number,
  /**
   * Sets the start offset of compiler-generated static memory.
   */
  memoryBase: number,
  /**
   * Imports the function table instance provided by the embedder.
   */
  importTable: boolean,
  /**
   * Does not include the shipped standard library.
   */
  noLib: boolean,
  /**
   * Adds one or multiple paths to custom library components and
   * uses exports of all top-level files at this path as globals.
   */
  lib: string | string[],
  /**
   * Aliases a global object under another name, e.g., to switch
   * the default 'Math' implementation used: --use Math=JSMath
   */
  use: string[],
  /**
   * Sets the trap mode to use.
   *
   * "allow"  Allow trapping operations. This is the default.
   * "clamp"  Replace trapping operations with clamping semantics.
   * "js"     Replace trapping operations with JS semantics.
   */
  trapMode:"allow" | "clamp" | "js",
  /**
   * Specifies additional Binaryen passes to run after other
   * optimizations, if any. See: Binaryen/src/passes/pass.cpp
   */
  runPasses: string | string[],
  /**
   * Enables additional (experimental) WebAssembly features.
   * sign-extension  Enables sign-extension operations.
   * mutable-global  Enables mutable global imports and exports.
   * bulk-memory     Enables bulk memory operations.
   * simd            Enables SIMD types and operations.
   * threads         Enables threading and atomic. operations.
   */
  enable: string | string[],
  /**
   * Specifies the path to a custom transform to 'require'.
   */
  transform: string[],
  /**
   * Prints measuring information on I/O and compile times.
   */
  measure: boolean,
  /**
   * Disables terminal colors.
   */
  noColors: boolean,
  // "-Os": { "value": { "optimize": true, "shrinkLevel": 1 } },
  // "-Oz": { "value": { "optimize": true, "shrinkLevel": 2 } },
  // "-O0": { "value": { "optimizeLevel": 0, "shrinkLevel": 0 } },
  // "-O1": { "value": { "optimizeLevel": 1, "shrinkLevel": 0 } },
  // "-O2": { "value": { "optimizeLevel": 2, "shrinkLevel": 0 } },
  // "-O3": { "value": { "optimizeLevel": 3, "shrinkLevel": 0 } },
  // "-O0s": { "value": { "optimizeLevel": 0, "shrinkLevel": 1 } },
  // "-O1s": { "value": { "optimizeLevel": 1, "shrinkLevel": 1 } },
  // "-O2s": { "value": { "optimizeLevel": 2, "shrinkLevel": 1 } },
  // "-O3s": { "value": { "optimizeLevel": 3, "shrinkLevel": 1 } },
  // "-O0z": { "value": { "optimizeLevel": 0, "shrinkLevel": 2 } },
  // "-O1z": { "value": { "optimizeLevel": 1, "shrinkLevel": 2 } },
  // "-O2z": { "value": { "optimizeLevel": 2, "shrinkLevel": 2 } },
  // "-O3z": { "value": { "optimizeLevel": 3, "shrinkLevel": 2 } },
  /**
   * Comma separated paths to look for dependencies.
   * Looks for folders with package.json that includes a 'ascMain' field"
   * or defaults to having an '/assembly' folder
   */
  path: string[]

}

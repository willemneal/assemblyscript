/**
 * Compiler frontend for node.js
 *
 * Uses the low-level API exported from src/index.ts so it works with the compiler compiled to
 * JavaScript as well as the compiler compiled to WebAssembly (eventually). Runs the sources
 * directly through ts-node if distribution files are not present (indicated by a `-dev` version).
 *
 * Can also be packaged as a bundle suitable for in-browser use with the standard library injected
 * in the build step. See dist/asc.js for the bundle and webpack.config.js for building details.
 *
 * @module cli/asc
 */
/// <reference types="node" />
/** Whether this is a webpack bundle or not. */
/** Whether asc runs the sources directly or not. */
/** AssemblyScript version. */
export declare const version: any;
/** Available CLI options. */
export declare const options: any;
/** Common root used in source maps. */
export declare const sourceMapRoot = "assemblyscript:///";
/** Prefix used for library files. */
export declare const libraryPrefix: any;
/** Default Binaryen optimization level. */
export declare const defaultOptimizeLevel = 2;
/** Default Binaryen shrink level. */
export declare const defaultShrinkLevel = 1;
/** Bundled library files. */
export declare const libraryFiles: {};
/** Bundled definition files. */
export declare const definitionFiles: {
    assembly: string;
    portable: string;
};
/** Convenience function that parses and compiles source strings directly. */
export declare function compileString(sources: any, options: any): any;
interface Source {
    isEntry: boolean;
}
interface Program {
    filesByName: any;
    sources: Source[];
}
export interface Parser {
    nextFile(): string | null;
    program: Program;
    /** Source file names to be requested next. */
    backlog: string[];
    /** Source file names already seen, that is processed or backlogged. */
    seenlog: Set<string>;
    /** Source file names already completely processed. */
    donelog: Set<string>;
    /** Optional handler to intercept comments while tokenizing. */
    onComment: any | null;
}
export declare class Compiler {
    static singleton: Compiler;
    static main(argv: any, options: any, callback?: any): void;
    parser: Parser;
    stdlibLoaded: boolean;
    parseFile(text: string, path: string, isEntry?: boolean): void;
    fileSeen(path: string): boolean;
    /** Runs the command line utility using the specified arguments array. */
    _main(argv: any, options: any, callback?: any): any;
}
/** Checks diagnostics emitted so far for errors. */
export declare function checkDiagnostics(emitter: any, stderr: any): boolean;
/** Creates an empty set of stats. */
export declare function createStats(): {
    readTime: number;
    readCount: number;
    writeTime: number;
    writeCount: number;
    parseTime: number;
    parseCount: number;
    compileTime: number;
    compileCount: number;
    emitTime: number;
    emitCount: number;
    validateTime: number;
    validateCount: number;
    optimizeTime: number;
    optimizeCount: number;
};
/** Measures the execution time of the specified function.  */
export declare function measure(fn: any): number;
/** Formats a high resolution time to a human readable string. */
export declare function formatTime(time: any): string;
/** Formats and prints out the contents of a set of stats. */
export declare function printStats(stats: any, output: any): void;
export declare class MemoryStream {
    private fn?;
    stream: Buffer[];
    constructor(fn?: (any: any) => void);
    write(chunk: any): void;
    reset(): void;
    toBuffer(): Buffer | Uint8Array;
    toString(): string;
}
/** Creates a memory stream that can be used in place of stdout/stderr. */
export declare function createMemoryStream(fn?: any): MemoryStream;
export declare function main(argv: any, options: any, callback?: any): void;
/** Compatible TypeScript compiler options for syntax highlighting etc. */
export declare const tscOptions: {
    alwaysStrict: boolean;
    noImplicitAny: boolean;
    noImplicitReturns: boolean;
    noImplicitThis: boolean;
    noEmitOnError: boolean;
    strictNullChecks: boolean;
    experimentalDecorators: boolean;
    target: string;
    module: string;
    noLib: boolean;
    types: any[];
    allowJs: boolean;
};
export {};

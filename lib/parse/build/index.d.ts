declare namespace ASModule {
  type i8 = number;
  type i16 = number;
  type i32 = number;
  type u8 = number;
  type u16 = number;
  type u32 = number;
  type f32 = number;
  type f64 = number;
  type bool = any;
  const ASC_SHRINK_LEVEL: i32;
  const MAX_BLENGTH: i32;
  const HEADER_SIZE: u32;
  function allocateUnsafe(byteLength: i32): ArrayBuffer;
  function reallocateUnsafe(buffer: ArrayBuffer, newByteLength: i32): ArrayBuffer;
  function allocateUnsafe(length: i32): String;
  function copyUnsafe(dest: String, destOffset: u32, src: String, srcOffset: u32, len: u32): void;
  function itoa<u32>(value: u32): String;
  const MAX_DOUBLE_LENGTH: i32;
  const NaN: f64;
  const Infinity: f64;
  function abort(message: String, fileName: String, lineNumber: u32, columnNumber: u32): void;
  var HEAP_BASE: u32;
  namespace memory {
    function compare(vl: u32, vr: u32, n: u32): i32;
    function allocate(size: u32): u32;
    function free(ptr: u32): void;
    function reset(): void;
  }
  function memcmp(vl: u32, vr: u32, n: u32): i32;
  function memmove(dest: u32, src: u32, n: u32): void;
  function memset(dest: u32, c: u8, n: u32): void;
  const HEADER_SIZE: u32;
  const MAX_LENGTH: i32;
  enum CharCode {
    PLUS = 43,
    MINUS = 45,
    DOT = 46,
    _0 = 48,
    _1 = 49,
    _2 = 50,
    _3 = 51,
    _4 = 52,
    _5 = 53,
    _6 = 54,
    _7 = 55,
    _8 = 56,
    _9 = 57,
    A = 65,
    B = 66,
    E = 69,
    N = 78,
    O = 79,
    X = 88,
    Z = 90,
    a = 97,
    b = 98,
    e = 101,
    n = 110,
    o = 111,
    x = 120,
    z = 122,
  }
  function removeSection(mod: Module, id: i32): Uint8Array;
  function removeStartFunction(mod: Module): Uint8Array;
  function removeDataSection(mod: Module): Uint8Array;
  function exportDataSection(mod: Module): Uint8Array | null;
  function toString(t: TypeSection): String;
  function hasStart(mod: Module): bool;
  class Parser {
    enum SectionId {
      Custom,
      Type,
      Import,
      Function,
      Table,
      Memory,
      Global,
      Export,
      Start,
      Element,
      Code,
      Data,
    }
    class Module {
      enum Type {
        i32,
        i64,
        f32,
        f64,
        anyfunc,
        func,
        none,
      }
      enum ExternalKind {
        Function,
        Table,
        Memory,
        Global,
      }
      enum NameType {
        Module,
        Function,
        Local,
      }
      var MAX_PAGES: i32;
      var MAX_ELEMS: u32;
      enum Opcode {
        unreachable,
        nop,
        block,
        loop,
        if_,
        else_,
        end,
        br,
        br_if,
        br_table,
        return_,
        call,
        call_indirect,
        drop,
        select,
        get_local,
        set_local,
        tee_local,
        get_global,
        set_global,
        i32_load,
        i64_load,
        f32_load,
        f64_load,
        i32_load8_s,
        i32_load8_u,
        i32_load16_s,
        i32_load16_u,
        i64_load8_s,
        i64_load8_u,
        i64_load16_s,
        i64_load16_u,
        i64_load32_s,
        i64_load32_u,
        i32_store,
        i64_store,
        f32_store,
        f64_store,
        i32_store8,
        i32_store16,
        i64_store8,
        i64_store16,
        i64_store32,
        current_memory,
        grow_memory,
        i32_const,
        i64_const,
        f32_const,
        f64_const,
        i32_eqz,
        i32_eq,
        i32_ne,
        i32_lt_s,
        i32_lt_u,
        i32_gt_s,
        i32_gt_u,
        i32_le_s,
        i32_le_u,
        i32_ge_s,
        i32_ge_u,
        i64_eqz,
        i64_eq,
        i64_ne,
        i64_lt_s,
        i64_lt_u,
        i64_gt_s,
        i64_gt_u,
        i64_le_s,
        i64_le_u,
        i64_ge_s,
        i64_ge_u,
        f32_eq,
        f32_ne,
        f32_lt,
        f32_gt,
        f32_le,
        f32_ge,
        f64_eq,
        f64_ne,
        f64_lt,
        f64_gt,
        f64_le,
        f64_ge,
        i32_clz,
        i32_ctz,
        i32_popcnt,
        i32_add,
        i32_sub,
        i32_mul,
        i32_div_s,
        i32_div_u,
        i32_rem_s,
        i32_rem_u,
        i32_and,
        i32_or,
        i32_xor,
        i32_shl,
        i32_shr_s,
        i32_shr_u,
        i32_rotl,
        i32_rotr,
        i64_clz,
        i64_ctz,
        i64_popcnt,
        i64_add,
        i64_sub,
        i64_mul,
        i64_div_s,
        i64_div_u,
        i64_rem_s,
        i64_rem_u,
        i64_and,
        i64_or,
        i64_xor,
        i64_shl,
        i64_shr_s,
        i64_shr_u,
        i64_rotl,
        i64_rotr,
        f32_abs,
        f32_neg,
        f32_ceil,
        f32_floor,
        f32_trunc,
        f32_nearest,
        f32_sqrt,
        f32_add,
        f32_sub,
        f32_mul,
        f32_div,
        f32_min,
        f32_max,
        f32_copysign,
        f64_abs,
        f64_neg,
        f64_ceil,
        f64_floor,
        f64_trunc,
        f64_nearest,
        f64_sqrt,
        f64_add,
        f64_sub,
        f64_mul,
        f64_div,
        f64_min,
        f64_max,
        f64_copysign,
        i32_wrap_i64,
        i32_trunc_s_f32,
        i32_trunc_u_f32,
        i32_trunc_s_f64,
        i32_trunc_u_f64,
        i64_extend_s_i32,
        i64_extend_u_i32,
        i64_trunc_s_f32,
        i64_trunc_u_f32,
        i64_trunc_s_f64,
        i64_trunc_u_f64,
        f32_convert_s_i32,
        f32_convert_u_i32,
        f32_convert_s_i64,
        f32_convert_u_i64,
        f32_demote_f64,
        f64_convert_s_i32,
        f64_convert_u_i32,
        f64_convert_s_i64,
        f64_convert_u_i64,
        f64_promote_f32,
        i32_reinterpret_f32,
        i64_reinterpret_f64,
        f32_reinterpret_i32,
        f64_reinterpret_i64,
      }
      function log<u32>(item: u32): void;
      function log<String>(item: String): void;
      constructor(buf: Buffer);
      constructor(buf: Buffer);
      Type: SectionHeader | null;
      hasStart: bool;
      start: SectionHeader | null;
      parseSection(header: SectionHeader): void;
      getID(id: i32): SectionHeader | null;
      getType(): TypeSection | null;
      getImports(): Imports | null;
      print(): void;
    }
    constructor(binary: Uint8Array);
    constructor(binary: Uint8Array);
    readVaruint(len: u32): u32;
    off: u32;
    parse(): void;
  }
  function computeSize(byteLength: i32): u32;
  const AL_MASK: u32;
  const MAX_SIZE_32: u32;
  const DIGITS: Array<u32>;
  function decimalCount32(value: u32): u32;
  function utoa32_lut(buffer: u32, num: u32, offset: u32): void;
  function utoa32(value: u32): String;
  function memcpy(dest: u32, src: u32, n: u32): void;
  const AL_BITS: u32;
  const AL_SIZE: u32;
  var startOffset: u32;
  var offset: u32;
  function __memory_allocate(size: u32): u32;
  function __memory_free(ptr: u32): void;
  function __memory_reset(): void;
  function typeName(t: i32): String;
  function sectionName(s: i32): String;
  namespace host {
    function _log_str(x: String): void;
    function _logi(x: i32): void;
  }
}
export default ASModule;

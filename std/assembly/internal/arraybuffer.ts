import { AL_MASK, MAX_SIZE_32 } from "./allocator";

/** Size of an ArrayBuffer header. */
export const HEADER_SIZE: usize = (offsetof<ArrayBuffer>() + AL_MASK) & ~AL_MASK;
/** Maximum byte length of an ArrayBuffer. */
export const MAX_BLENGTH: i32 = <i32>MAX_SIZE_32 - HEADER_SIZE;

function computeSize(byteLength: i32): usize {
  // round up to power of 2, with HEADER_SIZE=8:
  // 0            -> 2^3  = 8
  // 1..8         -> 2^4  = 16
  // 9..24        -> 2^5  = 32
  // ...
  // MAX_LENGTH   -> 2^30 = 0x40000000 (MAX_SIZE_32)
  return <usize>1 << <usize>(<u32>32 - clz<u32>(byteLength + HEADER_SIZE - 1));
}

// Low-level utility

function __gc(ref: usize): void {}

export function allocateUnsafe(byteLength: i32): ArrayBuffer {
  assert(<u32>byteLength <= <u32>MAX_BLENGTH);
  var buffer: usize;
  if (isManaged<ArrayBuffer>()) {
    buffer = __gc_allocate(computeSize(byteLength), __gc); // tslint:disable-line
  } else {
    buffer = memory.allocate(computeSize(byteLength));
  }
  store<i32>(buffer, byteLength, offsetof<ArrayBuffer>("byteLength"));
  return changetype<ArrayBuffer>(buffer);
}

export function reallocateUnsafe(buffer: ArrayBuffer, newByteLength: i32): ArrayBuffer {
  var oldByteLength = buffer.byteLength;
  if (newByteLength > oldByteLength) {
    assert(newByteLength <= MAX_BLENGTH);
    if (newByteLength <= <i32>(computeSize(oldByteLength) - HEADER_SIZE)) { // fast path: zero out additional space
      store<i32>(changetype<usize>(buffer), newByteLength, offsetof<ArrayBuffer>("byteLength"));
      memory.fill(
        changetype<usize>(buffer) + HEADER_SIZE + <usize>oldByteLength,
        0,
        <usize>(newByteLength - oldByteLength)
      );
    } else { // slow path: copy to new buffer
      let newBuffer = allocateUnsafe(newByteLength);
      memory.copy(
        changetype<usize>(newBuffer) + HEADER_SIZE,
        changetype<usize>(buffer) + HEADER_SIZE,
        <usize>oldByteLength
      );
      memory.fill(
        changetype<usize>(newBuffer) + HEADER_SIZE + <usize>oldByteLength,
        0,
        <usize>(newByteLength - oldByteLength)
      );
      return newBuffer;
    }
  } else if (newByteLength < oldByteLength) { // fast path: override size
    // TBD: worth to copy and release if size is significantly less than before?
    assert(newByteLength >= 0);
    store<i32>(changetype<usize>(buffer), newByteLength, offsetof<ArrayBuffer>("byteLength"));
  }
  return buffer;
}

// The helpers below use two different types in order to emit loads and stores that load respectively
// store one type to/from memory while returning/taking the desired output/input type. This allows to
// emit instructions like
//
// * `i32.load8` ^= `<i32>load<i8>(...)` that reads an i8 but returns an i32, or
// * `i64.load32_s` ^= `<i64>load<i32>(...)`) that reads a 32-bit as a 64-bit integer
//
// without having to emit an additional instruction for conversion purposes. This is useful for
// small integers only of course. When dealing with reference types like classes, both parameters
// are usually the same, even though it looks ugly.
//
// TODO: is there a better way to model this?

@inline export function loadUnsafe<T,TOut>(buffer: ArrayBuffer, index: i32): TOut {
  return <TOut>load<T>(changetype<usize>(buffer) + (<usize>index << alignof<T>()), HEADER_SIZE);
}

@inline export function storeUnsafe<T,TIn>(buffer: ArrayBuffer, index: i32, value: TIn): void {
  store<T>(changetype<usize>(buffer) + (<usize>index << alignof<T>()), value, HEADER_SIZE);
}

@inline export function loadUnsafeWithOffset<T,TOut>(
  buffer: ArrayBuffer,
  index: i32,
  byteOffset: i32
): TOut {
  return <TOut>load<T>(changetype<usize>(buffer) + <usize>byteOffset + (<usize>index << alignof<T>()), HEADER_SIZE);
}

@inline export function storeUnsafeWithOffset<T,TIn>(
  buffer: ArrayBuffer,
  index: i32,
  value: TIn,
  byteOffset: i32
): void {
  store<T>(changetype<usize>(buffer) + <usize>byteOffset + (<usize>index << alignof<T>()), value, HEADER_SIZE);
}

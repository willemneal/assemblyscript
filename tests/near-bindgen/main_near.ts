import { storage, near, base64 } from "near-runtime-ts";
import { JSONEncoder } from "assemblyscript-json";
import {
  JSONDecoder,
  ThrowingJSONHandler,
  DecoderState
} from "assemblyscript-json";
import {
  doNothing as wrapped_doNothing,
  add as wrapped_add,
  rewrapFoobar as wrapped_rewrapFoobar,
  unwrapFoobar as wrapped_unwrapFoobar,
  getStringArrayLength as wrapped_getStringArrayLength,
  convertFoobars as wrapped_convertFoobars,
  callbackWithName as wrapped_callbackWithName
} from "./main";

// Runtime functions
@external("env", "return_value")
declare function return_value(value_len: usize, value_ptr: usize): void;

import { storage, context, ContractPromise, near } from "near-runtime-ts";
import { FooBar, ContainerClass, AnotherContainerClass } from "./model_near";
import {
  PromiseArgs,
  MyCallbackResult,
  MyContractPromiseResult
} from "./model_near";
export class __near_ArgsParser_doNothing extends ThrowingJSONHandler {
  buffer: Uint8Array;
  decoder: JSONDecoder<__near_ArgsParser_doNothing>;
  handledRoot: boolean = false;

  setNull(name: string): void {
    super.setNull(name);
  }

  pushObject(name: string): bool {
    if (!this.handledRoot) {
      assert(name == null || name.length == 0);
      this.handledRoot = true;
      return true;
    } else {
      assert(name != null || name.length != 0);
    }

    return super.pushObject(name);
  }

  pushArray(name: string): bool {
    return super.pushArray(name);
  }
}
export function doNothing(): void {
  // Reading input bytes.
  let json = storage._internalReadBytes(4, 0, 0)!;
  let handler = new __near_ArgsParser_doNothing();
  handler.buffer = json;
  handler.decoder = new JSONDecoder<__near_ArgsParser_doNothing>(handler);
  handler.decoder.deserialize(json);
  wrapped_doNothing();
}
export class __near_ArgsParser_add extends ThrowingJSONHandler {
  buffer: Uint8Array;
  decoder: JSONDecoder<__near_ArgsParser_add>;
  handledRoot: boolean = false;

  __near_param_x: i32;
  __near_param_y: i32;
  setInteger(name: string, value: i64): void {
    if (name == "x") {
      this.__near_param_x = <i32>value;
      return;
    }
    if (name == "y") {
      this.__near_param_y = <i32>value;
      return;
    }

    super.setInteger(name, value);
  }
  setNull(name: string): void {
    if (name == "x") {
      this.__near_param_x = <i32>null;
      return;
    }
    if (name == "y") {
      this.__near_param_y = <i32>null;
      return;
    }

    super.setNull(name);
  }

  pushObject(name: string): bool {
    if (!this.handledRoot) {
      assert(name == null || name.length == 0);
      this.handledRoot = true;
      return true;
    } else {
      assert(name != null || name.length != 0);
    }

    return super.pushObject(name);
  }

  pushArray(name: string): bool {
    return super.pushArray(name);
  }
}
export function add(): void {
  // Reading input bytes.
  let json = storage._internalReadBytes(4, 0, 0)!;
  let handler = new __near_ArgsParser_add();
  handler.buffer = json;
  handler.decoder = new JSONDecoder<__near_ArgsParser_add>(handler);
  handler.decoder.deserialize(json);
  let result = wrapped_add(handler.__near_param_x, handler.__near_param_y);

  let encoder = new JSONEncoder();

  encoder.setInteger(null, result);

  let val = encoder.serialize();
  return_value(val.byteLength, <usize>val.buffer);
}
import { __near_decode_ContainerClass } from "./model_near";
export class __near_ArgsParser_rewrapFoobar extends ThrowingJSONHandler {
  buffer: Uint8Array;
  decoder: JSONDecoder<__near_ArgsParser_rewrapFoobar>;
  handledRoot: boolean = false;

  __near_param_container: ContainerClass;
  setNull(name: string): void {
    if (name == "container") {
      this.__near_param_container = <ContainerClass>null;
      return;
    }

    super.setNull(name);
  }

  pushObject(name: string): bool {
    if (!this.handledRoot) {
      assert(name == null || name.length == 0);
      this.handledRoot = true;
      return true;
    } else {
      assert(name != null || name.length != 0);
    }
    if (name == "container") {
      this.__near_param_container = __near_decode_ContainerClass(
        this.buffer,
        this.decoder.state
      );
      return false;
    }

    return super.pushObject(name);
  }

  pushArray(name: string): bool {
    return super.pushArray(name);
  }
}
import { __near_encode_AnotherContainerClass } from "./model_near";
export function rewrapFoobar(): void {
  // Reading input bytes.
  let json = storage._internalReadBytes(4, 0, 0)!;
  let handler = new __near_ArgsParser_rewrapFoobar();
  handler.buffer = json;
  handler.decoder = new JSONDecoder<__near_ArgsParser_rewrapFoobar>(handler);
  handler.decoder.deserialize(json);
  let result = wrapped_rewrapFoobar(handler.__near_param_container);

  let encoder = new JSONEncoder();

  if (result != null) {
    encoder.pushObject(null);
    __near_encode_AnotherContainerClass(result, encoder);
    encoder.popObject();
  } else {
    encoder.setNull(null);
  }

  let val = encoder.serialize();
  return_value(val.byteLength, <usize>val.buffer);
}
import { __near_decode_AnotherContainerClass } from "./model_near";
export class __near_ArgsParser_unwrapFoobar extends ThrowingJSONHandler {
  buffer: Uint8Array;
  decoder: JSONDecoder<__near_ArgsParser_unwrapFoobar>;
  handledRoot: boolean = false;

  __near_param_container: AnotherContainerClass;
  setNull(name: string): void {
    if (name == "container") {
      this.__near_param_container = <AnotherContainerClass>null;
      return;
    }

    super.setNull(name);
  }

  pushObject(name: string): bool {
    if (!this.handledRoot) {
      assert(name == null || name.length == 0);
      this.handledRoot = true;
      return true;
    } else {
      assert(name != null || name.length != 0);
    }
    if (name == "container") {
      this.__near_param_container = __near_decode_AnotherContainerClass(
        this.buffer,
        this.decoder.state
      );
      return false;
    }

    return super.pushObject(name);
  }

  pushArray(name: string): bool {
    return super.pushArray(name);
  }
}
import { __near_encode_FooBar } from "./model_near";
export function unwrapFoobar(): void {
  // Reading input bytes.
  let json = storage._internalReadBytes(4, 0, 0)!;
  let handler = new __near_ArgsParser_unwrapFoobar();
  handler.buffer = json;
  handler.decoder = new JSONDecoder<__near_ArgsParser_unwrapFoobar>(handler);
  handler.decoder.deserialize(json);
  let result = wrapped_unwrapFoobar(handler.__near_param_container);

  let encoder = new JSONEncoder();

  if (result != null) {
    encoder.pushObject(null);
    __near_encode_FooBar(result, encoder);
    encoder.popObject();
  } else {
    encoder.setNull(null);
  }

  let val = encoder.serialize();
  return_value(val.byteLength, <usize>val.buffer);
}
import { __near_decode_Array_String } from "./model_near";
export class __near_ArgsParser_getStringArrayLength extends ThrowingJSONHandler {
  buffer: Uint8Array;
  decoder: JSONDecoder<__near_ArgsParser_getStringArrayLength>;
  handledRoot: boolean = false;

  __near_param_arr: Array<String>;
  setNull(name: string): void {
    if (name == "arr") {
      this.__near_param_arr = <Array<String>>null;
      return;
    }

    super.setNull(name);
  }

  pushObject(name: string): bool {
    if (!this.handledRoot) {
      assert(name == null || name.length == 0);
      this.handledRoot = true;
      return true;
    } else {
      assert(name != null || name.length != 0);
    }

    return super.pushObject(name);
  }

  pushArray(name: string): bool {
    if (name == "arr") {
      this.__near_param_arr = __near_decode_Array_String(
        this.buffer,
        this.decoder.state
      );
      return false;
    }

    return super.pushArray(name);
  }
}
export function getStringArrayLength(): void {
  // Reading input bytes.
  let json = storage._internalReadBytes(4, 0, 0)!;
  let handler = new __near_ArgsParser_getStringArrayLength();
  handler.buffer = json;
  handler.decoder = new JSONDecoder<__near_ArgsParser_getStringArrayLength>(
    handler
  );
  handler.decoder.deserialize(json);
  let result = wrapped_getStringArrayLength(handler.__near_param_arr);

  let encoder = new JSONEncoder();

  encoder.setInteger(null, result);

  let val = encoder.serialize();
  return_value(val.byteLength, <usize>val.buffer);
}
import { __near_decode_Array_FooBar } from "./model_near";
export class __near_ArgsParser_convertFoobars extends ThrowingJSONHandler {
  buffer: Uint8Array;
  decoder: JSONDecoder<__near_ArgsParser_convertFoobars>;
  handledRoot: boolean = false;

  __near_param_foobars: Array<FooBar>;
  setNull(name: string): void {
    if (name == "foobars") {
      this.__near_param_foobars = <Array<FooBar>>null;
      return;
    }

    super.setNull(name);
  }

  pushObject(name: string): bool {
    if (!this.handledRoot) {
      assert(name == null || name.length == 0);
      this.handledRoot = true;
      return true;
    } else {
      assert(name != null || name.length != 0);
    }

    return super.pushObject(name);
  }

  pushArray(name: string): bool {
    if (name == "foobars") {
      this.__near_param_foobars = __near_decode_Array_FooBar(
        this.buffer,
        this.decoder.state
      );
      return false;
    }

    return super.pushArray(name);
  }
}
import { __near_encode_ContainerClass } from "./model_near";
export function __near_encode_Array_ContainerClass(
  value: Array<ContainerClass>,
  encoder: JSONEncoder
): void {
  for (let i = 0; i < value.length; i++) {
    if (value[i] != null) {
      encoder.pushObject(null);
      __near_encode_ContainerClass(value[i], encoder);
      encoder.popObject();
    } else {
      encoder.setNull(null);
    }
  }
}
export function convertFoobars(): void {
  // Reading input bytes.
  let json = storage._internalReadBytes(4, 0, 0)!;
  let handler = new __near_ArgsParser_convertFoobars();
  handler.buffer = json;
  handler.decoder = new JSONDecoder<__near_ArgsParser_convertFoobars>(handler);
  handler.decoder.deserialize(json);
  let result = wrapped_convertFoobars(handler.__near_param_foobars);

  let encoder = new JSONEncoder();

  if (result != null) {
    encoder.pushArray(null);
    __near_encode_Array_ContainerClass(result, encoder);
    encoder.popArray();
  } else {
    encoder.setNull(null);
  }

  let val = encoder.serialize();
  return_value(val.byteLength, <usize>val.buffer);
}
import { __near_decode_PromiseArgs } from "./model_near";
export class __near_ArgsParser_callbackWithName extends ThrowingJSONHandler {
  buffer: Uint8Array;
  decoder: JSONDecoder<__near_ArgsParser_callbackWithName>;
  handledRoot: boolean = false;

  __near_param_args: PromiseArgs;
  setNull(name: string): void {
    if (name == "args") {
      this.__near_param_args = <PromiseArgs>null;
      return;
    }

    super.setNull(name);
  }

  pushObject(name: string): bool {
    if (!this.handledRoot) {
      assert(name == null || name.length == 0);
      this.handledRoot = true;
      return true;
    } else {
      assert(name != null || name.length != 0);
    }
    if (name == "args") {
      this.__near_param_args = __near_decode_PromiseArgs(
        this.buffer,
        this.decoder.state
      );
      return false;
    }

    return super.pushObject(name);
  }

  pushArray(name: string): bool {
    return super.pushArray(name);
  }
}
import { __near_encode_MyCallbackResult } from "./model_near";
export function callbackWithName(): void {
  // Reading input bytes.
  let json = storage._internalReadBytes(4, 0, 0)!;
  let handler = new __near_ArgsParser_callbackWithName();
  handler.buffer = json;
  handler.decoder = new JSONDecoder<__near_ArgsParser_callbackWithName>(
    handler
  );
  handler.decoder.deserialize(json);
  let result = wrapped_callbackWithName(handler.__near_param_args);

  let encoder = new JSONEncoder();

  if (result != null) {
    encoder.pushObject(null);
    __near_encode_MyCallbackResult(result, encoder);
    encoder.popObject();
  } else {
    encoder.setNull(null);
  }

  let val = encoder.serialize();
  return_value(val.byteLength, <usize>val.buffer);
}

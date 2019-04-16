import { Buffer } from '../buffer';
import {
  Type,
  SectionId,
  ExternalKind,
  NameType,
  MAX_PAGES,
  MAX_ELEMS,
  Opcode
} from "../../src/common";
import { SectionHeader, TypeSection } from "./header";
import { Imports } from "./imports";
import { log } from "../../../host/assembly";

export class Module {
  headers: SectionHeader[];
  buf: Buffer;
  // Custom: TypeSection[];

  constructor(buf: Buffer) {
    this.buf = buf;
    this.headers = [];
  }

  get Type(): SectionHeader | null {
    return this.getID(SectionId.Type);
  }

  get hasStart(): boolean {
    return this.start != null;
  }

  get start(): SectionHeader | null {
    return this.getID(SectionId.Start)
  }

  parseSection(header: SectionHeader): void {
    this.headers.push(header);
    switch (header.id) {
      case SectionId.Type:
        // this._Type.push(header);
        break;
      default:
    }
  }

  getID(id: SectionId): SectionHeader | null {
    var x: i32 = this.headers.length;
    for (let i = 0; i < x; i++) {
      if (this.headers[i].id == id) {
        return this.headers[i];
      }
    }
    return null;
  }

  getType(): TypeSection | null {
    let header = this.getID(SectionId.Type);
    if (header == null) {
      return null;
    } else {
      let section = new TypeSection(<SectionHeader>header);
      return section.parse(this.buf);
    }
  }

  getImports(): Imports | null {
    var header = this.getID(SectionId.Import);
    if (!header) {
      return null;
    }
    var _import = new Imports(<SectionHeader>header);
    return _import.parse(this.buf);
  }

  print(): void {
    for (let i = 0; i < this.headers.length; i++) {
      log(this.headers[i].toString());
      log("");
    }

  }

}

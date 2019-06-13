import { JSON } from "assemblyscript-json";

const package_str = `\
{\
    "name": "npm-reader",\
    "version": "0.0.2",\
    "description": "Reads package.json files",\
    "scripts": {\
      "test": "asp",\
      "build": "asc assembly/index.ts --path node_modules --noEmit --runtime stub"\
    },\
    "keywords": [\
      "AssemblyScript"\
    ],\
    "author": "Willem Wyndham",\
    "license": "MIT",\
    "dependencies": {\
      "as-pect": "github:jtenner/as-pect",\
      "assemblyscript": "file:../../..",\
      "assemblyscript-json": "file:../../../../../../c/assemblyscript-json"\
    }\
}  \
`

let _package: JSON.Obj;
describe("package.json", () => {
    beforeAll(() => {
        _package =  JSON.parse(package_str);
    })
    it("can have a scripts object", () => {
        let scripts: JSON.Obj = _package.get("scripts");
        expect<string>(scripts.get("test").str).toStrictEqual("asp");
    })


})

describe("Transitive dependencies",() => {
  it("should find second level dependencies", () => {
    let u128 = JSON.u128FromString("128");
    expect<i32>(u128.toI32()).toBe(128);
  })
  
})
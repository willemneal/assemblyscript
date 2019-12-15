
interface IA {
  a(): i32;
}

interface IB extends IA {
  b(): string;
}

interface IC extends IB {
  c(): bool;
}

class AA {
  a(): i32 { return 84; }
}

const aa = new AA();
// assert(aa.a() == 84);

class AC implements IC {
  a(): i32 { return 42; }
  b(): string { return "hello world"; }
  c(): bool { return true; }
}

const ac = new AC();

function testIA(ia: IA): void {
  assert(ia.a() == 42);
}

function testIC(ic: IC): void {
  assert(ic.a() == 42);
  assert(ic.b() == "hello world");
  assert(ic.c());
}
testIA(ac);
testIC(ac);

function testGIC<T extends IA>(gic: T): void {
  assert(gic.a() == 84);
}

testGIC<IA>(aa);

interface ID {
  d(): f32;
}

type x = ID & IC;

// interface IE extends IC, ID {
//   e(): f64;
// }

// class AE implements IE {
//   e(): f64 {
//    return 2.1812;
//   }
//   c(): bool {
//     return true;
//   }
//   b(): string {
//     return "eb";
//   }
//   a(): i32 {
//     return 21;
//   }
//   d(): f32 {
//     return 3.14;
//   }
// }

// const ae = new AE();

// function testIE(ie: IE): void {
//   assert(ie.e() == 2.1812);
//   assert(ie.a() == 21);
// }

// testIE(ae);

// interface FromClass extends AA {
//   d(): f32;
// }

// class AFromClass {
//   a(): i32 { return 84; }
//   d(): f32 { return 3.14; }
// }
// let aFromClass = new AFromClass();

// testGIC(aFromClass);

// function testFromClass(i: FromClass): void {
//   assert(i.a() == 84);
//   assert(Math.abs(i.d() - 3.14) < 0.00001 );
// }

// testFromClass(aFromClass);

var which: string = "";

class A {
  a<T>(a: T): void { // virtual
    which = "A";
  }
  b(b: i32): void { // virtual
    which = "A";
  }
  get c(): i32 { // virtual
    which = "A";
    return 0;
  }
  set c(c: i32) { // virtual
    which = "A";
  }
}

class B extends A {
  a<T>(a: T): void { // virtual + overload
    which = "B";
  }
  b(b: i32): void { // virtual + overload
    which = "B";
  }
  get c(): i32 { // virtual + overload
    which = "B";
    return 0;
  }
  set c(c: i32) { // virtual + overload
    which = "B";
  }
}

// Should call the overload
var a: A = new B();
a.a<i32>(1);
assert(which == "B");
which = "";
a.b(1);
assert(which == "B");
which = "";
a.c;
assert(which == "B");
which = "";
a.c = 1;
assert(which == "B");

class C extends B {
  a<T>(a: T): void { // overload
    super.a(a);
    assert(which == "B");
    which = "C";
  }
  b(b: i32): void { // overload
    which = "C";
  }
  get c(): i32 { // overload
    which = "C";
    return 0;
  }
  set c(c: i32) { // overload
    which = "C";
  }
}

// Should call non-virtual super
var c = new C();
which = "";
c.a<i32>(1);
assert(which == "C");
which = "";
c.b(1);
assert(which == "C");
which = "";
c.c;
assert(which == "C");
c.c = 1;
assert(which == "C");

class D extends B {
  // inherits B's
}

// Should call inherited overload
a = new D();
which = "";
a.a<i32>(1);
assert(which == "B");
which = "";
a.b(1);
assert(which == "B");
which = "";
a.c;
assert(which == "B");
a.c = 1;
assert(which == "B");

class E extends D {
  // inherits B's
}

// Should still call inherited overload
a = new E();
which = "";
a.a<i32>(1);
assert(which == "B");
which = "";
a.b(1);
assert(which == "B");
which = "";
a.c;
assert(which == "B");
a.c = 1;
assert(which == "B");

class F extends E {
  a<T>(a: T): void { // overload
    which = "F";
  }
  b(b: i32): void { // overload
    which = "F";
  }
  get c(): i32 { // overload
    which = "F";
    return 0;
  }
  set c(c: i32) { // overload
    which = "F";
  }
}

// Should no longer call inherited overload
a = new F();
which = "";
a.a<i32>(1);
assert(which == "F");
which = "";
a.b(1);
assert(which == "F");
which = "";
a.c;
assert(which == "F");
which = "";
a.c = 1;
assert(which == "F");

// Should work with interfaces
interface IA {
  foo(): void;
}

class CA implements IA {
  foo(): void {
    which = "IB";
  }
}

var ia: IA = new CA();
which = "";
ia.foo();
assert(which == "IB");

// Should work with extended interfaces
interface IC extends IA {
}

class CC implements IC {
  foo(): void {
    which = "IC";
  }
}

var ic: IC = new CC();
which = "";
ic.foo();
assert(which == "IC");

interface ID {
  foo(): void;
}

interface IE extends ID {}

class AE implements IE {
  foo(): void {
    which = "AE";
  }
}

var ad = new AE()

function ID_fun (ia: ID): void {
  ia.foo()
}
ID_fun(ad);
assert(which == "AE");


abstract class Abstract {
  x: i32 = 42;
  abstract abstractMethod(): i32;
  abstract get y(): i32;

}

abstract class SubAstract extends Abstract {
  constructor() {
    super();
    this.x = 21;
  }
  get y(): i32 { return 42; }
}

class AAbstract extends Abstract {
  abstractMethod(): i32 {
    return this.x;
  }

 get y(): i32 { return this.x * 2; }
}

class AAnotherAbstract extends SubAstract {
  abstractMethod(): i32 { return 21; }
}

const aastract = new AAbstract();
const aAnotherAbstract = new AAnotherAbstract();

function testAbstract(a: Abstract, expected: i32): void {
  assert(a.abstractMethod() == expected);
  assert(a.y == expected * 2);
}

testAbstract(aastract, 42);
testAbstract(aAnotherAbstract, 21);

function testGeneric<T extends Abstract>(a: T, expected: i32): void {
  assert(a.abstractMethod() == expected);
  assert(a.y == expected * 2);
}

testGeneric(aastract, 42);
testGeneric(aAnotherAbstract, 21);
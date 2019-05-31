

import {IterableArray, ArrayIterable} from "..";

let array: IterableArray<string>;

describe("A iterable array", () => {
  beforeEach(()=> {
    array = new IterableArray<string>();
  });

  it("should return done on an empty array", () => {
    let iterator = array.iterator;
    expect<bool>(iterator.next().done).toBe(true);
  });

  it("should iterate with one item", () => {
    let  array = new IterableArray<string>();
    array.push("Hello")
    let iterator = array.iterator;
    let next = iterator.next();
    expect<usize>((iterator.iterable as ArrayIterable<string>).idx).toBe(0, "first call to next should increment the index");
    expect<bool>(next.done).toBe(false, "first call to next should return a result that is not done");
    expect<string>(next.value as string).not.toBeNull("the first string should NOT be null")
    expect<string>(next.value!).toStrictEqual("Hello");
    expect<bool>(iterator.next().done).toBe(true);
  });

  it("should iterate two items", () => {
    let  array = new IterableArray<string>();
    array.push("Hello");
    array.push("World");
    let iterator = array.iterator;
    let count = 0;
    let next = iterator.next();
    while (!next.done) {
      expect<string>(next.value as string).not.toBeNull("the first string should NOT be null")
      expect<string>(next.value!).toStrictEqual(array[count]);
      count++;
      next = iterator.next()
    }
    expect<bool>(next.done).toBe(true);
  });
})

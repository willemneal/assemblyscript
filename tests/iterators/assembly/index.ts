
/**
 * TODO: Currently can't handle non-nullable types like numbers...
 */

type valueFn<T> = (i:Iterable<T>) => T | null;
type doneFn<T> = (i:Iterable<T>) => boolean;
type nextFn<T> = (i:Iterable<T>) => Iterable<T>;

/**
 * This class holds the anonymous functions that get called
 */
export abstract class Iterable<T> {
  protected _value: valueFn<T> = (itr) => null;
  protected _done : doneFn<T> = (itr) => true;
  protected _next:  nextFn<T> = (itr) => itr;

  get value(): T | null {
    return call_indirect(this._value, this);
  }

  get done(): boolean {
    return call_indirect(this._done, this);
  }

  next(): Iterable<T> {
    return call_indirect(this._next, this);
  }
}

export class IteratorResult<T>{
  constructor(public done: boolean, public value: T | null) { }
}

export class Iterator<T> {
  constructor(public iterable: Iterable<T>) { }

  next(): IteratorResult<T> {
    let next = this.iterable.next();
    return new IteratorResult<T>(next.done, next.value);
  }
}

export class ArrayIterable<T> extends Iterable<T> {
  idx: usize = -1;

  constructor(private array: Array<T>) {
    super();
    this._value = (itr) => {
      let self = changetype<ArrayIterable<T>>(itr)
      if (self.idx >= <usize>self.array.length) {
        return null;
      }
      return self.array[self.idx];
    }

    this._done = (itr) => {
     let self = changetype<ArrayIterable<T>>(itr)
     return self.idx == self.array.length;
    }

    this._next =  (itr) => {
      let self = changetype<ArrayIterable<T>>(itr)
      self.idx++;
      return itr;
    }
  }

}


export class IterableArray<T> extends Array<T> {

  get iterator(): Iterator<T> {
    return new Iterator<T>(new ArrayIterable<T>(this));;
  }
}

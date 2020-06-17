
export interface Iterable<T> {
  iterator(): Iterator<T>;
}

export interface IteratorResult<T> {
  value: T;
  done: bool;
}

export interface Iterator<T> {
 next(): IteratorResult<T>;
}

export interface IterableIterator<T> extends Iterator<T> {
  iterator(): IterableIterator<T>;
}

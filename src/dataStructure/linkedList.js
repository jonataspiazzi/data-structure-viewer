export default class LinkedList {
  constructor(data) {
    this.info = data;
    this.next = null;
  }

  add(data) {
    if (this.next == null) {
      this.next = new LinkedList(data);
      return;
    }

    this.next.add(data);
  }

  *[Symbol.iterator]() {
    yield this.info;

    if (this.next) yield* this.next;
  }
}
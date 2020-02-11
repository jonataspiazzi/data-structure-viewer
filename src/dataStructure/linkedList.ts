export default class LinkedList {
  info:any;
  next:LinkedList;

  constructor(data:any) {
    this.info = data;
    this.next = null;
  }

  add(data:any) {
    if (this.next == null) {
      this.next = new LinkedList(data);
      return;
    }

    this.next.add(data);
  }

  
  *[Symbol.iterator](): Iterator<any> {
    yield this.info;

    if (this.next) yield* this.next;
  }
}
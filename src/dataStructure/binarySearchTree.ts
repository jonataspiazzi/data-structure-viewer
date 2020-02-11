// as described https://www.educba.com/types-of-trees-in-data-structure/

export default class BinarySearchTree {
  info: any;
  left: BinarySearchTree;
  right: BinarySearchTree;

  constructor(data: any) {
    this.info = data;
    this.left = null;
    this.right = null;
  }

  add(data:any) {
    if (data <= this.info) {
      if (this.left == null) {
        this.left = new BinarySearchTree(data);
      }
      else {
        this.left.add(data);
      }
    }
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(data);
      }
      else {
        this.right.add(data);
      }
    }
  }

  *[Symbol.iterator](): Iterator<any> {
    if (this.left) yield* this.left;

    yield this.info;

    if (this.right) yield* this.right;
  }
}
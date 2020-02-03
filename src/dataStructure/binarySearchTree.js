// as described https://www.educba.com/types-of-trees-in-data-structure/

export default class BinarySearchTree {
  constructor(data) {
    this.info = data;
    this.left = null;
    this.right = null;
  }

  add(data) {
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

  *[Symbol.iterator]() {
    if (this.left) yield* this.left;
    yield this.info;
    if (this.right) yield *this.right;
  }
}
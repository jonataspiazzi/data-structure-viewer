/* This data structure is desined to facilitate navigation in a tree in all directions
 * 
 * NAVIGATION SYSTEM
 * -----------------
 * ↓ = this.children
 * ↑ = this.parent
 * ← = this.left
 * → = this.right
 *
 * INFO SYSTEM
 * -----------
 * this.deepness = how deep the node is in the whole structure. (also can be refered as level).
 * this.data = the actual information stored.
 * this.bind = the node from another data structure (defined by user).
 * 
 * 
 * ILLUSTRATION
 * ------------
 * To simplificate concepts and names there is a demo structure represented below
 * that will be use for all comments and explanations.
 * 
 *     
 *                           ┌─────┐
 *                           │  4  │                         --------- level 1 / deepness == 0
 *                           └──┬──┘
 *               ┌──────────────┼──────────────┐
 *            ┌──┴──┐        ┌──┴──┐        ┌──┴──┐
 *            │  2  ├────────┤  5  ├────────┤  7  │          --------- level 2 / deepness == 1
 *            └──┬──┘        └─────┘        └──┬──┘
 *        ┌──────┴──────┐               ┌──────┴──────┐
 *     ┌──┴──┐       ┌──┴──┐         ┌──┴──┐       ┌──┴──┐
 *     │  1  ├───────┤  3  ├─────────┤  6  ├───────┤  8  │   --------- level 3 / deepness == 2
 *     └─────┘       └─────┘         └─────┘       └─────┘
 * 
 * 
 * 
 * ILLUSTRATION LEGEND
 * -------------------
 * 
 * 
 *               this.parent
 *   
 *                    │
 *               ┌────┴────┐
 * this.left  ───┤  .data  ├───   this.right
 *               └────┬────┘
 *                    │
 *   
 *              this.children
 * 
 * 
 * 
 * LAST CONSIDERATIONS
 * -------------------
 * 1) 2, 5, 7 is children of 4 to represent there is no limit to how many children there are.
 * 2) 3 is left of 6 and 6 is right of 3 even with diferent parents.
 * 3) There is only 1 element with left null in each level (4, 2, 1), the same is true to right (4, 7, 8).
 * 
 */

export default class QuadirectionalTree {
  constructor(data, childrenLength) {
    this.parent = null;
    this.left = null;
    this.right = null;
    this.deepness = 0;
    this.hasFixedLength = childrenLength !== 0 && !isNaN(childrenLength);
    this.children = new Array(this.hasFixedLength ? childrenLength : 0);
    this.data = data; // info
    this.bind = null; // future use, connection with other data structure.
  }

  levelLenght(direction) {
    /* Count how much nodes are in the whole structure with the same deepness (in the same level).
     * 
     * The count can be started in any node. The start node will be called "Start Count Point" or SCP
     * if direction == 0  then this == SCP
     * if direction == -1 then this is some place left from SCP.
     * if direction == 1  then this is some place right from SCP.
     */
    return 1
      + (this.left && direction <= 0 ? this.left.levelLenght(-1) : 0)
      + (this.right && direction >= 0 ? this.right.levelLenght(1) : 0);
  }

  insertChild(data, index) {
    if (!this.hasFixedLength) throw 'The method setChildOn can only be used with hasFixedLength == true';
    if (isNaN(index)) throw 'Arg index should be a number';
    if (Math.trunc(index) !== index || index < 0) throw 'Arg index should be a integer equal or greather than 0';

    const child = new QuadirectionalTree(data, this.children.length);

    this.children[index] = child;

    this.updateChildStructure(child);

    return child;
  }

  pushChild(data) {
    if (this.hasFixedLength) throw 'The method pushChild can only be used with hasFixedLength == false';

    const child = new QuadirectionalTree(data, 0);

    this.children.push(child);

    this.updateChildStructure(child);

    return child;
  }

  updateChildStructure(child) {
    child.parent = this;
    child.deepness = this.deepness + 1;
    child.updateLeft();
    child.updateRight();
  }

  updateLeft() {
    this.left = null;

    // if has no parent, also has no sibling.
    if (!this.parent) return;

    // try to find a sibling on left.
    let onLeft = this.getFirstSiblingOnLeft();

    if (!onLeft && this.parent.left) {
      // if no sibling on left, try to find a cousin on left.
      onLeft = this.parent.left.getClosestToRightChild();
    }

    if (onLeft) {
      this.left = onLeft;
      onLeft.right = this;
    }
  }

  updateRight() {
    this.right = null;

    // if has no parent, also has no sibling.
    if (!this.parent) return;

    // try to find a sibling on right.
    let onRight = this.getFirstSiblingOnRight();

    if (!onRight && this.parent.right) {
      // if no sibling on right, try to find a cousin on right.
      onRight = this.parent.right.getClosestToLeftChild();
    }

    if (onRight) {
      this.right = onRight;
      onRight.left = this;
    }
  }

  getFirstSiblingOnLeft() {
    if (!this.parent) return null;

    const thisIndex = this.parent.children.indexOf(this);

    for (let i = thisIndex - 1; i >= 0; i--) {
      const sibling = this.parent.children[i];
      if (sibling) return sibling;
    }

    return null;
  }

  getFirstSiblingOnRight() {
    if (!this.parent) return null;

    const thisIndex = this.parent.children.indexOf(this);

    for (let i = thisIndex + 1; i < this.parent.children.length; i++) {
      const sibling = this.parent.children[i];
      if (sibling) return sibling;
    }

    return null;
  }

  getClosestToLeftChild() {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child) return child;
    }

    return this.right ? this.right.getClosestToLeftChild() : null;
  }

  getClosestToRightChild() {
    for (let i = this.children.length - 1; i >= 0; i--) {
      const child = this.children[i];
      if (child) return child;
    }

    return this.left ? this.left.getClosestToRightChild() : null;
  }

  fillFrom(data, dataProp, childrenProps) {
    this.data = data[dataProp];
    this.bind = data;

    if (this.hasFixedLength) {
      for (let i = 0; i < childrenProps.length; i++) {
        const genericChild = data[childrenProps[i]];
        if (!genericChild) continue;
        const child = this.insertChild(undefined, i);
        child.fillFrom(genericChild, dataProp, childrenProps);
      }

      return;
    }

    for (const genericChild of data[childrenProps[0]]) {
      const child = this.pushChild(undefined);
      child.fillFrom(genericChild);
    }
  }

  *[Symbol.iterator]() {
    yield this;

    for (const child of this.children) {
      if (child) yield *child[Symbol.iterator]();
    }
  }
}
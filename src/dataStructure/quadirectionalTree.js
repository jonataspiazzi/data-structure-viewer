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
  constructor(data) {
    this.parent = null;
    this.left = null;
    this.right = null;
    this.deepness = 0;
    this.children = [];
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

  addChild(data, method) {
    if (method != 'unshift' && method != 'push') throw 'Arg method can only be unshift or push';

    const child = new QuadirectionalTree(data);

    child.left = method == 'push' && this.children.length
      ? this.children[this.children.length - 1]
      : this.getClosestLeftNephew();

    child.right = method == 'unshift' && this.children.length
      ? this.children[0]
      : this.getClosestRightNephew();

    if (child.left) child.left.right = child;
    if (child.right) child.right.left = child;

    child.parent = this;
    child.deepness = this.deepness + 1;
    this.children[method](child);

    return child;
  }

  getClosestLeftNephew() {
    // From the illustration above
    // 3 is the closest nephew from 7.

    // fastest way is find by children.
    if (this.children.length) {
      return this.children[0].left;
    }

    // if no children available, find by sibling.
    if (!this.left) return null;

    if (!this.left.children.length) {
      return this.left.getClosestLeftNephew(); // recursive
    }
    
    return this.left.children[this.left.children.length - 1];
  }

  getClosestRightNephew() {
    // From the illustration above
    // 7 is the closest nephew from 2.

    // fastest way is find by children.
    if (this.children.length) {
      return this.children[this.children.length - 1].right;
    }

    // if no children available, find by sibling.
    if (!this.right) return null;

    if (!this.right.children.length) {
      return this.right.getClosestRightNephew(); // recursive
    }
    
    return this.right.children[0];
  }
}
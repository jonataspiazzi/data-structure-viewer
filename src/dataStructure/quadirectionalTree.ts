import { Vector2d } from "../types";

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

export interface QuadirectionalTreeTranslateConfigX {
  width: number;
  spaceBetweenSiblings: number;
  spaceBetweenCousins: number;
}

export interface QuadirectionalTreeTranslateConfigY {
  height: number;
  spaceBetweenParentAndChild: number;
}

export interface QuadirectionalTreeTranslateConfig extends QuadirectionalTreeTranslateConfigX, QuadirectionalTreeTranslateConfigY {
  ignoreUnevenSiblings?: boolean;
}

export default class QuadirectionalTree {
  parent: QuadirectionalTree;
  left: QuadirectionalTree;
  right: QuadirectionalTree;
  deepness: number;
  hasFixedLength: boolean;
  children: QuadirectionalTree[];
  data: any;
  bind: any;
  graphics: Vector2d;

  constructor(data: any, childrenLength: number) {
    this.parent = null;
    this.left = null;
    this.right = null;
    this.deepness = 0;
    this.hasFixedLength = childrenLength !== 0 && !isNaN(childrenLength);
    this.children = new Array(this.hasFixedLength ? childrenLength : 0);
    this.data = data; // info
    this.bind = null; // future use, connection with other data structure.
    this.graphics = { x: 0, y: 0 };
  }

  /**
    *   Count all nodes in the same level.
    *   This is a recursive function and the direction param determines where the recursion
    *   should go. Zero (0) means both left and right.
    *
    *   @param direction one of these values -1, 0, 1.
    *   @return a number indicating the length of the level.
    */
  levelLenght(direction: number): number {
    return 1
      + (this.left && direction <= 0 ? this.left.levelLenght(-1) : 0)
      + (this.right && direction >= 0 ? this.right.levelLenght(1) : 0);
  }

  insertChild(data: any, index: number): QuadirectionalTree {
    if (!this.hasFixedLength) throw new Error('The method setChildOn can only be used with hasFixedLength == true');
    if (isNaN(index)) throw new Error('Arg index should be a number');
    if (Math.trunc(index) !== index || index < 0) throw new Error('Arg index should be a integer equal or greater than 0');

    const child = new QuadirectionalTree(data, this.children.length);

    this.children[index] = child;

    this.updateChildStructure(child);

    return child;
  }

  pushChild(data: any): QuadirectionalTree {
    if (this.hasFixedLength) throw new Error('The method pushChild can only be used with hasFixedLength == false');

    const child = new QuadirectionalTree(data, 0);

    this.children.push(child);

    this.updateChildStructure(child);

    return child;
  }

  updateChildStructure(child: QuadirectionalTree): void {
    child.parent = this;
    child.deepness = this.deepness + 1;
    child.updateLeft();
    child.updateRight();
  }

  updateLeft(): void {
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

  updateRight(): void {
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

  getFirstSiblingOnLeft(): QuadirectionalTree {
    if (!this.parent) return null;

    const thisIndex = this.parent.children.indexOf(this);

    for (let i = thisIndex - 1; i >= 0; i--) {
      const sibling = this.parent.children[i];
      if (sibling) return sibling;
    }

    return null;
  }

  getFirstSiblingOnRight(): QuadirectionalTree {
    if (!this.parent) return null;

    const thisIndex = this.parent.children.indexOf(this);

    for (let i = thisIndex + 1; i < this.parent.children.length; i++) {
      const sibling = this.parent.children[i];
      if (sibling) return sibling;
    }

    return null;
  }

  getClosestToLeftChild(): QuadirectionalTree {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child) return child;
    }

    return this.right ? this.right.getClosestToLeftChild() : null;
  }

  getClosestToRightChild(): QuadirectionalTree {
    for (let i = this.children.length - 1; i >= 0; i--) {
      const child = this.children[i];
      if (child) return child;
    }

    return this.left ? this.left.getClosestToRightChild() : null;
  }

  /**
    *   Fill all necessary nodes on these tree to replacated another data structure.
    *
    *   @param data another data structure.
    *   @param dataProp the name of the prop of the data structure that holds information.
    *   @param childrenProps the name or names of all props that link down with child nodes.
    */
  fillFrom(data: any, dataProp: string, childrenProps: Array<string>): void {
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
      child.fillFrom(genericChild, dataProp, childrenProps);
    }
  }

  getFirstChild(): QuadirectionalTree {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i]) return this.children[i];
    }
    return null;
  }

  getLastChild(): QuadirectionalTree {
    for (let i = this.children.length - 1; i >= 0; i--) {
      if (this.children[i]) return this.children[i];
    }
    return null;
  }

  getFirstOnLevel(): QuadirectionalTree[] {
    const firsts = [];

    for (const item of this) {
      if (!firsts[item.deepness]) firsts[item.deepness] = item;
    }

    return firsts;
  }

  getLastOnLevel(): QuadirectionalTree[] {
    const lasts = [];

    for (const item of this) {
      lasts[item.deepness] = item;
    }

    return lasts;
  }

  /**
    *   Find the minimum translation on right direction needed
    *   to make the current node respect space between itself and
    *   the next node on the left.
    *
    *   @param config information about size and spaces.
    */
  getMinTranslationOnLeft(config: QuadirectionalTreeTranslateConfigX): number {
    if (!this.left) return;

    const min = this.left.graphics.x + config.width +
      (this.parent === this.left.parent ? config.spaceBetweenSiblings : config.spaceBetweenCousins);

    return min - this.graphics.x;
  }

  /**
    *   Find the minimum translation on right direction needed
    *   to make the current node and all its descendants respect
    *   space between itself and the next node on the left with
    *   all its descendants.
    *
    *   @param config information about size and spaces.
    */
  getMinTranslationOnLeftTree(config: QuadirectionalTreeTranslateConfigX): number {
    // The minimum translation necessary will be the greater translation
    // of any node descendant of the current element.

    let greater = 0;

    for (const item of this.getFirstOnLevel()) {
      if (!item) continue;

      const translation = item.getMinTranslationOnLeft(config);

      if (translation > greater) greater = translation;
    }

    return greater;
  }

  getMinTranslationOnRight(config: QuadirectionalTreeTranslateConfigX): number {
    if (!this.right) return;

    const min = this.right.graphics.x - config.width -
      (this.parent === this.right.parent ? config.spaceBetweenSiblings : config.spaceBetweenCousins);

    return this.graphics.x - min;
  }

  getMinTranslationOnRightTree(config: QuadirectionalTreeTranslateConfigX): number {
    let greater = 0;

    for (const item of this.getLastOnLevel()) {
      if (!item) continue;

      const translation = item.getMinTranslationOnRight(config);

      if (translation > greater) greater = translation;
    }

    return greater;
  }

  /**
    *   If the current node has more space on left that the minimum
    *   distance between siblings or cousings, means that its
    *   descendants are forcing this node to be on a greater x
    *   position. The specific node that forces this excessive translation
    *   its called anchor point.
    *
    *   @param config information about size and spaces.
    */
  getAnchorPoint(config: QuadirectionalTreeTranslateConfigX): QuadirectionalTree {
    for (const item of this.getFirstOnLevel()) {
      if (!item) continue;
      if (item === this) continue;

      const min = item.getMinTranslationOnLeft(config);

      if (min === 0) return item;
    }

    return null;
  }

  /**
    *   If this node has an descendant that is an anchor point, find
    *   the ancestor of the node on left of anchor point that has the
    *   same deepness of the current node.
    *
    *   @param config information about size and spaces.
    */
  getLeftAnchor(config: QuadirectionalTreeTranslateConfigX): QuadirectionalTree {
    if (!this.left) return null;
    if (this.parent !== this.left.parent) return null;
    if (this.graphics.x - this.left.graphics.x <= config.width + config.spaceBetweenSiblings) return null;

    let anchorPoint = this.getAnchorPoint(config);

    if (!anchorPoint) return null;

    if (!anchorPoint.left) return null;

    return anchorPoint.left.getAncestor(this.deepness);
  }

  /**
    *   If this node has a left anchor, and if there is
    *   nodes between this node and the left anchor its possible
    *   that the nodes is between ar porly poorly distributed,
    *   with greater space on right on comparison to left.
    *   The nodes between left anchor and this are called
    *   uneven siblings
    *
    *   @param config information about size and spaces.
    *   @returns return the uneven siblings
    */
  getUnevenSiblings(config: QuadirectionalTreeTranslateConfigX): QuadirectionalTree[] {
    let leftAnchor = this.getLeftAnchor(config);

    if (!leftAnchor) return [];

    while (leftAnchor.parent !== this.parent) {
      if (leftAnchor.right) return [];

      leftAnchor = leftAnchor.right;
    }

    if (leftAnchor === this.left) return [];

    const unevenNodes = new Array<QuadirectionalTree>();

    for (let node = leftAnchor.right; node && node !== this; node = node.right) {
      unevenNodes.push(node);
    }

    return unevenNodes;
  }

  /**
    *   Translate this node and all its descendants.
    *
    *   @param x the horizontal increment.
    *   @param y the vertical increment.
    */
  translate(x: number, y: number): void {
    this.graphics.x += x;
    this.graphics.y += y;

    for (const child of this.children) {
      if (child) child.translate(x, y);
    }
  }

  /**
    *   Translate this node on horizontal direction to be
    *   positioned on the center of its children. If there
    *   is no children translate to zero (0).
    */
  translateToChildrenCenter(): void {
    const first = this.getFirstChild();
    const last = this.getLastChild();

    // get position of subtree root based on its children
    if (first) {
      this.graphics.x = first !== last
        ? (last.graphics.x + first.graphics.x) / 2
        : first.graphics.x;
    }
    else {
      this.graphics.x = 0;
    }
  }

  /**
    *   Translate this node and all his descendants to respect
    *   the minimum distance between siblings and cousins.
    *
    *   @param config information about size and spaces.
    */
  transtateToRespectSpaceLeft(config: QuadirectionalTreeTranslateConfigX): void {
    this.translateToChildrenCenter();

    let minTranslationX = this.getMinTranslationOnLeftTree(config);

    if (minTranslationX) this.translate(minTranslationX, 0);
  }

  /**
    *   If this node has a left anchor, and if there is
    *   nodes between this node and the left anchor its possible
    *   that the nodes is between ar porly poorly distributed,
    *   with greater space on right on comparison to left.
    *   This translation function mitigated this uneven spaces.
    *
    *   @param config information about size and spaces.
    */
  translateEvenlyBetweenSiblings(config: QuadirectionalTreeTranslateConfigX): void {
    const unevenSiblings = this.getUnevenSiblings(config);

    if (!unevenSiblings) return;
    if (!unevenSiblings.length) return;

    const left = unevenSiblings[0].left;
    const right = unevenSiblings[unevenSiblings.length - 1].right;

    const totalSpace = right.graphics.x - left.graphics.x - config.width;
    const widthSpace = unevenSiblings.length * config.width;
    let unevenSpace = totalSpace - widthSpace;

    for (let i = unevenSiblings.length - 1; i >= 0; i--) {
      const item = unevenSiblings[i];

      const space = Math.round(unevenSpace / (i + 2));
      unevenSpace -= space;

      // position to `item` have `space` between `item` and `item.right`
      let tx = item.right.graphics.x - space - config.width - item.graphics.x;
      
      item.translate(tx, 0);

      // after `item` is translated check if the minimal space was desrespected.
      tx = item.getMinTranslationOnRightTree(config);

      if (tx > 0) {
        unevenSpace -= tx;
        item.translate(-tx, 0);
      }
    }
  }

   /**
    *   Update the graphics property on this node and his
    *   descendants, respecting the sizes and spaces passed on config.
    *
    *   @param config information about size and spaces.
    */
  updateGraphics(config: QuadirectionalTreeTranslateConfig): void {
    const firsts = this.getFirstOnLevel();

    for (let rowIndex = firsts.length - 1; rowIndex >= 0; rowIndex--) {
      for (let col = firsts[rowIndex]; col; col = col.right) {
        col.transtateToRespectSpaceLeft(config);
        col.graphics.y = col.deepness * (config.height + config.spaceBetweenParentAndChild);
      }
    }

    if (config.ignoreUnevenSiblings) return;

    for (let rowIndex = firsts.length - 1; rowIndex >= 0; rowIndex--) {
      for (let col = firsts[rowIndex]; col; col = col.right) {
        col.translateEvenlyBetweenSiblings(config);
      }
    }
  }

  *[Symbol.iterator](): Iterator<any> {
    yield this;

    for (const child of this.children) {
      if (child) yield* child;
    }
  }

  /**
    *   Get the ancestor on the specified deepness.
    *   If deepness is undefined or a invalid value,
    *   get the root element of the tree.
    *
    *   @param deepness the expected deepness of the desired ancestor
    *   @returns the ancestor.
    */
  getAncestor(deepness?: number): QuadirectionalTree {
    return this.parent && this.deepness !== deepness ? this.parent.getAncestor(deepness) : this;
  }

  print(tab: string, highlight: QuadirectionalTree): Array<string> {
    const o = this === highlight ? '<' : '[';
    const c = this === highlight ? '>' : ']';
    let lines = [`${tab}${o}${this.data}${c} - x: ${this.graphics.x}, y: ${this.graphics.y}`];

    for (const child of this.children) {
      if (child) lines.push(...child.print(tab + '   ', highlight));
    }

    return lines;
  }
}
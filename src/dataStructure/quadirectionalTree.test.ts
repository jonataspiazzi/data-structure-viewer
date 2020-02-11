import QuadirectionalTree, { QuadirectionalTreeGraphics } from './quadirectionalTree';
import { createQuadirectionalTreeData, createBinarySearchTreeData, createLinkedList, createGraphicTreeData } from './testSamples';
import chalk from 'chalk';
import BinarySearchTree from './binarySearchTree';
import LinkedList from './linkedList';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeNode: (expected: number) => R;
      toBeIterator: (...expected: Array<number>) => R;
      toBeBound: (expected: BinarySearchTree | LinkedList) => R;
      toHaveLocation: (x: number, y: number) => R;
    }
  }
}

describe('QuadirectionalTree tests', () => {
  let nodes: Array<QuadirectionalTree> = [];
  let binTree: BinarySearchTree = null;
  let list: LinkedList = null;
  let quadBinTree: QuadirectionalTree = null;
  let quadListTree: QuadirectionalTree = null;
  let quadGraphics: Array<QuadirectionalTree> = null;

  beforeAll(() => {
    nodes = createQuadirectionalTreeData();
    binTree = createBinarySearchTreeData();
    quadBinTree = new QuadirectionalTree(undefined, 2);
    list = createLinkedList();
    quadListTree = new QuadirectionalTree(undefined, 1);
    quadGraphics = createGraphicTreeData();

    const printReceivedNode = (received: any) => {
      return chalk.red(received instanceof QuadirectionalTree
        ? `nodes[${received.data}]`
        : JSON.stringify(received, null, 2));
    }

    const printExpectedNode = (expected: any) => {
      return chalk.green(expected instanceof QuadirectionalTree
        ? `nodes[${expected.data}]`
        : JSON.stringify(expected, null, 2));
    }

    expect.extend({
      toBeNode(received, expected) {
        const isExpectedAIndex = expected === 0 ||
          expected > 0 && Number(expected) === expected;

        if (isExpectedAIndex) expected = nodes[expected] || quadGraphics[expected];

        const pass = Object.is(received, expected) || (
          (expected == null || expected == undefined) &&
          (received == null || received == undefined));

        const message = pass
          ? () => ''
          : () =>
            this.utils.matcherHint('toBeNode', undefined, undefined, {}) +
            '\n\n' +
            `Expected: ${printExpectedNode(expected)}\n` +
            `Received: ${printReceivedNode(received)}`;

        return { actual: received, message, pass };
      },
      toBeIterator(receiveds, ...indexes) {
        let pass = false;
        let index = -1;
        let lastExpected: any = null;
        let lastReceived: any = null;

        for (lastReceived of receiveds) {
          pass = true;
          lastExpected = nodes[indexes[++index]];

          if (!(lastReceived instanceof QuadirectionalTree)) {
            pass = false;
            break;
          }

          if (!(lastExpected instanceof QuadirectionalTree)) {
            pass = false;
            break;
          }

          if (!Object.is(lastReceived.data, lastExpected.data)) {
            pass = false;
            break;
          }
        }

        if (index < indexes.length - 1) {
          pass = false;
          lastExpected = nodes[indexes[++index]];
          lastReceived = undefined;
        }

        const message = pass
          ? () => ''
          : () =>
            this.utils.matcherHint('toBeIterator', undefined, undefined, {}) +
            '\n\n' +
            `Index: ${chalk.magenta(index.toString())}\n` +
            `Expected: ${printExpectedNode(lastExpected)}\n` +
            `Received: ${printReceivedNode(lastReceived)}`;

        return { actual: receiveds, message, pass };
      },
      toBeBound(quad, other) {
        const isBound: boolean = quad.bind == other;
        const isData: boolean = quad.data == other.info;
        const pass: boolean = isBound && isData;

        const message = pass
          ? () => ''
          : () =>
            this.utils.matcherHint('toBeBound', undefined, undefined, {}) +
            '\n\n' +
            `Was Bound: ${chalk.blue(isBound.toString())}\n` +
            `Was Data Equals: ${chalk.blue(isData.toString())}\n` +
            `Expected: ${chalk.green(other.info)}\n` +
            `Received: ${chalk.red(quad.data)}`;

        return { actual: quad, pass, message };
      },
      toHaveLocation(quad, x, y) {
        const roundX = Math.round(quad.graphics.x);
        const roundY = Math.round(quad.graphics.y);
        const isXEqual = roundX == x;
        const isYEqual = roundY == y;
        const pass = isXEqual && isYEqual;

        const message = pass
          ? () => ''
          : () =>
            this.utils.matcherHint('toHaveLocation', undefined, undefined, {}) +
            '\n\n' +
            `Expected: { x: ${chalk.green(x)}, y: ${chalk.green(y)} }\n` +
            `Received: { x: ${chalk.red(roundX.toString())}, y: ${chalk.red(roundY.toString())} }`;

        return { actual: quad, pass, message };
      }
    });
  });

  test('Should construct deepness correctly', () => {
    expect(nodes[0].deepness).toBe(0);
    expect(nodes[1].deepness).toBe(1);
    expect(nodes[2].deepness).toBe(1);
    expect(nodes[3].deepness).toBe(1);
    expect(nodes[4].deepness).toBe(2);
    expect(nodes[5].deepness).toBe(2);
    expect(nodes[6].deepness).toBe(2);
    expect(nodes[7].deepness).toBe(2);
    expect(nodes[8].deepness).toBe(3);
    expect(nodes[9].deepness).toBe(3);
    expect(nodes[10].deepness).toBe(0);
    expect(nodes[11].deepness).toBe(1);
    expect(nodes[12].deepness).toBe(1);
    expect(nodes[13].deepness).toBe(2);
    expect(nodes[14].deepness).toBe(2);
  });

  test('Should construct left correctly', () => {
    expect(nodes[0].left).toBeNode(null);
    expect(nodes[1].left).toBeNode(null);
    expect(nodes[2].left).toBeNode(1);
    expect(nodes[3].left).toBeNode(2);
    expect(nodes[4].left).toBeNode(null);
    expect(nodes[5].left).toBeNode(4);
    expect(nodes[6].left).toBeNode(5);
    expect(nodes[7].left).toBeNode(6);
    expect(nodes[8].left).toBeNode(null);
    expect(nodes[9].left).toBeNode(8);
    expect(nodes[10].left).toBeNode(null);
    expect(nodes[11].left).toBeNode(null);
    expect(nodes[12].left).toBeNode(11);
    expect(nodes[13].left).toBeNode(null);
    expect(nodes[14].left).toBeNode(13);
  });

  test('Should construct right correctly', () => {
    expect(nodes[0].right).toBeNode(null);
    expect(nodes[1].right).toBeNode(2);
    expect(nodes[2].right).toBeNode(3);
    expect(nodes[3].right).toBeNode(null);
    expect(nodes[4].right).toBeNode(5);
    expect(nodes[5].right).toBeNode(6);
    expect(nodes[6].right).toBeNode(7);
    expect(nodes[7].right).toBeNode(null);
    expect(nodes[8].right).toBeNode(9);
    expect(nodes[9].right).toBeNode(null);
    expect(nodes[10].right).toBeNode(null);
    expect(nodes[11].right).toBeNode(12);
    expect(nodes[12].right).toBeNode(null);
    expect(nodes[13].right).toBeNode(14);
    expect(nodes[14].right).toBeNode(null);
  });

  test('Should construct children correctly', () => {
    expect(nodes[0].children[0]).toBeNode(1);
    expect(nodes[0].children[1]).toBeNode(2);
    expect(nodes[0].children[2]).toBeNode(3);
    expect(nodes[1].children[0]).toBeNode(4);
    expect(nodes[1].children[1]).toBeNode(5);
    expect(nodes[3].children[0]).toBeNode(6);
    expect(nodes[3].children[1]).toBeNode(7);
    expect(nodes[4].children[0]).toBeNode(8);
    expect(nodes[7].children[0]).toBeNode(9);
    expect(nodes[10].children[0]).toBeNode(11);
    expect(nodes[10].children[1]).toBeNode(12);
    expect(nodes[11].children[0]).toBeNode(13);
    expect(nodes[11].children[1]).toBeNode(null);
    expect(nodes[12].children[0]).toBeNode(null);
    expect(nodes[12].children[1]).toBeNode(14);
    expect(nodes[13].children[0]).toBeNode(null);
    expect(nodes[13].children[1]).toBeNode(null);
    expect(nodes[14].children[0]).toBeNode(null);
    expect(nodes[14].children[1]).toBeNode(null);
  });

  test('Should have the correct level lenght', () => {
    expect(nodes[0].levelLenght(0)).toBe(1);
    expect(nodes[1].levelLenght(0)).toBe(3);
    expect(nodes[2].levelLenght(0)).toBe(3);
    expect(nodes[3].levelLenght(0)).toBe(3);
    expect(nodes[4].levelLenght(0)).toBe(4);
    expect(nodes[5].levelLenght(0)).toBe(4);
    expect(nodes[6].levelLenght(0)).toBe(4);
    expect(nodes[7].levelLenght(0)).toBe(4);
    expect(nodes[8].levelLenght(0)).toBe(2);
    expect(nodes[9].levelLenght(0)).toBe(2);
    expect(nodes[10].levelLenght(0)).toBe(1);
    expect(nodes[11].levelLenght(0)).toBe(2);
    expect(nodes[12].levelLenght(0)).toBe(2);
    expect(nodes[13].levelLenght(0)).toBe(2);
    expect(nodes[14].levelLenght(0)).toBe(2);
  });

  test('Should get the correct first sibling on left', () => {
    expect(nodes[0].getFirstSiblingOnLeft()).toBeNode(null);
    expect(nodes[1].getFirstSiblingOnLeft()).toBeNode(null);
    expect(nodes[2].getFirstSiblingOnLeft()).toBeNode(1);
    expect(nodes[3].getFirstSiblingOnLeft()).toBeNode(2);
    expect(nodes[4].getFirstSiblingOnLeft()).toBeNode(null);
    expect(nodes[5].getFirstSiblingOnLeft()).toBeNode(4);
    expect(nodes[6].getFirstSiblingOnLeft()).toBeNode(null);
    expect(nodes[7].getFirstSiblingOnLeft()).toBeNode(6);
    expect(nodes[8].getFirstSiblingOnLeft()).toBeNode(null);
    expect(nodes[9].getFirstSiblingOnLeft()).toBeNode(null);
    expect(nodes[10].getFirstSiblingOnLeft()).toBeNode(null);
    expect(nodes[11].getFirstSiblingOnLeft()).toBeNode(null);
    expect(nodes[12].getFirstSiblingOnLeft()).toBeNode(11);
    expect(nodes[13].getFirstSiblingOnLeft()).toBeNode(null);
    expect(nodes[14].getFirstSiblingOnLeft()).toBeNode(null);
  });

  test('Should get the correct first sibling on right', () => {
    expect(nodes[0].getFirstSiblingOnRight()).toBeNode(null);
    expect(nodes[1].getFirstSiblingOnRight()).toBeNode(2);
    expect(nodes[2].getFirstSiblingOnRight()).toBeNode(3);
    expect(nodes[3].getFirstSiblingOnRight()).toBeNode(null);
    expect(nodes[4].getFirstSiblingOnRight()).toBeNode(5);
    expect(nodes[5].getFirstSiblingOnRight()).toBeNode(null);
    expect(nodes[6].getFirstSiblingOnRight()).toBeNode(7);
    expect(nodes[7].getFirstSiblingOnRight()).toBeNode(null);
    expect(nodes[8].getFirstSiblingOnRight()).toBeNode(null);
    expect(nodes[9].getFirstSiblingOnRight()).toBeNode(null);
    expect(nodes[10].getFirstSiblingOnRight()).toBeNode(null);
    expect(nodes[11].getFirstSiblingOnRight()).toBeNode(12);
    expect(nodes[12].getFirstSiblingOnRight()).toBeNode(null);
    expect(nodes[13].getFirstSiblingOnRight()).toBeNode(null);
    expect(nodes[14].getFirstSiblingOnRight()).toBeNode(null);
  });

  test('Should get correctly the closest to left child', () => {
    expect(nodes[0].getClosestToLeftChild()).toBeNode(1);
    expect(nodes[1].getClosestToLeftChild()).toBeNode(4);
    expect(nodes[2].getClosestToLeftChild()).toBeNode(6);
    expect(nodes[3].getClosestToLeftChild()).toBeNode(6);
    expect(nodes[4].getClosestToLeftChild()).toBeNode(8);
    expect(nodes[5].getClosestToLeftChild()).toBeNode(9);
    expect(nodes[6].getClosestToLeftChild()).toBeNode(9);
    expect(nodes[7].getClosestToLeftChild()).toBeNode(9);
    expect(nodes[8].getClosestToLeftChild()).toBeNode(null);
    expect(nodes[9].getClosestToLeftChild()).toBeNode(null);
    expect(nodes[10].getClosestToLeftChild()).toBeNode(11);
    expect(nodes[11].getClosestToLeftChild()).toBeNode(13);
    expect(nodes[12].getClosestToLeftChild()).toBeNode(14);
    expect(nodes[13].getClosestToLeftChild()).toBeNode(null);
    expect(nodes[14].getClosestToLeftChild()).toBeNode(null);
  });

  test('Should get correctly the closest to right child', () => {
    expect(nodes[0].getClosestToRightChild()).toBeNode(3);
    expect(nodes[1].getClosestToRightChild()).toBeNode(5);
    expect(nodes[2].getClosestToRightChild()).toBeNode(5);
    expect(nodes[3].getClosestToRightChild()).toBeNode(7);
    expect(nodes[4].getClosestToRightChild()).toBeNode(8);
    expect(nodes[5].getClosestToRightChild()).toBeNode(8);
    expect(nodes[6].getClosestToRightChild()).toBeNode(8);
    expect(nodes[7].getClosestToRightChild()).toBeNode(9);
    expect(nodes[8].getClosestToRightChild()).toBeNode(null);
    expect(nodes[9].getClosestToRightChild()).toBeNode(null);
    expect(nodes[10].getClosestToRightChild()).toBeNode(12);
    expect(nodes[11].getClosestToRightChild()).toBeNode(13);
    expect(nodes[12].getClosestToRightChild()).toBeNode(14);
    expect(nodes[13].getClosestToRightChild()).toBeNode(null);
    expect(nodes[14].getClosestToRightChild()).toBeNode(null);
  });

  test('Should get correctly iteration', () => {
    expect(nodes[0]).toBeIterator(0, 1, 4, 8, 5, 2, 3, 6, 7, 9);
    expect(nodes[1]).toBeIterator(1, 4, 8, 5);
    expect(nodes[2]).toBeIterator(2);
    expect(nodes[3]).toBeIterator(3, 6, 7, 9);
    expect(nodes[4]).toBeIterator(4, 8);
    expect(nodes[5]).toBeIterator(5);
    expect(nodes[6]).toBeIterator(6);
    expect(nodes[7]).toBeIterator(7, 9);
    expect(nodes[8]).toBeIterator(8);
    expect(nodes[9]).toBeIterator(9);
    expect(nodes[10]).toBeIterator(10, 11, 13, 12, 14);
    expect(nodes[11]).toBeIterator(11, 13);
    expect(nodes[12]).toBeIterator(12, 14);
    expect(nodes[13]).toBeIterator(13);
    expect(nodes[14]).toBeIterator(14);
  });

  test('Should fill correctly from a binary tree', () => {
    quadBinTree.fillFrom(binTree, 'info', ['left', 'right']);

    expect(quadBinTree).toBeBound(binTree);
    expect(quadBinTree.children[0]).toBeBound(binTree.left);
    expect(quadBinTree.children[1]).toBeBound(binTree.right);
    expect(quadBinTree.children[0].children[0]).toBeBound(binTree.left.left);
    expect(quadBinTree.children[0].children[1]).toBeBound(binTree.left.right);
    expect(quadBinTree.children[0].children[1].children[0]).toBeBound(binTree.left.right.left);
    expect(quadBinTree.children[0].children[1].children[1]).toBeBound(binTree.left.right.right);
    expect(quadBinTree.children[1].children[1]).toBeBound(binTree.right.right);
    expect(quadBinTree.children[1].children[1].children[0]).toBeBound(binTree.right.right.left);
  });

  test('Should fill correctly from a list', () => {
    quadListTree.fillFrom(list, 'info', ['next']);

    expect(quadListTree).toBeBound(list);
    expect(quadListTree.children[0]).toBeBound(list.next);
    expect(quadListTree.children[0].children[0]).toBeBound(list.next.next);
    expect(quadListTree.children[0].children[0].children[0]).toBeBound(list.next.next.next);
    expect(quadListTree.children[0].children[0].children[0].children[0]).toBeBound(list.next.next.next.next);
  });

  test('Should find the first child', () => {
    expect(nodes[0].getFirstChild()).toBeNode(1);
    expect(nodes[1].getFirstChild()).toBeNode(4);
    expect(nodes[2].getFirstChild()).toBeNode(null);
    expect(nodes[3].getFirstChild()).toBeNode(6);
    expect(nodes[4].getFirstChild()).toBeNode(8);
    expect(nodes[5].getFirstChild()).toBeNode(null);
    expect(nodes[6].getFirstChild()).toBeNode(null);
    expect(nodes[7].getFirstChild()).toBeNode(9);
    expect(nodes[8].getFirstChild()).toBeNode(null);
    expect(nodes[9].getFirstChild()).toBeNode(null);
    expect(nodes[10].getFirstChild()).toBeNode(11);
    expect(nodes[11].getFirstChild()).toBeNode(13);
    expect(nodes[12].getFirstChild()).toBeNode(14);
    expect(nodes[13].getFirstChild()).toBeNode(null);
    expect(nodes[14].getFirstChild()).toBeNode(null);
  });

  test('Should find the last child', () => {
    expect(nodes[0].getLastChild()).toBeNode(3);
    expect(nodes[1].getLastChild()).toBeNode(5);
    expect(nodes[2].getLastChild()).toBeNode(null);
    expect(nodes[3].getLastChild()).toBeNode(7);
    expect(nodes[4].getLastChild()).toBeNode(8);
    expect(nodes[5].getLastChild()).toBeNode(null);
    expect(nodes[6].getLastChild()).toBeNode(null);
    expect(nodes[7].getLastChild()).toBeNode(9);
    expect(nodes[8].getLastChild()).toBeNode(null);
    expect(nodes[9].getLastChild()).toBeNode(null);
    expect(nodes[10].getLastChild()).toBeNode(12);
    expect(nodes[11].getLastChild()).toBeNode(13);
    expect(nodes[12].getLastChild()).toBeNode(14);
    expect(nodes[13].getLastChild()).toBeNode(null);
    expect(nodes[14].getLastChild()).toBeNode(null);
  });

  test('Should get first on level', () => {
    const f1 = nodes[0].getFirstOnLevel();
    const f2 = nodes[10].getFirstOnLevel();
    const f3 = nodes[3].getFirstOnLevel();

    expect(f1.length).toBe(4);
    expect(f2.length).toBe(3);
    expect(f3.length).toBe(4);

    expect(f1[0]).toBeNode(0);
    expect(f1[1]).toBeNode(1);
    expect(f1[2]).toBeNode(4);
    expect(f1[3]).toBeNode(8);

    expect(f2[0]).toBeNode(10);
    expect(f2[1]).toBeNode(11);
    expect(f2[2]).toBeNode(13);

    expect(f3[0]).toBeNode(null);
    expect(f3[1]).toBeNode(3);
    expect(f3[2]).toBeNode(6);
    expect(f3[3]).toBeNode(9);
  });

  test('Should get anchor point', () => {
    quadGraphics[101].updateGraphics(120, 120, 40, 80, 80);

    expect(quadGraphics[101].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[201].getAnchorPoint(120, 40, 80)).toBeNode(null);
    //expect(quadGraphics[202].getAnchorPoint(120, 40, 80)).toBeNode(null);
    //expect(quadGraphics[203].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[204].getAnchorPoint(120, 40, 80)).toBeNode(408);
    expect(quadGraphics[205].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[206].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[301].getAnchorPoint(120, 40, 80)).toBeNode(null);
    //expect(quadGraphics[302].getAnchorPoint(120, 40, 80)).toBeNode(null);
    //expect(quadGraphics[303].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[304].getAnchorPoint(120, 40, 80)).toBeNode(408);
    expect(quadGraphics[305].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[306].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[401].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[402].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[403].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[404].getAnchorPoint(120, 40, 80)).toBeNode(502);
    expect(quadGraphics[405].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[406].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[407].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[408].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[409].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[501].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[502].getAnchorPoint(120, 40, 80)).toBeNode(null);
    expect(quadGraphics[503].getAnchorPoint(120, 40, 80)).toBeNode(null);
  });

  test('Should update graphics correctly.', () => {
    quadGraphics[101].updateGraphics(120, 120, 40, 80, 80);

    expect(quadGraphics[101]).toHaveLocation(1070, 0);
    expect(quadGraphics[201]).toHaveLocation(540, 200);
    //expect(quadGraphics[202]).toHaveLocation(870, 200);
    //expect(quadGraphics[203]).toHaveLocation(1000, 200);
    expect(quadGraphics[204]).toHaveLocation(1280, 200);
    expect(quadGraphics[205]).toHaveLocation(1440, 200);
    expect(quadGraphics[206]).toHaveLocation(1600, 200);
    expect(quadGraphics[301]).toHaveLocation(540, 400);
    //expect(quadGraphics[302]).toHaveLocation(920, 400);
    //expect(quadGraphics[303]).toHaveLocation(1080, 400);
    expect(quadGraphics[304]).toHaveLocation(1280, 400);
    expect(quadGraphics[305]).toHaveLocation(1520, 400);
    expect(quadGraphics[306]).toHaveLocation(1680, 400);
    expect(quadGraphics[401]).toHaveLocation(0, 600);
    expect(quadGraphics[402]).toHaveLocation(160, 600);
    expect(quadGraphics[403]).toHaveLocation(320, 600);
    expect(quadGraphics[404]).toHaveLocation(600, 600);
    expect(quadGraphics[405]).toHaveLocation(760, 600);
    expect(quadGraphics[406]).toHaveLocation(920, 600);
    expect(quadGraphics[407]).toHaveLocation(1080, 600);
    expect(quadGraphics[408]).toHaveLocation(1280, 600);
    expect(quadGraphics[409]).toHaveLocation(1680, 600);
    expect(quadGraphics[501]).toHaveLocation(320, 800);
    expect(quadGraphics[502]).toHaveLocation(520, 800);
    expect(quadGraphics[503]).toHaveLocation(680, 800);
  });
});
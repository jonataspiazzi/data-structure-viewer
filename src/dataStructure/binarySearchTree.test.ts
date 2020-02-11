import { createBinarySearchTreeData } from './testSamples';
import BinarySearchTree from './binarySearchTree';

describe('BinarySearchTree tests', () => {
  let node: BinarySearchTree = null;

  beforeAll(() => {
    node = createBinarySearchTreeData();
  });

  test('Should traverse correctly', () => {
    const iterator = node[Symbol.iterator]();

    expect(iterator.next().value).toBe(1);
    expect(iterator.next().value).toBe(2);
    expect(iterator.next().value).toBe(3);
    expect(iterator.next().value).toBe(4);
    expect(iterator.next().value).toBe(5);
    expect(iterator.next().value).toBe(6);
    expect(iterator.next().value).toBe(7);
    expect(iterator.next().value).toBe(8);
    expect(iterator.next().value).toBe(9);
    expect(iterator.next().value).toBe(undefined);
  });

  test('Should build data structure as expected', () => {
    expect(node.left.left.info).toBe(1);
    expect(node.left.info).toBe(2);
    expect(node.left.right.left.info).toBe(3);
    expect(node.left.right.info).toBe(4);
    expect(node.left.right.right.info).toBe(5);
    expect(node.info).toBe(6);
    expect(node.right.info).toBe(7);
    expect(node.right.right.left.info).toBe(8);
    expect(node.right.right.info).toBe(9);
  });
});
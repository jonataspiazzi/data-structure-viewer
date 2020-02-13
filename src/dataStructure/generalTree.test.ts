import { createGeneralTree } from "./testSamples";
import GeneralTree from './generalTree';

describe('GeneralTree tests', () => {
  let tree: GeneralTree = null;

  beforeAll(() => {
    tree = createGeneralTree();
  });

  test('Should traverse correctly', () => {
    const iterator = tree[Symbol.iterator]();

    expect(iterator.next().value).toBe(101);
    expect(iterator.next().value).toBe(201);
    expect(iterator.next().value).toBe(301);
    expect(iterator.next().value).toBe(401);
    expect(iterator.next().value).toBe(402);
    expect(iterator.next().value).toBe(403);
    expect(iterator.next().value).toBe(501);
    expect(iterator.next().value).toBe(404);
    expect(iterator.next().value).toBe(502);
    expect(iterator.next().value).toBe(503);
    expect(iterator.next().value).toBe(405);
    expect(iterator.next().value).toBe(406);
    expect(iterator.next().value).toBe(407);
    expect(iterator.next().value).toBe(202);
    expect(iterator.next().value).toBe(203);
    expect(iterator.next().value).toBe(302);
    expect(iterator.next().value).toBe(303);
    expect(iterator.next().value).toBe(204);
    expect(iterator.next().value).toBe(304);
    expect(iterator.next().value).toBe(408);
    expect(iterator.next().value).toBe(205);
    expect(iterator.next().value).toBe(206);
    expect(iterator.next().value).toBe(305);
    expect(iterator.next().value).toBe(306);
    expect(iterator.next().value).toBe(409);
    expect(iterator.next().value).toBe(undefined);
  });

  test('Should build data structure as expected', () => {
    expect(tree.info).toBe(101);

    expect(tree.children[0].info).toBe(201);
    expect(tree.children[1].info).toBe(202);
    expect(tree.children[2].info).toBe(203);
    expect(tree.children[3].info).toBe(204);
    expect(tree.children[4].info).toBe(205);
    expect(tree.children[5].info).toBe(206);

    expect(tree.children[0].children[0].info).toBe(301);
    expect(tree.children[2].children[0].info).toBe(302);
    expect(tree.children[2].children[1].info).toBe(303);
    expect(tree.children[3].children[0].info).toBe(304);
    expect(tree.children[5].children[0].info).toBe(305);
    expect(tree.children[5].children[1].info).toBe(306);

    expect(tree.children[0].children[0].children[0].info).toBe(401);
    expect(tree.children[0].children[0].children[1].info).toBe(402);
    expect(tree.children[0].children[0].children[2].info).toBe(403);
    expect(tree.children[0].children[0].children[3].info).toBe(404);
    expect(tree.children[0].children[0].children[4].info).toBe(405);
    expect(tree.children[0].children[0].children[5].info).toBe(406);
    expect(tree.children[0].children[0].children[6].info).toBe(407);
    expect(tree.children[3].children[0].children[0].info).toBe(408);
    expect(tree.children[5].children[1].children[0].info).toBe(409);

    expect(tree.children[0].children[0].children[2].children[0].info).toBe(501);
    expect(tree.children[0].children[0].children[3].children[0].info).toBe(502);
    expect(tree.children[0].children[0].children[3].children[1].info).toBe(503);
  });
});
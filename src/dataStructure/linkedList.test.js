import { createLinkedList } from './testSamples';

describe('LinkedList tests', () => {
  let list = null;

  beforeAll(() => {
    list = createLinkedList();
  });

  test('Should traverse correctly', () => {
    const iterator = list[Symbol.iterator]();

    expect(iterator.next().value).toBe(1);
    expect(iterator.next().value).toBe(2);
    expect(iterator.next().value).toBe(3);
    expect(iterator.next().value).toBe(4);
    expect(iterator.next().value).toBe(5);

    expect(iterator.next().value).toBe(undefined);
  });

  test('Should build data structure as expected', () => {
    expect(list.info).toBe(1);
    expect(list.next.info).toBe(2);
    expect(list.next.next.info).toBe(3);
    expect(list.next.next.next.info).toBe(4);
    expect(list.next.next.next.next.info).toBe(5);
  });
});
import QuadirectionalTree from './quadirectionalTree';

describe('QuadirectionalTree tests', () => {
  const nodes = [];

  beforeAll(() => {
    /*
     * Create this data structure:
     *                           ┌─────┐                                 
     *                           │  3  │                       
     *                           └──┬──┘                       
     *               ┌──────────────┼──────────────┐           
     *            ┌──┴──┐        ┌──┴──┐        ┌──┴──┐        
     *            │  1  ├────────┤  4  ├────────┤  6  │        
     *            └──┬──┘        └─────┘        └──┬──┘        
     *        ┌──────┴──────┐               ┌──────┴──────┐    
     *     ┌──┴──┐       ┌──┴──┐         ┌──┴──┐       ┌──┴──┐ 
     *     │  0  ├───────┤  2  ├─────────┤  5  ├───────┤  7  │ 
     *     └─────┘       └─────┘         └─────┘       └─────┘ 
     */
    nodes[3] = new QuadirectionalTree(4);
    nodes[1] = nodes[3].addChild(1, 'push');
    nodes[4] = nodes[3].addChild(4, 'push');
    nodes[6] = nodes[3].addChild(6, 'push');
    nodes[0] = nodes[1].addChild(0, 'push');
    nodes[2] = nodes[1].addChild(2, 'push');
    nodes[5] = nodes[6].addChild(5, 'push');
    nodes[7] = nodes[6].addChild(7, 'push');
  });

  test('Should construct deepness correctly', () => {
    expect(nodes[3].deepness).toBe(0);
    expect(nodes[1].deepness).toBe(1);
    expect(nodes[4].deepness).toBe(1);
    expect(nodes[6].deepness).toBe(1);
    expect(nodes[0].deepness).toBe(2);
    expect(nodes[2].deepness).toBe(2);
    expect(nodes[5].deepness).toBe(2);
    expect(nodes[7].deepness).toBe(2);
  });

  test('Should construct left correctly', () => {
    expect(nodes[3].left).toBe(null);
    expect(nodes[1].left).toBe(null);
    expect(nodes[4].left.data).toBe(1);
    expect(nodes[6].left.data).toBe(4);
    expect(nodes[0].left).toBe(null);
    expect(nodes[2].left.data).toBe(0);
    expect(nodes[5].left.data).toBe(2);
    expect(nodes[7].left.data).toBe(5);
  });

  test('Should construct right correctly', () => {
    expect(nodes[3].right).toBe(null);
    expect(nodes[1].right.data).toBe(4);
    expect(nodes[4].right.data).toBe(6);
    expect(nodes[6].right).toBe(null);
    expect(nodes[0].right.data).toBe(2);
    expect(nodes[2].right.data).toBe(5);
    expect(nodes[5].right.data).toBe(7);
    expect(nodes[7].right).toBe(null);
  });

  test('Should construct children correctly', () => {
    expect(nodes[3].children[0].data).toBe(1);
    expect(nodes[3].children[1].data).toBe(4);
    expect(nodes[3].children[2].data).toBe(6);
    expect(nodes[1].children[0].data).toBe(0);
    expect(nodes[1].children[1].data).toBe(2);
    expect(nodes[6].children[0].data).toBe(5);
    expect(nodes[6].children[1].data).toBe(7);
  });

  test('Should have the correct level lenght', () => {
    expect(nodes[3].levelLenght(0)).toBe(1);
    expect(nodes[1].levelLenght(0)).toBe(3);
    expect(nodes[4].levelLenght(0)).toBe(3);
    expect(nodes[6].levelLenght(0)).toBe(3);
    expect(nodes[0].levelLenght(0)).toBe(4);
    expect(nodes[2].levelLenght(0)).toBe(4);
    expect(nodes[5].levelLenght(0)).toBe(4);
    expect(nodes[7].levelLenght(0)).toBe(4);
  });

  test('Should get the correct closest left nephew', () => {
    expect(nodes[3].getClosestLeftNephew()).toBe(null);
    expect(nodes[1].getClosestLeftNephew()).toBe(null);
    expect(nodes[4].getClosestLeftNephew().data).toBe(2);
    expect(nodes[6].getClosestLeftNephew().data).toBe(2);
    expect(nodes[0].getClosestLeftNephew()).toBe(null);
    expect(nodes[2].getClosestLeftNephew()).toBe(null);
    expect(nodes[5].getClosestLeftNephew()).toBe(null);
    expect(nodes[7].getClosestLeftNephew()).toBe(null);
  });

  test('Should get the correct closest right nephew', () => {
    expect(nodes[3].getClosestRightNephew()).toBe(null);
    expect(nodes[1].getClosestRightNephew().data).toBe(5);
    expect(nodes[4].getClosestRightNephew().data).toBe(5);
    expect(nodes[6].getClosestRightNephew()).toBe(null);
    expect(nodes[0].getClosestRightNephew()).toBe(null);
    expect(nodes[2].getClosestRightNephew()).toBe(null);
    expect(nodes[5].getClosestRightNephew()).toBe(null);
    expect(nodes[7].getClosestRightNephew()).toBe(null);
  });
});
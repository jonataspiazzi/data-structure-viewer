import QuadirectionalTree from './quadirectionalTree';
import BinarySearchTree from './binarySearchTree';
import LinkedList from './linkedList';

export function createQuadirectionalTreeData() {
  /*
   * Create this data structures: 
   *
   * structure with hasChildFixedAmout == true:
   *                         ┌─────┐                                 
   *                         │  0  │                       
   *                         └──┬──┘                       
   *             ┌──────────────┼──────────────┐           
   *          ┌──┴──┐        ┌──┴──┐        ┌──┴──┐        
   *          │  1  ├────────┤  2  ├────────┤  3  │        
   *          └──┬──┘        └─────┘        └──┬──┘        
   *      ┌──────┴──────┐               ┌──────┴──────┐    
   *   ┌──┴──┐       ┌──┴──┐         ┌──┴──┐       ┌──┴──┐ 
   *   │  4  ├───────┤  5  ├─────────┤  6  ├───────┤  7  │ 
   *   └──┬──┘       └─────┘         └─────┘       └──┬──┘                                                        
   *   ┌──┴──┐                                     ┌──┴──┐      
   *   │  8  ├─────────────────────────────────────┤  9  │      
   *   └─────┘                                     └─────┘      
   * 
   * structure with hasChildFixedAmout == true && children.length == 2:
   *               ┌────┐                                 
   *               │ 10 │                       
   *               └┬──┬┘                       
   *            ┌───┘  └───┐           
   *         ┌──┴─┐      ┌─┴──┐        
   *         │ 11 ├──────┤ 12 │        
   *         └┬──┬┘      └┬──┬┘        
   *        ┌─┘  └─┐    ┌─┘  └─┐    
   *     ┌──┴─┐  null  null  ┌─┴──┐ 
   *     │ 13 ├──────────────┤ 14 │ 
   *     └┬──┬┘              └┬──┬┘            
   *    ┌─┘  └─┐            ┌─┘  └─┐     
   *  null    null        null    null    
   * 
   */

  const nodes = [];

  nodes[0] = new QuadirectionalTree(0, 0);
  nodes[1] = nodes[0].pushChild(1);
  nodes[2] = nodes[0].pushChild(2);
  nodes[3] = nodes[0].pushChild(3);
  nodes[4] = nodes[1].pushChild(4);
  nodes[5] = nodes[1].pushChild(5);
  nodes[6] = nodes[3].pushChild(6);
  nodes[7] = nodes[3].pushChild(7);
  nodes[8] = nodes[4].pushChild(8);
  nodes[9] = nodes[7].pushChild(9);
  nodes[10] = new QuadirectionalTree(10, 2);
  nodes[11] = nodes[10].insertChild(11, 0);
  nodes[12] = nodes[10].insertChild(12, 1);
  nodes[13] = nodes[11].insertChild(13, 0);
  nodes[14] = nodes[12].insertChild(14, 1);

  return nodes;
}

export function createBinarySearchTreeData() {
  /*
   * Create this data structure:                                                           
   *                                                                        
   *                   ┌──┴──┐                                             
   *                   │  6  │                                             
   *                   └┬───┬┘                                             
   *           ┌────────┘   └───────┐                                            
   *        ┌──┴──┐              ┌──┴──┐                                         
   *        │  2  │              │  7  │                                         
   *        └┬───┬┘              └┬───┬┘                                         
   *     ┌───┘   └───┐                └─┐                                        
   *  ┌──┴──┐     ┌──┴──┐            ┌──┴──┐ 
   *  │  1  │     │  4  │            │  9  │ 
   *  └┬───┬┘     └┬───┬┘            └┬───┬┘ 
   *             ┌─┘   └─┐          ┌─┘   
   *          ┌──┴──┐ ┌──┴──┐    ┌──┴──┐
   *          │  3  │ │  5  │    │  8  │
   *          └┬───┬┘ └┬───┬┘    └┬───┬┘ 
   * 
   */

  const node = new BinarySearchTree(6);
  node.add(2);
  node.add(1);
  node.add(4);
  node.add(3);
  node.add(5);
  node.add(7);
  node.add(9);
  node.add(8);

  return node;
}

export function createLinkedList() {
  const list = new LinkedList(1);
  
  list.add(2);
  list.add(3);
  list.add(4);
  list.add(5);

  return list;
}
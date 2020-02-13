import QuadirectionalTree from './quadirectionalTree';
import BinarySearchTree from './binarySearchTree';
import LinkedList from './linkedList';
import GeneralTree from './generalTree';

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
   * 
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

export function createGeneralTree() {
  /*
   *                                                                                                 
   *                                                        ┌─────┐                                  
   *                                                        │ 101 │                                  
   *                                                        └──┬──┘                                  
   *                                ┌───────────┬──────────┬───┴─────────┬───────┬───────┐           
   *                             ┌──┴──┐     ┌──┴──┐    ┌──┴──┐       ┌──┴──┐ ┌──┴──┐ ┌──┴──┐        
   *                             │ 201 │     │ 202 │    │ 203 │       │ 204 │ │ 205 │ │ 206 │        
   *                             └──┬──┘     └─────┘    └──┬──┘       └──┬──┘ └─────┘ └──┬──┘        
   *                                │                  ┌───┴───┐         │           ┌───┴───┐       
   *                             ┌──┴──┐            ┌──┴──┐ ┌──┴──┐   ┌──┴──┐     ┌──┴──┐ ┌──┴──┐    
   *                             │ 301 │            │ 302 │ │ 303 │   │ 304 │     │ 305 │ │ 306 │    
   *                             └──┬──┘            └─────┘ └─────┘   └──┬──┘     └─────┘ └──┬──┘    
   *     ┌───────┬───────┬──────────┴──┬───────┬───────┬───────┐         │                   │       
   *  ┌──┴──┐ ┌──┴──┐ ┌──┴──┐       ┌──┴──┐ ┌──┴──┐ ┌──┴──┐ ┌──┴──┐   ┌──┴──┐             ┌──┴──┐    
   *  │ 401 │ │ 402 │ │ 403 │       │ 404 │ │ 405 │ │ 406 │ │ 407 │   │ 408 │             │ 409 │    
   *  └─────┘ └─────┘ └──┬──┘       └──┬──┘ └─────┘ └─────┘ └─────┘   └─────┘             └─────┘    
   *                     │         ┌───┴───┐                                                         
   *                  ┌──┴──┐   ┌──┴──┐ ┌──┴──┐                                                      
   *                  │ 501 │   │ 502 │ │ 503 │                                                      
   *                  └─────┘   └─────┘ └─────┘                                                      
   *                                                                                                 
   */

  const nodes=[];

  nodes[101]=new GeneralTree(101);

  nodes[201] = nodes[101].addChild(201);
  nodes[202] = nodes[101].addChild(202);
  nodes[203] = nodes[101].addChild(203);
  nodes[204] = nodes[101].addChild(204);
  nodes[205] = nodes[101].addChild(205);
  nodes[206] = nodes[101].addChild(206);

  nodes[301] = nodes[201].addChild(301);
  nodes[302] = nodes[203].addChild(302);
  nodes[303] = nodes[203].addChild(303);
  nodes[304] = nodes[204].addChild(304);
  nodes[305] = nodes[206].addChild(305);
  nodes[306] = nodes[206].addChild(306);

  nodes[401] = nodes[301].addChild(401);
  nodes[402] = nodes[301].addChild(402);
  nodes[403] = nodes[301].addChild(403);
  nodes[404] = nodes[301].addChild(404);
  nodes[405] = nodes[301].addChild(405);
  nodes[406] = nodes[301].addChild(406);
  nodes[407] = nodes[301].addChild(407);
  nodes[408] = nodes[304].addChild(408);
  nodes[409] = nodes[306].addChild(409);

  nodes[501] = nodes[403].addChild(501);
  nodes[502] = nodes[404].addChild(502);
  nodes[503] = nodes[404].addChild(503);

  return nodes[101];
}

export function createGraphicTreeData() {
  const nodes = new Array<QuadirectionalTree>();

  nodes[101] = new QuadirectionalTree(101, 0);

  nodes[201] = nodes[101].pushChild(201);
  nodes[202] = nodes[101].pushChild(202);
  nodes[203] = nodes[101].pushChild(203);
  nodes[204] = nodes[101].pushChild(204);
  nodes[205] = nodes[101].pushChild(205);
  nodes[206] = nodes[101].pushChild(206);

  nodes[301] = nodes[201].pushChild(301);
  nodes[302] = nodes[203].pushChild(302);
  nodes[303] = nodes[203].pushChild(303);
  nodes[304] = nodes[204].pushChild(304);
  nodes[305] = nodes[206].pushChild(305);
  nodes[306] = nodes[206].pushChild(306);

  nodes[401] = nodes[301].pushChild(401);
  nodes[402] = nodes[301].pushChild(402);
  nodes[403] = nodes[301].pushChild(403);
  nodes[404] = nodes[301].pushChild(404);
  nodes[405] = nodes[301].pushChild(405);
  nodes[406] = nodes[301].pushChild(406);
  nodes[407] = nodes[301].pushChild(407);
  nodes[408] = nodes[304].pushChild(408);
  nodes[409] = nodes[306].pushChild(409);

  nodes[501] = nodes[403].pushChild(501);
  nodes[502] = nodes[404].pushChild(502);
  nodes[503] = nodes[404].pushChild(503);

  return nodes;
}
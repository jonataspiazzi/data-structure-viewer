export default class GeneralTree {
  info: any;
  children: GeneralTree[];

  constructor(info: any) {
    this.info = info;
    this.children = [];
  }

  addChild(info: any): GeneralTree {
    const child = new GeneralTree(info);

    this.children.push(child);

    return child;
  }

  *[Symbol.iterator](): Iterator<any> {
    yield this.info;

    for (const item of this.children) {
      yield* item;
    }
  }
}
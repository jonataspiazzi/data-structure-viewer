export default class TranslateControl {
  constructor(tag) {
    this.isTranslating = false;
    this.lastTranslation = { x: 0, y: 0 };
    this.originalCoord = { x: 0, y: 0 };
    this.currentCoord = { x: 0, y: 0 };
    this.tag = tag;

    tag.addEventListener('mousedown', e => this.onMouseDown(e));
    tag.addEventListener('mouseup', e => this.onMouseUp(e));
    tag.addEventListener('mouseleave', e => this.onMouseLeave(e));
    tag.addEventListener('mousemove', e => this.onMouseMove(e));
  }

  onMouseDown(e) {
    this.lastTranslation = this.getCurrentTranslation();
    this.originalCoord.x = e.clientX;
    this.originalCoord.y = e.clientY;
    this.currentCoord.x = e.clientX;
    this.currentCoord.y = e.clientY;
    this.isTranslating = true;
  }

  onMouseUp(e) {
    this.isTranslating = false;
  }

  onMouseLeave(e) {
    if (this.isTranslating) {
      this.currentCoord.x = e.clientX;
      this.currentCoord.y = e.clientY;
      this.onMouseUp(e);
    }
  }

  onMouseMove(e) {
    if (this.isTranslating) {
      this.currentCoord.x = e.clientX;
      this.currentCoord.y = e.clientY;
    }
  }

  getCurrentTranslation() {
    return {
      x: this.lastTranslation.x + this.currentCoord.x - this.originalCoord.x,
      y: this.lastTranslation.y + this.currentCoord.y - this.originalCoord.y
    };
  }
}
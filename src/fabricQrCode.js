import QrCreator from 'qr-creator';
import { fabric } from 'fabric';

const Qrcode = fabric.util.createClass(fabric.Image, {
  type: 'qrcode',
  filters: [],
  crossOrigin: 'anonymous',
  // enable cache but with restrictive cases in needsItsOwnCache
  objectCaching: true,
  // refresh cache at scaling
  noScaleCache: false,
  originX: 'center',
  originY: 'center',

  initialize(options) {
    const element = fabric.util.createCanvasElement();
    this.callSuper('initialize', element, options);
    this.width = options.size;
    this.height = options.size;
  },

  _render(ctx) {
    this.qr = QrCreator.render({
      size: this.size,
      text: this.text,
      fill: 'red',
      background: this.backgroundColor,
    }, this._originalElement);
    fabric.Image.prototype._render.call(this, ctx);
  }
});

Qrcode.fromObject = function (_object, callback) {

};


fabric.Qrcode = Qrcode;

export default Qrcode;

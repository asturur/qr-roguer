import QRCodeStyling from 'qr-code-styling';
import { fabric } from 'fabric';

const mapDataToOptions = ({
  size = 512,
  fill = 'black',
  dotsStyle = 'rounded',
  innerLogo = '',
  backgroundColor = 'transparent',
  logoMargin = 20,
  data = 'qrcode',
}) => ({
  type: 'canvas',
  width: size,
  height: size,
  dotsOptions: {
    color: fill,
    type: dotsStyle,
  },
  data: data,
  image: innerLogo,
  backgroundOptions: {
    color: backgroundColor,
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: logoMargin
  }
})

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
  logoMargin: 20,
  // style of qrcode dots
  dotsStyle: 'rounded',
  // image at the center of the qrcode
  innerLogo: '',
  data: 'qrcode',

  initialize(options) {
    this.callSuper('initialize', null, options);
    this.qr = new QRCodeStyling(mapDataToOptions(this));
    this.setElement(this.qr._canvas);
    this.qr._canvasDrawingPromise.then(() => {
      this.canvas && this.canvas.requestRenderAll();
    });
  },

  update() {
    this.qr.update(mapDataToOptions(this));
    return this.qr._canvasDrawingPromise.then(() => {
      this.setElement(this.qr._canvas);
    });
  },
});

Qrcode.fromObject = function (_object, callback) {

};


fabric.Qrcode = Qrcode;

export default Qrcode;

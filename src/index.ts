interface IWaterMark {
  /** 挂载水印的id */
  id: string;
  /** 水印id的前缀 */
  id_prefix?: string;
  /** 默认水印内容 */
  watermark_text: string;
  /** 水印起始x轴坐标 */
  x?: number;
  /** 水印起始y轴坐标 */
  y?: number;
  /** 水印行数 */
  rows?: number;
  /** 水印列数 */
  cols?: number;
  /** x轴间距 */
  x_space?: number;
  /** y轴间距 */
  y_space?: number;
  /** 水印字库 */
  font?: string;
  /** 字体颜色 */
  font_color?: string;
  /** 字体大小 */
  font_size?: number;
  /** 字体透明度 */
  font_opciaty?: number;
  /** 水印宽度 */
  width?: number;
  /** 水印高度 */
  height?: number;
  /** 水印倾斜角度 */
  rotate?: number;
  /** 水印总体宽度 */
  parent_width?: number;
  /** 水印总体高度 */
  parent_height?: number;
  /** 水印挂载的父元素的element id, 不配置则挂载在body上 */
  parent_node_id?: string | null;
  /** 是否可以调整水印 */
  mutable?: boolean;
}
class waterMark {
  /** 水印配置 */
  watermark: any = {};
  observer: any;
  bodyObserver: any;
  /** 强制移除标志 */
  forceRemove = false;
  /** 水印默认配置 */
  initSettings = {
    /** 挂载水印的id */
    id: 'vm_div_id',
    /** 水印id的前缀 */
    id_prefix: 'mask_div_id',
    /** 默认水印内容 */
    watermark_text: '测试水印',
    /** 水印起始x轴坐标 */
    x: 20,
    /** 水印起始y轴坐标 */
    y: 20,
    /** 水印行数 */
    rows: 5,
    /** 水印列数 */
    cols: 5,
    /** x轴间距 */
    x_space: 50,
    /** y轴间距 */
    y_space: 50,
    /** 水印字库 */
    font: '微软雅黑',
    /** 字体颜色 */
    font_color: 'black',
    /** 字体大小 */
    font_size: 16,
    /** 字体透明度 */
    font_opciaty: 0.3,
    /** 水印宽度 */
    width: 100,
    /** 水印高度 */
    height: 100,
    /** 水印倾斜角度 */
    rotate: 15,
    /** 水印总体宽度 */
    parent_width: 0,
    /** 水印总体高度 */
    parent_height: 0,
    /** 水印挂载的父元素的element id, 不配置则挂载在body上 */
    parent_node_id: null,
    /** 是否可以调整水印 */
    mutable: true,
  };
  MutationObserver = window.MutationObserver;
  /** 初始化, 绑定事件 */
  init(settings: IWaterMark) {
    this.watermark = { ...this.initSettings, ...settings };
    // 初始化body和水印载体div的监听
    this.createObserver();
    this.createCanvas();
    this.renderMark();
  }
  /**  */
  wrapText(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    if (
      typeof text != 'string' ||
      typeof x != 'number' ||
      typeof y != 'number'
    ) {
      return;
    }
    // var context = this.get('ctx');
    // var canvas = this.get('canvas');

    if (typeof maxWidth == 'undefined') {
      maxWidth = (canvas && canvas.width) || 300;
    }
    if (typeof lineHeight == 'undefined') {
      lineHeight =
        (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) ||
        parseInt(window.getComputedStyle(document.body).lineHeight);
    }

    // 字符分隔为数组
    var arrText = text.split('');
    var line = '';

    for (var n = 0; n < arrText.length; n++) {
      var testLine = line + arrText[n];
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = arrText[n];
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }
  /** 创建canvas */
  createCanvas() {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    const height = this.get('height');
    const width = this.get('width');
    const font = this.get('font');
    const fontSize = this.get('font_size');
    const text = this.get('watermark_text');

    console.log(text, 113);

    const rotate = this.get('rotate');
    const fillStyle = this.get('font_color');
    const opciaty = this.get('font_opciaty');

    canvas.height = height;
    canvas.width = width;

    ctx.fillStyle = fillStyle;
    ctx.font = `${fontSize}px ${font}`;
    ctx.globalAlpha = opciaty;
     ctx.rotate((rotate * Math.PI) / 360);
     // ctx.fillText(text, 0, height / 2);
     ctx.translate(50, 0);
     this.wrapText(canvas, ctx, text, 0, 0, width - 50, 20);
    this.set('canvas', canvas);
    this.set('ctx', ctx);
  }
  /** 渲染水印 */
  renderMark() {
    const canvas = this.get('canvas');
    const image = canvas.toDataURL();

    console.log(image);

    // const image = 'data:image/jpeg;base64,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';
    const parentNode = document.querySelector(this.get('parent_node_id') || 'body');
    console.log(this.get('parent_node_id'), 189);
    
    const dom = document.createElement('div');
    dom.setAttribute('id', this.get('id'));
    dom.setAttribute(
      'style',
      `
        background-image:url(${image}); 
        height: 100%; 
        position: fixed; 
        left: 0; 
        top: 0; 
        bottom: 0; 
        right: 0;
        pointer-events: none;
        z-index: 99999
      `
    );
    this.set('dom', dom);
    parentNode?.appendChild(dom);
    this.observe();
  }
  /** 清除水印 */
  removeMark() {
    const body = document.querySelector(this.get('parent_node_id') || 'body');
    const dom = this.get('dom');
    body?.removeChild(dom);
    this.set('dom', null);
  }
  set(key: string, value: any) {
    this.watermark = { ...this.watermark, [key]: value };
  }
  get(key: string) {
    return this.watermark?.[key];
  }

  observe() {
    this.domObserve();
    this.bodyObserve();
  }
  /** 监听水印dom */
  domObserve() {
    const dom = this.get('dom');
    this.observer.observe(dom, {
      childList: true,
      attributes: true,
      characterData: true,
    });
  }
  /** 监听body */
  bodyObserve() {
    const body = document.querySelector('body');
    this.bodyObserver.observe(body, {
      childList: true,
    });
  }
  /** 创建监听 */
  createObserver() {
    this.createDomObserver();
    this.createBodyObserver();
  }
  /** 创建body监听 */
  createBodyObserver() {
    this.bodyObserver = new MutationObserver((mutationList: any) => {
      if (
        mutationList[0]?.removedNodes?.length &&
        mutationList[0]?.removedNodes[0]?.['id'] === this.get('id')
      ) {
        this.renderMark();
      }
    });
  }
  /** 水印载体被修改，则删除div并重新绘制 */
  createDomObserver() {
    this.observer = new MutationObserver(() => {
      console.warn('dom 发生改变');

      // this.removeMark()
    });
  }

  constructor(settings: IWaterMark) {
    console.log(`watermark init`);
    this.init(settings);
  }
}
export default waterMark;

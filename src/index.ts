interface IWaterMark {
  /** 挂载水印的id */
  id: string;
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
  content_width?: number;
  /** 水印总体高度 */
  content_height?: number;
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
    font_color: '#ddd',
    /** 字体大小 */
    font_size: 16,
    /** 字体透明度 */
    font_opciaty: 0.5,
    /** 水印宽度 */
    width: 100,
    /** 水印高度 */
    height: 100,
    /** 水印倾斜角度 */
    rotate: 15,

    /** 水印总体宽度 */
    content_width: 0,
    /** 水印总体高度 */
    content_height: 0,
    /** 水印挂载的父元素的element id, 不配置则挂载在body上 */
    parent_node_id: null,
    /** 默认不允许调整水印，API不开放 */
    mutable: false,
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
  /** 方法来自张鑫旭的blog： https://www.zhangxinxu.com/wordpress/2018/02/canvas-text-break-line-letter-spacing-vertical/ */
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

    const rotate = this.get('rotate');
    const fillStyle = this.get('font_color');
    const opciaty = this.get('font_opciaty');
    const content_width = this.get('content_width');

    canvas.height = height;
    canvas.width = width;

    ctx.fillStyle = fillStyle;
    ctx.font = `${fontSize}px ${font}`;
    ctx.globalAlpha = opciaty;
    ctx.rotate(((rotate > 90 ? 1 : -1) * (rotate % 90) * Math.PI) / 180);

    ctx.translate(0, 0);
    rotate > 90
      ? this.wrapText(canvas, ctx, text, 50, 0, content_width || width - 20, 20)
      : this.wrapText(
          canvas,
          ctx,
          text,
          0,
          height / 2,
          content_width || width - 20,
          20
        );
    this.set('canvas', canvas);
    this.set('ctx', ctx);
  }
  /** 渲染水印 */
  renderMark() {
    const canvas = this.get('canvas');
    const image = canvas.toDataURL();
    const parentNode = document.querySelector(
      this.get('parent_node_id') || 'body'
    );
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
      this.removeMark();
      this.renderMark();
    });
  }
  /** 手动更新水印 */
  reload(settings: IWaterMark) {
    this.watermark = { ...this.watermark, settings };
    this.renderMark();
  }

  constructor(settings: IWaterMark) {
    this.init(settings);
  }
}
export default waterMark;

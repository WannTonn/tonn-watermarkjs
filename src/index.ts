interface IWaterMark {
  /** 挂载水印的id */
  _id: string;
  /** 水印id的前缀 */
  _id_prefix?: string;
  /** 默认水印内容 */
  _watermark_text: string;
  /** 水印起始x轴坐标 */
  _x?: number;
  /** 水印起始y轴坐标 */
  _y?: number;
  /** 水印行数 */
  _rows?: number;
  /** 水印列数 */
  _cols?: number;
  /** x轴间距 */
  _x_space?: number;
  /** y轴间距 */
  _y_space?: number;
  /** 水印字库 */
  _font?: string;
  /** 字体颜色 */
  _font_color?: string;
  /** 字体大小 */
  _font_size?: string;
  /** 字体透明度 */
  _font_opciaty?: number;
  /** 水印宽度 */
  _width?: number;
  /** 水印高度 */
  _height?: number;
  /** 水印倾斜角度 */
  _rotate?: number;
  /** 水印总体宽度 */
  _parent_width?: number;
  /** 水印总体高度 */
  _parent_height?: number;
  /** 水印挂载的父元素的element id, 不配置则挂载在body上 */
  _parent_node_id?: string;
  /** 是否可以调整水印 */
  mutable?: boolean;
}
class waterMark {
  /** 水印配置 */
  watermark = {};
  /** 强制移除标志 */
  forceRemove = false;
  /** 水印默认配置 */
  initSettings = {
    /** 挂载水印的id */
    _id: 'vm_div_id',
    /** 水印id的前缀 */
    _id_prefix: 'mask_div_id',
    /** 默认水印内容 */
    _watermark_text: '测试水印',
    /** 水印起始x轴坐标 */
    _x: 20,
    /** 水印起始y轴坐标 */
    _y: 20,
    /** 水印行数 */
    _rows: 5,
    /** 水印列数 */
    _cols: 5,
    /** x轴间距 */
    _x_space: 50,
    /** y轴间距 */
    _y_space: 50,
    /** 水印字库 */
    _font: '微软雅黑',
    /** 字体颜色 */
    _font_color: 'black',
    /** 字体大小 */
    _font_size: '16px',
    /** 字体透明度 */
    _font_opciaty: 0.3,
    /** 水印宽度 */
    _width: 100,
    /** 水印高度 */
    _height: 100,
    /** 水印倾斜角度 */
    _rotate: 15,
    /** 水印总体宽度 */
    _parent_width: 0,
    /** 水印总体高度 */
    _parent_height: 0,
    /** 水印挂载的父元素的element id, 不配置则挂载在body上 */
    _parent_node_id: null,
    /** 是否可以调整水印 */
    mutable: true,
  };
  globalSettings = {};
  MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;
  /** 初始化, 绑定事件 */
  init(settings: IWaterMark) {
    this.globalSettings = settings;

  }
  /** 渲染水印 */
  renderMark() {
    
  }

  constructor(settings: IWaterMark) {
    console.log(`watermark init`);
    this.init(settings);
    this.watermark = {};
  }
}
export default waterMark;

# tonn-watermarkjs

[![GitHub license][license-image]][license-url]
[![GitHub version][version-image]][version-url]
[![GitHub stars][stars-image]][stars-url]

[license-image]: https://img.shields.io/github/license/saucxs/watermark-dom.svg
[license-url]: https://github.com/saucxs/watermark-dom/blob/master/LICENSE
[version-image]: https://img.shields.io/github/package-json/v/WannTonn/tonn-watermarkjs.svg
[version-url]: https://github.com/WannTonn/tonn-watermarkjs/blob/master/package.json
[stars-image]: https://img.shields.io/github/stars/WannTonn/tonn-watermarkjs.svg
[stars-url]: https://github.com/WannTonn/tonn-watermarkjs/stargazers


基于[watermark-dom](https://github.com/saucxs/watermark-dom)调整。感谢原作者的付出。

### 特性
  - 借鉴 `watermark-dom` 库的功能的同时，用生成的canvas作为水印的`background-image`
  - 配合typescript，在配置时带有提示
  - 水印防篡改

### 如何使用
1. npm安装
```shell
$ npm install tonn-watermarkjs
```
2. 引用依赖
```javascript
import Watermark from 'tonn-watermarkjs'
或
const Watermark = require('tonn-watermarkjs');

```

3. 在页面加载完成之后，调用init事件，以下用React来做示例
```javascript
import React, {useEffect} from 'react';
import Watermark from 'tonn-watermarkjs';

/**
 * @description 
 */

const WatermarkDemo: React.FC = () => {
  useEffect(() => {
    Watermark.init({
      watermark_text: '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十',
      width: 400,
      height: 400,
      rotate: 45
    })
  }, []);
  return (
    <div>
      watermark
    </div>
  )
}
export default WatermarkDemo;
```
## 内置方法
- init(settings)
- reload(settings)

## 字段配置对照表(部分字段的功能待完善)
```
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
  parent_width?: number;
  /** 水印总体高度 */
  parent_height?: number;
  /** 水印挂载的父元素的element id, 不配置则挂载在body上 */
  parent_node_id?: string | null;
  /** 是否可以调整水印 */
  mutable?: boolean;

```
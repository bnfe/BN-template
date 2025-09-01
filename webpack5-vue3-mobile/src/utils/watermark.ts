interface WatermarkOptions {
  container: HTMLElement;
  width: string;
  height: string;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  font: string;
  fillStyle: string;
  content: string[];
  rotate: string;
  zIndex: number;
}

interface WatermarkMethods {
  setWatermark: (opt: Partial<WatermarkOptions>) => void;
  removeWatermark: () => void;
  [key: string]: any;
}

const vmDomId = "__wm";

const options: WatermarkOptions = {
  container: document.body,
  width: "300px",
  height: "300px",
  textAlign: "center",
  textBaseline: "middle",
  font: "12px Helvetica",
  fillStyle: "rgba(184, 184, 184, 0.3)",
  content: ["水印"],
  rotate: "-20",
  zIndex: 10000,
};

const watermark: WatermarkMethods = {
  setWatermark: (opt: Partial<WatermarkOptions>) => {
    const _options: WatermarkOptions = { ...options, ...opt };
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    const ratio: number = window.devicePixelRatio || 1;
    canvas.width = parseFloat(_options.width) * ratio;
    canvas.height = parseFloat(_options.height) * ratio;
    ctx.scale(ratio, ratio);

    ctx.textAlign = _options.textAlign;
    ctx.textBaseline = _options.textBaseline;
    ctx.font = _options.font;
    ctx.fillStyle = _options.fillStyle;
    ctx.translate(parseFloat(_options.width) / 2, parseFloat(_options.height) / 2);
    ctx.rotate((Math.PI / 180) * parseFloat(_options.rotate));

    _options.content.forEach((item: string, index: number) => {
      ctx.fillText(item, 0, 24 * (index + 1));
    });

    const base64Url: string = canvas.toDataURL();
    const _wm: HTMLElement = document.getElementById(vmDomId);

    const watermarkDiv: HTMLElement = _wm || document.createElement("div");
    const styleStr: string = `
      position:fixed;
      top:0;
      left:0;
      bottom:0;
      right:0;
      width:100%;
      height:100%;
      z-index:${_options.zIndex};
      pointer-events:none;
      background-repeat:repeat;
      background-image:url('${base64Url}');
      background-size:${_options.width} ${_options.height};`;

    watermarkDiv.id = vmDomId;
    watermarkDiv.setAttribute("style", styleStr);

    if (!_wm) {
      _options.container.style.position = "relative";
      _options.container.appendChild(watermarkDiv);
    }

    const MutationObserver: typeof window.MutationObserver =
      window.MutationObserver || (window as any).WebKitMutationObserver;

    if (MutationObserver) {
      let mo: MutationObserver = new MutationObserver(() => {
        const _wm: HTMLElement = document.getElementById(vmDomId);
        if ((_wm && _wm.getAttribute("style") !== styleStr) || !_wm) {
          mo.disconnect();
          mo = null;
          watermark.setWatermark(_options);
        }
      });

      mo.observe(_options.container, {
        attributes: true,
        subtree: true,
        childList: true,
      });

      watermark.mo = mo;
    }
  },
  removeWatermark: () => {
    const _wm: HTMLElement = document.getElementById(vmDomId);
    if (_wm) {
      watermark.mo.disconnect();
      document.body.removeChild(_wm);
    }
  },
};

export default watermark;

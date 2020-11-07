import * as PIXI from 'pixi.js'

const width = 800
const height = 600

const app = new PIXI.Application({
	autoResize: true,
  resolution: window.devicePixelRatio || 1,
  antialias: true,
  width,
  height
});
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics()
const container = new PIXI.Container()

const border = graphics
	.lineStyle(8, 0xff0000)
  .drawRoundedRect(-200, -300, 400, 600, 100);

container.addChild(border)

app.stage.addChild(container);

window.addEventListener('resize', resize);
function resize() {
	app.renderer.resize(window.innerWidth, window.innerHeight);
  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;
}

resize();

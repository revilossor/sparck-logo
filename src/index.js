import * as PIXI from 'pixi.js'

const width = 800
const height = 600
const colour = 0xff0000

const app = new PIXI.Application({
	autoResize: true,
  resolution: window.devicePixelRatio || 1,
  antialias: true,
  width,
  height
});
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics()
const stage = new PIXI.Container()

const border = graphics
	.lineStyle(12, colour)
  .drawRoundedRect(-200, -300, 400, 600, 50);

var style = {
  fontFamily : 'Orbitron',
  fontSize: 96,
  align: 'center',
  fill : colour,
};

var text = new PIXI.Text('spärck',style);
text.anchor.set(0.5, 0.5);
text.position.set(0,225);

stage.addChild(text);
stage.addChild(border)

// TODO flame shader based on the shadertoy
// TODO voice stuff?

app.stage.addChild(stage);

window.addEventListener('resize', resize);
function resize() {
	app.renderer.resize(window.innerWidth, window.innerHeight);
  stage.x = app.screen.width / 2;
  stage.y = app.screen.height / 2;
}

resize();

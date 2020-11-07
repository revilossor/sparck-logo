import * as PIXI from 'pixi.js'
import { data as shader } from './flame.glsl.json'

const width = 800
const height = 600
const colour = 0xff0000
const fontName = 'Orbitron';

const app = new PIXI.Application({
  autoResize: true,
  resolution: window.devicePixelRatio || 1,
  antialias: true,
  width,
  height
});

let stage
let elapsed = 0
let filter

function start() {
  stage = new PIXI.Container()

  const lines = new PIXI.Graphics()
  lines
  	.lineStyle(12, colour)
    .drawRoundedRect(-200, -300, 400, 600, 50)
    .drawRoundedRect(-200, 160, 400, 140, 50)
    .drawRect(-200, 160, 400, 1);

  const flames = new PIXI.Graphics()
  flames
    .lineStyle(12, 0xff00ff)
    .drawRect(-189, -290, 377, 440);

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
  stage.addChild(lines)
  stage.addChild(flames)

  const uniforms = {}
  uniforms.elapsed = {
    type: "float",
    value: 0
  }

  filter = new PIXI.Filter(undefined, shader, uniforms);

  flames.filters = [filter];

  // TODO flame shader based on the shadertoy
  // TODO voice stuff?

  app.stage.addChild(stage);
  document.body.appendChild(app.view);

  resize();
  app.ticker.add(delta => update(delta))
}

function update(delta) {
  elapsed += 1;
  filter.uniforms.elapsed = elapsed
}

window.addEventListener('resize', resize);
window.onload = function() {
	WebFont.load({
		active: function() {
			start();
		},
		google: {
			families: [ fontName ]
		}
	});
};

function resize() {
	app.renderer.resize(window.innerWidth, window.innerHeight);
  stage.x = app.screen.width / 2;
  stage.y = app.screen.height / 2;
}

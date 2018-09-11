'use strict';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var STEP_SHADOW = 10;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function(ctx, players, times) {
ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
ctx.beginPath();
ctx.moveTo(CLOUD_X+STEP_SHADOW,CLOUD_Y+STEP_SHADOW);
ctx.lineTo(CLOUD_X+CLOUD_WIDTH/4*1+STEP_SHADOW,CLOUD_Y+30+STEP_SHADOW);
ctx.lineTo(CLOUD_X+CLOUD_WIDTH/4*2+STEP_SHADOW,CLOUD_Y+STEP_SHADOW);
ctx.lineTo(CLOUD_X+CLOUD_WIDTH/4*3+STEP_SHADOW,CLOUD_Y+30+STEP_SHADOW);
ctx.lineTo(CLOUD_X+CLOUD_WIDTH+STEP_SHADOW,CLOUD_Y+STEP_SHADOW);
ctx.lineTo(CLOUD_X+CLOUD_WIDTH+STEP_SHADOW,CLOUD_Y+CLOUD_HEIGHT+STEP_SHADOW);
ctx.lineTo(CLOUD_X+STEP_SHADOW,CLOUD_Y+CLOUD_HEIGHT+STEP_SHADOW);
ctx.closePath();
ctx.fill();
  
ctx.lineWidth = 10;
ctx.strokeStyle = 'red';
ctx.fillStyle = 'green';
ctx.beginPath();
ctx.moveTo(CLOUD_X,CLOUD_Y);
ctx.lineTo(CLOUD_X+CLOUD_WIDTH/4*1,CLOUD_Y+30);
ctx.lineTo(CLOUD_X+CLOUD_WIDTH/4*2,CLOUD_Y);
ctx.lineTo(CLOUD_X+CLOUD_WIDTH/4*3,CLOUD_Y+30);
ctx.lineTo(CLOUD_X+CLOUD_WIDTH,CLOUD_Y);
ctx.lineTo(CLOUD_X+CLOUD_WIDTH,CLOUD_Y+CLOUD_HEIGHT);
ctx.lineTo(CLOUD_X,CLOUD_Y+CLOUD_HEIGHT);
ctx.closePath();
ctx.stroke();
ctx.fill();

ctx.lineWidth = 2;
ctx.strokeStyle = "#F00";
ctx.font = 'bold 30px PT Mono';
ctx.strokeText("Алёна, хватит играть!!", 120, 100);
ctx.strokeText("Иди работать !!!!!!", 130, 200);








};

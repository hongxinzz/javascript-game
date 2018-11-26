/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// 全局变量

var can1 = document.getElementById('canvas1');
var ctx1 = can1.getContext('2d');   //上面的canvas
var can2 = document.getElementById('canvas2');
var ctx2 = can2.getContext('2d');   //下面的canvas

var global = {
  imgUrl: './images/',
  can1: can1,
  ctx1: ctx1,
  can2: can2,
  ctx2: ctx2,
  canWid: can1.width,
  canHei: can1.height,
  mx: can1.width * 0.5,
  my: can1.height * 0.5,
  aneOb: {},
  fruitOb: {},
  momOb: {},
  babyOb: {},
  scoreOb: {},
  waveOb: {},
  haloOb: {},
  dustOb: {},
  diffframetime: 0,
}

module.exports = global;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// 工具函数

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();


function calLength2(x1, y1, x2, y2) {    //计算两个点之间的距离，，， 先求平方和，再开平方
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}


function lerpAngle(a, b, t) {     //每一次旋转的角度
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}

function lerpDistance(aim, cur, ratio) {   //aim：目标   cur：当前   ratio：百分比     每一次趋近的距离
	var delta = cur - aim;
	return aim + delta * ratio;
}

function distance(x1, y1, x2, y2, l) {
	var x = Math.abs(x1 - x2);
	var y = Math.abs(y1 - y2);
	if (x < l && y < l) {
		return true;
	}
	return false;
}

var util = {
  calLength2: calLength2,
  lerpAngle: lerpAngle,
  lerpDistance: lerpDistance,
  distance: distance,
}

// 暴露 util
module.exports = util;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// 主入口

// 依赖 controller
var Controller = __webpack_require__(3);

__webpack_require__(12);

Controller.startgame()


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// 全局函数、初始化、判断等

// 依赖 global, util, ane, baby, dust, fruit, halo, mom, score, wave
var global = __webpack_require__(0); //全局类
var util = __webpack_require__(1);//工具类
var Ane = __webpack_require__(4);//海葵类
var Baby = __webpack_require__(5);//小鱼
var Dust = __webpack_require__(6);//灰尘类
var Fruit = __webpack_require__(7);//水果类
var Halo = __webpack_require__(8);//大鱼喂小鱼的光环类
var Mom = __webpack_require__(9);//鱼妈妈类
var Score = __webpack_require__(10);//数据类
var Wave = __webpack_require__(11);//大鱼吃果实波浪类
/***********************以上为模块注入***************************/

var aneOb;
var fruitOb;
var momOb;
var babyOb;
var scoreOb;
var waveOb;
var haloOb;
var dustOb;
var can1 = global.can1;
var ctx1 = global.ctx1;
var ctx2 = global.ctx2;
var canWid = global.canWid;
var canHei = global.canHei;
var calLength2 = util.calLength2;

var lastframetime;

var Controller = {};
Controller.startgame = function(){
  Controller.init();

  lastframetime = Date.now();
  Controller.gameLoop();

}

Controller.drawBackgorund = function() {
  var img = new Image();
  img.src= global.imgUrl + 'background.jpg';
  ctx2.drawImage(img,0,0,canWid,canHei);
}

Controller.init = function(){

  ctx1.fillStyle = 'white';
  ctx1.font = '20px 微软雅黑';
  ctx1.textAlign = 'center';
  can1.addEventListener('mousemove', Controller.onMouseMove, false);
  can1.addEventListener('click', Controller.onClick, false);


  global.mx = canWid * 0.5;
  global.my = canHei * 0.5;

  aneOb = global.aneOb = new Ane();  //new 一个海葵类
  aneOb.init();  //初始化海葵的属性

  fruitOb = global.fruitOb = new Fruit();
  fruitOb.init();

  momOb = global.momOb = new Mom();
  momOb.init();

  babyOb = global.babyOb = new Baby();
  babyOb.init();

  scoreOb = global.scoreOb = new Score();   //创建的时候已经初始化

  waveOb = global.waveOb = new Wave();
  waveOb.init();

  haloOb = global.haloOb = new Halo();
  haloOb.init();

  dustOb = global.dustOb = new Dust();
  dustOb.init();
}
Controller.gameLoop = function(){   //使用帧绘画，一直在画的东西
  requestAnimFrame(Controller.gameLoop);
  var now = Date.now();    //1970 00:00:00 到现在的毫秒数
  global.diffframetime = now - lastframetime;
  lastframetime = now;
  if(global.diffframetime > 40){
    global.diffframetime = 40;   //防止切换浏览器，differ时间变长，果实长到无限大
  }

  ctx2.clearRect(0, 0, canWid, canHei);    //清除画布2
  Controller.drawBackgorund();
  aneOb.drawAne();  // 画海葵部分
  fruitOb.computeFruit();  //根据果实出现个数再出生果实
  fruitOb.drawFruit();  //画果实部分

  ctx1.clearRect(0, 0, canWid, canHei);    //清除画布1
  momOb.drawMom();   //画鱼妈妈
  babyOb.drawBaby();  //画小鱼
  if(!scoreOb.gameOver){  //如果游戏没有结束
    Controller.momEatFruit();  //随时判断果实是否被吃掉
    Controller.momFoodBaby();  //判断大鱼喂小鱼
  }
  scoreOb.drawScore();

  waveOb.drawWave();
  haloOb.drawHalo();
  dustOb.drawDust();
}
Controller.onMouseMove = function(e){     //鼠标移动事件，layerX是FF浏览器特有的。
  if(!scoreOb.gameOver){  //如果游戏没有结束
    if(e.offsetX || e.layerX){
      global.mx = e.offsetX == undefined ? e.layerX : e.offsetX;
      global.my = e.offsetY == undefined ? e.layerY : e.offsetY;
    }
  }
}
Controller.onClick = function(){
  if(scoreOb.gameOver){   //如果游戏为结束状态
    scoreOb.gameOver = false;
    // aneOb.init();
    fruitOb.init();
    momOb.init();
    babyOb.init();
    scoreOb.init();
  }
}
Controller.momEatFruit = function(){     //判断果实和大鱼之间的距离，小于30说明被吃掉
  for(var i = 0;i < fruitOb.num; i++ ){
    if(fruitOb.alive[i] && fruitOb.grow[i]){
      var len = calLength2(fruitOb.x[i], fruitOb.y[i], momOb.x, momOb.y);
      if(len < 30){
        fruitOb.dead(i);    //如果距离小于30，则被吃掉
        waveOb.born(i);     //吃掉的时候，产生圆圈
        scoreOb.fruitNum ++;
        momOb.momBodyIndex = momOb.momBodyIndex == 7 ? momOb.momBodyIndex : (momOb.momBodyIndex + 1);
        if(fruitOb.type[i] == 'blue'){
          scoreOb.doubleNum ++;
        }
      }
    }
  }
}
Controller.momFoodBaby = function(){    //判断大鱼和小鱼之间的距离，小于30，小鱼的颜色变深
  if(scoreOb.fruitNum > 0){
    var len = calLength2(momOb.x, momOb.y, babyOb.x, babyOb.y);
    if(len < 30){   //距离小于30，而且大鱼吃到了果实，才能喂小鱼
      haloOb.born();
      momOb.momBodyIndex = 0;     //大鱼体力变0
      var num = scoreOb.doubleNum * scoreOb.fruitNum;
      var index = babyOb.babyBodyIndex - num;
      if(index < 0){
        index = 0;  //如果下标小于0， 则等于0
      }

      var strength = scoreOb.strength + (index/2).toFixed(0);
      if(strength > 10){
        strength = 10;
      }
      scoreOb.strength = strength;
      babyOb.babyBodyIndex = index;  //小鱼身体图片下标减小，身体变红
      scoreOb.computeScore();   //计算总分,
    }
  }
}

//对外暴露

module.exports = Controller;



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// 海葵类

// 依赖 global
var global = __webpack_require__(0)//声明依赖 global类

var ctx2 = global.ctx2;
var canHei = global.canHei;

var Ane = function(){
  this.num = 50;
  //start point, controll point , end point
  this.rootx = [];
  this.headx = [];
  this.heady = [];
  this.amp = [];   //振幅
  this.beta = 0;    //sin的角度
}
Ane.prototype.init = function(){
  for (var i = 0; i< this.num; i++){
    this.rootx[i] = i * 18 + Math.random() * 30;
    this.headx[i] = this.rootx[i];
    this.heady[i] = (canHei - 220) + Math.random() * 50;
    this.amp[i] = Math.random() * 50 + 60;
  }
}
Ane.prototype.drawAne = function(){
  this.beta += global.diffframetime * 0.0008;
  var l = Math.sin(this.beta);

  ctx2.save();
  ctx2.globalAlpha = 0.7;
  ctx2.lineWidth = 20;
  ctx2.lineCap = 'round';
  ctx2.strokeStyle = '#3b154e';
  for(var i = 0; i< this.num; i++){
    //beginPath, moveTo,lineTo,lineWidth, strokeStyle, lineCap, stroke;
    var endx = this.headx[i] + l * this.amp[i];
    ctx2.beginPath();
    ctx2.moveTo(this.rootx[i], canHei);     //起始点
    ctx2.quadraticCurveTo(this.rootx[i], canHei - 100, endx, this.heady[i]);  //控制点  和  结束点的x，y
    ctx2.stroke();
  }
  ctx2.restore();
}

//向外暴露海藻类
module.exports = Ane;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// 小鱼类

// 依赖 global, util
var global = __webpack_require__(0);//全局注入
var  util  = __webpack_require__(1)//注入工具

var imgUrl = global.imgUrl;
var ctx1 = global.ctx1;
var can1 = global.can1;
var canWid = global.canWid;
var canHei = global.canHei;
var lerpAngle = util.lerpAngle;
var lerpDistance = util.lerpDistance;

var Baby = function(){
  this.x = 0;
  this.y = 0;
  this.angle;     //大鱼的角度
  this.babyTailArr = [];    //尾巴图片数组
  this.babyTailTimer = 0;  //计数器
  this.babyTailIndex = 0;  //尾巴图片数组的下标

  this.babyEyeArr = [];
  this.babyEyeTimer = 0;
  this.babyEyeIndex = 0;
  this.babyEyeInterval = 1000;  //初始间隔时间为1秒

  this.babyBodyArr = [];
  this.babyBodyTimer = 0;
  this.babyBodyIndex = 0;
}
Baby.prototype.init = function(){
  this.x = canWid * 0.5 -50;
  this.y = canHei * 0.5 + 50;
  this.babyBodyIndex = 0;
  this.angle = 0;
  for(var i = 0;i < 8;i++){    //初始化小鱼的尾巴图片数组
    this.babyTailArr[i] = new Image();
    this.babyTailArr[i].src = imgUrl + 'babyTail'+ i +'.png';
  }
  for(var i = 0;i < 2;i++){   //初始化小鱼的眼睛图片数组
    this.babyEyeArr[i] = new Image();
    this.babyEyeArr[i].src = imgUrl + 'babyEye'+ i +'.png';
  }
  for(var i = 0;i < 20;i++){   //初始化小鱼的身体图片数组
    this.babyBodyArr[i] = new Image();
    this.babyBodyArr[i].src = imgUrl + 'babyFade'+ i +'.png';
  }
}
Baby.prototype.drawBaby = function(){
  //lerp x , y   让小鱼坐标倾向于大鱼坐标。
  var momOb = global.momOb;
  var scoreOb = global.scoreOb;

  this.x = lerpDistance(momOb.x, this.x, 0.98);
  this.y = lerpDistance(momOb.y, this.y, 0.99);

  //lerpangle， 让小鱼的角度倾向于大鱼的角度，   然后绘制小鱼
  var deltaX = momOb.x - this.x;
  var deltaY = momOb.y - this.y;
  var beta = Math.atan2(deltaY, deltaX) + Math.PI;
  this.angle = lerpAngle(beta, this.angle, 0.6);    //获得每一次倾向于大鱼旋转的角度

  this.babyTailTimer += global.diffframetime;
  if(this.babyTailTimer > 50){
    this.babyTailIndex = (this.babyTailIndex + 1) % 8;   //获得尾巴图片数组下标
    this.babyTailTimer %= 50;
  }

  this.babyEyeTimer += global.diffframetime;
  if(this.babyEyeTimer > this.babyEyeInterval){   //如果计数器大于时间间隔,数组下标加1
    this.babyEyeIndex = (this.babyEyeIndex + 1) % 2;
    this.babyEyeTimer %= this.babyEyeInterval;

    if(this.babyEyeIndex == 0){       //如果下一帧是闭眼睛状态，时间间隔为2－3秒
      this.babyEyeInterval = Math.random() * 1500 + 1500;
    }else{
      this.babyEyeInterval = 200;
    }
  }

  this.babyBodyTimer += global.diffframetime;
  if(this.babyBodyTimer > 550){
    this.babyBodyIndex += 1;
    this.babyBodyTimer %= 550;
    scoreOb.strength = ((20 - this.babyBodyIndex)/2).toFixed(0);

    if(this.babyBodyIndex > 19){   //如果身体变成白色，game over；
      this.babyBodyIndex = 19;
      scoreOb.gameOver = true;
      can1.style.cursor = "pointer";
    }
  }

  ctx1.save();     //保存之前的画布
  ctx1.translate(this.x, this.y);
  ctx1.rotate(this.angle);

  var babyTailImage = this.babyTailArr[this.babyTailIndex];
  ctx1.drawImage(babyTailImage, -babyTailImage.width * 0.5 + 24, -babyTailImage.height * 0.5);

  var babyBodyImage = this.babyBodyArr[this.babyBodyIndex];
  ctx1.drawImage(babyBodyImage, -babyBodyImage.width * 0.5, -babyBodyImage.height * 0.5);

  var babyEyeImage = this.babyEyeArr[this.babyEyeIndex];
  ctx1.drawImage(babyEyeImage, -babyEyeImage.width * 0.5, -babyEyeImage.height * 0.5);

  ctx1.restore();   //操作完后返回到之前的画布
}

//对外暴露body
module.exports = Baby;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// 灰尘类

// 依赖 global
var global = __webpack_require__(0);//全局变量

var ctx1 = global.ctx1;
var imgUrl = global.imgUrl;
var canWid = global.canWid;
var canHei = global.canHei;

var Dust = function(){
  this.num = 30;
  this.dustPic = [];
  this.x = [];
  this.y = [];
  this.amp = [];
  this.index = [];
  this.beta = 0;
}
Dust.prototype.init = function(){
  for(var i =0; i< 7; i++){
    this.dustPic[i] = new Image();
    this.dustPic[i].src = imgUrl + 'dust'+ i +'.png';
  }
  for(var i = 0;i< this.num; i++){
    this.x[i] = Math.random() * canWid;
    this.y[i] = Math.random() * canHei;
    this.amp = 20 + Math.random() + 15;
    this.index[i] = Math.floor(Math.random() * 7);

  }
}
Dust.prototype.drawDust = function(){
  // console.log(this.dustPic[0]);
  for(var i = 0;i< this.num; i++){
    var index = this.index[i];
    ctx1.drawImage(this.dustPic[index], this.x, this.y);
  }
}

//向外暴露灰尘类
module.exports = Dust


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// 果实类

// 依赖 global
var global = __webpack_require__(0);

var ctx2 = global.ctx2;
var imgUrl = global.imgUrl;

var Fruit = function(){
  this.num = 30;
  this.x = [];
  this.y = [];
  this.size = [];   //果实大小（直径）
  this.type = [];   //果实的类型
  this.speed = [];  //果实漂浮速度
  this.grow = [];   //果实是否长大
  this.alive = [];  //bool，是否活着
  this.orange = new Image();
  this.blue = new Image();
}
Fruit.prototype.init = function(){
  this.orange.src = imgUrl + 'fruit.png';
  this.blue.src = imgUrl + 'blue.png';
  for(var i = 0; i< this.num; i++){
    this.x[i] = this.y[i] = 0;
    this.speed[i] = Math.random() * 0.015 + 0.005;   //[0.005  ,  0.02)
    this.alive[i] = false;   //初始值都为false
    this.grow[i] = false;   //初始为“未长大”;
    this.type[i]  = "";
  }
}
Fruit.prototype.drawFruit = function(){
  for(var i =0;i< this.num; i++){
    if(this.alive[i]){
      //find an ane, grow, fly up...
      if(this.size[i] <= 16){   //长大状态
        this.grow[i] = false;
        this.size[i] += this.speed[i] * global.diffframetime * 0.8;
      }else{   //已经长大,向上漂浮
        this.grow[i] = true;
        this.y[i] -= this.speed[i] * 5 * global.diffframetime;
      }
      var pic = this.orange;
      if(this.type[i] == 'blue')   pic = this.blue;

      ctx2.drawImage(pic, this.x[i] - this.size[i] * 0.5, this.y[i] - this.size[i] * 0.5, this.size[i], this.size[i]);
      if(this.y[i] < 8){
        this.alive[i] = false;
      }
    }
  }
}
Fruit.prototype.born = function(i){
  var aneOb = global.aneOb;
  var aneId = Math.floor(Math.random() * aneOb.num);
  this.x[i] = aneOb.headx[aneId];    //果实的横坐标
  this.y[i] = aneOb.heady[aneId];    // 果实的总坐标
  this.size[i] = 0;
  this.alive[i] = true;
  var flag = Math.random();
  if(flag < 0.1){
    this.type[i] = "blue";
  }else{
    this.type[i] = "orange";
  }
}
Fruit.prototype.dead = function(i){
  this.alive[i] = false;
}
Fruit.prototype.computeFruit = function() {           //计算屏幕上的果实数量
  var fruitOb = global.fruitOb;
  var count = 0;
  for(var i = 0; i < fruitOb.num; i++){
    if(fruitOb.alive[i])  count ++;
  }
  if(count < 15){
    bornFruit();		//出生一个果实
    return false;
  }
}
function bornFruit() {     //循环30个果实，如果状态为false，则让它出生
  var fruitOb = global.fruitOb;
  for(var i = 0;i< fruitOb.num; i++){
    if(!fruitOb.alive[i]){
      fruitOb.born(i);
      return false;
    }
  }
}

//暴露果实类

module.exports = Fruit;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 大鱼喂小鱼的光环类

// 依赖 global
var global = __webpack_require__(0);

var ctx1 = global.ctx1;
var canWid = global.canWid;
var canHei = global.canHei;

var Halo = function(){
  this.num = 5;
  this.x = [];
  this.y = [];
  this.r = [];   //半径
  this.status = [];   //当前光环的使用状态
}
Halo.prototype.init = function(){
  for(var i = 0;i< this.num;i++){
    this.x[i] = canWid * 0.5;
    this.y[i] = canHei * 0.5;
    this.status[i] = false;    //初始化光环未被使用
    this.r[i] = 0;
  }
}
Halo.prototype.drawHalo = function(){
  ctx1.save();
  ctx1.lineWidth = 4;
  for(var i = 0;i< this.num; i++){
    if(this.status[i]){     //如果光环是使用状态，则绘制光环
      this.r[i] += global.diffframetime * 0.08;
      if(this.r[i] > 100){
        this.status[i] = false;
        return false;
      }
      var alpha = 1 - this.r[i] / 100;

      ctx1.strokeStyle = "rgba(203, 91, 0, "+ alpha +")";
      ctx1.beginPath();
      ctx1.arc(this.x[i], this.y[i], this.r[i], 0, 2 * Math.PI);   //画圆，
      ctx1.stroke();
    }
  }
  ctx1.restore();
}
Halo.prototype.born = function(){
  var babyOb = global.babyOb;
  for(var i = 0; i< this.num; i++){
    if(!this.status[i]){
      this.status[i] = true;   //把光环状态设为使用状态
      this.x[i] = babyOb.x;   //光环的位置是小鱼的位置。
      this.y[i] = babyOb.y;
      this.r[i] = 10;
      return false;   //找到一个未使用的光环，就结束。
    }
  }
}

//暴露光环类
module.exports = Halo;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 鱼妈妈类

// 依赖 global, util
var global = __webpack_require__(0);
var util  = __webpack_require__(1)

var ctx1 = global.ctx1;
var imgUrl = global.imgUrl;
var canWid = global.canWid;
var canHei = global.canHei;
var lerpAngle = util.lerpAngle;
var lerpDistance = util.lerpDistance;

var Mom = function(){
  this.x = 0;
  this.y = 0;
  this.angle;     //大鱼的角度
  this.momTailArr = [];
  this.momTailTimer = 0;
  this.momTailIndex = 0;

  this.momEyeArr =[];
  this.momEyeTimer = 0;
  this.momEyeIndex = 0;
  this.momEyeInterval = 1000;

  this.momOrangeArr = [];   //大鱼的橙色身体数组
  this.momBlueArr = [];     //蓝色身体数组
  this.momBodyIndex = 0;
}
Mom.prototype.init = function(){
  this.x = canWid * 0.5;
  this.y = canHei * 0.5;
  this.angle = 0;

  for(var i = 0;i< 8; i++){   //大鱼尾巴
    this.momTailArr[i] = new Image();
    this.momTailArr[i].src = imgUrl + 'bigTail'+ i +'.png';
  }
  for(var i = 0;i< 2; i++){   //大鱼眼睛
    this.momEyeArr[i] = new Image();
    this.momEyeArr[i].src = imgUrl + 'bigEye'+ i +'.png';
  }
  for(var i = 0;i< 8; i++){
    this.momOrangeArr[i] = new Image();         //大鱼橙色身体
    this.momOrangeArr[i].src = imgUrl + 'bigSwim'+ i +'.png';
    this.momBlueArr[i] = new Image();           //大鱼蓝色身体
    this.momBlueArr[i].src = imgUrl + 'bigSwimBlue'+ i +'.png';
  }
}
Mom.prototype.drawMom = function(){
  var scoreOb = global.scoreOb;
  //lerp x,y   让大鱼的坐标值倾向于鼠标位置，然后绘制大鱼
  this.x = lerpDistance(global.mx, this.x, 0.96);
  this.y = lerpDistance(global.my, this.y, 0.98);

  //lerp angle    让大鱼的角度倾向于鼠标的角度
  var deltaX = global.mx - this.x;  //横坐标差
  var deltaY = global.my - this.y;  //纵坐标差
  var beta = Math.atan2(deltaY, deltaX) + Math.PI;    //目标角度
  this.angle = lerpAngle(beta, this.angle, 0.6);    //获得每一次旋转的角度

  this.momTailTimer += global.diffframetime;
  if(this.momTailTimer > 50){
    this.momTailIndex = (this.momTailIndex + 1) % 8;
    this.momTailTimer %= 50;
  }

  this.momEyeTimer += global.diffframetime;
  if(this.momEyeTimer > this.momEyeInterval){
    this.momEyeIndex = (this.momEyeIndex + 1) % 2;
    this.momEyeTimer %= this.momEyeInterval;

    if(this.momEyeIndex == 0){
      this.momEyeInterval = Math.random() * 1500 + 1500;
    }else{
      this.momEyeInterval = 200;
    }
  }

  ctx1.save();     //保存之前的画布
  ctx1.translate(this.x, this.y);      //把原点变成(this.x , this.y);
  ctx1.rotate(this.angle);

  var momTailImage = this.momTailArr[this.momTailIndex];
  ctx1.drawImage(momTailImage, -momTailImage.width * 0.5 + 30, -momTailImage.height * 0.5);

  var momBodyImage;
  if(scoreOb.doubleNum != 1){   //说明大鱼吃到了蓝色果实，身体变蓝色
    momBodyImage = this.momBlueArr[this.momBodyIndex];
  }else{
    momBodyImage = this.momOrangeArr[this.momBodyIndex];
  }
  ctx1.drawImage(momBodyImage, -momBodyImage.width * 0.5, -momBodyImage.height * 0.5);

  var momEyeImage = this.momEyeArr[this.momEyeIndex];
  ctx1.drawImage(momEyeImage, -momEyeImage.width * 0.5, -momEyeImage.height * 0.5);
  ctx1.restore();   //操作完后返回到之前的画布
}


//暴露Mom类
module.exports = Mom;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// 数据类

// 依赖 global
var global = __webpack_require__(0);


var ctx1 = global.ctx1;
var canWid = global.canWid;
var canHei = global.canHei;

var Score = function(){
  this.fruitNum = 0;       //大鱼吃到的果实数量
  this.doubleNum = 1;       //计算分数的倍数
  this.score = 0;
  this.strength = 10;
  this.alpha = 0;
  this.gameOver = false;
}
Score.prototype.init = function(){
  this.fruitNum = 0;       //大鱼吃到的果实数量
  this.doubleNum = 1;       //计算分数的倍数
  this.score = 0;
}
Score.prototype.drawScore = function(){
  var scoreOb = global.scoreOb;
  ctx1.fillText("num: " + this.fruitNum, canWid * 0.5, canHei-30);
  ctx1.fillText("double: " + this.doubleNum, canWid * 0.5, canHei-70);

  ctx1.save();
  ctx1.font = '30px verdana';
  ctx1.fillText("SCORE: " + this.score, canWid * 0.5, 50);
  ctx1.font = '20px verdana';
  ctx1.fillText("strength: ", 650, 45);
  if(scoreOb.strength <= 3){
    ctx1.fillStyle = "red";
  }
  ctx1.fillText(scoreOb.strength, 710, 45);

  if(scoreOb.gameOver){
    this.alpha += global.diffframetime * 0.0005;
    if(this.alpha > 1){
      this.alpha = 1;
    }
    ctx1.font = '40px verdana';
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "white";
    ctx1.fillStyle = "rgba(255, 255, 255, "+ this.alpha +")";
    ctx1.fillText("GAME OVER", canWid * 0.5, canHei * 0.5 - 25);
    ctx1.save();
    ctx1.font = '25px verdana';
    ctx1.fillText("CLICK TO RESTART", canWid * 0.5, canHei * 0.5 + 25);
    ctx1.restore();
  }
  ctx1.restore();
}
Score.prototype.computeScore = function(){
  var scoreOb = global.scoreOb;
  scoreOb.score += scoreOb.fruitNum * scoreOb.doubleNum;
  this.fruitNum = 0;
  this.doubleNum = 1;
}

//暴露数据类
module.exports = Score;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 大鱼吃果实波浪类

// 依赖 global
var global = __webpack_require__(0);

var ctx1 = global.ctx1;
var canWid = global.canWid;
var canHei = global.canHei;

var Wave = function(){
  this.num = 10;
  this.x = [];
  this.y = [];
  this.r = [];   //半径
  this.status = [];   //当前圆圈的使用状态
}
Wave.prototype.init = function(){
  for(var i = 0;i< this.num;i++){
    this.x[i] = canWid * 0.5;
    this.y[i] = canHei * 0.5;
    this.status[i] = false;    //初始化圆圈未被使用
    this.r[i] = 0;
  }
}
Wave.prototype.drawWave = function(){    //绘制一个圆圈
  ctx1.save();
  ctx1.lineWidth = 3;
  for(var i = 0;i< this.num; i++){
    if(this.status[i]){     //如果圆圈是使用状态，则绘制圆圈
      this.r[i] += global.diffframetime * 0.04;
      if(this.r[i] > 60){
        this.status[i] = false;
        return false;
      }
      var alpha = 1 - this.r[i] / 60;

      ctx1.strokeStyle = "rgba(255, 255, 255, "+ alpha +")";
      ctx1.beginPath();
      ctx1.arc(this.x[i], this.y[i], this.r[i], 0, 2 * Math.PI);   //画圆，
      ctx1.stroke();
    }
  }
  ctx1.restore();
}
Wave.prototype.born = function(index){     //出生一个圆圈。
  var fruitOb = global.fruitOb;
  for(var i = 0; i< this.num; i++){
    if(!this.status[i]){
      this.status[i] = true;   //把圆圈状态设为使用状态
      this.x[i] = fruitOb.x[index];
      this.y[i] = fruitOb.y[index];
      this.r[i] = 10;
      return false;   //找到一个未使用的圆圈，就结束。
    }
  }
}

//暴露果实波浪
module.exports = Wave;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
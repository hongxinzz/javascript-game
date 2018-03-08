// 元素
var container = document.getElementById('game');
var canvas = document.getElementById('canvas');
var context =  canvas.getContext('2d');
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
// 获取class
function $(className){
  return document.getElementsByClassName(className);
}
/**
 * 整个游戏对象
 */
var GAME = {
    //加載默認
  init:function(opts){
    // 合并默认参数
    var opts = Object.assign({}, opts, CONFIG);
    var rs = this;
    // 飞机初始化坐标
    var planeWidth = opts.planeSize.width
    this.planeStartX = (canvasWidth - opts.planeSize.width) / 2;
    this.planeStartY = canvasHeight - opts.planeSize.height - opts.canvasPadding;
    // 飞机的可移动最大位置和最小位置
    this.planeMaxX = canvasWidth -  opts.canvasPadding - planeWidth;
    this.planeMinX = opts.canvasPadding;
    // 怪物的移動位置
    this.enemyMaxX = this.planeMaxX;
    this.enemyMinX = this.planeMinX;
    //怪獸默認第一只
    this.emenyPosX = opts.canvasPadding;
    this.emenyPosY = opts.canvasPadding;
    rs.picLoad();
  },
  //圖片加載
  picLoad:function(){
    var rs = this;
    var num = 0;
    this.image = [enemyIcon,enemyBoomIcon,planeIcon]//分别为怪兽 怪兽爆炸 飞机
    for(var i = 0; i < image.length; i++){
        console.log(1)
        image[i] = new Images();
        image[i].src = image[i];
        image[i].onload = function(){
            num++;
            if (num == image.length) {
                console.log(1)
                this.bindEvent()
            };
        } 
    }
  },//游戏按钮绑定
  bindEvent:function(){
    var rs = this;
    $('js-play').onclick = function(){
        this.play();
        alert(1)
    }
  },//游戏状态
  setStatus: function(status) {
    this.status = status;
    container.setAttribute("data-status", status);
  },//开始游戏
  play:function(){
    this.setStatus('playing');
  }
}


  
// var GAME = {
//   /**
//    * 初始化函数,这个函数只执行一次
//    * @param  {object} opts 
//    * @return {[type]}      [description]
//    */
//   init: function(opts) {
//     this.status = 'start';
//     this.bindEvent();
//     var loadPlane = new loadPlane();
//   },
//   bindEvent: function() {
//     var self = this;
//     var playBtn = document.querySelector('.js-play');
//     // 开始游戏按钮绑定
//     playBtn.onclick = function() {
//       self.play();
//     };
//   },
//   /**
//    * 更新游戏状态，分别有以下几种状态：
//    * start  游戏前
//    * playing 游戏中
//    * failed 游戏失败
//    * success 游戏成功
//    * all-success 游戏通过
//    * stop 游戏暂停（可选）
//    */
//   setStatus: function(status) {
//     this.status = status;
//     container.setAttribute("data-status", status);
//   },
//   play: function() {
//     this.setStatus('playing');
//   }
// };
// // 飞机初始化
// GAME.init.prototype.loadPlane = function(){
//   imgX = (canvasWidth - CONFIG.planeSize.width) / 2;
//     imgY = canvasHeight - CONFIG.planeSize.width - 60;
//     console.log(imgY)
//     var img = new Image();
//     img.src = CONFIG.planeIcon;
//     img.onload = function(){
//       context.drawImage(img, imgX,imgY,CONFIG.planeSize.width,CONFIG.planeSize.height);
//     }
// }

// // 初始化
GAME.init();

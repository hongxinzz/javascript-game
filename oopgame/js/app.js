// 元素
var container = document.getElementById('game');
var canvas = document.getElementById('canvas');
var context =  canvas.getContext('2d');
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
/**
 * 整个游戏对象
 */
  var CONFIG = {
    status: 'start', // 游戏开始默认为开始中
    level: 1, // 游戏默认等级
    totalLevel: 6, // 总共6关
    numPerLine: 6, // 游戏默认每行多少个怪兽
    canvasPadding: 30, // 默认画布的间隔
    bulletSize: 10, // 默认子弹长度
    bulletSpeed: 10, // 默认子弹的移动速度
    enemySpeed: 2, // 默认敌人移动距离
    enemySize: 50, // 默认敌人的尺寸
    enemyGap: 10,  // 默认敌人之间的间距
    enemyIcon: './img/enemy.png', // 怪兽的图像
    enemyBoomIcon: './img/boom.png', // 怪兽死亡的图像
    enemyDirection: 'right', // 默认敌人一开始往右移动
    planeSpeed: 5, // 默认飞机每一步移动的距离
    planeSize: {
      width: 60,
      height: 100
    }, // 默认飞机的尺寸,
    planeIcon: './img/plane.png',
  };
  (function(){
    var png = {};
    function load(pic,callback){
      var img = new Image();
      img.src = pic;
      img.onload = function(){
          png[pic] = img;
          callback();
       }
    }
    load("img/enemy.png",Init);
    load("img/boom.png",Init);
    load("img/plane.png",Init);

    function Init(){
      // 开始
    var Play = new play();
      // 绘制怪兽
    }

    // 点击开始游戏
  function play(){
      var playBtn = document.querySelector('.js-play');
      var self = this;
      playBtn.onclick = function() {
        self.setStatus('playing');
        // 绘制飞机
        var Plane = new plane();
      };
    }
    // 修改游戏状态
  play.prototype.setStatus = function(status){
    this.status = status;
    container.setAttribute("data-status", status);
  }

  // 我方飞机
  function plane(){
    var rs=this;
    this.newX = CONFIG.planeSpeed;
    imgX = (canvasWidth - CONFIG.planeSize.width) / 2;
    imgY = canvasHeight - CONFIG.planeSize.width - 60;
    var img = new Image();
    img.src = CONFIG.planeIcon;
    img.onload = function(){
      context.drawImage(img, imgX,imgY,CONFIG.planeSize.width,CONFIG.planeSize.height);
    }
    window.addEventListener('keydown',function(e){
      if(e.keyCode == 37){
        // console.log(this.imgX-=CONFIG.planeSpeed)
        rs.left();
      }else if(e.keyCode == 39){
        rs.right();
      }
    })
}
  // 左移动飞机
plane.prototype.left = function(){
  this.move(-this.newX);
}
  // 右移动
plane.prototype.right = function(){
  this.move(this.newX);
}
  // 移动共用方法
plane.prototype.move = function(x){
  context.clearRect(imgX,imgY ,canvasWidth, canvasHeight);
  context.drawImage(png["img/plane.png"], imgX+=x,imgY,CONFIG.planeSize.width,CONFIG.planeSize.height);
  
}
// 怪兽的方法
function enemy(){
  for(var i = 0;i < CONFIG.numPerLine;i++){
      context.drawImage(png["img/enemy.png"], imgX+=x,imgY,CONFIG.planeSize.width,CONFIG.planeSize.height);
  }
}











  })();
  
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
// GAME.init();

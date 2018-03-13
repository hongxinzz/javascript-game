// 元素
var container = document.getElementById('game');
var canvas = document.getElementById('canvas');
var context =  canvas.getContext('2d');
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
// 判断是否有 requestAnimationFrame 方法，如果有则模拟实现
window.requestAnimFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
    window.setTimeout(callback, 1000 / 30);
};
/**
 * 整个游戏对象
 */
var GAME = {
    //加載默認
  init:function(opts){
    // 合并默认参数
    var opts = Object.assign({}, opts, CONFIG);
    console.log(opts)
    var rs = this;
    // 飞机初始化坐标
    var planeWidth = opts.planeSize.width;
    this.planeWidth = opts.planeSize.width;
    this.planeHeight = opts.planeSize.height;
    this.planeStartX = (canvasWidth - opts.planeSize.width) / 2;
    this.planeStartY = canvasHeight - opts.planeSize.height - opts.canvasPadding;
    // 飞机的可移动最大位置和最小位置
    this.planeMaxX = canvasWidth -  opts.canvasPadding - planeWidth;
    this.planeMinX = opts.canvasPadding;
    //飞机速度
    this.speed = opts.planeSpeed;
    // 怪物的移動位置
    this.enemyMaxX = this.planeMaxX;
    this.enemyMinX = this.planeMinX;
    //怪獸默認第一只
    this.emenyPosX = opts.canvasPadding;
    this.emenyPosY = opts.canvasPadding;

    // 图标
    enemyIcon = opts.enemyIcon;
    planeIcon = opts.planeIcon;
    enemyBoomIcon = opts.enemyBoomIcon;
    // 图片保存在数组
    var img = [
       enemyIcon,
       planeIcon,
        enemyBoomIcon
    ]
    console.log(img)
    rs.picLoad(img);
  },
  //圖片加載
  picLoad:function(pic){
    var rs = this;  
    var num = 0;   //默认加载为0
    var images = [];  
    var img = pic.length; //进来的图片个数
    //分别为怪兽 怪兽爆炸 飞机
    for(var i = 0; i < img; i++){
        images[i] = new Image();
        images[i].src = pic[i];
        images[i].onload = function(){
            num++;
            if (num === img) {
                rs.bindEvent();
            };
        } 
    }
    // 飞机图标
    this.planeIcon = images[1];
  },
  //游戏按钮绑定
  bindEvent:function(){
    console.log('绑定事件')
    var rs = this;
    var playBtn = document.querySelector('.js-play');
    playBtn.onclick = function(){
        rs.play();
    }
  },//游戏状态
  setStatus: function(status) {
    this.status = status;
    container.setAttribute("data-status", status);
  },//开始游戏
  play:function(){
    var rs = this;
    var opts = this.opts;
    // var planeIconImage = rs.planeIcon;
    // 实例飞机
    this.plane = new plane({
        x:rs.planeStartX, 
        y:rs.planeStartY,
        width:rs.planeWidth,
        height:rs.planeHeight,
        speed:rs.speed,
        planeMaxX:rs.planeMaxX,
        planeMinX:rs.planeMinX,
        planeIconImage:rs.planeIcon
    })
    // 更改游戏状态
    this.setStatus('playing');
  },//飞机初始化
  update:function(){
    alert(1)
     var rs = this;
     var opts = this.opts;
     context.clearRect(0, 0, canvasWidth, canvasHeight);
     this.plane.draw();
     // 不断循环 update
    requestAnimFrame(function() {
        console.log(1)
      rs.update()
    });
  },
  draw:function(){
    this.plane.draw();
  }
}

GAME.init();

    

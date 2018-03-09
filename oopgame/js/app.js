// 元素
var container = document.getElementById('game');
var canvas = document.getElementById('canvas');
var context =  canvas.getContext('2d');
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
/**
 * 游戏相关配置
 * @type {Object}
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
    // 图标
    enemyIcon = opts.enemyIcon;
    planeIcon = opts.planeIcon;
    enemyBoomIcon = opts.enemyBoomIcon;
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
                rs.bindEvent()
            };
        } 
    }
  },//游戏按钮绑定
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
    this.setStatus('playing');
  },//飞机初始化
  plane:function(){
    var rs = this;
  }
}

GAME.init();

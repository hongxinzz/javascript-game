// 元素
var container = document.getElementById('game');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
// 判断是否有 requestAnimationFrame 方法，如果有则模拟实现
window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 120);
  };
(function () {
  window.GAME = function () {
    this.status = 'start', // 游戏开始默认为开始中
      this.level = 1, // 游戏默认等级
      this.totalLevel = 6, // 总共6关
      this.numPerLine = 6, // 游戏默认每行多少个怪兽
      this.canvasPadding = 30, // 默认画布的间隔
      this.bulletSize = 10, // 默认子弹长度
      this.bulletSpeed = 10, // 默认子弹的移动速度
      this.enemySpeed = 2, // 默认敌人移动距离
      this.enemySize = 50, // 默认敌人的尺寸
      this.enemyGap = 10,  // 默认敌人之间的间距
      this.enemyIcon = './img/enemy.png', // 怪兽的图像
      this.enemyBoomIcon = './img/boom.png', // 怪兽死亡的图像
      this.enemyDirection = 'right', // 默认敌人一开始往右移动
      this.planeSpeed = 5, // 默认飞机每一步移动的距离
      this.planeSize = {
        width: 60,
        height: 100
      }, // 默认飞机的尺寸,
      this.planeIcon = './img/plane.png'
      this.monsterList = []
      this.planeWidth = this.planeSize.width;
      this.planeHeight = this.planeSize.height;
      this.planeStartX = (canvasWidth - this.planeSize.width) / 2;
      this.planeStartY = canvasHeight - this.planeSize.height - this.canvasPadding;
      // 飞机的可移动最大位置和最小位置
      this.planeMaxX = canvasWidth -  this.canvasPadding - this.planeWidth;
      this.planeMinX = this.canvasPadding;
      //飞机速度
      this.speed = this.planeSpeed;
      this.init(this.enemyIcon, this.enemyBoomIcon, this.planeIcon)
    }
  GAME.prototype.init = function () {
    console.log(arguments)
    var _than = this;
    var count = 0;
    for (var i = 0; i < arguments.length; i++) {
      var img = new Image();
      img.src = arguments[i];
      console.log(img)
      img.onload = function () {
        count++;
        if (count == arguments.length) {
          console.log('加载完成了，开始游戏', _than)
          _than.Beforetart();
        }
      }
    }
  }

  GAME.prototype.Beforetart = function () {
    console.log('游戏之前的操作,绑定事件')
    var _than = this;
    var playBtn = document.querySelector('.js-play');
    playBtn.onclick = function () {
      _than.playGame();
    }

  }


  GAME.prototype.playGame = function () {
    var _than = this;
    console.log('游戏开始了,开始切换界面，游戏初始化,初始化一个飞机,和怪兽');
    container.setAttribute("data-status", 'playing');
    for (let i = 0; i < _than.numPerLine; i++) {
      let gap = (_than.enemyGap + _than.enemySize) * i
      _than.monsterList.push(_than.monster = new Monster(_than.enemyIcon, _than.enemySize, gap, _than.enemySpeed,_than.planeMaxX))
    }
    _than.plane = new plane({
      x:_than.planeStartX, 
      y:_than.planeStartY,
      width:_than.planeWidth,
      height:_than.planeHeight,
      speed:_than.speed,
      planeMaxX:_than.planeMaxX,
      planeMinX:_than.planeMinX,
      planeIconImage:_than.planeIcon,
      bulletSpeed:_than.bulletSpeed,
      bulletSize:_than.bulletSize
    })
    _than.update()
  }

  GAME.prototype.draw = function () {
    for(var i = 0; i < this.monsterList.length;i++){
      this.monsterList[i].draw()
    }
    this.plane.draw()
    // this.monster.check(this.monsterList)
    // console.log(this)
  }
  GAME.prototype.update = function () {
    var _than = this;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    _than.draw()
    requestAnimFrame(function () {
      _than.update()
    });
  }
})()
new GAME()
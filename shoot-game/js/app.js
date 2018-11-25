// 元素
var container = document.getElementById('game');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
// 判断是否有 requestAnimationFrame 方法，如果有则模拟实现
var requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
var myReq;
(function () {
  function $(className) {
    return document.querySelector(className)
  }
  window.GAME = function () {
    this.init() //传入图片 用来加载游戏
  }
  GAME.prototype.init = function () {
    var config = Object.assign({}, config, CONFIG);
    this.opts = config
    console.log(this.opts)
    this.planeWidth = this.opts.planeSize.width,
    this.planeHeight = this.opts.planeSize.height,
    this.planeStartX = (canvasWidth - this.opts.planeSize.width) / 2,//飞机最大的移动距离X轴
    this.planeStartY = canvasHeight - this.opts.planeSize.height - this.opts.canvasPadding,//飞机的X轴
    // 飞机的可移动最大位置和最小位置
    this.planeMaxX = canvasWidth - this.opts.canvasPadding - this.planeWidth,
    this.planeMinX = this.opts.canvasPadding,
    //飞机速度
    this.speed = this.opts.planeSpeed

    this.monsterList = [] //怪兽的实例数组
    this.planeBullet = []//飞机的子弹实例
    console.log(arguments)
    var that = this;
    var count = 0;
    //初始化数组的图片
    this.gamePic = [this.opts.enemyIcon, this.opts.enemyBoomIcon, this.opts.planeIcon]
    for (var i = 0; i < this.gamePic.length; i++) {
      var img = new Image();
      img.src = this.gamePic[i];
      console.log(img)
      img.onload = function () {
        count++;
        if (count == game.gamePic.length) {
          //如果图片的长度和数字一样 就显示游戏界面，关闭loading页面
          console.log('加载完成了，开始游戏', that)
          $('.loading').style.display = 'none';
          $('.game-intro').style.display = 'block';
          that.Beforetart();
        }
      }
    }
  }

  GAME.prototype.Beforetart = function () {
    console.log('游戏之前的操作,绑定事件')
    var that = this;
    var playBtn = document.querySelector('.js-play');
    playBtn.onclick = function () {
      game.opts.gameNum = 0;
      that.playGame();
    }

  }


  GAME.prototype.playGame = function () {
    game.opts.status = 'start';
    $('.game-intro').style.display = 'none';
    canvas.style.display = "block";
    container.setAttribute("data-status", 'playing');
    console.log('游戏开始了,开始切换界面，游戏初始化,初始化一个飞机,和怪兽和分数');
    for (let i = 0; i < game.opts.level; i++) { //关卡等级越高出现的怪兽越多
      for (let j = 0; j < game.opts.numPerLine; j++) {
        let gap = (game.opts.enemyGap + game.opts.enemySize) * j
        game.monsterList.push(game.monster = new Monster(game.opts.enemyIcon, game.opts.enemySize, gap, game.opts.enemySpeed, game.planeMaxX, game.opts.canvasPadding + i * game.opts.enemySize))
        console.log(game.monsterList)
      }
    }

    console.log(game)
    //飞机的实例
    game.plane = new plane({
      x: game.planeStartX,
      y: game.planeStartY,
      width: game.planeWidth,
      height: game.planeHeight,
      speed: game.speed,
      planeMaxX: game.planeMaxX,
      planeMinX: game.planeMinX,
      planeIconImage: game.opts.planeIcon,
      bulletSpeed: game.opts.bulletSpeed,
      bulletSize: game.opts.bulletSize
    })
    //键盘的实例
    game.keyBoard = new KeyBoard()
    this.update()
  }

  GAME.prototype.draw = function () {
    //左上角分数样式
    context.font = game.opts.fontSize;
    context.fillStyle = game.opts.fillStyle;
    context.fillText('分数:' + game.opts.gameNum, 20, 20)
    //每一个怪兽都画出来
    for (var i = 0; i < this.monsterList.length; i++) {
      this.monsterList[i].draw()
    }
    //每一颗子弹都画出来
    for (var i = 0; i < this.planeBullet.length; i++) {
      this.planeBullet[i].draw()
    }
    //画飞机
    this.plane.draw()
  }
  GAME.prototype.update = function () {
    var that = this;
    //每次更新判断游戏状态
    if (game.opts.status == "gameover") {
      this.monsterList = []
      window.cancelAnimationFrame(myReq)
      container.setAttribute("data-status", 'gameOver');
      canvas.style.display = "none";
      $(".score").innerHTML = game.opts.gameNum;
      $('.game-failed').style.display = 'block';
      return
    }
    //清空画布
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    that.draw()
    that.updatePlane()
    myReq = requestAnimFrame(function () {
      that.update()
    });
  }

  GAME.prototype.updatePlane = function () {
    var plane = this.plane;
    var keyBoard = this.keyBoard;
    // console.log(keyBoard)
    // 如果按了左方向键或者长按左方向键
    if (keyBoard.pressedLeft) {
      plane.translate('left');
    }
    // 如果按了右方向键或者长按右方向键
    if (keyBoard.pressedRight) {
      plane.translate('right');
    }
    // 如果按了上方向键
    if (keyBoard.pressedUp || keyBoard.pressedSpace) {
      // 飞机射击子弹
      plane.shoot();
      this.gameNext()
      // 取消飞机射击
      keyBoard.pressedUp = false;
      keyBoard.pressedSpace = false;
    }
  }

  GAME.prototype.gameCount = function (index) {
    // 去除子弹碰到怪兽的 以及超出画布的
    game.planeBullet.splice(game.planeBullet.indexOf(this) + 1, 1)
    game.opts.numPerLine--;
    game.opts.gameNum++;
    game.monsterList.splice(index, 1)
  }
  GAME.prototype.gameNext = function () {
    //如果怪兽实例没了 并且当前关卡不是最大的关卡 就显示继续游戏
    if (this.monsterList && this.monsterList <= 0 && game.opts.totalLevel != game.opts.level) {
      this.monsterList = []
      window.cancelAnimationFrame(myReq)
      container.setAttribute("data-status", 'next');
      canvas.style.display = "none";
      $('.game-success').style.display = 'block';
      $('.sucess').innerHTML = '当前得分:'+ game.opts.gameNum +'<br> 下个关卡:Level '+ (game.opts.level+1);
      // 通关了
    }
    //如果怪兽实例没了 并且当前关卡是最大的关卡 就显示游戏成功
    if (this.monsterList && this.monsterList <= 0 && game.opts.totalLevel == game.opts.level) {
      container.setAttribute("data-status", 'end');
      canvas.style.display = "none";
      $('.game-all-success').style.display = 'block';
    }
  }

  $('.js-next').onclick = function () {
    //下一关的操作
    container.setAttribute("data-status", 'playing');
    canvas.style.display = "block";
    $('.game-success').style.display = 'none';
    game.opts.level += 1;
    game.opts.numPerLine = 6
    game.opts.enemyDirection = 'right'
    game.playGame();
  };
  $('.js-replay').onclick = function () {
    //再来一次
    $('.game-failed').style.display = 'none';
    $('.game-all-success').style.display = 'none';
    $('.game-intro').style.display = 'block'
    game.opts.level = 1;
    game.opts.numPerLine = 6
    game.opts.enemyDirection = 'right'
  }
})()
var game = new GAME()


// 飞机的方法
var plane = function(opts){
    var opts = opts || {};
    this.moveX = opts.x;
    this.moveY = opts.y;
    this.speed = opts.speed;
    this.planeMinX = opts.planeMinX;
    this.planeMaxX = opts.planeMaxX;
    this.planeIcon = opts.planeIconImage;
    this.planeWidth = opts.width;
    this.planeHeight = opts.height;
    // 子弹对象数组
    this.bullets = [];
    this.bulletSpeed = opts.bulletSpeed;
    this.bulletSize = opts.bulletSize;
}
plane.prototype = {
    translate:function(direction){
        var addX;
        if (direction === 'left') {
          // 判断是否到达左边界，是的话则不移动，否则移动一个身位
          addX = this.moveX < this.planeMinX ? 0 : -this.speed;
          console.log(addX)
        } else {
          // 判断是否到达右边界，是的话则不移动，否则移动一个身位
          addX = this.moveX > this.planeMaxX ? 0 : this.speed;
        }
        this.move(addX, 0);
        return this;
    },
    move:function(addX,num){
        this.moveX = addX? this.moveX +addX: this.moveX +0
    },
    shoot:function(){
        var x = this.moveX + this.planeWidth / 2;
        // 创建子弹
        game.planeBullet.push(new Bullet({
          x: x,
          y: this.moveY,
          size: this.bulletSize,
          speed: this.bulletSpeed 
        }));
    },
    draw:function(){
        var img = new Image();
        img.src = this.planeIcon
        context.drawImage(img,this.moveX,this.moveY,this.planeWidth,this.planeHeight)
    }
}

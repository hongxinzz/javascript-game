
// 飞机的方法
var plane = function(opts){
  document.onkeydown = this.keydown.bind(this);
  console.log(opts)
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
    keydown:function(event){
        var key  = event.keyCode;
        switch(key){
            case 32: 
            this.shoot();
            break;
            case 37:
            this.move(-this.speed)
            break;
            case 39:
            this.move(this.speed)
            break;
        }
    },
    move:function(speed){
        this.moveX += speed;
        if (this.moveX && this.moveX >= this.planeMaxX) {
            this.moveX = this.planeMaxX;
        }
        if(this.moveX && this.moveX <= this.planeMinX){
            this.moveX = this.planeMinX;
        }
        console.log(this.moveX)
    },
    shoot:function(){
        var x = this.moveX + this.planeWidth / 2;
        // 创建子弹
        this.bullets.push(new Bullet({
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
        this.bullets
    }
}

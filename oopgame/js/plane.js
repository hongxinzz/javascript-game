
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
}
plane.prototype = {
    keydown:function(event){
        var key  = event.keyCode;
        switch(key){
            case 37:
            this.move(-this.speed)
            break;
            case 39:
            this.move(this.speed)
            break;
        }
    },
    move:function(speed){
        var newX = this.moveX += speed;
        if (newX && newX >= this.planeMaxX) {
            newX = this.planeMaxX;
        }
        if(newX && newX <= this.planeMinX){
            newX = this.planeMinX;
        }
        
    },
    draw:function(){
        console.log(this.planeIcon)
        context.drawImage(this.planeIcon,this.moveX,this.moveY,this.planeWidth,this.planeHeight)
    }
}

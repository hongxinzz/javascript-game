var Bullet = function(opts){
    this.x = opts.x,
    this.y = opts.y,
    this.size = opts.size,
    this.speed = opts.speed
    this.draw()
}



Bullet.prototype.draw = function() {
  // 绘画一个线条
  context.beginPath();
  context.strokeStyle = '#fff';
  context.moveTo(this.x, this.y);
  context.lineTo(this.x, this.y - this.size); // 子弹尺寸不支持修改);
  context.lineWidth = 5;
  context.stroke();
  context.closePath();
}
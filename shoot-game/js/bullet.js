var Bullet = function(opts){
    var opts = opts||{};
    console.log(opts)
}



Bullet.prototype.draw = function() {
  // 绘画一个线条
  context.beginPath();
  context.strokeStyle = '#fff';
  context.moveTo(this.x, this.y);
  context.lineTo(this.x, this.y - this.size); // 子弹尺寸不支持修改);
  context.closePath();
  context.stroke();
  return this;
}
var Bullet = function(opts){
    this.x = opts.x,
    this.y = opts.y,
    this.size = opts.size,
    this.speed = opts.speed
}

Bullet.prototype.draw = function() {
  // 绘画一个线条
  context.beginPath();
  context.strokeStyle = '#fff';
  context.moveTo(this.x, this.y);
  context.lineTo(this.x, this.y - this.size); // 子弹尺寸不支持修改);
  // context.lineWidth = this.size;
  context.stroke();
  context.closePath();
  this.move();
}

Bullet.prototype.move = function(){
  this.y -= this.speed;
  if(this.y <= 0){
    game.planeBullet.splice(game.planeBullet.indexOf(this),1)
  }  
  for(var i = 0; i < game.monsterList.length;i++){
    if(this.y <= game.monsterList[i].y && this.x < game.monsterList[i].gap  && this.x > game.monsterList[i].gap - game.opts.enemySize){
      game.monsterList[i].momster = game.opts.enemyBoomIcon;
      console.log('我碰到怪兽了')
      game.gameCount(i);
    } 
  }
}
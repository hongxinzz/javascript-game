var Monster = function(momster,size,gap,speed,maxX,y){
    this.momster = momster
    this.size = size
    this.gap = gap
    this.speed = speed
    this.y = y
    this.maxX = maxX
}
Monster.prototype.move = function(){
    this.gap += this.speed

    if (game.enemyDirection == 'right' && this.gap >= this.maxX) {
        game.monsterList.splice(0,game.monsterList.length)
        var y = this.y + game.enemySize
        for (let i = 0; i < game.numPerLine; i++) {
            let gap = (canvasWidth - game.canvasPadding * 2) - (game.enemySize * i)
            game.monsterList.push(game.monster = new Monster(game.enemyIcon, game.enemySize, gap, -game.enemySpeed, game.planeMaxX, y))
          }
        game.enemyDirection ='left'
      } else if(this.gap <= 0 &&  game.enemyDirection =='left'){
        game.monsterList.splice(0,game.monsterList.length)
       var y = this.y + game.enemySize
        for (let i = 0; i < game.numPerLine; i++) {
            let gap = (game.enemyGap + game.enemySize) * i
            game.monsterList.push(game.monster = new Monster(game.enemyIcon, game.enemySize, gap, game.enemySpeed, game.planeMaxX, y))
          }
          game.enemyDirection ='left'
      }
}
Monster.prototype.draw = function(){
    var img = new Image()
    img.src = this.momster
    this.move()
    context.drawImage(img,this.gap,this.y,this.size,this.size)
}

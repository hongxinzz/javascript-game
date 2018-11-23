var Monster = function (momster, size, gap, speed, maxX, y) {
    this.momster = momster
    this.size = size
    this.gap = gap
    this.speed = speed
    this.y = y
    this.maxX = maxX
}
Monster.prototype.move = function () {
    this.gap += this.speed
    if(this.y >= game.planeStartY - game.planeHeight){
        game.opts.status = 'gameover'
    }
    console.log(game.gameOver )
    if (game.opts.enemyDirection == 'right' && this.gap >= this.maxX) {
        for(let i = 0;i < game.monsterList.length;i++){
            game.monsterList[i].y += game.opts.enemySize
            game.monsterList[i].speed = -2
        }
        game.opts.enemyDirection = 'left'
    } else if (this.gap <= 0 && game.opts.enemyDirection == 'left') {
        for(let i = 0;i < game.monsterList.length;i++){
            game.monsterList[i].y += game.opts.enemySize
            game.monsterList[i].speed = 2
        }
        game.opts.enemyDirection = 'right'
    }
}
Monster.prototype.draw = function () {
    var img = new Image()
    img.src = this.momster
    this.move()
    context.drawImage(img, this.gap, this.y, this.size, this.size)
}

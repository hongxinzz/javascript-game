var Monster = function(momster,size,gap,speed,maxX){
    this.momster = momster
    this.size = size
    this.gap = gap
    this.speed = speed
    this.y = 0
    this.maxX = maxX
    this.count = 0
}
Monster.prototype.move = function(){
    this.gap = this.gap +  this.speed
    if(this.gap >= this.maxX){
        this.count++
        console.log('大于宽度了')
        this.speed = -this.speed 
        this.y = this.size *this.count
        this.gap = this.gap + this.speed
    }else if(this.gap <= 0){
        this.count++
        console.log('小于宽度了')
        this.speed = -this.speed
        this.y = this.size *this.count
        this.gap = this.gap + this.speed
    }
}
Monster.prototype.draw = function(){
    var img = new Image()
    img.src = this.momster
    context.drawImage(img,this.gap,this.y,this.size,this.size)
    console.log(this)
    this.move()
}

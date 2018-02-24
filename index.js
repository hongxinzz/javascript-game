// 获取id
function $(id){
     return document.getElementById(id);
}
var zz = document.getElementsByClassName('block');
// 默认属性
var bool = 0; //设置避免点击开始游戏累加网格
var isLei = []; //雷数组
var time = 0; // 时间
var mine = 10;
// 点击开始按钮生成10x10网格并且切换场景

$('gameStart').onclick = function(){
    time = 0;
    $('time').innerHTML = '已用时'+ time +'秒';
    init();
    seacn();
    repeatNum();
    mouseDown();
    $('ulWrap').oncontextmenu = function(){
        return false;
    }
    $('isLeiNum').innerHTML = mine;
    timer = setInterval(function(){
        time++;
        $('time').innerHTML = '已用时'+ time +'秒';
    },1000)
}
//场景切换
function seacn(){
    $('gameStart').style.display = "none";
    $('mineWrap').style.display = "block";
}
// 鼠标左右事件
function mouseDown(){
    var lis = document.getElementsByTagName('li');
    for(var i = 0; i< lis.length;i++){
        lis[i].onmousedown = function(e){
             // alert(1)
            var event = e.target;
            if (e.which == 1 ) {
                leftClick(event);
                var lis = document.getElementsByTagName('li');
                for (var i = 0; i < lis.length; i++) {
                    lis[i].onclick = function (){
                        this.classList.add('check')
                    }
                scearLel();
                };
            }
            else if(e.which == 3 ){
                    rightClick(event);
                    $('isLeiNum').innerHTML = mine;
                };
        }
    }
}

// 网格
function init(){
    // 生成网格并添加class
    if(bool === 0){
        for(var i = 0; i < 10; i++){
            for (var j = 0; j < 10; j++) {
                li = document.createElement('li');
                li.classList.add('block')
                li.setAttribute('id',i + "-" + j)
                $('ulWrap').append(li);
            };
        }
        bool = 1;
    }
    
}

// 判断是否重复并重新随机
function repeatNum (){
     block = document.getElementsByClassName('block');
    for (var i = 1; i < 11; i++) {
        var mine = Math.floor(Math.random() * 100);
        block[mine].classList.add('isLei');
        // block[mine].classList.remove('block');
           console.log(isLei)
           isLei.push(mine)
    };
    var aryNum = isLei.sort();
    // console.log(aryNum)
    for (var i = 0; i < isLei.length; i++) {
        if (aryNum[i] === aryNum[i+1]) {
             console.log('雷重复了')
                isLei=[]
             repeatNum();
         }
         return isLei.length
     };

    console.log(isLei.length)
}

// 左点击事件
function leftClick(dom){
    var isLei = document.getElementsByClassName('isLei');
    var block = document.getElementsByClassName('block');
    if (dom.classList.contains('isLei')) {
            leiIndex();
    }else{
        // block.addClass.add('check')
        var num = 0;
        var postArr = dom.getAttribute('id').split('-');
        console.log(postArr[0],postArr[1])
        var postX = + postArr[0];
        var postY = + postArr[1];
        console.log('X为:'+ postX,'Y为:'+ postY)
        for(var i = postX-1;i <= postX + 1;i++){
            for(var j = postY-1;j <= postY + 1;j++){
                var aroundDom = document.getElementById(i+'-'+j);
                if(aroundDom && aroundDom.classList.contains('isLei')){
                    num++;
                    console.log(num)
                }
            }
        }
        dom && (dom.innerHTML = num)
        if(num === 0){
            for(var i = postX-1;i <= postX + 1;i++){
                for(var j = postY-1;j <= postY + 1;j++){
                    var nearDom = document.getElementById(i+'-'+j);
                    if(nearDom){
                        if(!nearDom.classList.contains('check')){
                            nearDom.classList.add('check');
                            leftClick(nearDom)
                        }
                    }
                }
            }
        }
    };
}
// 附近八个的坐标
//         i-1,j-1  i-1,j  i-1,j+1  
//         i,j-1    i.j    i,j+1
//         i+1,j-1  i+1,j  i+1,j+1
        
// 右键事件
function rightClick(dom){
    if (dom.classList.contains('check')) {
        return false;
    };
    dom.classList.toggle('green');
    if (dom.classList.contains('green') && dom.classList.contains('isLei')) {
        mine--;
        console.log(mine)
    };
    if (!dom.classList.contains('green') && dom.classList.contains('isLei')) {
        mine++;
        console.log(mine)
    };
    if (mine == 0) {
        scearLel()
    };
}
             
//点到雷之后所有的雷出现 弹出蒙版
function leiIndex(){     
    console.log('地雷','游戏结束');
    var isLei = document.getElementsByClassName('isLei');
    for (var i = 0; i < isLei.length; i++) {
         isLei[i].style.backgroundColor = 'red'
    };   
    clearInterval(timer)
    $('gameOver').style.display= "block";        
}
// 点击关闭回到第一个页面
var close = $('close').onclick = function(){
    $('gameStart').style.display = "block";
    $('mineWrap').style.display = "none";
    $('gameOver').style.display= "none";
    var lis = document.getElementsByClassName('block');
    console.log(lis.length)
    for (var i = lis.length; i > 0;i-- ) {
       $('ulWrap').removeChild(lis[0])
       console.log('删除了')
    };
   bool = 0;
   time = 0;
   isLei.length = 0;
   mine = 10;
   clearInterval(timer);
}

// 判断个数如果只剩下雷就成功
function scearLel(){
    var check = document.getElementsByClassName('check')
    var blockNum = document.getElementsByClassName('block');
    var isLei = document.getElementsByClassName('isLei'); 
    console.log(check.length,blockNum.length)
    console.log(blockNum.length - check.length)
    var sxDom = (blockNum.length - check.length) - 1;
    if (sxDom === isLei.length) {
        for (var i = 0; i < isLei.length; i++) {
                 isLei[i].style.backgroundColor = 'red'
            };   
         clearInterval(timer);
         time = 0;
         $('win').innerHTML = '通关！'
         $('again').style.display = 'block';
    };
}
// 再来一次
$('again').onclick = function(){
    close();
    this.style.display = 'none'
}
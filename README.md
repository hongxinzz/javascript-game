# javascript-game
这里将会记录我用原生js 编写出的小游戏

##扫雷
        
        游戏的基本思路就是用原生来不断的for循环去判断索引值
        
####我遇到的难点：

        1.游戏开始的节点删除问题
        2.当前格子判断周边的雷数
        3.网格叠加的问题
        
####如何解决的：

        1. 关于节点问题 
        
        var lis = document.getElementsByClassName('block');
         console.log(lis.length)
         for (var i = lis.length; i > 0;i-- ) {
            $('ulWrap').removeChild(lis[0])
          console.log('删除了')
        };

       采用的是上面的代码 
       下面是我之前用的但是节点删除不干净
       所以用了从最后一个还是一直减，减到没有
       
       for (var i = 0; i < lis.length;i++ ) {
            $('ulWrap').removeChild(lis[i])
          console.log('删除了')
       };
       2.关于周围的雷数
       
        i-1,j-1  i-1,j  i-1,j+1  
        i,j-1    i.j    i,j+1
        i+1,j-1  i+1,j  i+1,j+1
        
        用了双for去判断然后在递归自己的方法就可以搞定了 具体可以看我的代码
        
       3.当我多点击开始按钮时网格会叠加
       我用了一个 bool 去控制全局 相当于弄了一个开关
      
 #### 目前还差一个右键的功能

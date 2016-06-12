/*
 * h5场景制作步骤:
 * 1.处理适配的问题(参照background-size:cover原理)
 * 2.给每个li绑定touchstart,touchmove,touchend事件
 * 3.处理上下滑动的效果
 * 4.滑动效果完成后增加css3动画效果
 * */

var main = document.getElementById("box")
var oLis = document.getElementsByTagName("li")
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 960;

if (winW / winH > desW / desH) {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
else {
    main.style.webkitTransform = "scale(" + winH / desH + ")"
}
//循环
[].forEach.call(oLis, function () {
    var Li = arguments[0];
    Li.index = arguments[1]//保存索引
    //绑定事件
    Li.addEventListener("touchstart", start, false);
    Li.addEventListener("touchmove", move, false);
    Li.addEventListener("touchend", end, false);
})
//计算出点击时候的起始位置坐标

function start(e) {
    this.startY = e.changedTouches[0].pageY;
    console.log("ok")

}
function move(e) {
    e.preventDefault();
    var curY = e.changedTouches[0].pageY;
    var moveY = curY - this.startY;
    var index = this.index;
[].forEach.call(oLis,function(){
   if(arguments[1]!=index){
       arguments[0].style.display="none"
   }
})

    //向下
    if (moveY > 0) {
        this.prevIndex = index == oLis.length - 1 ? 0 : index + 1;
        var duration = -winH + moveY;


    } else if (moveY < 0) {
        this.prevIndex = index == 0 ? oLis.length - 1 : index - 1;
        var duration = winH + moveY;
        console.log("ok")
    }

    oLis[this.prevIndex].className = "zindex";
    oLis[this.prevIndex].style.webkitTransform = "translate(0," + duration + "px)";
    oLis[this.prevIndex].style.display="block"
    oLis[index].className = "zindex-11";

}
function end(e) {
    oLis[this.prevIndex].style.webkitTransform = "translate(0,0)";
    oLis[this.prevIndex].style.transition="1s";
    oLis[this.prevIndex].addEventListener("webkitTransitionEnd",function(){
        this.style.webkitTransition = "";//相当于清除动画的积累
    });
}



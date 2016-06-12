/*
 * h5������������:
 * 1.�������������(����background-size:coverԭ��)
 * 2.��ÿ��li��touchstart,touchmove,touchend�¼�
 * 3.�������»�����Ч��
 * 4.����Ч����ɺ�����css3����Ч��
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
//ѭ��
[].forEach.call(oLis, function () {
    var Li = arguments[0];
    Li.index = arguments[1]//��������
    //���¼�
    Li.addEventListener("touchstart", start, false);
    Li.addEventListener("touchmove", move, false);
    Li.addEventListener("touchend", end, false);
})
//��������ʱ�����ʼλ������

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

    //����
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
        this.style.webkitTransition = "";//�൱����������Ļ���
    });
}



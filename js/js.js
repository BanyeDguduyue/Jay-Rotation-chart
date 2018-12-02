
//获取class
function getByClass(parent, sclass)
{
    var Ele = parent.getElementsByTagName('*');
    var Result = [];

    for (var i=0; i<Ele.length; i++)
    {
        if (Ele[i].className == sclass)
        {
            Result.push(Ele[i]);
        }
    }
    return Result;
}



function getStyle(obj, attr) {
    if (obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj,false)[attr];
    }
}





function startMove(obj,attr,target)
{
    clearInterval(obj.timer);

    obj.timer=setInterval(function () {
        var cur = 0;
        if (attr == 'opacity')
        {
            cur=Math.round(parseFloat(getStyle(obj,attr))*100);
        }
        else
        {
            cur=parseInt(getStyle(obj,attr));
        }

        var speed=(target-cur)/10;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);
        if (cur == target)
        {
            clearInterval(obj.timer);
        }
        else
        {
            if (attr=='opacity')
            {
                obj.style.opacity = (cur+speed)/100;
                obj.style.filter = "alpha(opacity:'+(cur+speed)+')";
            }
            else
            {
                obj.style[attr] = cur+speed+'px';
            }
        }
    },30)
}










window.onload = function ()
{

    var wrap = document.getElementById("wrap");
    var large_ul = getByClass(wrap,"Ul_large")[0];
    var large_lis = large_ul.getElementsByTagName('li');

    var small_ul = getByClass(wrap,"Ul_small")[0];
    var small_lis = small_ul.getElementsByTagName("li");

    var pre = document.getElementById("pre");
    var next = document.getElementById("next");

    var nowZIndex = 3;
    var now = 0;

    small_ul.style.width = small_lis.length*small_lis[0].offsetWidth+'px';

//点击小图片切换大图片

    //第一张图默认是高亮
    startMove(small_lis[now],'opacity',100);



    for (var i=0; i<small_lis.length; i++)
    {

        small_lis[i].index = i;
        small_lis[i].onclick = function ()
        {
            if (this.index == now)return;
            now = this.index;

            large_lis[now].timer=null;

            tab()
        };


        small_lis[i].onmouseover = function ()
        {
            startMove(this,"opacity",100)
        };
        small_lis[i].onmouseout = function ()
        {
            if (this.index!=now)
            {
                startMove(this,"opacity",60)
            }
        }
    }


    function tab(){
        large_lis[now].style.zIndex = nowZIndex++;
        large_lis[now].style.height = 0;
        startMove(large_lis[now],'height',321);


        for (var i=0; i<small_lis.length; i++)
        {
            startMove(small_lis[i],"opacity",60)
        }
        startMove(small_lis[now],'opacity',100);

        if (now == 0)
        {
            startMove(small_ul,'left',0)
        }else if (now == small_lis.length-1)
        {
            startMove(small_ul,'left',-(now-2)*small_lis[0].offsetWidth);
        }
        else
        {
            startMove(small_ul,'left',-(now-1)*small_lis[0].offsetWidth);
        }

    }


//上一张下一张
    pre.onclick = function ()
    {
        now--;
        if (now == -1)
        {
            now = small_lis.length-1;
        }
        tab()
    };


    next.onclick = function ()
    {
        now++;
        if (now == small_lis.length)
        {
            now = 0;
        }
        tab()
    }


//自动播放

    var timer=setInterval(next.onclick,2000);

    wrap.onmouseover = function () {
        clearInterval(timer);
    };
    wrap.onmouseout = function () {
        timer=setInterval(next.onclick,2000);
    }
};


window.onload=function(){

	//按需加载
	var floor=$(".floor");
	var ch=document.documentElement.clientHeight;

    var flag=true;
    var flag1=true;
    var floors=$(".floor");
	var jump=$(".jump")[0];
	var btnt=$("li",jump);
	var movetiao=$(".movetiao");
	//跳转按钮单击事件
	for (var i = 0; i < btnt.length; i++) {
		btnt[i].index=i;
		btnt[i].onclick=function(){
			
			var obj=document.documentElement.scrollTop?document.documentElement:document.body;
			animate(obj,{scrollTop:floors[this.index].t},600,Tween.Linear);
		}
	};


	  window.onscroll=function()
   {
        var scrollT=getScrollT()
        if(scrollT>=440)
        {
            if(flag)
            {
                
                flag=false;
                flag1=true;
            }
        }
        else{
            if(flag1)
            {
              
                flag1=false;
                flag=true;
            }
        }
    // 显示跳转按钮
      if(scrollT>=1200)
        {
            jump.style.display="block";
        }else{
            jump.style.display="none";
        }
   //跳转按钮的变化
   for(var i=0;i<floors.length;i++)
   {
       floors[i].t=floors[i].offsetTop;
       if(floors[i].t<=scrollT-100)
       {
           for(var j=0;j<btnt.length;j++)
           {
               btnt[j].style.backgroundColor="white";
               btnt[j].style.color="black";
               movetiao[j].style.display="none";
           }
           btnt[i].style.backgroundColor="pink";
           btnt[i].style.color="red";
           movetiao[i].style.display="block";

       }
   }

   for(var k=0;k<btnt.length;k++){
   	btnt[k].index=k;
   	btnt[k].onmouseover=function(){
   		for(var m=0;m<movetiao.length;m++){
   			movetiao[m].style.display="none";
   		}
   		movetiao[this.index].style.display="block";
   	}
   }

    var scrollT=getScrollT();
    document.title=scrollT;
    for(var i=0;i<floors.length;i++){
       if(floor[i].offsetTop<ch+scrollT){//当前楼层到顶部的高度，如果小于页面内容超出浏览器的距离加上浏览器的距离时
        var imgsjia=$("img",floor[i]);//获取当前楼层的所有图片
        for(var j=0;j<imgsjia.length;j++){//遍历图片
            imgsjia[j].src=imgsjia[j].getAttribute("aa");
            //aa属性的值赋值给src
        }
       
       }
      }

 }



    //获取文本焦点
var sousuote=$(".sousuote")[0];
sousuote.onfocus=function(){
	if(sousuote.value=="请输入关键词"){
		sousuote.value="";
	}
}
sousuote.onblur=function(){
	if(sousuote.value==""){
		sousuote.value="请输入关键词";
	}
}


//导航轮播
var imgs=$(".imgs");
var btn=$(".btn");
num=1;
function move(){
	if(num==8){
		num=0;
	}
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].style.zIndex=2;
		btn[i].style.background="gray";
		animate(imgs[i],{opacity:0})
	};
	imgs[num].style.zIndex=3;
	btn[num].style.background="orange";
	animate(imgs[num],{opacity:1});
	num++;
}
var t=setInterval(move,2000);
for(var i=0;i<btn.length;i++){
	btn[i].index=i;
	btn[i].onmouseover=function(){
		for(var j=0;j<imgs.length;j++){
          imgs[j].style.zIndex=2;
          btn[j].style.background="gray";
          animate(imgs[j],{opacity:0});
		}
		clearInterval(t);
		imgs[this.index].style.zIndex=3;
		btn[this.index].style.background="orange";
		animate(imgs[this.index],{opacity:1});
	}
	btn[i].onmouseout=function(){
		t=setInterval(move,2000);
		num=this.index+1;
	}
}




//图片左移
function moveleft(aa){
var moveleft=$(".moveleft")[aa];
var moveimg=$("img",moveleft);
	for(var j=0;j<moveimg.length;j++){
          moveimg[j].index=j;
          moveimg[j].onmouseover=function(){
          	moveimg[this.index].style.cssText="position:relative;left:-3px";
          }
          moveimg[j].onmouseout=function(){
        	animate(moveimg[this.index],{left:0});
          }
   }
}
for(var i=0;i<2;i++){
	moveleft(i);
}

//遮罩白光
var zhezhao=$(".zhezhao");
var zhezhaobox=$(".zhezhaobox");
var zhezhao2=$(".zhezhao2")[0];
var zhezhao3=$(".zhezhao3")[0];
var haigoub=$(".haigoubigbox")[0];
var zhezhao1=$(".zhezhao1",haigoub);
var haigouimg=$(".haigouimg",haigoub);
/*
alert(zhezhaop.length);
for(var i=0;i<zhezhaop.length;i++){
	zhezhaop[this.index]=i;
	zhezhaop.onmouseover=function(){
		for(var j=0;j<zhezhao.length;j++){
		zhezhao[j].style.display="none";
	}
	zhezhao[this.index].style.display="block";
	}
	
}*/
for(var i=0;i<zhezhaobox.length;i++){
	zhezhaobox[i].index=i;
	zhezhaobox[i].onmouseover=function(){
	zhezhao[this.index].style.display="block";
	animate(zhezhao[this.index],{opacity:0},50);
		
	}
	zhezhaobox[i].onmouseout=function(){
		zhezhao[this.index].style.display="none";
		animate(zhezhao[this.index],{opacity:0.5},50);
	}
}

for(var i=0;i<haigouimg.length;i++){
	haigouimg[i].index=i;
	 haigouimg[i].onmouseover=function(){
	
		zhezhao1[this.index].style.display="block";
	    animate(zhezhao1[this.index],{opacity:0},40);
	}
	

	haigouimg[i].onmouseout=function(){
		zhezhao1[this.index].style.display="none";
		animate(zhezhao1[this.index],{opacity:0.5},40);	
	}
}
 var haigoubozbk=$(".haigouzbk")[0];
 var haigouzjuhui=$(".haigouzjuhui")[0];
 var zhezhao2=$(".zhezhao2",haigoubozbk)[0];
 var zhezhao3=$(".zhezhao3",haigouzjuhui)[0];
haigoubozbk.onmouseover=function(){
	zhezhao2.style.display="block";
	animate(zhezhao2,{opacity:0},40);
}
haigoubozbk.onmouseout=function(){
	zhezhao2.style.display="none";
	animate(zhezhao2,{opacity:0.5},40);
}
haigouzjuhui.onmouseover=function(){
	zhezhao3.style.display="block";
	animate(zhezhao3,{opacity:0},40);
}
haigouzjuhui.onmouseout=function(){
	zhezhao3.style.display="none";
	animate(zhezhao3,{opacity:0.5},40);
}

var haigouright=$(".haigouboright")[0];
var zhezhao4=$(".zhezhao4",haigouright)[0];
haigouright.onmouseover=function(){
	zhezhao4.style.display="block";
	animate(zhezhao4,{opacity:0},40);
}
haigouright.onmouseout=function(){
	zhezhao4.style.display="none";
	animate(zhezhao4,{opacity:0.5},40);
}

var wuwu=$(".wuwu");
var zhezhao5=$(".zhezhao5");
	wuwu[0].onmouseover=function(){
	zhezhao5[0].style.display="block";
	animate(zhezhao5[0],{opacity:0},40);
	}
	wuwu[0].onmouseout=function(){
	zhezhao5[0].style.display="none";
	animate(zhezhao5[0],{opacity:0.5},40);
	}
wuwu[1].onmouseover=function(){
	zhezhao5[1].style.display="block";
	animate(zhezhao5[1],{opacity:0},40);
	}
	wuwu[1].onmouseout=function(){
	zhezhao5[1].style.display="none";
	animate(zhezhao5[1],{opacity:0.5},40);
	}
/*zhezhaop[2].onmouseover=function(){
	zhezhao2.style.opacity=0.4;
	animate(zhezhao2,{opacity:0},1000);
}
zhezhaop[3].onmouseover=function(){
	zhezhao3.style.opacity=0.4;
	animate(zhezhao3,{opacity:0},1000);
}*/


//轮播


function ceBo(aa){
var haigouchuwei=$(".haigouchuwei")[aa];
var hcbtn=$(".hcbtn")[aa];
var haibtn=$(".haibtn",hcbtn);
var num1=1;
function move1(){
	if(num1==3){
		animate(haigouchuwei,{left:-330*num1},10,Tween.Linear,function(){
			haigouchuwei.style.left=0;
		});
		num1=0;
	}else{
		animate(haigouchuwei,{left:-330*num1},10,Tween.Linear);

    }
	for(var i=0;i<haibtn.length;i++){
		haibtn[i].style.background="#999";
		haibtn[num1].style.background="red";
		haibtn[num1].style.width=0;
		animate(haibtn[num1],{width:30},900,Tween.Linear);
	}
	num1++;
	
	
}
var t1=setInterval(move1,2000);

for(var i=0;i<haibtn.length;i++){
    		haibtn[i].index=i;
    		haibtn[i].onmouseover=function(){
    			for(var j=0;j<haibtn.length;j++){
    				haibtn[j].style.background="#999";

    			}
    			clearInterval(t1);
    			/*animate(box,{left:-330*[this.index]},900,Tween.Linear);*/
              haibtn[this.index].style.background="red";
               animate(haibtn[this.index],{width:30},900,Tween.Linear);
               
    		}
    		haibtn[i].onmouseout=function(){
    			t1=setInterval(move1,2000);
    			num1=this.index+1;

    		}
        }

}
ceBo(0);
ceBo(1);
ceBo(2);
ceBo(3);
ceBo(4);
ceBo(5);
ceBo(6);
ceBo(7);
ceBo(8);
ceBo(9);
//侧导航
var cedao=$(".bannercedao")[0];
var lis=$("li",cedao);
var lianjie=$(".lianjie");
var dixia=$(".dixia")[0];
for(var i=0;i<lis.length;i++){
	lis[i].index=i;
	lis[i].onmouseover=function(){
		lis[this.index].style.background="#872222";
		animate(lis[this.index],{left:3},0);
		lis[this.index].style.paddingLeft="25px";
		lianjie[this.index].style.display="block";
		animate(lianjie[this.index],{left:215},10);
        dixia.style.display="block";
        cedao.style.background="#872222";

	}
	lis[i].onmouseout=function(){
		lis[this.index].style.background="#c23131";
		animate(lis[this.index],{left:0},0);
		lis[this.index].style.paddingLeft="20px";
		lianjie[this.index].style.display="none";
		animate(lianjie[this.index],{left:210},10);
		dixia.style.display="none";
		cedao.style.background="#c23131";
	}
}

//下拉
var yijibox=$(".yijibox");
var erjibox=$(".erjibox");
for(var i=0;i<yijibox.length;i++){
	yijibox[i].index=i;
   yijibox[i].onmouseover=function(){
   	for(var j=0;j<erjibox.length;j++){
   		erjibox[j].style.display="none";
   	}
   	erjibox[this.index].style.display="block";
   }
   yijibox[i].onmouseout=function(){
   	erjibox[this.index].style="none;"
 
  }
}

var loadleft1=$(".loadleft1")[0];
var dengla=$(".dengla")[0];
loadleft1.onmouseover=function(){
	dengla.style.display="block";
}
loadleft1.onmouseout=function(){
	dengla.style.display="none";
}

//手机充值
var botshou=$(".xinxichong")[0];
var bota=$("a",botshou);
for(var i=0;i<bota.length;i++){
	bota[i].index=i;
	bota[i].onclick=function(){
		for (var j = 0; j < bota.length; j++) {	
	    bota[j].style.color="#999";
		bota[j].style.borderColor="#ccc";
		bota[j].style.background="#f7f7f7";
		};
	    bota[this.index].style.color="red";
		bota[this.index].style.borderColor="#fff";
		bota[this.index].style.background="#fff";
	}
	/*bota[i].onmouseout=function(){
		bota[this.index].style.color="#999";
		bota[this.index].style.borderColor="#ccc";
		bota[this.index].style.background="#f7f7f7";
	}*/
}


//闪购--选项卡轮播
var shangoutop=$(".shangoutop")[0];
var shangoudp=$("span",shangoutop);
var shanimg=$("img",shangoutop)[0];
var shangoubotbox=$(".shangoubotbox");
var num2=1;
function move2(){
	if(num2==3){
		animate(shanimg,{left:84})
		num2=0;
	}
	for (var i = 0; i < shangoubotbox.length; i++) {
		shangoubotbox[i].style.zIndex=2;
		shangoudp[i].style.color="#333";
	};
    shangoubotbox[num2].style.zIndex=3;
    shangoudp[num2].style.color="#CEA145";
    animate(shanimg,{left:(84+80*num2)});
    num2++;
}
var t2=setInterval(move2,15000);

for (var i = 0; i < shangoudp.length; i++) {
	shangoudp[i].index=i;
	shangoudp[i].onmouseover=function(){
		for (var j = 0; j < shangoudp.length; j++) {
			shangoubotbox[j].style.zIndex=2;
		    shangoudp[j].style.color="#333";
		};
		clearInterval(t2);
    shangoubotbox[this.index].style.zIndex=3;
    shangoudp[this.index].style.color="#CEA145";
    animate(shanimg,{left:(84+80*this.index)});
	}
	shangoudp[i].onmouseout=function(){
		t2=setInterval(move2,15000);
		num2=this.index+1;
	}
};


var bott=$(".bott");
var daoji=$(".daoji");
for (var i = 0; i < bott.length; i++) {
	bott[i].index=i;
    bott[i].onmouseover=function(){
    	for(var j=0;j<daoji.length;j++){
    		daoji[j].style.display="none";
    	}
        daoji[this.index].style.display="block";
    }
    bott[i].onmouseout=function(){
    	daoji[this.index].style.display="none";
    }
};

































}
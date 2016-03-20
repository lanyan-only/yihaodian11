//功能；获取class类名的调用，在IE8中的兼容问题
//classname  传参类名
	function getClass(classname,obj){
		var obj=obj||document;
		if(obj.getElementsByClassName){
			 //判断是w3c浏览器
			return obj.getElementsByClassName(classname);//结果返回
		}else{//否则是IE8
			var all=obj.getElementsByTagName("*");//用标签名先获取到所有元素，是一个集合
			var arr=[];
			for(var i=0;i<all.length;i++){
				if(checkRel(all[i].className,classname)){
					arr.push(all[i]);
				}
			}
			return arr;
		}
	}
	//参数说明：str：多个类名集合以后的字符串
	//          val:想找的类名
	function checkRel(str,val){
         var newarr=str.split(" ");
         //以空格拆分,字符串转换成数组
         for(var i=0;i<newarr.length;i++){//遍历all
              if(newarr[i]==val){//如果数组中的值与val相
              	return true;
              }
         }
         return false;
	}
/*var box1=getClass("box1"); 
alert(box1.length);
var boxx=getClass("box1")[0];
boxx.style.background="green";
// box2.style.background="green";*/





/*2.可以获取与设置纯文本的兼容函数
   obj：那个对象用这个方法；
   val:接收第二个实参，表示设置一个文本

*/
function getText(obj,val){
	if(val==undefined){//如果val为undefined，表示只有一个参数，这个函数实现的功能获取文本
		if(obj.innerText){//如果为真是IE8浏览器
			return obj.innerText;
		}else{//是w3c浏览器
			return obj.textContent;
		    }
    }else{
      if(obj.innerText||obj.textContent==""){//当浏览器有innerText这个属性时，或者当对象的内容为空字符串时，都可以给这个对象设置文本
		 obj.innerText=val;
		}else{//是w3c浏览器
			obj.textContent=val;

		    }
    }
}



/***********************************/
//3。获取样式
//obj：哪个对象   attr：哪个属性
function getStyle(obj,attr){
	if(obj.currentStyle){
	return obj.currentStyle[attr];
      }
else{
	return getComputedStyle(obj,null)[attr];
}
}


//4.万能获取类名，id名，标签名，name

/*
    $(".box");    类名
    $("#first")  ID名
    $("div")      标签名
*/
function $(select,obj){
	var obj=obj||document;
	if(typeof select=="string"){
		//去掉字符串前后的空格
		select=select.replace(/^\s*|\s*$/g,"");
		if(select.charAt(0)=="."){
			return getClass(select.slice(1),obj);
		}else if(select.charAt(0)=="#"){
            return obj.getElementById(select.slice(1),obj);
		}else if(/^[a-z|1-6]{1,10}$/g.test(select)){//标签名
              return obj.getElementsByTagName(select);
		}
	}else if(typeof select=="function"){
		window.onload=function(){
			select();
		}
	}
}



/**************************************************/
/*5.getChilds(parent);
    "a": 获取元素子节点的兼容函数(会获取空格)；
    "b":获取元素+文本节点


    原理：先获取所有的儿子，然后根据节点的类型判断，如果为1，表示是元素节点，保存到数组里
*/
function getChilds(parent,type){
	var type=type||"a";
	var childs=parent.childNodes//所有儿子
	var arr=[];
	for(var i=0;i<childs.length;i++){
		if(type=="a"){
				if(childs[i].nodeType==1){
	           arr.push(childs[i]);
			}
		}else if(type=="b"){
			if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){
				arr.push(childs[i]);
			}
		}
		
	}
	return arr;
}



//6.获得第一个子节点
function getFirst(parent){
   return	getChilds(parent)[0];
}

//7.获得最后一个子节点
function getLast(parent){
	return getChilds(parent)[getChilds(parent).length-1];
}
//8.获得一个指定子节点
function getZhiDing(parent,i){
	return getChilds(parent)[i];
}
//9.获得下一个兄弟节点
function getNext(obj){
	var next=obj.nextSibling;
	if(next==null){
            	return false;
            }
	while(next.nodeType==3||next.nodeType==8){
            next=next.nextSibling;
            if(next==null){
            	return false;
            }
	}
	return next;
}
//10.获得上一个兄弟节点
function getUp(obj){
	var up=obj.previousSibling;
	if(up==null){
       return false;
    }
	while(up.nodeType==3||up.nodeType==8){
            up=up.previousSibling;
            if(up==null){
            	return false;
            }
	}
	return up;
}
//11.插入到某个对象之后
  /*对象.insertBefore(obj,obj1)*/
  //插入到下一个对象之前
  //重点 给对象的原型添加此方法
  //obj1:要插入的对象
  //obj2：插入到这个对象的兄弟节点之前，就是插入到这个对象之后

  //原理：找到第二个参数的下一个兄弟节点，将第一个参数插入到此兄弟节点之前（插入到下一个对象之前）


 Object.prototype.insertAfter=function(obj1,obj2){
 var next=getNext(obj2);
     if(next){
      this.insertBefore(obj1,next);
     }else{
      this.appendChild(obj1);
     }
}

//12滚动条到页面顶部的距离  火狐与谷歌
function getScrollT(){
  
var scrollT=document.documentElement.scrollTop||
document.body.scrollTop;
return scrollT;
}

/*function getScrollT(){
	var obj=document.documentElement.scrollTop?document.documentElement.body;
    var scrollT=obj.scrollTop;
	return scrollT;
}
*/
//13.同一元素添加多个事件的兼容问题
     //obj：给哪个对象添加
     //ev：什么事件
     //fun：事件处理程序
     //IE和FF顺序有所变化
function addEvent(obj,ev,fun){
    if(obj.addEventListener){
    	return obj.addEventListener(ev,function(){
    		fun.call(obj);
    	},false);
    }else{
    	return obj.attachEvent("on"+ev,function(){
    		fun.call(obj);
    	});// 在IE8中，this不指当前的对象，指的是window
    }

}

//14.同一元素删除多个事件的兼容问题
function removeEvent(obj,ev,fun){
	if(obj.removeEventListener){
		return obj.removeEventListener(ev,function(){
			fun.call(obj);
		},false);
	}else{
		return obj.detachEvent("on"+ev,function(){
			fun.call(obj);
		})
	}
}


/*******************************************************/
//获取浏览器的宽高
function getCW(){
	return document.documentElement.clientWidth;
}
function getCH(){
	return document.documentElement.clientHeight;
}
/**************************************************/
//15.拖拽
function drag(obj){
	/*var box=$(".box")[0];*/
	var cw=document.documentElement.clientWidth;
	var ch=document.documentElement.clientHeight;
	var ow=obj.offsetWidth;
	var oh=obj.offsetHeight;
    obj.onmousedown=function(e){
    	var ev=e||window.event;
    	var ox=ev.offsetX;
    	var oy=ev.offsetY;
    	//阻止浏览器的默认行为
    	if (ev.preventDefault ){
           ev.preventDefault(); //阻止默认浏览器动作(W3C)
         }else{
              ev.returnValue = false;//IE中阻止函数器默认动作的方式
        }

    	//事件委托的思想
    	document.onmousemove=function(e){
    		var ev=e||window.event;
    		var cx=ev.clientX;
    		var cy=ev.clientY;
    		
            var newx=cx-ox;
            var newy=cy-oy;
            var y=obj.style.top;
    		if(newx>=(cw-ow)){
               newx=cw-ow;
    		}
    		if(newx<=0){
    			newx=0;
    		}
    		if(newy>=(ch-oh)){
               newy=ch-oh;
    		}
    		if(newy<=0){
    			newy=0;
    		}
    		obj.style.left=newx+"px";
    		obj.style.top=newy+"px";

    	}
    }
    obj.onmouseup=function(){
         document.onmousemove=null;
    }
}

/****************************************************/
/*16,滚轮事件
   obj:哪个对象添加滚轮事件
   upfun：处理滚轮向上的函数
   downfun：处理滚轮向下的函数
*/
function mouseWheel(obj,upfun,downfun){
    if(obj.attachEvent){
    obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
    }else if(obj.addEventListener){
    obj.addEventListener("mousewheel",scrollFn,false);
    //chrome,safari -webkit-
    obj.addEventListener("DOMMouseScroll",scrollFn,false);
    //firefox -moz-
    }
    function scrollFn(e){
      var ev=e||window.event;
        if (ev.preventDefault ){
          ev.preventDefault(); //阻止默认浏览器动作(W3C)
        }
        
        else{
          ev.returnValue = false;//IE中阻止函数器默认动作的方式
        }
        
      var num=ev.detail||wheelDelta;
      if(num==-3||num==120){//向上
        if(upfun){
          upfun();
        }
      }
      if(num==3||num==-120){//向下
        if(downfun){
          downfun();
        }
      }
    }
}
//17.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
//18阻止事件流

function stop(){
 
    if(ev.stopProPagation){
        return ev.stopProPagation();

      }else{
        return ev.cancelBubble=true;
      }
  }
function move(dom,json,callback){
	//dom.timer 属性 => dom.timer 对象;
	for(var i in dom.timer){
		clearInterval(dom.timer[i]);
	}
	dom.timer = {};//定时器组;
	for(let attr in json){
		//当前定时器之中的 attr 就是需要运动的属性;
		dom.timer[attr] = setInterval(function(){
		 	//console.log(attr);
		 	// attr => 属性名;
		 	// target => json[attr]; => 目标点;
		 	//console.log(json);
		 	//console.log(json[attr]);
		 	//当前位置;
		 	if(attr == "opacity"){
		 		var iNow = parseInt(getStyle(dom,attr) * 100);
		 	}else{
		 		var iNow = parseInt(getStyle(dom,attr));
		 	}

		 	//速度;

		 	var speed = (json[attr] - iNow) / 100;

		 	speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

		 	//终止运动;
		 	if(iNow == json[attr]){
		 		clearInterval(dom.timer[attr]);

		 		//判定所有运动终止;
		 		delete dom.timer[attr];
		 		//console.log(dom.timer);
		 		var index = 0;
		 		for(var i in dom.timer){
		 			index ++;
		 		}
		 		if(index == 0){
		 			//所有属性执行完成;
		 			//alert(1);
		 			if(callback){
		 				callback();
		 			}
		 		}

		 	}else{
		 		if(attr == "opacity"){
		 			dom.style.opacity = (iNow + speed ) / 100 ;
		 		}else{
		 			dom.style[attr] = iNow + speed + "px";
		 		}
		 	}
		},30);	
	}
}

//碰撞函数
 	function pz(obj1,obj2){
 		var l1 = obj1.offsetLeft;
 		var r1 = obj1.offsetLeft + obj1.offsetWidth;
 		var t1 = obj1.offsetTop;
 		var b1 = obj1.offsetTop + obj1.offsetHeight;
 		
 		var l2 = obj2.offsetLeft;
 		var r2 = obj2.offsetLeft + obj2.offsetWidth;
 		var t2 = obj2.offsetTop;
 		var b2 = obj2.offsetTop + obj2.offsetHeight;
 		
 		//碰不上返回false  碰上 返回true
 		if( r1<l2 || r2<l1 || b1<t2 || b2<t1){  //碰不上   
 			return false;
 		}else{
 			return true;
 		}
 }

function getStyle(DOM,name){
	//IE方法currentStyle
	if(DOM.currentStyle){
		//IE方法获非行间样式
		return DOM.currentStyle[name]
	}else{
		//非IE方法获非行间样式
		return getComputedStyle(DOM,false)[name]
	}
}
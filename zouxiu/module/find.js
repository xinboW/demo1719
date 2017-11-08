$(function(){
	//主页轮播图
	function banner(){
		this.$aImg = $(".carousel_img").children();
		this.$aBtn = $(".carousel_btn").children();
		this.$ImgBox = $(".carousel_img");
		this.$ImgWidth = $(".carousel_img").children().eq(0).width();
		this.index = 0;//定义标志变量代表当前图片的下标
	}
	banner.prototype = {
		init:function(){
			this.btnMove();//调用点击小球轮播功能
			this.setTimer();//调用自动轮播功能
		},
		btnMove:function(){
			this.$aBtn.mouseenter(function(event){//点击小球轮播
				var $target = $(event.target);
				this.index = $target.index();
				this.changeImg();
				clearInterval(this.timer)
			}.bind(this))
			this.$aBtn.mouseleave(function(event){
				this.setTimer();
			}.bind(this))
		},
		setTimer:function(){
			this.timer = setInterval(function(){
				this.index++;
				if(this.index >= this.$aImg.length){
					this.index = 1;//如果标志变量大于图片的总数量,标志变量变为1;
					this.$ImgBox.css({
						left : 0
					})
				}
				this.changeImg();
			}.bind(this),2000)

		},
		changeImg:function(){
			//console.log(this.$ImgBox)
			this.$ImgBox.stop().animate({
				left:-this.index * this.$ImgWidth + "px"
			},1000)
			$(this.$aBtn[this.index]).addClass("carousel_btn_move").siblings().removeClass();
			if(this.index == 5 ){
				this.$aBtn[0].className = "carousel_btn_move";
			}
		}
	}
	new banner().init();

	//瀑布流加载
	function pblLoad(){
		//获取元素
		this.$list = $(".beat_list");
		this.$listBtn = $(".beat_more").find("a");
		this.$box = $(".home_beat");
	}
	pblLoad.prototype = {
		init:function(){//初始化事件
			this.loadAjax();//调用Ajax功能
			this.loadmore();//调用点击加载更多功能			
		},
		loadAjax:function(){//ajax加载
			var that = this;
			$.ajax({
				url:"http://127.0.0.1/zouxiu/json/find.json",
				dataType:"json"
			})
			.then(function(res){//加载成功之后
				that.res = res;
				that.pbl();//调用瀑布流功能
			})
		},
		readPage:function(){//将加载成功的数据构建成页面
			let html = "";
			for(let i = 0 ; i < this.res.length; i++){
				if(i < this.res.length){
					html += `<li>
								<a href="##">
									<dl>
										<dt>
											<img src="${this.res[i].img}" alt="">
										</dt>
										<dd>
											<h2>${this.res[i].tit}</h2>
											<p>${this.res[i].txt}</p>
										</dd>
									</dl>
								</a>
							</li>`
				}
			}
			return html;
		},
		loadmore:function(){//点击加载更多功能
			this.$listBtn.click(function(){	
				this.loadAjax();//调用Ajax功能
				let Ul = document.createElement("ul");//创建一个新的ul用来存放点击加载更多的数据
				$(Ul).addClass("beat_list clearfix");//给ul添加class名
				$(Ul).html(this.readPage());//给创建出来的ul填加上加载成功的数据
				this.$box.append(Ul);//将ul放入大盒子中
			}.bind(this))
		},
		pbl:function(){
			this.$list.html(this.readPage());
			// this.$Li = $(".home_beat ul").find("li");
			// console.log(this.$Li)
			// for(let i = 0; i < this.$Li.length; i++){
			// 	if($(this.$Li[i]).index() % 3 == 0){
			// 		$(this.$Li[i]).append('<div class="clear"></div>')
			// 	}
			// }
			// var $LiWidth = $(this.$Li[0]).outerWidth();
			// this.hArr = [];
			// for( let i = 0; i < this.$Li.length; i++){
			// 	if( i < 3){
			// 		this.hArr.push( $(this.$Li[i]).outerHeight());

			// 	}else{
			// 		let index = this.getIndex();

			// 		this.$Li[i].style.position = "absolute";
			// 		this.$Li[i].style.left = $LiWidth * index + "px";
			// 		this.$Li[i].style.top = this.hArr[index] + "px"
			// 		this.hArr[index] += this.$Li[i].offsetHeight;

			// 	}
			// }
		}
		// getIndex:function(){//获取最小高度的下标
		// 	let index = 0;
		// 	for( let i = 0; i < this.hArr.length; i++){
		// 		if(this.hArr[i] < this.hArr[index]){
		// 			index = i;
		// 		}
		// 	}
		// 	return index;
		// }	
	}
	new pblLoad().init();
})
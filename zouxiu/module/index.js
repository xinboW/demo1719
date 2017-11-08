$(function(){

	//主页轮播图
	function banner(){
		this.$aImg = $(".carousel_img").children();
		this.$aBtn = $(".carousel_btn").children();
		this.$ImgBox = $(".carousel_img");
		this.$ImgWidth = $(".carousel_img").children().eq(0).width();
		this.index = 0;
	}
	banner.prototype = {
		init:function(){
			this.btnMove();
			this.setTimer();
		},
		btnMove:function(){
			this.$aBtn.mouseenter(function(event){
				var $target = $(event.target);
				this.index = $target.index();
				this.changeImg();
				clearInterval(this.timer)
				// console.log(this.index)
			}.bind(this))
			this.$aBtn.mouseleave(function(event){
				this.setTimer();
			}.bind(this))
		},
		setTimer:function(){
			this.timer = setInterval(function(){
				this.index++;
				if(this.index >= this.$aImg.length){
					this.index = 1;
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

	//回到顶部
	
	let $jianhuo = $(".home_goods");
	let $jianhuobtn = $(".loutibox").find("li").first();
	let $top = $(".loutibox").find("li").last();
	$jianhuobtn.click(function(){
		$("body,html").stop().animate({
			scrollTop:$jianhuo.offset().top + "px"
		},500)
	})
	$top.click(function(){
		$("body,html").stop().animate({
			scrollTop:0
		},500)
	})
})
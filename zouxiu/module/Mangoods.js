$(function(){
	//加载与楼梯效果
	function Manload(){
		//页面渲染区的获取
		//1f
		this.$stairs1_2 = $("#1f").find(".zt_item_two");
		this.$stairs1_3 = $("#1f").find(".zt_item_three");
		//2f
		this.$stairs2_2 = $("#2f").find(".zt_item_two");
		this.$stairs2_3 = $("#2f").find(".zt_item_three");
		//3f
		this.$stairs3_2 = $("#3f").find(".zt_item_two");
		this.$stairs3_3 = $("#3f").find(".zt_item_three");
		//4f
		this.$stairs4_3 = $("#4f").find(".zt_item_three");
		this.$stairs4_2 = $("#4f").find(".zt_item_two");
		//5f
		this.$stairs5_3 = $("#5f").find(".zt_item_three");
		this.$stairs5_2 = $("#5f").find(".zt_item_two");
	}
	Manload.prototype = {
		init:function(){
			var that = this;
			$.ajax({
				url:"http://127.0.0.1/zouxiu/json/Mangoods.json",
				dataType:"json"
			})
			.then(function(res){
				that.res = res
				// console.log(that.res)
				that.readPage1L();
				that.readPage2L();
				that.readPage3L();
				that.readPage4L();
				that.readPage5L();
			})
		},
		readPage1L:function(){
			let html2 = "";//宽图
			let html3 = "";//窄图
			for(let i = 0; i < this.res.length;i++){
				if( i < this.res.length){
					if(this.res[i].f1 && this.res[i].width){
						html2 +=`<li>
									<a href="##" data-id = "${this.res[i].id}">
										<img src="${this.res[i].img}" alt="">
									</a>
								</li>`
					}
					if(this.res[i].f1 && !this.res[i].width){
						html3 +=`<li>
									<a href="##" data-id = "${this.res[i].id}">
										<img src="${this.res[i].img}" alt="">
									</a>
								</li>`
					}
				}
			}
			this.$stairs1_2.html(html2)
			this.$stairs1_3.html(html3);
		},
		readPage2L:function(){
			let html2 = "";//宽图
			let html3 = "";//窄图
			for(let i = 0; i < this.res.length;i++){
				if( i < this.res.length){
					if(this.res[i].f2 && this.res[i].width){
						html2 +=`<li>
									<a href="##" data-id = "${this.res[i].id}">
										<img src="${this.res[i].img}" alt="">
									</a>
								</li>`
					}
					if(this.res[i].f2 && !this.res[i].width){
						html3 +=`<li>
									<a href="##" data-id = "${this.res[i].id}">
										<img src="${this.res[i].img}" alt="">
									</a>
								</li>`
					}
				}
			}
			this.$stairs2_2.html(html2)
			this.$stairs2_3.html(html3);
		},
		readPage3L:function(){
			let html2 = "";//宽图
			let html3 = "";//窄图
			for(let i = 0; i < this.res.length;i++){
				if( i < this.res.length){
					if(this.res[i].f3 && this.res[i].width){
						html2 +=`<li>
									<a href="##" data-id = "${this.res[i].id}">
										<img src="${this.res[i].img}" alt="">
									</a>
								</li>`
					}
					if(this.res[i].f3 && !this.res[i].width){
						html3 +=`<li>
									<a href="##" data-id = "${this.res[i].id}">
										<img src="${this.res[i].img}" alt="">
									</a>
								</li>`
					}
				}
			}
			this.$stairs3_2.html(html2)
			this.$stairs3_3.html(html3);
		},
		readPage4L:function(){
			let html2 = "";//宽图
			let html3 = "";//窄图
			for(let i = 0; i < this.res.length;i++){
				if( i < this.res.length){
					if(this.res[i].f4 && this.res[i].width){
						html2 +=`<li>
									<a href="##" data-id = "${this.res[i].id}">
										<img src="${this.res[i].img}" alt="">
									</a>
								</li>`
					}
					if(this.res[i].f4 && !this.res[i].width){
						html3 +=`<li>
									<a href="##" data-id = "${this.res[i].id}">
										<img src="${this.res[i].img}" alt="">
									</a>
								</li>`
					}
				}
			}
			this.$stairs4_2.html(html2)
			this.$stairs4_3.html(html3);
		},
		readPage5L:function(){
			let html2 = "";//宽图
			let html3 = "";//窄图
			for(let i = 0; i < this.res.length;i++){
				if( i < this.res.length){
					if(this.res[i].f5 && this.res[i].width){
						html2 +=`<li>
									<a href="##" data-id = "${this.res[i].id}">
										<img src="${this.res[i].img}" alt="">
									</a>
								</li>`
					}
					if(this.res[i].f5 && !this.res[i].width){
						html3 +=`<li>
									<a href="##" data-id = "${this.res[i].id}">
										<img src="${this.res[i].img}" alt="">
									</a>
								</li>`
					}
				}
			}
			this.$stairs5_2.html(html2)
			this.$stairs5_3.html(html3);
		}
	}
	new Manload().init();

	function Stairway(){
		//楼层的获取(楼梯效果)
		this.index = 0;
		this.$stairs =  $(".zt_content");
		this.$stairsbtn = $(".man_menu ul").find("li");
		this.flag = true;
	}
	Stairway.prototype = {
		init:function(){
			for(let i = 0; i < this.$stairsbtn.length; i++){
				$(this.$stairsbtn[i]).click(function(){
					this.flag = false;
					this.index = i;
					this.move();
				}.bind(this))
			}
			this.clientMove();
		},
		move:function(){
			var that = this;
			$(this.$stairsbtn[this.index]).addClass("move").siblings().removeClass();
			$("body,html").animate({
				scrollTop : $(this.$stairs[this.index]).offset().top + "px"
			},500,function(){
				that.flag = true;
			})
		},
		clientMove:function(){
			var that = this;
			$(window).scroll(function(){
				if(this.flag){
					let bodyTop = $(document).scrollTop();
					let $floor = that.$stairs.filter(function(){
						return  Math.abs( $(this).offset().top  - sTop) < $(this).height()/2;
					})
					let index = $floor.index();
					$(this.$stairsbtn[index]).addClass("move").siblings().removeClass();
				}
			})
		}
	}
	new Stairway().init();
})
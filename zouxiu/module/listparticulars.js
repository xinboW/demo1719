$(function(){
	function particulars(){
		this.$listbox = $(".list_box");
		this.$Page_btn = $(".Page_btn");
		this.$square = $(".square");//放大镜
		this.$Mark = $(".mark");//遮罩层
		this.$l_imgbox = $(".l_img");//大图的框
		this.$l_imgpic = $(".l_img").find("img");//大图

		this.$s_imgli = $(".s_img").find("li");
		this.$s_imgpic = $(".s_img li").find("img");
		//console.log(this.$s_imgpic)
		this.$b_imgpic = $(".b_img").find("img").eq(0);
		//console.log(this.$square);
		//console.log(this.$Page_btn);
	}
	particulars.prototype = {
		init:function(){
			this.loadAjax();
			this.glassshow();
			this.changeImg();
			this.GetAttr();
			this.Time();
		},
		loadAjax:function(){
			var that = this;
			$.ajax({
				url:"http://127.0.0.1/zouxiu/json/pinlun.json",
				dataType:"json"
			})
			.then(function(res){
				that.res = res;
				that.pageNum();
			})
		},
		pageNum:function(){//分页按钮
			var that = this;
			this.$Page_btn.pagination(this.res.length,{
				items_per_page:5,
				prev_text:'上一页',
				next_text:'下一页',
				link_to:'##',
				num_display_entries:5,
				callback:function(index){
					that.index = index;
					that.readPage();
				}
			})
		},
		readPage:function(){//渲染评论区
			let html = "";
			for(let i = this.index * 5; i < (this.index + 1) * 5;i++){
				if(i < this.res.length){
					html +=`
							<div class="pl_nr_main">
								<img src="${this.res[i].img}" alt="">
							</div>`
				}
			}
			this.$listbox.html(html);
		},
		glassshow:function(){//让放大镜显示
			var that = this;

			this.$Mark.hover(function(){
				that.$square.show();
				that.$l_imgbox.show();
			},function(){
				that.$square.hide();
				that.$l_imgbox.hide();
			});
			this.glassMove();
		},
		glassMove:function(){
			this.$Mark.mousemove(function(event){
				//思路：放大镜相当于一个放大的鼠标指针
				let left = event.offsetX - this.$square.width()/2;
				let top = event.offsetY - this.$square.height()/2;
	
				left = left < 0 ? 0 : left;
				top = top < 0 ? 0 : top;
				left = left > this.$Mark.width() - this.$square.width() ? this.$Mark.width() - this.$square.width() : left;
				top = top > this.$Mark.height() - this.$square.height() ? this.$Mark.height() - this.$square.height() : top;
				this.$square.css({
					left : left,
					top : top
				})

				//计算放大镜在左图的可移动距离的比例
				//左图的最大可移动距离
				let LbX = this.$Mark.width() - this.$square.width();
				let LbY = this.$Mark.height() - this.$square.height();

				//放大镜在左图的移动比例
				let propX = left / LbX;
				let propY = top / LbY;

				//右边大图的最大可移动距离
				let RbX = this.$l_imgpic.width() - this.$l_imgbox.width();

				let RbY = this.$l_imgpic.height() - this.$l_imgbox.height();

				//右边大图跟随左图运动
				this.$l_imgpic.css({
					left:-RbX * propX,
					top:-RbY * propY
				})
			}.bind(this))
		},
		GetAttr:function(){
			if($.cookie("src")){
				let str = $.cookie("src");//获取存储src得cookie
				this.$b_imgpic.attr("src",str);
				this.$l_imgpic.attr("src",str);
				
				let strArr = str.split("_");//将获取到的src拆分开
				//console.log( strArr );
				// console.log(strArr[0]+'_'+strArr[1]+'_'+strArr[2])
				for(let i = 0; i < this.$s_imgpic.length;i++){
					//var reg = new RegExp( "g" + (i+1) , "g")
					strArr[0] = strArr[0].replace("g"+(i),'g'+(i+1));
					//console.log( strArr[0] )
					var nstr = strArr[0]+'_'+strArr[1]+'_'+strArr[2];
					$(this.$s_imgpic[i]).attr("src",nstr);

				}
				// console.log(strArr[0])
				// strArr[0].replace('g1','g2')
				// console.log(strArr[0])
			}

			// var str = "hello word"
			// console.log(str.replace(/hello/,"w"));
		},
		changeImg:function(){//点击小图切换图片
			let str="";
			for(let i = 0; i < this.$s_imgpic.length;i++){
				$(this.$s_imgpic[i]).click(function(){
					$(this.$s_imgpic[i]).parent("li").addClass("move").siblings().removeClass("move");
					str="";
					str = $(this.$s_imgpic[i]).attr("src");
					//console.log(str);
					this.$b_imgpic.attr("src",str);
					this.$l_imgpic.attr("src",str);
				}.bind(this))
			}
		},
		Time:function(){
			let total = 7200;
			let $hour = $("#hour");
			let $minute = $("#minute");
			let $second = $("#second");

			setInterval(function(){
				//console.log(total)
				total--;
				var s=(total%60)<10?('0'+total%60):total%60;
				var h=total/3600<10?('0'+parseInt(total/3600)):parseInt(total/3600);
				var m=(total-h*3600)/60<10?('0'+parseInt((total-h*3600)/60)):parseInt((total-h*3600)/60);
				//console.log(hour,minute,second,s,m,h)
				$hour.html(h);
				$minute.html(m);
				$second.html(s);
			},1000)
			
		}
	}
	new particulars().init();
})
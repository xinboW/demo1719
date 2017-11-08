$(function(){
	function shoplist(){
		this.$listbox = $(".shopbox").find("ul");
		this.$Page_btn = $(".Page_btn");
	}
	shoplist.prototype = {
		init:function(){
			this.loadAjax();
		},
		loadAjax:function(){
			var that = this;
			$.ajax({
				url:"http://127.0.0.1/zouxiu/json/shoplist.json",
				dataType:"json"
			})
			.then(function(res){
				that.res = res;
				// that.readPage();
				that.pageNum();
			})
		},
		pageNum:function(){
			var that = this;
			this.$Page_btn.pagination(this.res.length,{
					items_per_page:32,
					prev_text:'上一页',
					next_text:'下一页',
					num_display_entries:5,
					callback:function(index){
						that.index = index;
						that.readPage();
					}
			});
		},
		readPage:function(){
			let html = "";
			for(let i = this.index * 32; i < (this.index + 1) * 32; i++){
				if(i < this.res.length){
					html +=`
							<li class="item">
								<a href = "http://127.0.0.1/zouxiu/html/listparticulars.html">
								<dl>
									<dt>
										<img src="${this.res[i].img}" alt="">
									</dt>
									<div class="size">
										<p>可选尺码</p>
										<ul class="clearfix">
											<li>S</li>
											<li>M</li>
											<li>L</li>
											<li>XL</li>
											<li>XXL</li>
										</ul>
									</div>
									<dd>
										<p>${this.res[i].tit}</p>
										<p>${this.res[i].txt}</p>
										<h2>￥<span>${this.res[i].price}</span></h2>
										
									</dd>
								</dl>
								</a>
							</li>`
							//<a href="##" class="joincar" data-id="${this.res[i].id}">加入购物车</a>
				}
			}
			this.$listbox.html(html);
			this.GetAttr();	
		},
		GetAttr:function(){
			this.$dtimg = this.$listbox.find("li dt img");
			//console.log(this.$dtimg);
			let str = "";
			for(let i = 0; i < this.$dtimg.length;i++){
				$(this.$dtimg[i]).click(function(){
					//console.log(1)
					str = "";
					str = $(this.$dtimg[i]).attr("src");
					$.cookie("src",str,{expires:1});
				}.bind(this))
			}
		}
	}
	new shoplist().init();
})
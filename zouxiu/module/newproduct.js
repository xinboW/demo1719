$(function(){
	//新品页的动态加载

	function newload(){
		this.$ztItem = $(".zt_item_three");
		this.$ztItemtwo = $(".zt_item_two");
		// console.log(this.$ztItem)
	}
	newload.prototype = {
		init:function(){
			var that = this;
			$.ajax({
				url:"http://127.0.0.1/zouxiu/json/newproduct.json",
				dataType:"json"
			})
			.then(function(res){
				that.res = res;
				that.readPage();
			})
		},
		readPage:function(){
			let html = "";
			let html2 = "";
			for( let i = 0; i < this.res.length; i++){
				if( i < this.res.length){
					if(!this.res[i].width){
						html += `<li>
									<a href="##" data-id = "${this.res[i].id}">
										<img src="${this.res[i].img}" alt="">
									</a>
								</li>`
					}else{
						html2 +=`<li>
									<a href="##" data-id = "${this.res[i].id}">
										<img src="${this.res[i].img}" alt="">
									</a>
								</li>`
					}
					
				}	
			}
			this.$ztItem.html(html);
			this.$ztItemtwo.html(html2);
		}
	}
	new newload().init();
})
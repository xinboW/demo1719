define(function(){
	function loadhtml(){
		let $topMain = $(".topMain");
		let $topMain2 = $(".topMain2_nav");
		let $footer = $(".footer");
		$topMain.load("http://127.0.0.1/zouxiu/html/topMain1.html",function(){
			let $myxiu = $topMain.find(".my_xiu").first("a");
			let $myxiu_menu = $topMain.find(".my_xiu div");
			$myxiu.hover(function(){
				// console.log(1)
				$(this).css({
					background:"#fff",
					color:"red"
				});
				$myxiu_menu.show();
			},function(){
				$myxiu_menu.hide();
				$(this).css({
					background:"",
					color:"#d7d7d7"
				});
			})
		});
		$topMain2.load("http://127.0.0.1/zouxiu/html/topMain2.html",function(){
			let $ul = $(this).find("ul");
			$ul.on("mouseenter mouseleave","li",function(event){
				if(event.type == "mouseenter"){
					$(this).find(".submenu").show();
				}else if(event.type == "mouseleave"){
					$(this).find(".submenu").hide();
				}	
			})
		});
		$footer.load("http://127.0.0.1/zouxiu/html/footer.html");
	}
	return new loadhtml();
	
})
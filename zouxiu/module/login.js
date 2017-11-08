$(function(){

	//各种切换功能
	function boxChange(){
		this.$regUser = $(".box_top").children().eq(0);//用户注册按钮
		this.$loginUser = $(".box_top").children().eq(1);//用户登陆按钮
		this.$codelogin = $(".erweima_login");//切换二维码登陆
		this.$comlogin = $(".comlogin");//切换电脑登陆

		this.$regBox = $(".box_main");//注册框体
		this.$loginBox = $(".box_main2");//登陆框体
		this.$contBox = $(".content_box");//整体框体
		this.$codeBox = $(".erweimalogin_box")//二维码框体
	}
	boxChange.prototype = {
		init:function(){
			this.change1();
			this.change2();
			this.change3();
			this.change4();
		},
		change1:function(){
			//登陆框体的切换
			this.$loginUser.click(function(){
				this.$loginUser.css({
					borderBottom:"2px solid #000"
				}).siblings().css({
					borderBottom:""
				});
				this.$regBox.css({
					display:"none"
				});
				this.$loginBox.css({
					display:"block"
				});
			}.bind(this))
		},
		change2:function(){
			//注册框体的切换
			this.$regUser.click(function(){
				this.$regUser.css({
					borderBottom:"2px solid #000"
				}).siblings().css({
					borderBottom:""
				});
				this.$regBox.css({
					display:"block"
				});
				this.$loginBox.css({
					display:"none"
				});
			}.bind(this))
		},
		change3:function(){
			//二维码登陆框体切换
			this.$codelogin.click(function(){
				this.$contBox.css({
					display:"none"
				});
				this.$codeBox.css({
					display:"block"
				})
			}.bind(this))
		},
		change4:function(){
			//切换回原来的框体
			this.$comlogin.click(function(){
				this.$contBox.css({
					display:"block"
				});
				this.$codeBox.css({
					display:"none"
				})
			}.bind(this))
		}
	}
	new boxChange().init();


	//验证注册
	function register(){
		this.$regUserNum = $(".box_main").find("input").eq(0);//账号框
		this.$regUserPass = $(".box_main").find("input").eq(1);//验证码框
		this.$error = $(".box_main").find(".error");//错误提示框
		this.errorArr = [false,false];//标志变量
		this.$regbtn = $(".registerbtn")//注册按钮
		this.$randBtn = $(".rand")//随机数按钮
		// console.log(this.$error.eq(0))
	}
	register.prototype = {
		init:function(){
			this.$randBtn.click(function(){
				this.$randBtn.html(this.rand())
			}.bind(this));
			this.verify();
		},
		verify:function(){
			this.$regUserNum.focusout(function(){
				var reg = /^[1][34578][0-9]{9}$/g;
				// console.log(this.$regUserNum.val())
				if(reg.test(this.$regUserNum.val())){
					this.$error.eq(0).html("");
					this.errorArr[0] = true;
				}else{
					this.$error.eq(0).html("请输入正确的手机号");
					this.errorArr[0] = false;
				}
			}.bind(this))
			this.$regUserPass.focusout(function(){
				if(this.$regUserPass.val() == this.$randBtn.html()){
					this.$error.eq(1).html("");
					this.errorArr[1] = true;
				}else{
					this.$error.eq(1).html("请输入正确的验证码");
					this.errorArr[1] = false;
				}
			}.bind(this))
			this.submit();
		},
		submit:function(){
			this.$regbtn.click(function(){
				if(this.errorArr.indexOf(false) == -1){//如果标志变量中没有false的话,执行ajax
					// ajaxGet('http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID='+this.$regUserNum.val()+'&password='+this.$regUserPass.val())
					// .then(function(res){
					// 	console.log(res)
					// })
					ajaxPost('http://datainfo.duapp.com/shopdata/userinfo.php','status=register&userID='+this.$regUserNum.val()+'&password='+this.$regUserPass.val())
					.then(function(res){
						setTimeout(function(){
							switch(res){
								case 0:this.$error.eq(2).html("用户名重名");
								break;
								case 1:this.$error.eq(2).html("注册成功稍后为您跳转");
								setTimeout(function(){
									$(window).attr("location","http://127.0.0.1/zouxiu/index.html");
								},500);
								break;
								case 2:this.$error.eq(2).html("服务器出现错误,请稍后再试");
							}
						}.bind(this),500)
					})
				}
			}.bind(this))
		},
		rand:function(){
			this.randNum = "";
			for(let i = 0; i < 4; i++){
				this.randNum += Math.floor(Math.random()*10)
			}
			return this.randNum;
		}
	}
	new register().init();

	//登陆验证
	function Login(){
		this.$loginUser = $(".box_main2").find("input").eq(0);//账号框
		this.$loginPass = $(".box_main2").find("input").eq(1);//密码框
		this.$error = $(".box_main2").find(".error");//错误提示框
		this.errorArr = [false,false];//标志变量
		this.$loginBtn = $(".loginbtn");//登陆按钮
	}
	Login.prototype = {
		init:function(){
			this.verify();
		},
		verify:function(){
			this.$loginUser.focusout(function(){
				var reg = /^[1][34578][0-9]{9}$/g;
				// console.log(this.$regUserNum.val())
				if(reg.test(this.$loginUser.val())){
					this.$error.eq(0).html("");
					this.errorArr[0] = true;
				}else{
					this.$error.eq(0).html("请输入正确的手机号");
					this.errorArr[0] = false;
				}
				// console.log(1)
			}.bind(this))
			this.$loginPass.focusout(function(){
				var reg = /^[0-9]{4}$/g;
				if(reg.test(this.$loginPass.val())){
					this.$error.eq(1).html("");
					this.errorArr[1] = true;
				}else{
					this.$error.eq(1).html("请输入正确的密码");
					this.errorArr[1] = false;
				}
			}.bind(this))
			this.submit();
		},
		submit:function(){
			this.$loginBtn.click(function(){
				if(this.errorArr.indexOf(false) == -1){//如果标志变量中没有false的话,执行ajax
					ajaxGet('http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID='+this.$loginUser.val()+'&password='+this.$loginPass.val())
					.then(function(res){
						setTimeout(function(){
							switch(res){
								case 0:this.$error.eq(2).html("用户名不存在");
								break;
								case 2:this.$error.eq(2).html("用户名密码不符");
								break;
								default:
									this.$error.eq(2).html("登陆成功,稍后为您切换页面");
									setTimeout(function(){
										$(window).attr("location","http://127.0.0.1/zouxiu/index.html")
									},500)
							}
						}.bind(this),500)
					}.bind(this))
				}
			}.bind(this))
		}
	}
	new Login().init();
})
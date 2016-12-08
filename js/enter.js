$(function(){
	$('.header').load('header.html',function(){
		var secondBox = $('.second-box');
		var second = $('.second');
			second.mouseenter(function(){
				secondBox.show();
			});
			second.mouseleave(function(){
				secondBox.hide();
			});
	});
	
	var username = $('.username');
	var password = $('.password');
	var submit = $('.submit');
	var hint = $('.hint');
	
	
	//定义用户名、密码、手机号验证规则
	//用户名
	var regUName =  /^1[358]\d{9}$/;
	//邮箱
	var mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	//密码
	var regPswLength = /^.{6,16}$/;
	
	//用户名失焦事件
	username.blur(function(){
		//获取用户名
		var nameV = username.val();
		//用户名为空
		if( nameV.length == 0 ){
			hint.html('请输入注册时的邮箱或手机号码。');
			$(this).css('border','1px solid #8E0C3A');
			return;
		}else{
			hint.html('');
			$(this).css('border','1px solid #bbb');
		}
	});
		//密码失焦事件
	password.blur(function(){
		//获取密码值
		var pswV = password.val();
		//密码是为空
		if(pswV.length == 0){
			hint.html('请输入您的密码。');
			$(this).css('border','1px solid #8E0C3A');
			return;
		}else{
			hint.html('');
			$(this).css('border','1px solid #bbb');
		}
	});
	//点击登录判断事件
	submit.click(function(){
		//获取用户名
		var nameV = username.val();
		//获取密码值
		var pswV = password.val();
		//获取用户名
		var nameC = $.cookie('username');
		//获取密码值
		var pswC = $.cookie('password');
		
		/*用户名检测*/
		//用户名为空
		if( nameV.length == 0 ){
			hint.html('请输入注册时的邮箱或手机号码。');
			username.css('border','1px solid #8E0C3A');
			return;
		}
		//用户名是否正确
		if( ( regUName.test(nameV) ) || ( mail.test(nameV) ) ){
			hint.html('');
			username.css('border','1px solid #bbb');
		}else{
			hint.html('请输入正确的邮箱地址或11位手机号码。');
			username.css('border','1px solid #8E0C3A');
			return;
		}
		/*密码检测*/
		//密码为空
		if(pswV.length == 0){
			hint.html('请输入您的密码。');
			password.css('border','1px solid #8E0C3A');
			return;
		}
		//
		if((nameV == nameC) && (pswV == pswC) ){
			alert('登录完成');
			location.href = 'index.html';
		}else{
			
			hint.html('您输入的用户登录信息有误。');
			username.val('');
			password.val('');
			return;
		}
		
	});
	
});

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
	var passwordCheck = $('.password-check');
	var submit = $('.submit');
	var hint = $('.hint');
	
	
	//定义用户名、密码、手机号验证规则
	//用户名
	var regUName =  /^1[358]\d{9}$/;
	//邮箱
	var mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	//密码
	var regPswLength = /^.{6,16}$/;
	
	//用户名获焦事件
	username.focus(function(){
		//获焦value值是否为'手机注册更享好礼'，是就清空
		if(username.val() == '手机注册更享好礼'){
			username.val('');
		}
	});
	//用户名失焦事件
	username.blur(function(){
		//获取用户名
		var uname = username.val();
		//用户名为空
		if( uname.length == 0 ){
			hint.html('请输入您的手机号或常用的邮箱。');
			$(this).css('border','1px solid #8E0C3A');
			return;
		}
		//用户名是否正确
		if( ( regUName.test(uname) ) || ( mail.test(uname) ) ){
			hint.html('');
			$(this).css('border','1px solid #bbb');
		}else{
			hint.html('请输入正确的手机号或邮箱。');
			$(this).css('border','1px solid #8E0C3A');
			return;
		}
	});
	
	//密码失焦事件
	password.blur(function(){
		//获取密码值
		var upsw = password.val();
		//密码是为空
		if(upsw.length == 0){
			hint.html('密码不能为空，请输入密码。');
			$(this).css('border','1px solid #8E0C3A');
			return;
		}
		//4、密码长度不合法
		if(!regPswLength.test(upsw)){
			hint.html('用户密码长度范围在6-16位之间。');
			$(this).css('border','1px solid #8E0C3A');
			return;
		}else{
			hint.html('');
			$(this).css('border','1px solid #bbb');
		}
	});
	//确认密码失焦 事件
	passwordCheck.blur(function(){
		//获取密码值
		var upsw = password.val();
		//获取确认密码值
		var upswCheck = passwordCheck.val();
		//确认密码为空
		if(upswCheck.length == 0){
			hint.html('请重新输入一次上面的密码。');
			$(this).css('border','1px solid #8E0C3A');
			return;
		}
		//两次密码不一致
		if(upsw != upswCheck){
			hint.html('您两次的密码密码不一致。');
			$(this).css('border','1px solid #8E0C3A');
			return;
		}else{
			hint.html('');
			$(this).css('border','1px solid #bbb');
		}
	});
	//点击注册判断事件
	submit.click(function(){
		//获取用户名
		var uname = username.val();
		//获取密码值
		var upsw = password.val();
		//获取确认密码值
		var upswCheck = passwordCheck.val();
		//用户名检测
		//用户名是否正确
		if( ( regUName.test(uname) ) || ( mail.test(uname) ) ){
			hint.html('');
			username.css('border','1px solid #bbb');
		}else{
			hint.html('请输入正确的手机号或邮箱。');
			username.css('border','1px solid #8E0C3A');
			return;
		}
		//密码检测
		//密码为空
		if(upsw.length == 0){
			hint.html('密码不能为空，请输入密码。');
			password.css('border','1px solid #8E0C3A');
			return;
		}
		//4、密码长度不合法
		if(!regPswLength.test(upsw)){
			hint.html('用户密码长度范围在6-16位之间。');
			password.css('border','1px solid #8E0C3A');
			return;
		}else{
			hint.html('');
			passwordCheck.css('border','1px solid #bbb');
		}
		//确认密码为空
		if(upswCheck.length == 0){
			hint.html('请重新输入一次上面的密码。');
			passwordCheck.css('border','1px solid #8E0C3A');
			return;
		}
		//两次密码不一致
		if(upsw != upswCheck){
			hint.html('您两次的密码密码不一致。');
			passwordCheck.css('border','1px solid #8E0C3A');
			return;
		}else{
			hint.html('');
			passwordCheck.css('border','1px solid #bbb');
		}
		//注册完成
		if(hint.html()==''){
			alert("注册完成，正在提交。。。");
			
			$.cookie('username',uname,{expires:7,path:'/'});
			$.cookie('password',upsw,{expires:7,path:'/'});
			location.href = 'enter.html';
		}
	});
	
});

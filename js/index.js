$(function(){
	$('.header').load('header.html',function(){
		var secondBox = $('.second-box');
		var second = $('.second');
			second.mouseenter(function(){
				secondBox.slideDown();
			});
			second.mouseleave(function(){
				secondBox.hide();
			});
	})
	
	var banner = {
		main: $('.banner'),
		imgWrapper: $('.img-wrapper'),
		imgs: $('.banner .img-item'),
		arrowL: $('.arrow-left'),
		arrowR: $('.arrow-right'),
		width: 0,
		index:0,
		timer: null,
		init: function(){
			console.log(this.imgs.width())
			/*
			 	$('p').width()  设置或者获取元素的宽度，如果获取时有多个p，只获取第一个p的样式值
			*/
			this.width =  this.imgs[0].offsetWidth;
			//this.imgs.width(this.width);
			//为了不出现图片显示效果不一样的bug，事先让图片隐藏，设置宽度后再显示
			//this.imgs.show();
			//自动播放
			this.autoPlay();
			//鼠标事件
			this.mouse();
		},
		//自动播放
		autoPlay: function(){
			var that = this;
			timer = setInterval(function(){
				that.index++;
				that.index %= that.imgs.length;
				that.imgWrapper.animate({
					marginLeft: -1 * that.index * that.width
				},600);
			},1600);
			
		},
		//鼠标事件
		mouse: function(){
			var that = this;
			this.imgWrapper.hover(function(){
				clearInterval(timer);
			},function(){
				that.autoPlay();
			});
		}
		
	};
	banner.init();
});

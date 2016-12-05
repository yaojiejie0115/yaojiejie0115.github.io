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
	});
	//滚动条下拉时出现搜索框
	var fixTp = $('.fix-top');
	$(window).scroll(function(){
		var t = $(this).scrollTop()
		if(t >= 170){
			fixTp.fadeIn();
		}else{
			fixTp.fadeOut();
		}
	})
		
		
	var fixTop ={
		
		innerR:$('.inner-r'),
		menu:$('.menu'),
		arise: function(){
			//鼠标移入 "时尚导航" 显示内容
			this.shiftIn();
		},
		//鼠标移入 "时尚导航" 显示内容
		shiftIn: function(){
			var that = this
			this.innerR.mouseenter(function(){
				that.menu.show();
			});
			this.innerR.mouseleave(function(){
				that.menu.hide();
			});
		}
	}
	fixTop.arise();
	
	//nav部分
	var nav ={
		news: $('.new'),
		newItem: $('.new-item'),
		
		into: function(){
			//移入移出事件
			this.move();
		},
		
		//移入移出事件
		move: function(){
			var that = this
			this.news.mouseenter(function(){
				that.newItem.show();
			});
			this.news.mouseleave(function(){
				that.newItem.hide();
			});
		}
	}
	nav.into();
	
	//banner部分
	var banner = {
		main: $('.banner'),
		imgWrapper: $('.img-wrapper'),
		imgs: $('.banner .img-item'),
		arrowL: $('.arrow-left'),
		arrowR: $('.arrow-right'),
		width: 0,
		index:0,
		flag: false,
		timer: null,
		init: function(){
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
			//动态添加最后一张图片
			//this.addImg();
			//点击右侧按钮切换
			this.next();
			//点击左侧按钮切换
			this.prev();
		},
		//自动播放
		autoPlay: function(){
			var that = this;
			timer = setInterval(function(){
				that.index++;
				that.index %= that.imgs.length;
				that.imgSwitch();
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
		},
		//点击右边按钮到下一张
		next: function(){
			var that = this;
			this.arrowR.click(function(){
				if(that.flag){
					return;
				}
				that.index++;
				that.imgSwitch();
			});
		},
		//点击左边按钮到上一张
		prev: function(){
			var that = this;
			this.arrowL.click(function(){
				if(that.flag){
					return;
				}
				that.index--;
				that.imgSwitch();
			});
		},
		//图片移动
		imgSwitch: function(){
			this.flag = true;
			var that = this;
			this.imgWrapper.stop(true).animate({
				marginLeft: -1 * this.index * this.width
			},1000,function(){
				that.flag = false;
			});
		},
		
		/*this.imgWrapper.stop(true).animate({
			marginLeft: -1 * this.index * this.width
		},1000,function(){
			that.flag = false;
		});

		that.index %= that.imgs.length;
				that.imgWrapper.animate({
					marginLeft: -1 * that.index * that.width
				},600);
			},1600);
		*/
		/*
			动态给最后一个位置添加第一张图片
		*/
		
		/*addImg: function(){
			this.imgWrapper.find('img').eq(0).clone().append(this.imgWrapper)
		}*/
	};
	banner.init();
	
	//滚动展示区
	var roll = {
		rollBox: $('.roll'),
		rollItem: $('.roll-item'),
		imgs: $('.banner .img-item'),
		arrowL: $('.arrow-left'),
		arrowR: $('.arrow-right'),
		width: 0,
		index:0,
		timer: null,
		init: function(){
			this.width =  this.imgs[0].offsetWidth;
			//自动播放
			this.autoPlay();
			
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
	}
});

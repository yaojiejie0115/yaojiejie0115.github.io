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
		imgs: $('.img-item'),
		arrow: $('.arrow'),
		arrowL: $('.arrow-left'),
		arrowR: $('.arrow-right'),
		width: 0,
		index:0,
		firstImg:null,
		flag: false,
		timer: null,
		init: function(){
			
			//获取元素的宽度
			this.width =  this.imgs.eq(0).width();
			//自动播放
			this.autoPlay();
			//鼠标事件
			this.mouse();
			//动态添加最后一张图片
			this.firstImg();
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
				//that.index %= that.imgs.length;
				that.imgSwitch();
			},2000);
			
		},
		//鼠标事件
		mouse: function(){
			var that = this;
			this.main.hover(function(){
				clearInterval(timer);
				//鼠标移出点击图标显示
				that.arrow.show();
			},function(){
				that.autoPlay();
				//鼠标移出点击图标消失
				that.arrow.hide();
			});
		},
		
		//动态给最后一个位置添加第一张图片
		firstImg: function(){
			var that = this;
			this.imgWrapper.append( this.imgWrapper.find('a').eq(0).clone(true) )
			this.imgs = $('.img-item')
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
			//判断是否到达右边界  (如果是右边界，还往右的话，瞬间将图片替换到第一张)
			if(this.index >= this.imgs.length){
				this.imgWrapper.css({
					marginLeft: 0
				});
				this.index = 1;
			}
			//左边界处理 (如果是左边界，还往左的话，瞬间将图片替换到最后一张)
			if(this.index <= -1){
				this.imgWrapper.css({
					marginLeft: -this.imgs.eq(0).width() * (this.imgs.length-1)
				});
				this.index = this.imgs.length-2;
			}
			this.imgWrapper.stop(true).animate({
				marginLeft: -1 * this.index * this.width
			},1000,function(){
				that.flag = false;
			});
		},
		
	};
	banner.init();
	
	
});

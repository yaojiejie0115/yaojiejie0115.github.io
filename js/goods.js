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
	
	
	
	
	
	
	
	/*放大镜*/
	/*
	 	事件：
	 		鼠标移入移出：控制滤镜和大图显示
	 		鼠标移动： 控制滤镜的位置、大图的位置
	*/
	var glass = {
		/*装要放大的图片*/
		smallWrap: $('.large-item'),
		/*放大镜*/
		filter: $('.amplifier'),
		/*装放大图片的盒子*/
		largeWrap: $('.magnify'),
		/*放大后图片*/
		largeImg: $('.large-img'),
		//小图片盒子
		small: $('.small'),
		//待放大的图片
		medium: $('.medium'),
		//初始化方法
		init: function(){
			this.mousemove();
			this.hover();
			this.switchover();
		},
		//鼠标移动
		mousemove: function(){
			var that = this;
			var leftSW = this.smallWrap.offset().left;
			var topSW = this.smallWrap.offset().top;
			this.smallWrap.mousemove(function(e){
				var left = e.pageX-leftSW;
				var top = e.pageY-topSW;
				//处理left和top，做边缘处理（防止越界）
				left = left < 93 ? 93 : (left > 291) ? 291 : left;
				top = top < 110 ? 110 : (top > 350) ? 350 : top;
				//改变滤镜位置
				that.filter.css({
					left: left-93,
					top: top-110
				});
				that.largeImg.css({
					left: -2*(left-93),
					top: -2*(top-110)
				});
			});
		},
		hover: function(){
			var that = this;
			/*鼠标移入显示*/
			this.smallWrap.mouseenter(function(){
				that.filter.show();
				that.largeWrap.show();
			})
			/*鼠标移出隐藏*/
			this.smallWrap.mouseleave( function(){
				that.filter.hide();
				that.largeWrap.hide();
			})
		},
		/*图片切换效果*/
		//鼠标切换事件
		switchover: function(){
			var that = this;
			this.small.mouseenter(function(){
				var index = $(this).index();
				$(this).addClass('bor').siblings().removeClass('bor')
				that.medium.eq(index).show().siblings().hide();
				that.largeImg.eq(index).show().siblings().hide();
			});
		}
	};
	glass.init();
	
	
	
	/*详情页面加入购物车*/
	var detail = {
		init: function(){
			this.main = $('.goods');
			this.sizeCon = this.main.find('.size-content');
		
			this.data = {};
			
			//方法调用
			this.initData();
		},
		initData: function(){
			//通过attr方法获取元素的属性
			var gid = this.main.attr('data-gid');
			var that = this;
			//getJSON(url,fn)
			$.getJSON('js/data.json',function(result){
				/*console.log(result);
				console.log(gid);*/
				that.data = result[gid];
				
				//填充尺寸
				that.createSize();
				//点击尺寸事件
				that.sizeClick();

				//加入购物车
				that.addCart();
			});
		},
		createSize: function(){
			var size = this.data.size;
			//遍历所有的尺寸，拼接字符串     data-size 自定义属性
			var sizeStr = '';
			for(var key in size){
				sizeStr += '<li class="tb-con-item" data-size="'+key+'">'
						+		'<a href="javascript:;">'+size[key]+'</a>'
						+	'</li>';
			}
			this.sizeCon.html(sizeStr);
			//给第一个尺寸添加选中状态  children() 子元素
			this.sizeCon.children().eq(0).addClass('selected');
		},
		//点击尺寸
		sizeClick: function(){
			//利用事件委托给子元素添加事件
			this.sizeCon.on('click','li',function(){
				$(this).addClass('selected').siblings().removeClass('selected');
			});
		},
		
		//加入购物车
		addCart: function(){
			var that = this;
			//【加入购物车】按钮点击
			this.main.find('.option-addCart').click(function(){
				//data() 获取以data-开的自定义属性的值
				var gid = that.main.data('gid');
				//sizeId
				var sizeId = that.sizeCon.find('.selected').data('size');
				
				//cookie在哪？ $.cookie()
				var cart = $.cookie('tb_cart')  || '{}';
				cart = JSON.parse( cart );
				//判断购物车是否已经存在当前商品
				if(!cart[sizeId]){
					cart[sizeId] = {
						"goods-id": gid,
						"size-id": sizeId,
					};
				}

				//重新写到cookie中
				$.cookie('tb_cart',JSON.stringify(cart),{expires:365,path: '/'});

				alert('添加成功');

				console.log( JSON.parse( $.cookie('tb_cart') ) );
			});
		}
	};
	detail.init();
});

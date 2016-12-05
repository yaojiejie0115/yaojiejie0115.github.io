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

});

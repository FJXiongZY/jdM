$(function(){
	(function(){
		var filter_ul = $(".filter_ul"),
		aLi = filter_ul.children("li"),
		liWidth = aLi.eq(0).outerWidth(),
		startX = 0,
		endX = 0,
		moveX = 0,
		tempX = 0,
		ifMoveX = 0,
		dragMoveX = 0,
		targetX = 100,
		offsetMoveX = 0;
		
		//设置
		filter_ul.width(aLi.length * liWidth + aLi.length - 1);
		
		//
		clientX = $(window).width() > 768 ? 768 : $(window).width();
		MaxMoveX = filter_ul.outerWidth() - clientX;
		//滑动
		filter_ul.on("touchstart", function(e){
			stratX = e.originalEvent.changedTouches[0].pageX;
		}).on("touchmove", function(e){
			tempX = e.originalEvent.changedTouches[0].pageX;
			moveX = dragMoveX + tempX - stratX;
			if(moveX >= 0){
				moveX = 0;
			}else if(moveX <= -MaxMoveX){
				moveX = -MaxMoveX;
			}
			filter_ul.animate({"left":moveX}, 0);
		}).on("touchend", function(e){
			dragMoveX = moveX;
			ifMoveX = parseInt(Math.round(tempX - stratX));
			if(moveX < 0 && moveX > -MaxMoveX){
				if(ifMoveX > 0 && ifMoveX > targetX){
					offsetMoveX = 30;
				}else if(ifMoveX < 0 && ifMoveX < -targetX){
					offsetMoveX = -30;
				}else{
					offsetMoveX = 0;
				}
				filter_ul.animate({"left":dragMoveX + offsetMoveX});
			}
		});
		
	})()
})

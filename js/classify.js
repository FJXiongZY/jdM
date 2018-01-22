$(function(){
	function resize(){
		function touchDrag(obj, obj2, MaxMove){
			var start = 0,
			end = 0,
			move = 0,
			temp = 0,
			ifMove = 0,
			dragMove = 0,
			target = 100,
			offsetMove = 0,
			MaxMove = MaxMove;
			
			obj.on("touchstart", function(e){
				start = e.originalEvent.changedTouches[0].pageY - 40;
			}).on("touchmove", function(e){
				temp = e.originalEvent.changedTouches[0].pageY - 40;
				move = dragMove + temp - start;
				if(move >= 0){
					move = 0;
				}else if(move <= -MaxMove){
					move = -MaxMove;
				}
				obj2.animate({"top":move}, 0);
			}).on("touchend", function(e){
				dragMove = move;
				ifMove = parseInt(Math.round(temp - start));
				if(move < 0 && move > -MaxMove){
					if(ifMove > 0 && ifMove > target){
						offsetMove = 30;
					}else if(ifMove < 0 && ifMove < -target){
						offsetMove = -30;
					}else{
						offsetMove = 0;
					}
					obj2.animate({"top":dragMove + offsetMove});
				}
			});
		}
		//左侧拖动
		(function(){
			var cLeft = $(".category_left"),
				cLeftHeight = $(window).height() - 40,
				oUl = cLeft.children("ul").eq(0),
				oUlHeight = oUl.height(),
				maxMove = oUlHeight - cLeftHeight;
			//设置左侧的高度
			cLeft.height(cLeftHeight);
			touchDrag(cLeft, oUl, maxMove);
			console.log(jd_header);
		})();
		//右侧拖动
		(function(){
			var cRight = $(".category_right");
				cRightHeight = $(window).height() - 40,
				oList = $(".branchList"),
				oListHeight = oList.height(),
				maxMove = oListHeight - cRightHeight;
			//设置右侧的高度
			cRight.height(cRightHeight);
			touchDrag(cRight, oList, maxMove);
		})();
	}
	$(window).on("resize", resize).trigger("resize");
});

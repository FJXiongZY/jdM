$(function(){
	function resize(){
		//焦点图片
		(function(){
			var oUl = $(".scroll_imgs_ul"),
				nub_slide_to = $(".nub_slide_to"),
				clientWidth = $(window).width(),
				aLi = oUl.children("li"),
				liLength = aLi.length,
				clientWidth = clientWidth > 768 ? 768 : clientWidth,
				aLiWidth = aLi.width(clientWidth),
				oLiWidth = aLi.eq(0).outerWidth(),
				start = 0,
				end = 0,
				move = 0,
				temp = 0,
				dragMove = 0,
				targetMove = 100,
				moveWidth = 0,
				index = 0;
			
			//设置
			oUl.width(oLiWidth * liLength);
			$(".nub_slide_sum").text(liLength);
			//从新获取ul的宽度
			var oUlWidth = oUl.width(),
 				maxMove = oUlWidth - oLiWidth;
			//滑动
			oUl.on("touchstart", function(e){
				strat = e.originalEvent.changedTouches[0].pageX;
			}).on("touchmove", function(e){
				temp = e.originalEvent.changedTouches[0].pageX;
 				moveWidth = temp - strat;
				move = dragMove + moveWidth;
				oUl.animate({"left":move},0);
			}).on("touchend", function(){
				if(moveWidth > 0 && dragMove == 0 || Math.abs(moveWidth) < targetMove){
					oUl.animate({"left":dragMove});
					dragMove = dragMove;
				}else if(moveWidth < 0 && dragMove == -maxMove){
					oUl.animate({"left":-maxMove});
					dragMove = -maxMove;
				}else if(Math.abs(moveWidth) > targetMove){
					if(moveWidth < 0){
						oUl.animate({"left":dragMove - clientWidth});
						dragMove = dragMove - clientWidth;
					}else if(moveWidth > 0){
						oUl.animate({"left":dragMove + clientWidth});
						dragMove = dragMove + clientWidth;
					}
				}
				index = Math.abs(dragMove/clientWidth);
				nub_slide_to.text(index + 1);
			})
		})();
		//关注与取消关注
	 	(function(){
	 		var heartIcn = $(".love_heart_icn"),
		 		oneI = heartIcn,
		 		icnAttention =$(".icn_attention");
		 	heartIcn.on("click", function(){
		 		var _this = $(this).children(".icn_img_xin").children("i").eq(0);
		   		if(_this.attr("data-display") == 'block'){
		   			_this.removeClass("block").addClass("none").attr({"data-display":"none"}).siblings("i").removeClass("none").addClass("block").attr({"data-display":"block"})
		   			$(this).children(".icn_attention").text("已关注");
		   		}else{
		   			_this.removeClass("none").addClass("block").attr({"data-display":"block"}).siblings("i").removeClass("block").addClass("none").attr({"data-display":"none"})
		   			$(this).children(".icn_attention").text("关注");
		   		}
		 	});
	 	})();
	 	
	 	//设置图片高度
	 	(function(){
	 		var aLi = $(".comment-img-item"),
	 			aImg = aLi.children("a").children("img"),
	 			oImg = aLi.children("a").children("img").eq(0),
	 			oImgWidth = oImg.width();
	 		aImg.css({"min-height":oImgWidth});
	 		aLi.height(oImgWidth);
	 	})();
	 	
	 	//上拉隐藏菜单
	 	(function(){
	 		var Promotion = $(".Promotion"),
	 			black = $(".marketing_black"),
	 			marketing = $(".marketing"),
 	 			close = $(".marketing .marketing_tit_close"),
 	 			moveHeight = $(window).height();
 	 		Promotion.on("click", function(){
 	 			black.show();
   	 			marketing.animate({"bottom":0});
 	 		});
 	 		function marketingNone(){
 	 			marketing.animate({"bottom":-moveHeight*0.7},function(){
   	 				black.hide();
 	 			});
 	 		}
 	 		close.on("click", function(){
 	 			marketingNone();
 	 		});
 	 		marketing.on("click", function(event){
 	 			event.stopPropagation(); 
 	 		});
   	 		black.on("click", function(){
   	 			marketingNone();
   	 		});
	 	})();
	 	
	 	// 选中
	 	(function(){
	 		var oul = $(".location_content_ul"),
	 			location_black = $('.location_black');
	 			oLocation = location_black.children(".location"),
	 			delivery = $(".delivery_location"),
	 			clientWidth = $(window).width(),
	 			aLi = oul.children("li"),
	 			leftMore = $(".left_more");
	 		aLi.on("click", function(){
	 			$(this).children("i").show().parent().siblings().children("i").hide();
	 		});
	 		function locationMove(){
	 			oLocation.animate({"left":clientWidth},function(){
	 				location_black.hide();
	 			});
	 		}
	 		delivery.on("click", function(){
	 			location_black.show();
	 			oLocation.animate({"left":clientWidth*0.15});
	 		});
	 		leftMore.on("click", function(){
	 			locationMove();
	 		});
	 		oLocation.on("click", function(event){
	 			event.stopPropagation();
	 		})
	 		location_black.on("click", function(){
	 			locationMove();
	 		})
	 	})();
	}
	$(window).on("resize", resize).trigger("resize");
})
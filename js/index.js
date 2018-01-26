$(function(){
	function resize(){
		//设置头部的滚动颜色
		$(window).scroll(function(){
			var parentCarouselHeight = $("#carousel").height(),
			scrollHeight = $(window).scrollTop(),
			opacity = scrollHeight < parentCarouselHeight ? scrollHeight/parentCarouselHeight*0.9 : 0.9;

			$(".jd_header_box").css({"background":"rgba(201,21,35,"+opacity+")"});
		});
		//轮播图
		(function(){
			var oCarousel = $("#carousel"),
				oCarousel_inner = oCarousel.children(".carousel_inner"),
				carousel_indicators = oCarousel.children(".carousel_indicators"),
				aItem = oCarousel_inner.children(".item"),
				oItemWidth = aItem.eq(0).width(),
				itemLen = aItem.length,
				aLi = carousel_indicators.children("li"),
				firstItem = aItem.eq(0),
				lastItem = aItem.eq(itemLen-1),
				clientWidth = $(window).width() > 768 ? 768 : $(window).width(),
				index = 1,
				startX = 0,
				moveX = 0,
				thisMoveX = 0,
				endX = 0,
				temp = 0,
				targetX = oItemWidth * 0.3,
				timer = null;
			
			//设置
			
			oCarousel_inner.append(firstItem.prop("outerHTML"));
			oCarousel_inner.prepend(lastItem.prop("outerHTML"));
			var	aItem = $(".item"),
				itemLen = aItem.length;
			aItem.width(clientWidth);							//设置图片的宽度
			oCarousel_inner.width(itemLen * oItemWidth);	//设置图片容器的宽度
			oCarousel_inner.css({"left": -oItemWidth});
			carousel_indicators.css({"margin-left":-carousel_indicators.width()/2});
			
			//滑动
			oCarousel_inner.on("touchstart", function(e){
				clearInterval(timer);
				stratX = e.originalEvent.changedTouches[0].pageX;
			}).on("touchmove", function(e){
				temp = e.originalEvent.changedTouches[0].pageX;
				thisMoveX = temp - stratX;
				moveX = -index * clientWidth + thisMoveX;
				oCarousel_inner.animate({"left":moveX},0);
			}).on("touchend", function(e){
				if( Math.abs(thisMoveX) > targetX && thisMoveX > 0 ){
					index --;
					oCarousel_inner.animate({"left":-index*clientWidth});
					index = index == 0 ? itemLen - 2 : index;
				}else if( Math.abs(thisMoveX) > targetX && thisMoveX < 0 ){
					index ++;
					oCarousel_inner.animate({"left":-index*clientWidth});
					index = index > itemLen - 2 ? 1 : index;
				}else{
					oCarousel_inner.animate({"left":-index*clientWidth});
				}
				aLi.eq(index-1).addClass("active").siblings().removeClass("active");
				timer = setInterval(timerMove, 1000);
			});
			
			function timerMove(){
				index ++;
				oCarousel_inner.animate({"left":-index*clientWidth},function(){
					if(index > itemLen - 2){
						index = 1;
						oCarousel_inner.css({"left":-index*clientWidth});
					}
					aLi.eq(index-1).addClass("active").siblings().removeClass("active");
				});
			}
			
			timer = setInterval(timerMove, 1000);
		})();
		//京东秒杀
		(function(){
			var saleUl = $(".sale-body-ul"),
				aLi = saleUl.children("li"),
				startX = 0,
				endX = 0,
				moveX = 0,
				tempX = 0,
				ifMoveX = 0,
				dragMoveX = 0,
				targetX = 100,
				offsetMoveX = 0;
			
			aLi.outerWidth(parseInt($(document).outerWidth() * 0.3) > 197 ? 197 : parseInt($(document).outerWidth() * 0.3));
			saleUl.width(aLi.length * aLi.eq(0).outerWidth());
			
			var MaxMoveX = saleUl.width() - ($(document).outerWidth());
			
			saleUl.on("touchstart", function(e){
				stratX = e.originalEvent.changedTouches[0].pageX;
			}).on("touchmove", function(e){
				tempX = e.originalEvent.changedTouches[0].pageX;
				moveX = dragMoveX + tempX - stratX;
				if(moveX >= 0){
					moveX = 0;
				}else if(moveX <= -MaxMoveX){
					moveX = -MaxMoveX;
				}
				saleUl.animate({"left":moveX}, 0);
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
					saleUl.animate({"left":dragMoveX + offsetMoveX});
				}
			});
		})();
		
		//秒杀倒计时
		(function(){
			var totalHour = 5,
				totalSec = totalHour*60*60,
				liArr = $(".Countdown li");
				
			var timeId = setInterval(function () {
				if (totalSec<=0) {
					clearInterval(timeId);
					alert("该场秒杀结束...");
					return;
				}
				totalSec--;
				var hour = Math.floor(totalSec / 3600);
				var minute = Math.floor(totalSec % 3600 /60);
				var sec =totalSec % 60;
				liArr[0].innerHTML =Math.floor(hour/10) ;
				liArr[1].innerHTML =hour%10 ;
				
				liArr[3].innerHTML = Math.floor(minute/10);
				liArr[4].innerHTML = minute%10;
				
				liArr[6].innerHTML = Math.floor(sec/10); 
				liArr[7].innerHTML = sec%10; 
			},1000);
			
		})();
	}
	$(window).on("resize", resize).trigger("resize");
})

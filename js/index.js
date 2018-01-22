$(function(){
	function resize(){
		//设置头部的滚动颜色
		$(window).scroll(function(){
			var parentCarouselHeight = $("#parentCarousel").height(),
			scrollHeight = $(window).scrollTop(),
			opacity = scrollHeight < parentCarouselHeight ? scrollHeight/parentCarouselHeight*0.9 : 0.9;

			$(".jd_header_box").css({"background":"rgba(201,21,35,"+opacity+")"});
		});
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

$(document).ready(function(){

	moduleScrollToTop.init();

});


// module scroll to top
var moduleScrollToTop = (function(){
	var scroll = $('.b-scroll'), // блок - кнопка
		wind = $(window),
		header = $('.b-header').outerHeight(); // высота после прокрутки которой появляется кнопка

	return {
		init: function(){

			wind.on("scroll", function(){
				var windSc = wind.scrollTop(); // отслеживание положения вертикального скролла окна

				if(windSc > header){
					scroll.fadeIn(500); // появление кнопки
				}else{
					scroll.fadeOut(500); // ищезновение кнопки
				}
			});

			scroll.on("click", function(){ // при клике кнопки возвращать экран на самый верх
				$('body, html').animate({
					scrollTop : 0
				},{
					duration: 500,
					queue: false
				});
			});
		}
	}

})();

// module slider
var moduleSlider = (function(){
	
})();
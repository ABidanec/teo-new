$(document).ready(function(){

	moduleScrollToTop.init();
    
    $('.b-top-slider__list').slick({
        autoplay: true, // авто прокрутка
  	    autoplaySpeed : 3000, // скорость прокрутки
        dots : true, // навигация по точкам
        arrows : true // включение/отключение кнопок навигации
    });
    
    $('.b-product__list').slick({
        autoplay: true, // авто прокрутка
  	    autoplaySpeed : 2000, // скорость прокрутки
        dots : true, // навигация по точкам
        slidesToShow: 4, // количество отображаемых слайдов
        slidesToScroll: 1, // количетсво проуручеваемых слайдов
         arrows : true // включение/отключение кнопок навигации
    });
    
    $('.b-slider-brend__list').slick({
        autoplay: true, // авто прокрутка
  	    autoplaySpeed : 2000, // скорость прокрутки
        slidesToShow: 5, // количество отображаемых слайдов
        slidesToScroll: 1, // количетсво проуручеваемых слайдов
        dots : true, // навигация по точкам
        arrows : false // включение/отключение кнопок навигации
    });
    
    $(".b-top-menu__list").slicknav();
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
	var 
		slider = $(".b-top-slider"),
		sliderList = slider.children()
})();
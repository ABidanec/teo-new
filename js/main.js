$(document).ready(function(){

//    sliders
    
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
//  end  sliders  
    
// top menu
    moduleMenu.init($(".b-top-menu__list"));  
// end top menu
    
//    scroll to top
	moduleScrollToTop.init();
//    end scroll to top
    
//    search
    moduleSearch.init();
//    end search

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

// module menu
var moduleMenu = (function(){
    
    /**
    метод маркирует элементы у которых есть вложенные списки
    на любую глубину.
    В метод передается JQuery переменная корневого элемента меню
    */
    var isSubMenuItem = function(menu){
        var 
        item = menu.children("li"),
        itemQuality = item.length;
        
        for(var i=0; i<itemQuality; i+=1){
            var 
                it = $(item[i]),
                temp = it.children("ul");
            
            if(temp.length != 0){
                it.addClass('b-top-menu__item_child');
                isSubMenuItem($(temp));
            }
        }
    };
    
    return {
        init: function(menu){
            menu.slicknav();
            isSubMenuItem(menu);
           
        },
        
    }
})();

// module search
var moduleSearch = (function(){
    return{
        init: function(){
            
           $(".b-top-search__button").on("click", function(e){
                e.preventDefault();
               $(".b-search").css({"display" : "block"});
           });
            
           $(".b-search__close").on("click", function(e){
               e.preventDefault();
               $(".b-search").css({"display" : "none"});
           });
           
           $(".b-search__form").on("submit", function(){
               $(".b-search").css({"display" : "none"});
           })
        }
    } 
        
})();
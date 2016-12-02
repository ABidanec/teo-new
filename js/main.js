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

//    contact
    moduleContactValidation.init();
//    end contact
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
/**
модуль управлением верхнего меню
*/
var moduleMenu = (function(){
    
    /**
    метод маркирует элементы у которых есть вложенные списки
    на любую глубину.
    В метод передается JQuery переменная корневого элемента меню
    */
    var _isSubMenuItem = function(menu){
        var 
        item = menu.children("li"),
        itemQuality = item.length;
        
        for(var i=0; i<itemQuality; i+=1){
            var 
                it = $(item[i]),
                temp = it.children("ul");
            
            if(temp.length != 0){
//                it.addClass('b-top-menu__item_child');
                if(it.hasClass('b-top-menu__item')){
                    it.addClass('b-top-menu__item_child');
                }else{
                    it.addClass('b-sub-top-menu__item_child');
                } 
                
                _isSubMenuItem($(temp));
            }
        }
    };
    
    return {
        init: function(menu){
            menu.slicknav();
            _isSubMenuItem(menu);
           
        },
        
    }
})();

// module search
/**
модуль открытия/закртытия блока поиска в шапке
*/
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

// module contact validation
/**
модуль валидации формы контактов
*/
var moduleContactValidation = (function(){
    var 
        form = $(".b-form"),
        name = $(".l-form__input[name='name']"),
        phone = $(".l-form__input[name='phone']"),
        email = $(".l-form__input[name='email']"),
        service = $(".l-form__input[name='service']"),
        textarea = $(".b-form__textarea"),
        errClass = "l-form__right_err";
    
    // метод обозначающий не правильно заполненное поле
    var _displayErrBorder = function(el){
        el.addClass(errClass);
    }
    
    var _noneErrBorder = function(el){
        el.removeClass(errClass);
    }
    
    // метод валидации поля 
    var _validField = function(field){
       if(field.val() === "") {
           _displayErrBorder(field);
           return false;
       }else{
           _noneErrBorder(field);
           return true;
       }
    }
    
    
    
    return {
        init: function(){
           form.on("submit", function(){

               _validField(name);
               _validField(phone);
               _validField(email);
               _validField(service);
               _validField(textarea);
               if(!_validField(name) || !_validField(phone) || !_validField(email) || !_validField(service) || !_validField(textarea)){
                   console.log(false);
               }else{
                   console.log(true);
               }
               
               return false;
           }); 
        }
    }
})();


// модуль статики шапки при прокрутке
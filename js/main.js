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
        arrows : true, // включение/отключение кнопок навигации
        responsive : [{
            breakpoint : 600,
            settings: {
                slidesToShow: 2
            }
        }]
    });
    
    $('.b-slider-brend__list').slick({
        autoplay: true, // авто прокрутка
  	    autoplaySpeed : 2000, // скорость прокрутки
        slidesToShow: 5, // количество отображаемых слайдов
        slidesToScroll: 1, // количетсво проуручеваемых слайдов
        dots : true, // навигация по точкам
        arrows : false, // включение/отключение кнопок навигации
        responsive : [{
            breakpoint : 600,
            settings: {
                slidesToShow: 3
            }
        }]
    });
//  end  sliders  
    
// top menu
    moduleMenu.init($(".b-top-menu__list"));
// end top menu
    
//    scroll to top
	moduleScrollToTop.init();
//    end scroll to top
    
//    search
    moduleSearch.action();
//    end search

//    contact
    moduleContactValidation.init();
//    end contact

// sidebar menu
    moduleMenuSidebar.action();
//end sidebar menu

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
        item = menu.children("li"), // массив дочерних элементов меню
        itemQuality = item.length; // размер массива
        
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
            menu.slicknav({
                label : "Меню"
            });
            _isSubMenuItem(menu);
           
        },
        
    }
})();

// module search
/**
модуль открытия/закртытия блока поиска в шапке
*/
var moduleSearch = (function(){

    var fields = {
        blockSearch : ".b-search",
        formSearch : ".b-search__form",
        close : ".b-search__close",
        search : ".b-top-search__button"
    }

    var _methodButtonSearch = function(){
        $(fields.search).on("click", function(e){
            e.preventDefault();
            console.log("click");
            $(fields.blockSearch).fadeIn(500);
        });
    };

    var _methodCloseSearchButton = function(){
        $(fields.close).on("click", function(e){
            e.preventDefault();
            $(fields.blockSearch).fadeOut(500);
        });
    };

    var _methodFormSearch = function(){
        $(fields.formSearch).on("submit", function(){
            $(fields.blockSearch).fadeOut(500);
        });
    };

    return{
        action: function(){
            _methodButtonSearch();
            _methodCloseSearchButton();
            _methodFormSearch();
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

               var flag = false,
                   nAme = _validField(name),
                   pHone = _validField(phone),
                   eMail = _validField(email),
                   seRvice = _validField(service),
                   textArea = _validField(textarea);

               if(!nAme || !pHone || !eMail || !seRvice || !textArea){
                   flag = false;
               }else{
                   flag = true;
               }
               return flag;
           }); 
        }
    }
})();

// moduleMenuSidebar
/**
 * модуль раскрытия бокового меню в сайдбаре
 */
var moduleMenuSidebar = (function(){
    var fields = {
      listRootMenu : ".b-sidebar-menu__list", // корневой элемент меню
      itemRootMenu : ".b-sidebar-menu__item", // элемент меню в которм подменю
      slideToggle : "slow" // режми анимации
    };

    // при наличии дочернего списка метод открывает и закрывает его
    var _showSubMenu = function(){
        $(fields.itemRootMenu).children('ul').hide();
        $(fields.itemRootMenu).hover(function(){
            $(this).children('ul:not(:animated)').stop(true,true).slideToggle(fields.slideToggle);
        });
    };

    // отображение маркера при наличии у пункта меню дочернего списка
    var _markerItem = function(){
             var arrRootItem = $(fields.listRootMenu).children("li"),
                 arrQuality = arrRootItem.length;

             for(var i = 0; i < arrQuality; i+=1){
                 var temp = $(arrRootItem[i]),
                     l = temp.children("ul").length;

                if(l != 0){
                    temp.addClass("b-sidebar-menu__link_flag");
                }
             }
        };

    return {
        action: function(){
            _showSubMenu();
            _markerItem();
        }
    }
})();
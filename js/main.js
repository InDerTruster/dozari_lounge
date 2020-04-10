$(document).ready(function name(params) {

	//Для удобных анимаций Animate.css
	function animateCSS(element, animationName, callback) {
		const node = document.querySelector(element)
		node.classList.add('animated', animationName)

		function handleAnimationEnd() {
			node.classList.remove('animated', animationName)
			node.removeEventListener('animationend', handleAnimationEnd)

			if (typeof callback === 'function') callback()
		}

		node.addEventListener('animationend', handleAnimationEnd)
	}

	//Удаление рекламы с плагина инстаграма
	function removeADS() {
		if ($('.elfsight-app-6b40d42d-13e4-4404-bda0-d8925a8020cb > a')) {
			$('.elfsight-app-6b40d42d-13e4-4404-bda0-d8925a8020cb > a').remove();
		}
	}

	//Вызов функции onScroll при загрузке для показа меню если сайт открыт не в начале страницы
	onScroll();
	$(window).scroll(() => {
		onScroll();
		removeADS();
	});

	//Плавный скролл по якорям
	$('a[href^="#"]').on("click", function (e) {
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top + 2
		}, 777);
		e.preventDefault();
		return false;
	});

	function showOnScroll() {
		scrollPos = $(window).scrollTop() + $(window).innerHeight();
		$('.showOnScroll').each(function () {
			let itemPos = $(this).parent().offset().top;
			if (scrollPos - itemPos < 250) {
				$(this).css({
					display: 'block'
				});
			}
		});
	}

	function onScroll(event) {
		var scrollPos = $(document).scrollTop();
		showOnScroll();
		$('.main_menu a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.position().top - 200 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				$('.main_menu li a').removeClass("active");
				currLink.addClass("active");
			} else {
				currLink.removeClass("active");
			}
			//цвет меню, текста в нем
			if (scrollPos >= 150) {
				$('.common_menu').addClass('active');
			} else {
				$('.common_menu').removeClass('active');
			}
			//Появление кнопки 'Наверх'
			if (scrollPos >= 250) {
				$('.scroll-to-top').removeClass("bounceOutRight");
				$('.scroll-to-top').addClass("bounceInRight");
			} else {
				$('.scroll-to-top').removeClass("bounceInRight");
				$('.scroll-to-top').addClass("bounceOutRight");
			}
		});
	}

	//Модальное окно формы обратной связи
	$('.popup_reserve').click(function (e) {
		e.preventDefault();
		title = $(this).data('title');
		button = $(this).data('button');
		if (title == 'Забронировать столик') {
			$('.reserve_input').css({
				display: 'block'
			});
		} else {
			$('.reserve_input').css({
				display: 'none'
			});
		}
		$('#modal_feedback .form_title').val(title);
		$('#modal_feedback h3').text(title);
		$('#modal_feedback .purple_button').text(button);
		$('#modal_feedback').fadeIn(500);
	});

	//Модальное окно панорамы
	$('.popup_tour').click(function (e) {
		e.preventDefault();
		$('#modal_tour').fadeIn(500);
		let panorama = new PANOLENS.ImagePanorama($(this).data('tour'));
		container = document.querySelector('#modal_tour_container');
		viewer = new PANOLENS.Viewer({
			container: container
		});
		viewer.add(panorama);
	});

	//Модальное окно видео
	$('.popup_video').click(function (e) {
		e.preventDefault();
		$('#modal_video').fadeIn(500);

	});

	//Для закрытия модалок
	$(".modal_window").bind("click", function (e) {
		/* e.preventDefault(); */ //Мешало отправке формы
		if ($(e.target).hasClass('modal_background') || $(e.target).hasClass('modal_close')) {
			$(this).fadeOut(500);
			if ($('#modal_tour_container canvas').length > 0) {
				viewer.destroy();
				$('#modal_tour_container canvas').remove();
			}
		}
	});

	$('.phone_number').mask('8 (000) 000-00-00');

	//Перещелкивание вкладок меню по клику
	$('.menu_tabs__tab').click(function () {
		if ($(this).hasClass('active')) {
			return;
		}
		$('.menu_tabs__tab.active').removeClass('active');
		$(this).addClass('active');
		let menuPageClass = '.menu_content__page.' + $(this).data('target');
		animateCSS('.menu_content__page.active', 'slideOutLeft', function () {
			$('.menu_content__page.active').removeClass('active');
			$(menuPageClass).addClass('active');
			animateCSS(menuPageClass, 'slideInRight');
		});
	});


	//Перещелкивание вкладок меню автоматом
	/* function menuSwitch() {
		let activeMenu = $('.menu_tabs__tab.active');
		if (activeMenu.length == 0) {
			activeMenu = $('.menu_tabs__tab:last')
		}
		let nextActiveMenu = activeMenu.next().length ? activeMenu.next() : $('.menu_tabs__tab:first');
		let nextPageClass = '.menu_content__page.' + nextActiveMenu.data('target');
		animateCSS('.menu_content__page.active', 'slideOutLeft', function () {
			activeMenu.removeClass('active');
			$('.menu_content__page.active').removeClass('active');
			$(nextPageClass).addClass('active');
			nextActiveMenu.addClass('active');
			animateCSS(nextPageClass, 'slideInRight');
		});
	}

	var theInterval;

	function startMenuSwitch() {
		theInterval = setInterval(menuSwitch, 15000);
	}

	function stopMenuSwitch() {
		clearInterval(theInterval);
	}

	$(function () {
		startMenuSwitch();
		$('.dozari_menu').hover(function () {
			stopMenuSwitch();
		}, function () {
			startMenuSwitch();
		});
	}); */


	//Активация галереи
	lightGallery(document.getElementById('lightgallery'), {
		thumbnail: true,
		animateThumb: true,
		showThumbByDefault: true,
		mode: 'lg-soft-zoom'
	});
	$('#lightgallery a').each(function () {
		let imgUrl = $(this)[0].pathname;
		$(this).css({
			backgroundImage: "url('" + imgUrl + "')"
		});
	});

	//Активация слайдера отзывов
	$('.owl-carousel').owlCarousel({
		nav: false,
		items: 3,
		responsive: {
			0: {
				items: 1,
			},
			980: {
				items: 2,
			},
			1280: {
				items: 3,
			}
		}
	});

	//Вставка даты и текста в футер
	actualYear = new Date().getFullYear();
	$('#footer .copyright').html('© DoZaRi Louge Bar ' + actualYear);
	$('section#footer .uniqcode').hover(() => {
		animateCSS('.uniqcode img', 'heartBeat');
	});

	//Инициализация wow.js
	new WOW().init();

	//Typed.js init
	var TypedJsOptions = {
		strings: ['Полноценная кухня', 'Праздничные мероприятия', 'Большой выбор напиткой', 'Отличная атмосфера', 'Бесплатный караоке', 'Огромный выбор табака'],
		typeSpeed: 120,
		backSpeed: 50,
		startDelay: 1000,
		loop: true
	};
	var typed = new Typed('.welcom_titles p span', TypedJsOptions);

	//CountUp.js Init

	$('.countUpMe').each(function () {
		// no need to specify options unless they differ from the defaults
		let target = this;
		let endVal = parseInt($(this).attr('data-endVal'));
		let randTime = endVal / 100 * 6;
		theAnimation = new countUp(target, 0, endVal, 0, randTime);
		theAnimation.start();
	});

	//Mobile menu open
	$(".open_menu").bind("click", function (e) {
		e.preventDefault();
		$('.main_menu').slideToggle();
		$(this).toggleClass('active');
	});


	//Отправка формы
	$('form').submit(function (e) {
		e.preventDefault();
		let form = $(this);
		$.ajax({
			type: $(this).attr('method'),
			url: $(this).attr('action'),
			data: $(this).serialize(),
			success: function (data) {
				if (data == 'true') {
					$('.form_response').html('Спасибо, ваше сообщение успешно отправлено!');
					$('.form_response').addClass('menu_text_green');
					$('.form_response').slideToggle();
					form[0].reset();
					setTimeout(function(){
					    $('.form_response').removeClass('menu_text_green');
						$('.form_response').slideToggle();
						$(".modal_window").fadeOut(500);
					}, 2000);
				}else{
					$('.form_response').html('Сообщение не отправлено, попробуйте еще раз.');
					$('.form_response').addClass('menu_text_red');
					$('.form_response').show();
				}
			},
			error: function (data) {
				$('.form_response').html('Сообщение не отправлено, попробуйте еще раз.');
				$('.form_response').addClass('menu_text_red');
				$('.form_response').show();
			},
		});
	});

	//Доп мера от спама
	$('.phone_number').keyup(function(){
	  console.log($(this).val().length);
	  if ($(this).val().length === 17) {
	  	$('#form_valid').val('true');
	  }else{
	  	$('#form_valid').val('false');
	  }
	});

});
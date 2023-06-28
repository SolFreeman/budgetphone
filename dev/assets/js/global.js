$(window).on('load resize', function () {
	if ($(window).width() < 768) {
		$('.review-slider:not(.slick-initialized)').slick({
			dots: true,
			infinite: true,
			speed: 100,
			slidesToShow: 1,
			arrows: false
		});

		$('.js-secrets-slider:not(.slick-initialized)').slick({
			dots: true,
			infinite: true,
			speed: 200,
			slidesToShow: 1,
			arrows: false
		});

		// $('.search-list:not(.slick-initialized)').slick({
		// 	dots: true,
		// 	infinite: true,
		// 	speed: 200,
		// 	slidesToShow: 1,
		// 	arrows: false
		// });

	} else {
		$(".js-secrets-slider.slick-initialized").slick("unslick");
		$(".review-slider.slick-initialized").slick("unslick");
		// $(".search-list.slick-initialized").slick("unslick");
	}

	if ($(window).width() < 1340) {
		openPro();
	}
});

jQuery(document).ready(function ($) {
	faqAccordeon();
	openDropdown();
	addClass();
	// selectNumber();

	$(window).on('beforeunload', function () {
		if ($(window).scrollTop() === 0) {
			$('.main-header').removeClass('sticky');
		}
	});
	$(".js-select2").select2({
		closeOnSelect: false,
		placeholder: "Комплектація",
		// allowHtml: true,
		allowClear: true,
		tags: true // создает новые опции на лету
	});
	$(".select_single").select2({
		theme: 'single'
	});

	$('.form-box .text-input').on('input', function () {
		if ($(this).val().trim() !== '') {
			$(this).addClass('filled');
		} else {
			$(this).removeClass('filled');
		}
	});



	$('a[data-fancybox][data-target].open').on('click', function (e) {
		e.preventDefault();
		var targetModalId = $(this).attr('href');
		var targetTabId = $(this).data('target');

		$.fancybox.open($(targetModalId), {
			arrows: false,
			infobar: false,
			beforeShow: function () {
				var targetModal = $(targetModalId);
				targetModal.find('ul.tabs__caption li').removeClass('active');
				targetModal.find('div.tabs__content').removeClass('active');
			},
			afterShow: function () {
				var targetModal = $(targetModalId);
				targetModal.find(targetTabId).addClass('active');
				var targetTabIndex = targetModal.find(targetTabId).index();
				targetModal.find('ul.tabs__caption li').eq(targetTabIndex).addClass('active');
			}
		});

		$('.fancybox-navigation').addClass('hidden');
	});

	$('ul.tabs__caption').on('click', 'li:not(.active)', function () {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	});







	$('.detail-links').on('click', 'li:not(.active)', function () {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	});


	$('.btn_pro').hover(function () {
		$('.choose-menu').removeClass('active');
	});

	function autocomplete() {
		let suggestions = [];

		$('.faq-list li span').each(function () {
			suggestions.push($(this).text());
		});

		$('.search').on('input', function () {
			let inputValue = $(this).val().toLowerCase();
			let suggestionList = $('.suggestion-list');

			if (inputValue.length >= 3) {
				let filteredSuggestions = suggestions.filter(function (suggestion) {
					return suggestion.toLowerCase().includes(inputValue);
				});

				let suggestionItems = filteredSuggestions.map(function (suggestion) {
					return '<li>' + suggestion + '</li>';
				});

				suggestionList.html(suggestionItems.join(''));
				suggestionList.show();
			} else {
				suggestionList.hide();
			}

			if (inputValue === '') {
				$('.faq-list li').show();
			}
		});

		$('.suggestion-list').on('click', 'li', function () {
			let suggestion = $(this).text();
			$('.search').val(suggestion);
			$('.suggestion-list').hide();

			let faqList = $('.faq-list li');
			faqList.hide();
			faqList.filter(function () {
				return $(this).find('span').text() === suggestion;
			}).show();
		});
	}

	autocomplete();

	function miniTabs() {
		var windowWidth = $(window).width();
		var isMobile = windowWidth <= 1024;

		function togglePhotoBox() {
			windowWidth = $(window).width();
			isMobile = windowWidth <= 1024;

			if (isMobile) {
				$('ul.mini-tabs li').off('click').on('click', function () {
					var photoBox = $(this).find('.photo-box');

					if (photoBox.is(':visible')) {
						photoBox.slideUp();
					} else {
						$('.photo-box').slideUp();
						photoBox.slideDown();
					}
				});

				$('ul.mini-tabs li:first-child .photo-box').slideDown();
			} else {
				$('ul.mini-tabs li').off('click');
				$('.photo-box').slideUp();
			}
		}

		togglePhotoBox();

		$(window).resize(function () {
			var newWindowWidth = $(window).width();
			var newIsMobile = newWindowWidth <= 768;

			if (isMobile !== newIsMobile) {
				togglePhotoBox();
			}
		});
	}


	miniTabs();

	function addClass() {
		var mainHeader = $('.main-header');
		var headerOffset = mainHeader.offset().top;

		$(window).on('load scroll', function () {
			var scrollTop = $(window).scrollTop();

			if (scrollTop >= headerOffset) {
				mainHeader.addClass('sticky');
			} else {
				mainHeader.removeClass('sticky');
			}
		});
	}

	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.scrolltop:hidden').stop(true, true).fadeIn();
		} else {
			$('.scrolltop').stop(true, true).fadeOut();
		}
	});

	$(function () {
		$(".muve-top").click(function () {
			var top = $(".thetop").offset().top;
			$('html, body').animate({
				scrollTop: top
			}, 3000, 'easeOutExpo');
			return false
		})
	})

	var nav = $('.language-title');
	var selection = $('.language-list');
	var select = selection.find('li');

	nav.click(function (event) {
		if (nav.hasClass('active')) {
			nav.removeClass('active');
			selection.stop().slideUp(200);
		} else {
			nav.addClass('active');
			selection.stop().slideDown(200);
		}
		event.preventDefault();
	});

	select.click(function (event) {
		select.removeClass('active');
		$(this).addClass('active');
		var $lang = $(this).text();
		nav.text($lang);
		nav.trigger('click');
	});

	let navOpener = document.querySelector('.js-nav-opener');
	let header = document.querySelector('.header');

	// navOpener.addEventListener('click', () => {
	// 	header.classList.toggle('active');
	// })

	let form = $("#checkout-step");
	form.validate({
		errorPlacement: function errorPlacement(error, element) { element.before(error); },
		rules: {
			confirm: {
				equalTo: "#password"
			}
		}
	});
	form.children("div").steps({
		headerTag: ".step-item",
		bodyTag: "section",
		transitionEffect: "slideLeft",
		titleTemplate: "<span class='number'>#index#</span> #title#",
		cssClass: "step-holder",
		labels: {
			finish: "Finish",
			next: "Next",
			previous: "Vorige",
		},
		onStepChanging: function (event, currentIndex, newIndex) {
			form.validate().settings.ignore = ":disabled,:hidden";
			return form.valid();
		},
		onFinishing: function (event, currentIndex) {
			form.validate().settings.ignore = ":disabled";
			return form.valid();
		},
		onFinished: function (event, currentIndex) {
			alert("Submitted!");
		}
	});


	$('.happy-slider').slick({
		arrows: true,
		dots: true,
		slidesToShow: 3,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					slidesToShow: 1
				},
			}
		]
	});

	$('.gameplay-slider').slick({
		arrows: true,
		dots: false,
		slidesToShow: 3,
		centerMode: true,
		centerPadding: '0',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true
				},
			}
		]
	});

	$('.feedback-slider').slick({
		slidesToShow: 3,
		dots: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					arrows: false,
					centerMode: true,
					centerPadding: '60px',
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					centerMode: true,
					arrows: false,
					adaptiveHeight: true,
					centerPadding: '30px',
				}
			}
		]
	});

	$('.photo-area__slider').slick({
		slidesToShow: 3,
		dots: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	});

	AOS.init({
		duration: 1000,
	});

	document.addEventListener('aos:in', ({ detail }) => {
		console.log('animated in', detail);
	});

	document.addEventListener('aos:out', ({ detail }) => {
		console.log('animated out', detail);
	});
});


function openDropdown() {
	jQuery('.open-link').on('click', function (e) {
		e.preventDefault();
		jQuery('.choose-menu').toggleClass('active');
	});
	$(document).mouseup(function (e) {
		let div = $('.choose-menu');
		if (!div.is(e.target)
			&& div.has(e.target).length === 0) {
			div.removeClass('active');
		}
	});
}

function openPro() {
	jQuery('.btn_pro').on('click', function () {
		jQuery('.btn-box').toggleClass('active');
	});
	$(document).mouseup(function (e) {
		let div = $('.btn-box');
		if (!div.is(e.target)
			&& div.has(e.target).length === 0) {
			div.removeClass('active');
		}
	});
}

function faqAccordeon() {
	var allLi = jQuery('.faq-list li'),
		allSub = allLi.children('.filter');

	jQuery('.faq-list li > span').each(function () {
		var doc = jQuery(document),
			$this = jQuery(this),
			item = $this.parent('li'),
			itemFilter = $this.next('.text-faq'),
			itemParent = item.parents('li');


		$this.on('click', function () {
			if (item.hasClass('active')) {
				itemFilter.slideUp();
				item.removeClass('active');
			}
			else {
				allLi.not(itemParent).removeClass('active');
				allLi.not(itemParent).find('.text-faq').slideUp();
				itemFilter.slideDown();
				item.addClass('active');
			}
		});
	});
}

$(document).ready(function () {
	// Функция для вычисления и скрытия строк таблицы
	function filterTableRows() {
		var selectedValue = $("#netnummer").val();
		var $tableRows = $("#telefoonnummer tr");

		$tableRows.each(function () {
			var $row = $(this);
			var $numberLabel = $row.find("label");
			var number = $numberLabel.text().trim();
			var numberCode = number.split(" ")[0];

			if (numberCode === selectedValue) {
				$row.show();
			} else {
				$row.hide();
			}
		});
	}

	// Слушаем событие изменения значения в select
	$("#netnummer").on("change", filterTableRows);

	// Вызываем функцию при загрузке страницы
	filterTableRows();

	function addSelectedTr() {
		$('input[type="radio"]').on('click', function () {
			// Удаляем класс "selected" у всех строк
			$('.table-select tr').removeClass('selected');

			// Добавляем класс "selected" выбранной строке
			$(this).closest('tr').addClass('selected');
		});
	}
	addSelectedTr();

	// При изменении содержимого полей ввода в форме
	$('.mini-form .text-input').on('input', function () {
		var form = $(this).closest('.mini-form'); // Находим родительский элемент формы
		var button = form.find('button'); // Находим кнопку в текущей форме

		// Проверяем, все ли поля в текущей форме заполнены
		var allFieldsFilled = form.find('.text-input').filter(function () {
			return $(this).val().trim() !== '';
		}).length === form.find('.text-input').length;

		// Если все поля заполнены, удаляем класс hidden у кнопки, иначе добавляем его
		if (allFieldsFilled) {
			button.removeClass('inactive');
		} else {
			button.addClass('inactive');
		}
	});

	// Проверка разрешения экрана и привязка обработчиков событий
	if ($(window).width() <= 810) {
		let sidebar = $('.sidebar');
		let body = $('body');
		let overlay = $('<div class="overlay"></div>'); // Создание оверлея

		// Обработчик клика по сайдбару
		sidebar.on('click', function () {
			sidebar.removeClass('closed').addClass('opened');
			body.addClass('sidebar-active');
			body.append(overlay); // Добавление оверлея в DOM
		});

		// Обработчик клика по оверлею
		body.on('click', '.overlay', function () {
			sidebar.removeClass('opened');
			body.removeClass('sidebar-active');
			overlay.remove(); // Удаление оверлея из DOM
		});

		// Обработчики событий сенсорного ввода для свайпов
		let startY;
		sidebar.on('touchstart', function (e) {
			startY = e.originalEvent.touches[0].pageY;
		});

		sidebar.on('touchmove', function (e) {
			let currentY = e.originalEvent.touches[0].pageY;

			if (currentY < startY) {
				sidebar.addClass('opened');
				body.addClass('sidebar-active');
				body.append(overlay); // Добавление оверлея в DOM
			} else if (currentY > startY) {
				sidebar.removeClass('opened');
				body.removeClass('sidebar-active');
				overlay.remove(); // Удаление оверлея из DOM
			}
		});
	}
});
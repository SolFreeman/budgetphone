jQuery(document).ready(function ($) {

	productAccordeon();

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

	var steps = $('#checkout-step').steps({
		showFooterButtons: true,
		onFinish: function () {
			alert('Wizard Completed');
		}
	});

	steps_api = steps.data('plugin_Steps');

	$('#btnPrev').on('click', function () {
		steps_api.prev();
	});

	$('#btnNext').on('click', function () {
		steps_api.next();
	});

	$('#btnGoToStep4').on('click', function () {
		steps_api.setStepIndex(3);
	});

	selectZero();


	function selectZero() {
		// Проверяем, выбран ли любой из радиобатонов
		if ($('input[name="select"]').is(':checked')) {
			// Удаляем класс "inactive" у кнопки ".btn-next"
			$('.btn-next').removeClass('inactive');

			// Удаляем класс "inactive" у элемента ".zero-footer"
			$('.zero-footer').removeClass('inactive');
		}
	}

	function selectLogin() {
		// Проверяем, выбран ли радиобатон с классом ".next_login"
		if ($('.next_login').is(':checked')) {
			// Добавляем класс "hidden" к кнопке с классом "next-simple"
			$('.next-simple').addClass('hidden');

			// Добавляем класс "visible" к кнопке с классом "next_login"
			$('.next_login').addClass('visible');
		} else {
			$('.next-simple').removeClass('hidden');

			// Удаляем класс "visible" у кнопки с классом "next_login"
			$('.next_login').removeClass('visible');
		}
	}

	// Обработчик события для радиобатонов 
	$('input.next_login').on('change', function () {
		selectLogin();
	});

	// Обработчик события для радиобатонов
	$('input[name="select"]').on('change', function () {
		selectZero();
		selectLogin();
	});

	$('.btn-next').on('click', function () {
		$('.tab-zero').addClass('hidden');
	});

	$('.btn-next').on('click', function () {
		// Проверяем, выбран ли любой из радиобатонов
		if ($('input[name="select"]').is(':checked')) {

			// Добавляем класс "hidden" к блоку "div.tab-zero"
			$('div.tab-zero').addClass('hidden');

			// Удаляем класс "start-page" у блока ".main-checkout"
			$('.main-checkout').removeClass('start-page');

			// Проверяем выбранный радиобатон по его айди
			if ($('#telefoonnummer').is(':checked')) {
				// Добавляем класс "enabled" ко всем блокам с классом "step-tab-single"
				$('.step-tab-single').addClass('enabled');
			} else if ($('#nummerreeks').is(':checked')) {
				// Добавляем класс "enabled" ко всем блокам с классом "step-tab-group"
				$('.step-tab-group').addClass('enabled');
			}

			
		}
	});

});



$(document).ready(function () {
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

	$("#netnummer").on("change", filterTableRows);

	filterTableRows();

	function addSelectedTr() {
		$('input[type="radio"]').on('click', function () {
			$('.table-select tr').removeClass('selected');

			$(this).closest('tr').addClass('selected');
		});
	}
	addSelectedTr();

	$('.mini-form .text-input').on('input', function () {
		var form = $(this).closest('.mini-form');
		var button = form.find('button');


		var allFieldsFilled = form.find('.text-input').filter(function () {
			return $(this).val().trim() !== '';
		}).length === form.find('.text-input').length;

		if (allFieldsFilled) {
			button.removeClass('inactive');
		} else {
			button.addClass('inactive');
		}
	});

	function openedSidebar() {
		if ($(window).width() <= 810) {
			let sidebar = $('.sidebar');
			let body = $('body');
			let overlay = $('<div class="overlay"></div>');


			sidebar.on('click', function () {
				sidebar.removeClass('closed').addClass('opened');
				body.addClass('sidebar-active');
				body.append(overlay);
			});


			body.on('click', '.overlay', function () {
				sidebar.removeClass('opened');
				body.removeClass('sidebar-active');
				overlay.remove();
			});

			let startY;
			sidebar.on('touchstart', function (e) {
				startY = e.originalEvent.touches[0].pageY;
			});

			sidebar.on('touchmove', function (e) {
				let currentY = e.originalEvent.touches[0].pageY;

				if (currentY < startY) {
					sidebar.addClass('opened');
					body.addClass('sidebar-active');
					body.append(overlay);
				} else if (currentY > startY) {
					sidebar.removeClass('opened');
					body.removeClass('sidebar-active');
					overlay.remove();
				}
			});
		}
	}

	$(window).on('resize', function () {
		openedSidebar();
	});

	openedSidebar();

	function addPrice() {
		// Получаем все радиобатоны
		var radioButtons = $('input[type=radio]');

		// Получаем элементы, в которые будем выводить выбранный продукт и цену
		var priceArea = $('.price-area');
		var totalPrice = $('.total-price');

		// Обработчик события для радиобатонов
		function handleRadioChange() {
			// Получаем выбранный радиобатон
			var selectedRadio = $(this);

			// Получаем родительскую таблицу
			var parentTable = selectedRadio.closest('table');

			// Получаем имя и цену выбранного продукта
			var selectedLabel = selectedRadio.closest('tr').find('label .title').text();
			var selectedPrice = selectedRadio.closest('tr').find('.price').text();

			// Проверяем, есть ли уже строка для данного радиобатона в priceArea
			var existingLine = priceArea.find('.price-line:contains("' + selectedLabel + '")');
			if (existingLine.length > 0) {
				// Если строка уже существует, обновляем ее цену
				var existingPriceBox = existingLine.find('.price-box');
				existingPriceBox.text(selectedPrice);
			} else {
				// Создаем новую строку для выбранного продукта и цены
				var newPriceLine = $('<div class="price-line">' +
					'<span class="name-box">' + selectedLabel + '</span>' +
					'<span class="price-box">' + selectedPrice + '</span>' +
					'</div>');

				// Добавляем новую строку в priceArea
				priceArea.append(newPriceLine);
			}

			// Обновляем общую сумму цен всех выбранных радиобатонов
			var total = 0;
			radioButtons.each(function () {
				if ($(this).is(':checked')) {
					var price = $(this).closest('tr').find('.price').text();
					total += parseFloat(price.replace('€', '').replace(',', '.'));
				}
			});
			totalPrice.text('€' + total.toFixed(2).replace('.', ','));

			// Обновляем цену выбранного продукта в price-box
			var selectedPriceBox = existingLine ? existingLine.find('.price-box') : newPriceLine.find('.price-box');
			selectedPriceBox.text(selectedPrice);

			// Обновляем имя выбранного продукта в name-box
			var selectedNameBox = existingLine ? existingLine.find('.name-box') : newPriceLine.find('.name-box');
			selectedNameBox.text(selectedLabel);
		}

		// Удаляем существующие обработчики событий радиобатонов
		radioButtons.off('change', handleRadioChange);

		// Добавляем обработчик события для каждого радиобатона
		radioButtons.on('change', handleRadioChange);
	}
	addPrice();

});


function productAccordeon() {
	var allLi = jQuery('.prod-list li');

	jQuery('.prod-list li > span').each(function () {
		var doc = jQuery(document),
			$this = jQuery(this),
			item = $this.parent('li'),
			itemFilter = $this.next('.text-prod'),
			itemParent = item.parents('li');


		$this.on('click', function () {
			if (item.hasClass('active')) {
				itemFilter.slideUp();
				item.removeClass('active');
			}
			else {
				allLi.not(itemParent).removeClass('active');
				allLi.not(itemParent).find('.text-prod').slideUp();
				itemFilter.slideDown();
				item.addClass('active');
			}
		});
	});
}
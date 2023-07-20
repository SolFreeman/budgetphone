jQuery(document).ready(function ($) {

	productAccordeon();

	$('.form-box .text-input').on('input', function () {
		if ($(this).val().trim() !== '') {
			$(this).addClass('filled');
		} else {
			$(this).removeClass('filled');
		}
	});

	// let form = $("#checkout-step");
	// form.validate({
	// 	errorPlacement: function errorPlacement(error, element) { element.before(error); },
	// 	rules: {
	// 		confirm: {
	// 			equalTo: "#password"
	// 		}
	// 	}
	// });



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

	$('#checkout-step .step-steps li').on('click', function (e) {
		e.preventDefault();
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
		if ($('.tab-zero_1 .next_login').is(':checked')) {
			$('.tab-zero_1 .next-simple').addClass('hidden');
			$('.tab-zero_1 .next_login').addClass('visible');
		} else {
			$('.tab-zero_1 .next-simple').removeClass('hidden');
			$('.tab-zero_1 .next_login').removeClass('visible');
		}
	}

	function selectLoginZero() {
		// Проверяем, выбран ли радиобатон с классом ".next_sel"
		if ($('.tab-zero_0 .next_sel').is(':checked')) {
			$('.tab-zero_0 .zero-footer').removeClass('inactive');
			$('.tab-zero_0 .btn-next').removeClass('inactive');
		} else {
			$('.tab-zero_0 .zero-footer').addClass('inactive');
			$('.tab-zero_0 .btn-next').addClass('inactive');
		}
	}
	
	$('input[name="select0"]').on('change', function () {
		selectLoginZero();
	});

	$('.tab_zero_1 input.next_login').on('change', function () {
		selectLogin();
	});

	$('input[name="select"]').on('change', function () {
		selectZero();
		selectLogin();
	});

	
	$('.tab-zero_0 .btn-next').on('click', function () {
		if ($('input.next_sel').is(':checked')) {
			$('.tab-zero_0').addClass('hidden');
			$('.tab-zero_1').removeClass('hidden');
		}
	});

	function toggleNumberRows() {
		var selectAmount = $('.select-amount');
		var numberRowsContainer = $('.number-rows');
		var originalNumberRow = $('.number-row').clone();
		var prevSelectedValue = 1;
	
		selectAmount.on('change', function () {
			var selectedValue = parseInt($(this).val());
	
			if (selectedValue < prevSelectedValue) {
				numberRowsContainer.find('.number-row:gt(' + (selectedValue - 1) + ')').remove();
			} else {
				for (var i = prevSelectedValue + 1; i <= selectedValue; i++) {
					var newNumberRow = originalNumberRow.clone();
					newNumberRow.find('.number-tel').text(i);
					numberRowsContainer.append(newNumberRow);
				}
			}
	
			prevSelectedValue = selectedValue;
		});
	}
	
	toggleNumberRows();
	
	

	$('.tab-zero_1 .btn-next').on('click', function () {
		if ($('input[name="select"]').is(':checked')) {

			$('div.tab-zero_1').addClass('hidden');

			$('.main-checkout').removeClass('start-page');

			if ($('#telefoonnummer').is(':checked')) {
				$('.step-tab-single').addClass('enabled');
			} else if ($('#nummerreeks').is(':checked')) {
				$('.step-tab-group').addClass('enabled');
			} else if ($('#bestaande').is(':checked')) {
				console.log(123);
				$('.step-choose-number').addClass('enabled');
			}
		}
	});

});



$(document).ready(function () {


	function filterTableRows() {
		var selectedValue = $("#netnummer").val();
		var selectedValue2 = $("#netnummer2").val();

		var $tableRows = $(".selectable tr");

		$tableRows.hide(); 

		$tableRows.each(function () {
			var $row = $(this);
			var $numberLabel = $row.find("label");
			var $numberList = $row.find(".number-list");

			if ($numberList.length) {

				var isMatch = $numberList.find(".title").filter(function () {
					var number = $(this).text().trim();
					var numberCode = number.split(" ")[0];
					return numberCode === selectedValue2;
				}).length > 0;

				if (isMatch) {
					$row.show(); 
				}
			} else {
				
				var number = $numberLabel.find(".title").text().trim();
				var numberCode = number.split(" ")[0];

				if (numberCode === selectedValue) {
					$row.show(); 
				}
			}
		});
	}

	$(".netnummer").on("change", filterTableRows);

	filterTableRows();

	$('.step-btn.next').on('click', function () {
        var selectAmount = $('.select-amount');
        var customElement = $('.custom .step-tab-group');
		var customElement2 = $('.custom .step-tab-single');
        
        if (selectAmount.val() > 1) {
            customElement.addClass('enabled');
        } else {
            customElement2.addClass('enabled');
        }
    });


	// $(document).ready(function () {
	// 	$('input[name="phone"]').on('change', function () {
	// 		var selectedRadio = $('input[name="phone"]:checked');
	// 		var phoneNumber = selectedRadio.attr('data-phone_num');
	// 		var price = selectedRadio.val();
	// 		var priceArea = $('.price-area');
	
	// 		// Создаем новый элемент списка с номером телефона и ценой
	// 		var newLi = $('<li></li>').append($('<span class="title"></span>').text(phoneNumber));
	// 		newLi.append($('<span class="price"></span>').text('€' + price));
	
	// 		// Находим ul.list внутри .price-area и добавляем новый элемент списка
	// 		priceArea.find('.list').html(newLi);
	// 	});
	// });
	


	function addSelectedTr() {
		$('input[type="radio"]').on('change', function () {
			var selectedRadio = $(this);
			var selectedRow = selectedRadio.closest('tr');

			if (selectedRadio.is(':checked')) {
				
				selectedRow.addClass('selected');
			} else {
				
				selectedRow.removeClass('selected');
			}	
			selectedRow.siblings().removeClass('selected');
		});
	}

	addSelectedTr();

	function addSelectedLi() {
		$('.prod-list input[type="radio"]').on('change', function () {
			var allInputs = $('.prod-list input[type="radio"]');
			var selectedInputs = allInputs.filter(':checked');
			var allLi = $('.prod-list li');

			// Удаляем класс "selected" у всех элементов <li>
			allLi.removeClass('selected');

			// Добавляем класс "selected" только выбранным элементам <li>
			selectedInputs.closest('li').addClass('selected');
		});
	}

	addSelectedLi();

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
		var radioButtons = $('.step-tab-single input[type=radio]');

		// Получаем элементы, в которые будем выводить выбранный продукт и цену
		var priceArea = $('.price-area');
		var totalPrice = $('.total-price');

		// Обработчик события для радиобатонов
		function handleRadioChange() {
			// Получаем выбранный радиобатон
			var selectedRadio = $(this);

			// Получаем родительскую таблицу
			var parentTable = selectedRadio.closest('table');

			// Получаем уникальный идентификатор таблицы
			var tableId = parentTable.attr('id');

			// Получаем имя и цену выбранного продукта
			var selectedLabel = selectedRadio.closest('tr').find('label .title').text();
			var selectedPrice = selectedRadio.closest('tr').find('.price').text();

			// Проверяем, есть ли уже строка для данного идентификатора таблицы в priceArea
			var existingLine = priceArea.find('.price-line[data-table-id="' + tableId + '"]');
			if (existingLine.length > 0) {
				// Если строка уже существует, обновляем ее цену
				var existingPriceBox = existingLine.find('.price-box');
				existingPriceBox.text(selectedPrice);
			} else {
				// Создаем новую строку для выбранного продукта и цены
				var newPriceLine = $('<div class="price-line" data-table-id="' + tableId + '">' +
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
					var numericPrice = parseFloat(price.replace('€', '').replace(',', '.'));
					if (!isNaN(numericPrice)) {
						total += numericPrice;
					}
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

	


	function addPrice2() {
		var radioButtons = $('.step-tab-group input[type=radio]');
		var priceArea = $('.price-area');
		var totalPrice = $('.total-price');
	
		function handleRadioChange() {
			var selectedRadio = $(this);
			var parentTable = selectedRadio.closest('table');
			var tableId = parentTable.attr('id');
	
			// Очищаем priceArea перед добавлением нового содержимого
			// priceArea.empty();
	
			radioButtons.each(function () {
				var radioButton = $(this);
				var radioButtonParentTable = radioButton.closest('table');
				var radioButtonTableId = radioButtonParentTable.attr('id');
	
				if (radioButton.is(':checked') && radioButtonTableId === tableId) {
	
					// Проверяем наличие элемента ol.number-list
					var numberList = radioButton.closest('tr').find('.number-list');
					if (numberList.length > 0) {
						var numberListContent = numberList.html();
						priceArea.append('<ol class="number-list">' + numberListContent + '</ol>');
					}
	
					// Пересчитываем общую цену
					var total = 0;
					priceArea.find('.price').each(function () {
						var price = $(this).text();
						var numericPrice = parseFloat(price.replace('€', '').replace(',', '.'));
						if (!isNaN(numericPrice)) {
							total += numericPrice;
						}
					});
	
					// Обновляем общую цену в total-price
					totalPrice.text('€' + total.toFixed(2).replace('.', ','));
				}
			});
		}
	
		// Удаляем существующие обработчики событий радиобатонов
		radioButtons.off('change', handleRadioChange);
	
		// Добавляем обработчик события для каждого радиобатона
		radioButtons.on('change', handleRadioChange);
	}
	
	// addPrice2();
	

	function addPrice3() {
		var radioButtons = $('.step-tab-group .prod-list input[type=radio]');
		var priceArea = $('.price-area');
		var totalPrice = $('.total-price');
	
		function handleRadioChange() {
			var selectedRadio = $(this);
			var parentLi = selectedRadio.closest('li');
			var selectedNumber = parentLi.find('.selected-number').text().trim();
	
			radioButtons.each(function () {
				var radioButton = $(this);
				var radioButtonParentLi = radioButton.closest('li');
	
				if (radioButton.is(':checked') && radioButtonParentLi.is(parentLi)) {
					var label = radioButton.closest('label');
					var selectedLabel = label.find('.title').text().trim();
	
					// Ищем совпадение номера телефона в .price-area .number-list
					var matchingLi = priceArea.find('.number-list li').filter(function () {
						var liNumber = $(this).find('.title').text().trim();
						return liNumber === selectedNumber;
					});
	
					if (matchingLi.length > 0) {
						// Если совпадение найдено, добавляем новое содержимое в существующий li
						matchingLi.append($('<span class="title"></span>').text(selectedLabel));
					} else {
						// Если совпадение не найдено, создаем новый li с выбранным названием
						var newLi = $('<li></li>').append($('<span class="title"></span>').text(selectedLabel));
						priceArea.find('.number-list').append(newLi);
					}
				}
			});
	
			// Пересчитываем общую цену
			var total = 0;
			priceArea.find('.price').each(function () {
				var price = $(this).text();
				var numericPrice = parseFloat(price.replace('€', '').replace(',', '.'));
				if (!isNaN(numericPrice)) {
					total += numericPrice;
				}
			});
	
			// Обновляем общую цену в total-price
			totalPrice.text('€' + total.toFixed(2).replace('.', ','));
		}
	
		// Добавляем обработчик события для каждого радиобатона
		radioButtons.on('change', handleRadioChange);
	}
	
	// addPrice3();
	

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
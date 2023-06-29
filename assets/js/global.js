$(window).on('load resize', function () {
	if ($(window).width() < 768) {
		

	} else {
		
	}
});

jQuery(document).ready(function ($) {

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
			next: "Volgende",
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

	// Обработчик события ресайза окна
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
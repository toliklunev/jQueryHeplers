/* jQuery Helpers v0.1
 * © Anatoly Lunev | toliklunev.ru | toliklunev@gmail.com
 * Licensed under the MIT License */

jQuery.fn.extend({

	/* Циклический next prev */
	cycle: function(nav){
		if(this.is(':only-child')){
			return this;
		}

		if(nav == 'next'){
			if(this.is(':last-child')){
				return this.siblings(':first-child');
			}

			return this.next();
		}

		if(nav == 'prev'){
			if(this.is(':first-child')){
				return this.siblings(':last-child');
			}

			return this.prev();
		}
	},

	/* Назначает элементу определённый класс, у соседних элементов убирает этот класс */
	makeActive: function(arg){

		options = {
			className: 'active',
			selector: ''
		}

		if(typeof arg == 'string'){
			options.className = arg
		}

		else if (typeof arg == 'object'){
			var options = $.extend(options, arg);
		}

		return this.each(function(){
			$(this)
			.addClass(options.className)
			.siblings(options.selector)
			.removeClass(options.className);
		});

	},

	/* Обновляет текущую выборку */
	update: function(){
		return $(this.selector.replace(/.filter\((.*)\)/gi, '$1'), this.context);
	},

	/* Генерирует нужное колличество элементов */
	genCount: function(code, count){
		var $items = $([]);

		while(count--){
			$items = $items.add(code);
		}

		return $items;
	},

	/* Вставляет определённое количество элементов */
	insertCount: function(method, code, count){
		if(method !== 'append' && method !== 'prepend'){
			throw new Error('method mast be append or prepend');
		}

		return this[method](jQuery.genCount(code, count));
	},

	appendCount: function(code, count){
		return this.insertCount('append', code, count);
	},

	prependCount: function(code, count){
		return this.insertCount('prepend', code, count);
	},

	/* Делает возможным ввод только цифр */
	onlyDigits: function(){
		return this.each(function(){
			$(this).keypress(function(e){
				return Boolean((e.which > 47) & (e.which < 58) || e.which == 46 || e.which == 8 || e.which == 0);
			});
		});
	},

	/* Парсит строку, возвращает число */
	parseInt: function(arg1, arg2){
		if(typeof this == 'object'){
			var text = this.text() || this.val();
			var notation = arg1 || 10;
		}

		else if(typeof arg1 == 'number'){
			return arg1;
		}

		else{
			var text = arg1;
			var notation = arg2 || 10;
		}

		var num = parseInt(text.replace(/ /g, ''), notation);

		if(!isNaN(num)){
			return num;
		}

		return false;
	},

	parseFloat: function(str){
		if(typeof str != 'undefined'){
			if(typeof str != 'string'){
				return str;
			}

			var text = str;
		}

		else if(typeof this == 'object'){
			var text = this.text() || this.val();
		}

		var num = parseFloat(text.replace(/ /g, ''));

		if(!isNaN(num)){
			return num;
		}

		return false;
	},

	/* Разбивка числа по разрядам */
	breakdown: function(num, seporator){

		var seporator = seporator || ' ';
		var regular = /(\d)(?=((\d{3})+)(\D|$))/g;

		var make = function(){
			return num.replace(regular, '$1' + seporator);
		}

		if(typeof this == 'object'){
			return this.each(function(){
				num = $(this).text();
				$(this).text(make());				
			});
		}

		else if(typeof num == 'number'){
			num = num.toString();
			return make();
		}
	},

	/* Крестик удаления текста из инпута */
	cleaner: function(){
		return this.each(function(){
			var $input = $(this);
			var $clear = $('<a class="clear">x</a>');

			$input.before($clear);

			$clear.click(function(){
				$input.val('').focus();
				$clear.hide();
			});

			$input.bind('keyup keydown focus blur cleaner', function(){
				if($input.val() !== ''){
					$clear.show();
				}

				else{
					$clear.hide();
				}
			});

			$input.trigger('cleaner');
		});
	},

	/* Возвращает объект, который задан в data- */
	dataObject: function(data){

		var object = this.data(data);

		if(typeof object !== 'object'){
			object = eval('('+ this.data(data) +')');
		}

		return object;
	},

	/* Попап */
	popup: function(link, milliseconds){

		var $popup = this;
		var milliseconds = milliseconds || 300;

		var showPopup = function(){
			$popup.fadeIn(milliseconds);

			$(document).click(function(e){

				if(!$(e.target).parents().is($popup)){
					$popup.fadeOut(milliseconds);
					$(document).unbind(e);
				}
			});
		}

		if(link){
			$(link).click(function(){
				showPopup();
				return false;
			});
		}

		else{
			showPopup();
		}

		return this;
	},

	/* Возвращает/назначает аттрибут src */
	src: function(src){
		if(src !== undefined){
			return this.attr('src', src);
		}

		else{
			return this.attr('src')
		}
	},

	/* Возвращает/назначает аттрибут href */
	href: function(href){
		if(href !== undefined){
			return this.attr('href', href);
		}

		else{
			return this.attr('href');
		}
	},

	/* Включение / отключение элемента */
	disable: function(){
		return this.addClass('disabled').attr('disabled', true);
	},

	enable: function(){
		return this.removeClass('disabled').attr('disabled', false);
	},

	/* Возвращает/назначает аттрибут hash у ссылки */
	hash: function(hash){
		var href = this.href().split('#');

		if(hash !== undefined){
			return this.attr('href', href[0] + '#' + hash);
		}

		else{
			return '#' + href[1];
		}
	},

	pathname: function(pathname){
		var href = this.href().split('#');

		if(pathname !== undefined){
			return this.attr('pathname', pathname + '#' + href[1]);
		}

		else{
			if(href[0][0] !== '/') href[0] = '/' + href[0];
			return href[0];
		}
	},

	proxy: function(func){
		jQuery.proxy(func, this).call();
	},

	// todo .prev('cycle') - циклический prev
	// todo .prev(4) возвращает предыдущие 4 элемента
	/*prev: function(n){
		$.fn.jPrev = $.fn.prev;
		if(n){
			var elements = Array();
			var prev = this;

			for (var i = 0; i <= n; i++) {
				elements[elements.lenght + 1] = prev = prev.jPrev();
			};

			return elements;
		}

		return this.jPrev();
	},*/

	/* Удаление пробелов и текста между элементами, применяется для решения проблемм с инлайн блоками */
	removeSpaces: function(recursively){
		return this.each(function(){
			$(this).contents().filter(function(){
				return this.nodeType == 3;
			}).remove();
		});
	},

	reverse: function(){
		return $(this.toArray().reverse());
	},

	/* Хелпер для форматирования окончаний */
	ending: function(amount, ending1, ending2, ending3){
		var ending = ending3;
		var remain100 = amount % 100;
		var remain10 = amount % 10;

		if(!((remain10 == 0) || (9 < remain100 && remain100 < 20))){

			if(remain10 == 1){
				ending = ending1;
			}

			else if(remain10 < 5){
				ending = ending2;
			}
		}

		if(typeof this == 'object'){
			return this.text(ending);
		}

		return ending;
	}
});

jQuery.nowrap       = jQuery.fn.nowrap;
jQuery.cycle        = jQuery.fn.cycle;
jQuery.onlyDigits   = jQuery.fn.onlyDigits;
jQuery.int          = jQuery.fn.int   = jQuery.parseInt   = jQuery.fn.parseInt;
jQuery.float        = jQuery.fn.float = jQuery.parseFloat = jQuery.fn.parseFloat;
jQuery.popup        = jQuery.fn.popup;
jQuery.src          = jQuery.fn.src;
jQuery.href         = jQuery.fn.href;
jQuery.disable      = jQuery.fn.disable;
jQuery.enable       = jQuery.fn.enable;
jQuery.hash         = jQuery.fn.hash;
jQuery.preload      = jQuery.fn.preload;
jQuery.toCenter     = jQuery.fn.toCenter;
jQuery.ending       = jQuery.fn.ending;
jQuery.removeSpaces = jQuery.fn.removeSpaces;
jQuery.reverse      = jQuery.fn.reverse;
jQuery.percentage   = jQuery.fn.percentage;
jQuery.breakdown    = jQuery.fn.breakdown;
jQuery.genCount     = jQuery.fn.genCount;

// Проверяет, поддерживается ли браузером 3D предстовления
jQuery.support.preserve3d = (function(){
	var div = document.createElement('div');
	div.style.cssText = '-webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d; -ms-transform-style: preserve-3d; -o-transform-style: preserve-3d; transform-style: preserve-3d;';
	return !!div.style.length;
})();

// Проверяет, поддерживается ли браузером calc
jQuery.support.calc = (function(){
	var div = document.createElement('div');
	div.style.cssText = 'width:-webkit-calc(0px); width:-moz-calc(0px); width:-o-calc(0px); width:calc(0px);';
	return !!div.style.length;
})();

// Определяет мобильное устройство
jQuery.support.mobile = (/mobile|android|blackberry|brew|htc|j2me|lg|midp|mot|netfront|nokia|obigo|openweb|opera\ mini|palm|psp|samsung|sanyo|sch|sonyericsson|symbian|symbos|teleca|up\.browser|wap|webos|windows\ ce/i.test(navigator.userAgent.toLowerCase()));

// Проверяет, установлен ли Flash
jQuery.support.flash = (function(){

	if(typeof(navigator.plugins) != "undefined" &&
	typeof(navigator.plugins["Shockwave Flash"]) == "object"){
		return true;
	}

	else if(typeof window.ActiveXObject != "undefined"){
		try{
			if(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")){
				return true; 
			}
		}

		catch(e){
			return false;
		};
	};
})();

/* Записывает GET в виде массива */
jQuery._GET = (function(){
	var get = [];
	$.each(location.search.slice(1).split('&'), function(){
		var record = this.split('=');
		get.push(record[0]);
		get[record[0]] = record[1];
	});

	return get;
})();

/* jQueryHelpers v0.0.1 | https://github.com/codefucker/jQueryHeplers
 * Copyright (c) 2014 Anatoly Lunev | toliklunev@gmail.com | toliklunev.ru
 * Licensed under the MIT License */

jQuery.fn.extend({
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
			if($input.val() !== '' && !$input.is(':disabled')){
				$clear.show();
			}

			else{
				$clear.hide();
			}
		});

		$input.trigger('cleaner');
	});
},
/* Циклический next prev */
cycle: function(nav, selector){
	if(this.is(':only-child')){
		return this;
	}

	if(nav == 'next'){
		if(this.is(':last-child')){
			return this.siblings(':first-child');
		}

		return this.next(selector);
	}

	if(nav == 'prev'){
		if(this.is(':first-child')){
			return this.siblings(':last-child');
		}

		return this.prev(selector);
	}
},
/* Возвращает объект, который задан в data- */
dataObject: function(data){

	var object = this.data(data);

	if(typeof object !== 'object'){
		object = eval('('+ this.data(data) +')');
	}

	return object;
},
/* Включение / отключение элемента */
disable: function(){
	return this.addClass('disabled').attr('disabled', true);
},

enable: function(){
	return this.removeClass('disabled').attr('disabled', false);
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
/* Попап */
popup: function(options){

	var $popup = this;

	var showPopup = function(){

		$popup.addClass('shown');

		$(document).click(function(e){
			$popup.removeClass('shown');
			$(document).unbind(e);
		});

		$popup.click(function(e){
			e.stopPropagation();
		});
	}

	if(options.close, $popup){
		$(options.close).click(function(){
			$(document).click();
			return false;
		});
	}

	if(options.link){
		$(options.link).click(function(){
			showPopup();
			return false;
		});
	}

	else{
		showPopup();
	}

	return this;
},
/* Удаление пробелов и текста между элементами, применяется для решения проблемм с инлайн блоками */
removeSpaces: function(recursively){
	return this.each(function(){
		$(this).contents().filter(function(){
			return this.nodeType == 3;
		}).remove();
	});
},
/* Разворачивает порядок следования jQuery объектов */
reverse: function(){
	return $(this.toArray().reverse());
},
// Вызов функции с контекстом в виде текущего объекта
run: function(arg1, arg2){
	if(typeof arg1 == 'function'){
		if(this.length){
			arg1.call(this);
		}
	}

	else if(typeof arg1 == 'object' && arg2 == 'function'){
		arg2.call(arg1);
	}
},
switcher: function(){

	return this.each(function(){

		var $tabs = $('> .tabs > *', this);
		var $content = $('> .content > *', this);

		$tabs.click(function(e){
			e.preventDefault();
			$content.eq($(this).makeActive().index()).makeActive();
		});

		if(!$tabs.is('.active')){
			$tabs.first().click();
		}
	});
},
// Возвращает анонимную функцию, замкнутую на методе текущего объекта 
transmit: function(method, args){
	var that = this;
	return function(){that[method].apply(that, args)};
	// return $.proxy(this, method);
},
/* Обновляет текущую выборку */
update: function(){
	return $(this.selector.replace(/.filter\((.*)\)/gi, '$1'), this.context);
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
// Назначает элементу определённый класс, у соседних элементов убирает этот класс 
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

}
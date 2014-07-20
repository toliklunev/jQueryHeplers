/* Включение / отключение элемента */
disable: function(){
	return this.addClass('disabled').attr('disabled', true);
},

enable: function(){
	return this.removeClass('disabled').attr('disabled', false);
}
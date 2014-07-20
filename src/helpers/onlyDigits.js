/* Делает возможным ввод только цифр */
onlyDigits: function(){
	return this.each(function(){
		$(this).keypress(function(e){
			return Boolean((e.which > 47) & (e.which < 58) || e.which == 46 || e.which == 8 || e.which == 0);
		});
	});
}
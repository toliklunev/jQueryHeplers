// Обновляет текущую выборку 
update: function(){
	return $(this.selector.replace(/.filter\((.*)\)/gi, '$1'), this.context);
}
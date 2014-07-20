/* Удаление пробелов и текста между элементами, применяется для решения проблемм с инлайн блоками */
removeSpaces: function(recursively){
	return this.each(function(){
		$(this).contents().filter(function(){
			return this.nodeType == 3;
		}).remove();
	});
}
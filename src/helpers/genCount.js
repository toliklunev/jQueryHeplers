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
}
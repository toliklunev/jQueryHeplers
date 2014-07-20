// Возвращает анонимную функцию, замкнутую на методе текущего объекта 
transmit: function(method, args){
	var that = this;
	return function(){that[method].apply(that, args)};
	// return $.proxy(this, method);
}
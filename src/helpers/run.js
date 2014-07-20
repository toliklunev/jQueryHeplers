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
}
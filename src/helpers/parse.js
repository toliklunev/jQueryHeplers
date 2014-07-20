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
}
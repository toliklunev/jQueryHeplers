// Возвращает объект, который задан в data- 
dataObject: function(data){

	var object = this.data(data);

	if(typeof object !== 'object'){
		object = eval('('+ this.data(data) +')');
	}

	return object;
}
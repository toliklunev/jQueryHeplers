/* Хелпер для форматирования окончаний */
ending: function(amount, ending1, ending2, ending3){
	var ending = ending3;
	var remain100 = amount % 100;
	var remain10 = amount % 10;

	if(!((remain10 == 0) || (9 < remain100 && remain100 < 20))){

		if(remain10 == 1){
			ending = ending1;
		}

		else if(remain10 < 5){
			ending = ending2;
		}
	}

	if(typeof this == 'object'){
		return this.text(ending);
	}

	return ending;
}
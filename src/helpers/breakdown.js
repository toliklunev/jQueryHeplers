// Разбивка числа по разрядам 
breakdown: function(num, seporator){

	var seporator = seporator || ' ';
	var regular = /(\d)(?=((\d{3})+)(\D|$))/g;

	var make = function(){
		return num.replace(regular, '$1' + seporator);
	}

	if(typeof this == 'object'){
		return this.each(function(){
			num = $(this).text();
			$(this).text(make());				
		});
	}

	else if(typeof num == 'number'){
		num = num.toString();
		return make();
	}
}
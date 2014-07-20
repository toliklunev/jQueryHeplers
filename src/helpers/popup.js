/* Попап */
popup: function(options){

	var $popup = this;

	var showPopup = function(){

		$popup.addClass('shown');

		$(document).click(function(e){
			$popup.removeClass('shown');
			$(document).unbind(e);
		});

		$popup.click(function(e){
			e.stopPropagation();
		});
	}

	if(options.close, $popup){
		$(options.close).click(function(){
			$(document).click();
			return false;
		});
	}

	if(options.link){
		$(options.link).click(function(){
			showPopup();
			return false;
		});
	}

	else{
		showPopup();
	}

	return this;
}
// Крестик удаления текста из инпута 
cleaner: function(){
	return this.each(function(){
		var $input = $(this);
		var $clear = $('<a class="clear">x</a>');

		$input.before($clear);

		$clear.click(function(){
			$input.val('').focus();
			$clear.hide();
		});

		$input.bind('keyup keydown focus blur cleaner', function(){
			if($input.val() !== '' && !$input.is(':disabled')){
				$clear.show();
			}

			else{
				$clear.hide();
			}
		});

		$input.trigger('cleaner');
	});
}
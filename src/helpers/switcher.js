switcher: function(){

	return this.each(function(){

		var $tabs = $('> .tabs > *', this);
		var $content = $('> .content > *', this);

		$tabs.click(function(e){
			e.preventDefault();
			$content.eq($(this).makeActive().index()).makeActive();
		});

		if(!$tabs.is('.active')){
			$tabs.first().click();
		}
	});
}
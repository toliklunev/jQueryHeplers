// Циклический next prev 
cycle: function(nav, selector){
	if(this.is(':only-child')){
		return this;
	}

	if(nav == 'next'){
		if(this.is(':last-child')){
			return this.siblings(':first-child');
		}

		return this.next(selector);
	}

	if(nav == 'prev'){
		if(this.is(':first-child')){
			return this.siblings(':last-child');
		}

		return this.prev(selector);
	}
}
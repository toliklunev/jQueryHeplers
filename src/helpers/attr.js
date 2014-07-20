/* Возвращает/назначает аттрибут src */
src: function(src){
	if(src !== undefined){
		return this.attr('src', src);
	}

	else{
		return this.attr('src')
	}
},

/* Возвращает/назначает аттрибут href */
href: function(href){
	if(href !== undefined){
		return this.attr('href', href);
	}

	else{
		return this.attr('href');
	}
},

/* Возвращает/назначает аттрибут hash у ссылки */
hash: function(hash){
	var href = this.href().split('#');

	if(hash !== undefined){
		return this.attr('href', href[0] + '#' + hash);
	}

	else{
		return '#' + href[1];
	}
},

pathname: function(pathname){
	var href = this.href().split('#');

	if(pathname !== undefined){
		return this.attr('pathname', pathname + '#' + href[1]);
	}

	else{
		if(href[0][0] !== '/') href[0] = '/' + href[0];
		return href[0];
	}
}
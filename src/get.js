/* Записывает GET в виде массива */
jQuery._GET = (function(){
	var get = [];
	$.each(location.search.slice(1).split('&'), function(){
		var record = this.split('=');
		get.push(record[0]);
		get[record[0]] = record[1];
	});

	return get;
})();
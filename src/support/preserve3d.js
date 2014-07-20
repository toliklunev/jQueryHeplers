// Проверяет, поддерживается ли браузером 3D предстовления
jQuery.support.preserve3d = (function(){
	var div = document.createElement('div');
	div.style.cssText = '-webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d; -ms-transform-style: preserve-3d; -o-transform-style: preserve-3d; transform-style: preserve-3d;';
	return !!div.style.length;
})();
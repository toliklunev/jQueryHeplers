// Проверяет, поддерживается ли браузером calc
jQuery.support.calc = (function(){
	var div = document.createElement('div');
	div.style.cssText = 'width:-webkit-calc(0px); width:-moz-calc(0px); width:-o-calc(0px); width:calc(0px);';
	return !!div.style.length;
})();
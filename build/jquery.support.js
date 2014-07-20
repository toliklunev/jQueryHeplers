/* jQueryHelpers v0.0.1 | https://github.com/codefucker/jQueryHeplers
 * Copyright (c) 2014 Anatoly Lunev | toliklunev@gmail.com | toliklunev.ru
 * Licensed under the MIT License */
// Проверяет, поддерживается ли браузером calc
jQuery.support.calc = (function(){
	var div = document.createElement('div');
	div.style.cssText = 'width:-webkit-calc(0px); width:-moz-calc(0px); width:-o-calc(0px); width:calc(0px);';
	return !!div.style.length;
})();
// Проверяет, установлен ли Flash
jQuery.support.flash = (function(){

	if(typeof(navigator.plugins) != "undefined" &&
	typeof(navigator.plugins["Shockwave Flash"]) == "object"){
		return true;
	}

	else if(typeof window.ActiveXObject != "undefined"){
		try{
			if(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")){
				return true; 
			}
		}

		catch(e){
			return false;
		};
	};
})();
// Определяет мобильное устройство
jQuery.support.mobile = (/mobile|android|blackberry|brew|htc|j2me|lg|midp|mot|netfront|nokia|obigo|openweb|opera\ mini|palm|psp|samsung|sanyo|sch|sonyericsson|symbian|symbos|teleca|up\.browser|wap|webos|windows\ ce/i.test(navigator.userAgent.toLowerCase()));
// Проверяет, поддерживается ли браузером 3D предстовления
jQuery.support.preserve3d = (function(){
	var div = document.createElement('div');
	div.style.cssText = '-webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d; -ms-transform-style: preserve-3d; -o-transform-style: preserve-3d; transform-style: preserve-3d;';
	return !!div.style.length;
})();
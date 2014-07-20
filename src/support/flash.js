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
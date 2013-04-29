/**
 * Helper for i18n support for Handlebars 
 */
Handlebars.registerHelper('_', function(text){
	if(arguments.length > 2){
		var str = arguments[0],
			params = _.toArray(arguments).slice(1,-1),
			param;
		while(str.indexOf("%s") != -1){
			param = params.length==1 ? params[0] : params.shift();
			str = str.replace(/%s/, param);
		}
		text = str;
	}else{
		//@TODO
		//Get string from lang config (scripts/lang/)
	}
	return text;
});
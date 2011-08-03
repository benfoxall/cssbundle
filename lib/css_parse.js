/* 
a parser in a very loose sense, gives a css file as a array of selectors to rules

css_parse('body{stuff} p{morestuff}');
 => [
		{
			selector:'body',
			properties:'stuff'
		},
		{
			selector:'p',
			properties:'morestuff'
		}
	]

*/


exports.parse = function(css_str){
	
	css_str += ' '; //to make sure we can discard the last one
	
	var output = [];
	
	var rules = css_str.split('}');
	
	for (var i=0; i < rules.length; i++) {
		var rule = rules[i];
		
		var parts = rule.split('{');
		
		var selector = parts[0];
		
		//strip newlines and comments
		selector = selector.replace(/[\n\t]/g,' ').replace(/\/\*[^*]*\*\//g,'');
		
		//and leading trailing whitespace
		selector = selector.replace(/^\s+|\s+$/g,'');
		
		output.push({
			selector:selector, 
			properties:parts[1]
		});
		
	};
	
	output.pop();
	
	return output;
}
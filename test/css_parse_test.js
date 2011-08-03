var vows = require('vows'),
    assert = require('assert');

var css_parse = require('../lib/css_parse.js');

vows.describe('CSS Parser').addBatch({
	'parsing a single rule': {
		topic: function(){
			return css_parse.parse('body{some:rule}');
		},
		
		'we will get the selector': function(topic){
			assert.equal(topic[0].selector, 'body');
		},
		'we will get the properties': function(topic){
			assert.equal(topic[0].properties, 'some:rule');
		}
		
	},
	'stripping comments and whitespace': {
		topic: function(){
			return css_parse.parse("/*comment*/\n#selector\n/*comment*/\n\t  {stuff}");
		},
		'we should only get the selector': function(topic){
			assert.equal(topic[0].selector, '#selector');
		}
		
	}
}).run();

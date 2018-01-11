require.config({
//	baseUrl: 'resources/js',
	
	paths: {
		'jquery': 'comm/jquery-1.10.2.min',
		'bootstrap': '../bootstrap/js/bootstrap.min',
		'underscore': 'comm/underscore',
		'common': 'comm/common',
		
		'login': 'comm/login'
	},
	
	shim:{
		'jquery': {
			exports: '$'
		},
		'bootstrap': {
			deps: ['jquery']
	    },
	  'underscore': {
	    exports: '_'
	    }
	},
	
	waitSeconds: 60
});
(function(){

	var ns = MKK.getNamespace('mkk.page');
	var Core = MKK.getNamespace('mkk.core').Core;
	console.log('basic')
	if(!ns.BasicPage){

		var BasicPage = function BasicPage() {


			this.setup();
		}

		var p = BasicPage.prototype = new Core();

		ns.BasicPage = BasicPage;

		p.setup = function() {

		}




	}


})();
(function() {

	var ns = MKK.getNamespace('mkk.core');
	var EventDispatcher = MKK.getNamespace('mkk.events').EventDispatcher;

	if(!ns.Core) {

		var Core = function Core() {

		}

		var p = Core.prototype = new EventDispatcher();

		ns.Core = Core;

		p.setup = function() {
			this._setup();
		}

		p._setup = function() {
			console.log('Core Setup :: ');
			this.disableScrollBars();
		}

		//function to disable scroller
		p.disableScrollBars = function() {
			document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    		document.body.scroll = "no"; // ie only
		}
	}
})();
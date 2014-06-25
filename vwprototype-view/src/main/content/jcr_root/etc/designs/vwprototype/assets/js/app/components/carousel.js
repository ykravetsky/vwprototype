(function() {


	var ns = MKK.getNamespace('mkk.components');
	var EventDispatcher = MKK.getNamespace('mkk.events').EventDispatcher;
	var TouchEvent = MKK.getNamespace('mkk.events').TouchEvent;


	if(!ns.Carousel) {

		var Carousel = function Carousel(target) {

			this.target = target || document.body;
			this._speed = 180;
			this.container = this.target;
			this.setup();

		}

		var p = Carousel.prototype = new EventDispatcher();
		
		ns.Carousel = Carousel;


		p.setup = function() {


			var touchEvent = new TouchEvent(this.target);

			var that = this;
			this.leftSwipeBound = function(e){ that.leftSwipeFunc(e) };
			this.rightSwipeBound = function(e) { that.rightSwipeFunc(e) };


			this.leftSwipeStartBound = function() { that.leftSwipeStartFunc(this) };
			this.rightSwipeStartBound = function() { that.rightSwipeStartFunc(this) };

			this.leftSwipeTweenBound = function(e) { that.leftSwipeTweenFunc(e, this)};
			this.rightSwipeTweenBound = function(e) { that.rightSwipeTweenFunc(e, this) };

			this.leftSwipeCompleteBound = function() { that.leftSwipeCompleteFunc(this) };
			this.rightSwipeCompleteBound = function() { that.rightSwipeCompleteFunc(this) };

			touchEvent.addEventListener('swipeleft', this.leftSwipeBound);
			touchEvent.addEventListener('swiperight', this.rightSwipeBound);


			this.from = {};
			this.to = {};
			// -----------------------------------------------------
			// CALLBACK FUNCTION TO BE USED
			// -----------------------------------------------------
			this.leftSwipeStartCallback = null;
			this.rightSwipeStartCallback = null; 
			this.leftSwipeTweenCallback = null;
			this.rightSwipeTweenCallback = null;
			this.leftSwipeCompleteCallback = null;
			this.rightSwipeCompleteCallback= null;

		}


		// -----------------------------
		// SWIPE Functions
		// -----------------------------

		p.rightSwipeFunc = function(e) {

			var that = this;
			var tweenleft = new TWEEN.Tween(this.from)
									.to(this.to, this._speed)
									.onStart(this.leftSwipeStartBound)
									.easing(TWEEN.Easing.Cubic.InOut)
									.onUpdate(this.leftSwipeTweenBound)
									.onComplete(this.leftSwipeCompleteBound)
									.start();

		}

		p.leftSwipeFunc = function(e) {

			var tweenright = new TWEEN.Tween(this.from)
									.to(this.to, this._speed)
									.onStart(this.rightSwipeStartBound)
									.easing(TWEEN.Easing.Cubic.InOut)
									.onUpdate(this.rightSwipeTweenBound)
									.onComplete(this.rightSwipeCompleteBound)
									.start();
		}


		p.leftSwipeStartFunc = function(obj) {
			console.log('left Swipe Start')
			if(this.leftSwipeStartCallback) this.leftSwipeStartCallback.call(this, obj);
		}

		p.rightSwipeStartFunc = function(obj) {
			if(this.rightSwipeStartCallback) this.rightSwipeStartCallback.call(this, obj);
		}

		p.leftSwipeTweenFunc = function(e, obj) {
			if(this.leftSwipeTweenCallback) this.leftSwipeTweenCallback.call(this, e, obj);
		}

		p.rightSwipeTweenFunc = function(e, obj) {
			if(this.rightSwipeTweenCallback) this.rightSwipeTweenCallback.call(this, e, obj);
		}

		p.leftSwipeCompleteFunc = function(obj) {
			if(this.leftSwipeCompleteCallback) this.leftSwipeCompleteCallback.call(this, obj);
		}

		p.rightSwipeCompleteFunc = function(obj) {
			if(this.rightSwipeCompleteCallback) this.rightSwipeCompleteCallback.call(this, obj);
		}

	}


})();
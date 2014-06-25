(function(){

	var EventDispatcher = MKK.getNamespace('mkk.events').EventDispatcher;
	var ns = MKK.getNamespace('app.events');
	var Trackpad = MKK.getNamespace('mkk.events').Trackpad;
	var MathBase = MKK.getNamespace('mkk.math').MathBase;


	if (!ns.Scroller) {

		var Scroller = function Scroller(maxScroll) {

			this.gui = null;
			this.view = null;
			this.isStop = false;
			this.isDebug = false;
			this.scrollSpeedDamper = 0.05;
			this.distance = 0;
			this.maxSpeed = 200;
			this.minSpeed = -200;
			this.isAutoScrolling = false;
			this.scrollMax = maxScroll || 1000;
			// this.speedRange = 10000;
		}

		ns.Scroller = Scroller;
		var p = Scroller.prototype = new EventDispatcher();
		var s = EventDispatcher.prototype;


		p.debug = function(gui) {

			this.gui = gui;
			this.isDebug = true;
			this.f1 = this.gui.addFolder('Easing & Interpolation');
			this.f1.add(this, 'scrollSpeedDamper', 0.01, 0.2);

			// this.f1.open();

			this.scrollDisplay = document.createElement('div');
			this.scrollDisplay.style.background = 'rgb(0, 0, 34)';
			this.scrollDisplay.style.width = '60px';
			this.scrollDisplay.style.height = '14px';
			this.scrollDisplay.style.display = 'block';
			this.scrollDisplay.style.position = 'absolute';
			this.scrollDisplay.style.left = '0px';
			this.scrollDisplay.style.bottom = '0px';
			this.scrollDisplay.style.padding = '17px 10px';
			this.scrollDisplay.style.fontFamily = 'Arial';
			this.scrollDisplay.style.fontSize = '11px';
			this.scrollDisplay.style.color = 'rgb(0, 255, 255)';
			this.scrollDisplay.style.textAlign = 'center';

			document.body.appendChild(this.scrollDisplay);
	
		}

		p.setup = function(view) {
			this.view = view;
			this.trackpad = new Trackpad(this.view);
			this.trackpad.setup();
		}


		p.start = function() { this.isStop = false; }
		p.stop = function() { this.isStop = true; }

		p.getDistance = function() {
			//return distance in 3 decimal places for accurate scrolling
			return Math.round(this.distance*1000)/1000;
		}



		p.scrollto = function(toPos) {

			this.isAutoScrolling = true;
			var current = this.getDistance();
			//work out safe speed 
			var distance = Math.abs(toPos - current);
			if(distance<1) return;
			var _time = Math.ceil ( distance * 1.8 );
			var that = this;
			var updateBound = function(e) { that.scrollUpdateFunc(e,this) };
			var completeBound = function(e) { that.scrollCompleteFunc(e, this) };
			this.autoTween = new TWEEN.Tween({y:current})
								.to({ y:toPos }, _time)
								.easing(TWEEN.Easing.Quadratic.InOut)
								.onUpdate(updateBound)
								.onComplete(completeBound)
								.start();
		}

		p.scrollUpdateFunc = function(e, obj) {
			this.isAutoScrolling =true;
			this.tweenDistance = obj.y;
		}

		p.scrollCompleteFunc = function(e, obj) {
			this.isAutoScrolling = false;
			this.tweenDistance = 0;
		}

		p.stopScroll = function() {
			if(this.autoTween) { return this.autoTween.stop(); }
			else { return false };
		}

		p.update = function() {

			if (this.isDebug) this.scrollDisplay.innerHTML = Math.round(this.distance) + 'px';

			var dist = this.distance;
			var speed = MathBase.Clamp(this.trackpad.speed, this.minSpeed, this.maxSpeed);
			var scDamp = this.scrollSpeedDamper;
			var sMax = this.scrollMax;

			if(!this.isStop) {
				dist += (speed*scDamp);
				if (dist<0) { dist = 0; }
				else if (dist>=sMax) { dist = sMax; }
				this.distance = dist;
				this.trackpad.update();
			}

			if(this.isAutoScrolling) {
				this.distance = this.tweenDistance;
			}
		}	


	}


})();
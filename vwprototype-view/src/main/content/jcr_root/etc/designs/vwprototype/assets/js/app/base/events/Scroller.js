define([
	'base/math/MathBase',
	'base/events/EventDispatcher',
	'base/events/Trackpad'
	], function(MathBase, EventDispatcher, Trackpad){

		var Scroller = function Scroller(target, maxScroll) {

			this.target = target;
			this.isStop = false;
			this.isDebug = false;
			this.scrollSpeedDamper = 0.05;
			this.distance = 0;
			this.maxSpeed = 200;
			this.minSpeed = -200;
			this.isAutoScrolling = false;
			this.scrollMax = maxScroll || 1000;

			this.setup(this.target);
		}

		var p = Scroller.prototype = new EventDispatcher();

		p.setup = function(target) {
			this.target = target;
			this.trackpad = new Trackpad(this.target);
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


		return Scroller;



});
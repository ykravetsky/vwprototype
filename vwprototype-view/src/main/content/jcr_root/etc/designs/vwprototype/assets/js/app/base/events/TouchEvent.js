define([

    "base/events/EventDispatcher"
    ], function(EventDispatcher) {

        var TouchEvent = function TouchEvent(target,isPreventDefault) {

            this._eventListener = null;
            this.target = target;
            this.isPreventDefault = isPreventDefault || false;
            this.settings = {

                tapRange: 80,
                swipeRange: 150,
                tapHoldDuration: 1000
            }


            this.setup();
        }

        TouchEvent.TAP = 'tap';
        TouchEvent.TAPSTART = 'tapstart';
        TouchEvent.HOLDEND = 'holdend';
        TouchEvent.HOLDING = 'holding';
        TouchEvent.SWIPE = 'swipe';
        TouchEvent.DRAG = 'drag';
        TouchEvent.DRAGEND = 'dragend';

        var p = TouchEvent.prototype = new EventDispatcher();


        // ------------------------------------
        // tap and hold detection
        // ------------------------------------
        p.setup = function() {

            this.isDragging = false;

            this.isMouse = true;
            if('ontouchstart' in window) this.isMouse = false;

            var touchdownEvent = ('ontouchstart' in window ? 'touchstart' : 'mousedown');
            var touchmoveEvent = ('ontouchmove' in window ? 'touchmove' : 'mousemove');
            var touchupEvent = ('ontouchstart' in window ? 'touchend' : 'mouseup');


            this.isMouseDown = false;

            var that = this;
            var downBound = function(e){ that.touchStartHandler(e) };
            this.target.addEventListener( touchdownEvent, downBound );

            var moveBound = function(e){  that.touchMoveHandler(e) };
            this.target.addEventListener( touchmoveEvent, moveBound );

            var upBound = function(e) { that.touchEndHandler(e) };
            this.target.addEventListener( touchupEvent, upBound );

        }

        //tap down handler
        p.touchStartHandler = function(e) {
            if(this.isPreventDefault) e.preventDefault();
            this.touchStartTime = Date.now();
            if(e.touches) { 
                this.prevPX = e.touches[0].pageX;  
                this.prevPY = e.touches[0].pageY;
                var clientX = e.changedTouches[0].pageX - this.target.offsetLeft;
                var clientY = e.changedTouches[0].pageY - this.target.offsetTop;
            }
            else { 
                this.prevPX = e.pageX;
                this.prevPY = e.pageY;
                var clientX = e.clientX - this.target.offsetLeft;
                var clientY = e.clientY - this.target.offsetTop;
                this.isMouseDown = true;
            }

            this.dispatchCustomEvent(TouchEvent.TAPSTART, { x:clientX, y: clientY  });

        }

        p.touchMoveHandler = function(e) {
            if(this.isPreventDefault) e.preventDefault();
            if(e.touches) { 
                pX = e.changedTouches[0].pageX;
                pY = e.changedTouches[0].pageY;
                var clientX = e.changedTouches[0].pageX - this.target.offsetLeft;
                var clientY = e.changedTouches[0].pageY - this.target.offsetTop;
            }
            else { 
                pX = e.pageX;
                pY = e.pageY;
                var clientX = e.clientX - this.target.offsetLeft;
                var clientY = e.clientY - this.target.offsetTop;
            }

            var xDist = pX - this.prevPX;
            var yDist = pY = this.prevPY;
            if(this.isMouse && !this.isMouseDown) return;
            this.dispatchCustomEvent(TouchEvent.DRAG, { x: clientX, y: clientY, xDistance: xDist, yDistance: yDist });

        }

        //tap up handler
        p.touchEndHandler = function(e) {
            if(this.isPreventDefault) e.preventDefault();
            if(!this.touchStartTime) return;

            var touchEndTime = Date.now() - this.touchStartTime;
            var pX, pY; 

            if(e.touches) { 
                pX = e.changedTouches[0].pageX;
                pY = e.changedTouches[0].pageY;
                var clientX = e.changedTouches[0].pageX - this.target.offsetLeft;
                var clientY = e.changedTouches[0].pageY - this.target.offsetTop;
            }
            else { 
                pX = e.pageX;
                pY = e.pageY;
                var clientX = e.clientX - this.target.offsetLeft;
                var clientY = e.clientY - this.target.offsetTop;
                this.isMouseDown = false;
            }

            var xDist = Math.abs( pX - this.prevPX );
            var yDist = Math.abs( pY - this.prevPY );
            var vDist = Math.sqrt(xDist*xDist + yDist*yDist);

            //detect tap and hold
            if( xDist<=( this.settings.tapRange/2 ) && yDist<=( this.settings.tapRange/2 ) ) {
                if(touchEndTime>=this.settings.tapHoldDuration) {  
                    this.dispatchCustomEvent(TouchEvent.HOLDEND);

                }
                else {
                    this.dispatchCustomEvent(TouchEvent.TAP, { x:clientX, y: clientY  });
                }
            }
            //detect swipe
            else if( vDist >= this.settings.swipeRange ){
                this.dispatchCustomEvent(TouchEvent.SWIPE, {xDistance: xDist, yDistance: yDist});
            }

            if(this.isDragging) {
                this.dispatchCustomEvent(TouchEvent.DRAGEND);
                this.isDragging = false;
            }

            this.touchStartTime = null;

            return true;
        }




        return TouchEvent;

    })
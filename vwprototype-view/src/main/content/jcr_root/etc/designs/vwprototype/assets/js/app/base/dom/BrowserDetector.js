define([

    "base/events/EventDispatcher"

    ], function(EventDispatcher) {


        var BrowserDetector = function BrowserDetector(resizeCallback) {

            this.currentState = null;
            this.prevState = null;
            this.setup(resizeCallback);
        }

        var p = BrowserDetector.prototype = new EventDispatcher();


        p.setup = function(resizeCallback) {

            var that = this;
            var resizeDetectBound = function(e) { that.resizeDetect(e, resizeCallback) };
            window.addEventListener('resize', resizeDetectBound);
        }

        p.resizeDetect = function(e, callback) {
            var state = { current:this.currentState, prev:this.previousState };
            if(callback) { callback.call(state); };
        }


        return BrowserDetector;
});
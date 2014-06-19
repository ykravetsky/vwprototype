define([

    "base/events/EventDispatcher"

    ], function(EventDispatcher){

        var Core = function Core() {



            this.setup();
        }

        var p = Core.prototype = new EventDispatcher();

        p.setup = function() {

            this._setup();
        }

        p._setup = function() {

        }


        return Core;

});
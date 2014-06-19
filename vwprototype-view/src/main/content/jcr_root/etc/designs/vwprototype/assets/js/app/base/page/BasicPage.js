// -------------------------------------
// Basic page
// -------------------------------------
define(['jquery', 'base/events/EventDispatcher'], function($, EventDispatcher){


    var BasicPage = function() {

        
    }

    var p = BasicPage.prototype = new EventDispatcher();

    //setup to be inherited and overwritten
    p.setup = function() {}

    //pre setup
    p._setup = function() {}

    //output html to beh overwritten
    p.html = function() {}

    //animate in
    p.animateIn = function() {}

    //animate in complete
    p.animateInComplete = function() {}

    //animate out
    p.animateOut = function() {}

    //animate out complete
    p.animateOutComplete = function() {}

    //show
    p.show = function() {}

    //hide
    p.hide = function() {}


    return BasicPage;


});
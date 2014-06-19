define(["jquery", "text!template/navi-template.html!strip", "base/page/BasicPage"], function($, naviTemplate, BasicPage){


    var Navi = function() {

        console.log('navi instantiated ')
        //define variables here

        this.template = null;
        this.setup();
    };

    var p = Navi.prototype = new BasicPage();

    p.setup = function() {

        this._setup();
        this.template = naviTemplate;
    }

    p.html = function(text) {


        return this.template;
    }


    p.animateIn = function() {

    }

    p.animateOut = function() {

    }

    p.show = function() {

    }

    p.hide = function() {

    }

    return Navi;




})
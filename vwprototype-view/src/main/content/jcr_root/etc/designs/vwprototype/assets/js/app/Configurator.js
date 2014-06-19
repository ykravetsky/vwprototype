define([
            "jquery", 
            "app/components/Navi", 
            "base/core/Core",
            "base/loader/AssetManager", 
            "base/math/Random",
            "data/AssetData",
            "dom/BrowserDetector",
            "base/events/Scroller",
            "base/events/TouchEvent",
            "soundManager"
        ], function($, Navi, Core, AssetManager, Random, AssetData, BrowserDetector, Scroller, TouchEvent, soundManager){


    $(function(){


        // ------------------------------------
        // begin and load in configurator page
        // ------------------------------------
        var ConfiguratorPage = function ConfiguratorPage() {

            this.isLoaded = false;
            this.maxFrame = 2000;
            var assetmanager = new AssetManager(AssetData);
            var that = this;
            assetloadCompleteBound = function(e) { that.init(e) };
            assetmanager.addEventListener('loadComplete', assetloadCompleteBound);

            assetmanager.load();
        }

        var p = ConfiguratorPage.prototype = new Core();


        p.init = function(e) {

            this.isLoaded = true;

            this.container = document.createElement('div');
            this.container.style.position = 'absolute';
            this.container.style.width = '100%';
            this.container.style.height = '100%';
            this.container.style.overflow = 'hidden';
            this.container.style.background = '#333333';

            this.counter = document.createElement('div');
            this.counter.style.position = 'absolute';
            this.counter.style.width = '100px';
            this.counter.style.height = '30px';
            this.counter.style.left = '50%';
            this.counter.style.top = '50%';
            this.counter.style.color = '#ffffff';
            this.counter.style.fontFamily = 'Helvetica, sans-serif';
            this.counter.style.fontSize = '36px';
            this.counter.style.marginLeft = '-50px';
            this.counter.style.marginTop = '-15px';
            this.counter.style.textAlign = 'center';
            this.counter.innerHTML = '0';

            this.container.appendChild(this.counter);

            document.body.appendChild(this.container);

            //create random colors
            this.createRandomColor();
            this.scroller = new Scroller(this.container, this.maxFrame);

        }

        p.createRandomColor = function() {

            this.bgColors = [];
            for (var i=0; i<this.maxFrame; i++) {
                this.bgColors.push(Random.color());
            }
        }

        p.update = function() {
            this.scroller.update();
        }

        p.render = function() {
            var dist = Math.floor( this.scroller.getDistance() );
            console.log(dist, this.bgColors[dist])
            this.container.style.background = this.bgColors[dist];
            this.counter.innerHTML = dist;
        }

        //create navi
        // var navi = new Navi();

        var page = new ConfiguratorPage();

        function animate() {

            window.webkitRequestAnimationFrame(animate);

            if(!page.isLoaded) return;
            page.update();
            page.render();
        }

        animate();
        



    })

})
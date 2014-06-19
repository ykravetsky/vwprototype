define([
            "jquery", 
            "app/components/Navi", 
            "base/core/Core",
            "base/loader/AssetManager", 
            "data/AssetData",
            "dom/BrowserDetector",
            "base/events/TouchEvent",
            "soundManager"
        ], function($, Navi, Core, AssetManager, AssetData, BrowserDetector, TouchEvent, soundManager){


    $(function(){


        var ConfiguratorPage = function ConfiguratorPage() {

            var assetmanager = new AssetManager(AssetData);
            var that = this;
            assetloadCompleteBound = function(e) { that.init(e) };
            assetmanager.addEventListener('loadComplete', assetloadCompleteBound);

            assetmanager.load();
        }

        var p = ConfiguratorPage.prototype = new Core();


        p.init = function(e) {
            console.log(e.detail.data.images.desktop.pane1.width);

            var gameover = e.detail.data.sound.test.gameover;


            this.sSound = $('#top3');
            this.sLeft = $('#top2');
            this.sDrag = $('#top1');
            this.tapBall = $('#top3-circle');
            this.tapBall.css({left: (this.sSound.width()/2 - this.tapBall.width()/2), top: (this.sSound.height()/2 - this.tapBall.height()/2)})
            // this.tapBall.hide();

            this.draBall = $('#top1-circle');
            this.draBall.css({left: (this.sDrag.width()/2 - this.draBall.width()/2), top: (this.sDrag.height()/2 - this.draBall.height()/2)})
            // this.draBall.hide();


            var that = this;
            var slSound = new TouchEvent(this.sSound[0]);
            var slTouch = new TouchEvent(this.sLeft[0]);
            var sDrag = new TouchEvent(this.sDrag[0], true);

            slSound.addEventListener('tapstart', function(e){ console.log('tap 1', e.detail); that.tapBall.hide();  });
            slSound.addEventListener('tap', function(e){ that.tapBall.show() });


            slSound.addEventListener('holdend', function(){ that.tapBall.show(); that.tapBall.animate({left:"+=50"}, 100).animate({left:"-=50"}, 100).animate({left:"+=50"}, 100).animate({left:"-=50"}, 100).animate({left:"+=50"}, 100).animate({left:"-=50"}, 100); gameover.play(); });

            slTouch.addEventListener('swipe', function(e){ that.sLeft.toggleClass('animateOut') });
            sDrag.addEventListener('drag', function(e){ that.draBall.show(); that.draBall.css({left: (e.detail.x - that.draBall.width()/2), top: (e.detail.y - that.draBall.height()/2)}) });
            sDrag.addEventListener('dragend', function(e){ that.draBall.hide(); console.log('drag 4') });


        }

        p.update = function() {
            
        }

        p.render = function() {

        }

        //create navi
        // var navi = new Navi();

        var page = new ConfiguratorPage();

        function animate() {

            page.update();
            page.render();
            window.webkitRequestAnimationFrame(animate);
        }

        animate();
        



    })

})
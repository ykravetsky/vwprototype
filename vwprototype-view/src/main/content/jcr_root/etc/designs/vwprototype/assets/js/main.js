(function() {


    var ns = MKK.getNamespace('mkk');
    var AssetManager = MKK.getNamespace('mkk.loader').AssetManager;
    var AssetData = MKK.getNamespace('data').AssetData;
    var Core = MKK.getNamespace('mkk.core').Core;
    var BasicPage = MKK.getNamespace('mkk.page').BasicPage;
    var MobilePage = MKK.getNamespace('mkk.page').MobilePage;
    var TabletPage = MKK.getNamespace('mkk.page').TabletPage;
    var DesktopPage = MKK.getNamespace('mkk.page').DesktopPage;

    var Main = function Main() {


      this.setup();
    }

    ns.Main = Main;

    var p = Main.prototype = new Core();


    // -----------------------
    // setup and init
    // -----------------------
    p.setup = function() {

      var assetmanager = new AssetManager(AssetData);

      assetmanager.load();

      var that = this;
      assetmanager.addEventListener('loadComplete', function(e){ that.init(e); })

      var that = this;
      var resizeBound = function(e) { that.onResize(e) };
      window.addEventListener('resize',resizeBound);
      //resize first
      this.onResize();
    }

    p.init = function(e) {

        console.log('asset load complete', e.detail);
        this.initScreenSize();
    }

    // -----------------------------
    // scaling according to devices
    // -----------------------------
    p.ipadPortraitScale = function() {
      console.log('ipad Portrait Scale');
      $('.topbar').hide();
      $('.sidebar').show();
      $('.close').show();
      if(!this.tabletpage) this.tabletpage = new TabletPage(768,1024);
      else this.tabletpage.resetToPortrait();
    }

    p.ipadLandscapeScale = function() {
      console.log('ipad Landscape Scale');
      if(!this.tabletpage) this.tabletpage = new TabletPage(1024,768);
      else this.tabletpage.resetToLandscape();
    }

    p.iphoneScale = function() {

      console.log('iphone Scale');
      if(!this.mobilepage) {
        this.mobilepage = new MobilePage();
      }
    }

    p.desktopScale = function() {

      console.log('desktop Scale' );
      if(!this.desktoppage){
        this.desktoppage = new DesktopPage();
      }

    }


    p.initScreenSize = function() {

      console.log('haed data', head.touch, head.browser.ios, head.landscape, head.portrait, this.windowPortrait())
      if(head.touch) {

        if( head.screen.width>=768 && head.landscape ) {
          this.ipadLandscapeScale();
        }
        else if( head.screen.width>=768 && head.portrait ) {
          this.ipadPortraitScale();
        }
        else {
          this.iphoneScale();
        }
      }
      else {
        if( head.screen.width<=320 ) {
          this.iphoneScale();
        }
        else {
          this.desktopScale();
        }
      }
    }


    p.onScreenSize = function() {

      if(head.touch) {

        if( head.screen.width>=768 && !this.windowPortrait() ) {
          this.ipadLandscapeScale();
        }
        else if( head.screen.width>=768 && this.windowPortrait() ) {
          this.ipadPortraitScale();
        }
        else {
          this.iphoneScale();
        }
      }
      else {
        if( window.innerWidth<=320 ) {
          if(this.desktoppage) this.desktoppage.rescale(true);
        }
        else {
          if(this.desktoppage) this.desktoppage.rescale(false);
        }
      }

    }

  p.windowPortrait = function() {
    switch(window.orientation) 
    {  
      case -90:
      case 90:
        return true;
        break; 
      default:
        return false;
        break; 
    }
  }


    //resize function 
    p.onResize = function(e) {

      this.onScreenSize();

    }


    //timed renders
    p.render = function() {

    }

    p.update = function() {

    }




})();
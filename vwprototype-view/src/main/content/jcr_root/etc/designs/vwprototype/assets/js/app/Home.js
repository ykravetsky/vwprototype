define([
            "jquery", 
            "app/components/Navi", 
           // "base/loader/AssetManager",
            "data/AssetData",
            "dom/BrowserDetector"
        ], function($, Navi, /*AssetManager,*/ AssetData, BrowserDetector){


    $(function(){


        //create navi
        var navi = new Navi();
        //var assetmanager = new AssetManager(AssetData);

        //assetmanager.addEventListener('loadComplete', function(e){ console.log(e.detail.data.images.desktop.pane1) });
       // assetmanager.load();

        // Toggles menu
        $('.navigation .tab').on('click',function(){
            $('#site-wrapper').toggleClass('menu-visible');
        });

        $('.sidebar .head').on('click',function(){
            $('#site-wrapper').toggleClass('menu-visible');
        });

        $('.submenu .hotspot').on('click',function(){
            $('.submenu').toggleClass('active');
        });

        $('.close').on('click',function(){
            $(this).parent().fadeOut();
        });


    })

})
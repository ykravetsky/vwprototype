(function() {


   var ns =  MKK.getNamespace('data');

   if(!ns.AssetData){
        var AssetData = {

            desktop: {
                pane1: '/etc/designs/vwprototype/assets/img/panes/home_uk_desktop_01.jpg'
            },
            tablet: {

            },
            mobile: {
                carousel1: [
                    '/assets/img/carousel1/image1.png',
                    '/assets/img/carousel1/image2.png',
                    '/assets/img/carousel1/image3.png',
                    '/assets/img/carousel1/image4.png',
                    '/assets/img/carousel1/image5.png',
                ]
            },

            sound: {

                test: {
                    gameover: '/etc/designs/vwprototype/assets/sound/demo-gameover.wav'
                }
            }

        };

        ns.AssetData = AssetData;
    }


})();
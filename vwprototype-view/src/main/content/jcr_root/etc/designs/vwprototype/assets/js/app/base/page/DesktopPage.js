(function(){

	var ns = MKK.getNamespace('mkk.page');
	var BasicPage = MKK.getNamespace('mkk.page').BasicPage;
	var Carousel = MKK.getNamespace('mkk.components').Carousel;

	if(!ns.DesktopPage){

		var DesktopPage = function DesktopPage(width, height) {

			this.width = width || 1024;
			this.height = height || 768;

			this._speed = 500;
			this.currentIndex = 0;
			this.prevIndex = 0;
			this.isAnimating = false;



			this.potinerLandscapePos = [96,309,517,732,938];
			this.pointerPos = null;
			this.potinerPotraitPos = [86,251,394,527,657];



			this.setup();
		}

		var p = DesktopPage.prototype = new BasicPage();

		ns.DesktopPage = DesktopPage;

		p.setup = function() {
			console.log('DesktopPage Setup');

			$('.topbar').hide();
	     	$('.sidebar').show();

	     	// Mock up car-carousel for desktop

	     	$('.car-carousel .tabs a').on('tap',function(){
	     		$(this).parent().find('a').removeClass('active');
	     		$('#slide-wrapper').removeClass();
	     		$(this).addClass('active');

	     		if ( $(this).attr("id") == "slide-link-01" ){
	     			$('#slide-wrapper').addClass('show-01');

	     		} else if ( $(this).attr("id") == "slide-link-02" ){
	     			$('#slide-wrapper').addClass('show-02');

	     		} else if ( $(this).attr("id") == "slide-link-03" ){
	     			$('#slide-wrapper').addClass('show-03');

	     		} else if ( $(this).attr("id") == "slide-link-04" ){
	     			$('#slide-wrapper').addClass('show-04');

	     		} else {
	     			$('#slide-wrapper').addClass('show-05');
	     		}
	     	});

	 		$('#viewport').on('taphold',function(){
	 			$('#close-social').addClass('active');
	 		});

	 		$('#open-video-overlay').on('tap',function(){
	 			$('#video-overlay').addClass('active');
	 		});

	 		$('.share-this').on('tap',function(){
	 			$('#social-overlay').addClass('active');
	 		});

	 		// Hides social overlay

	     	$('#close-social').on('tap',function(){

	     		var overlay = $('#social-overlay'); 

	     		$(overlay).addClass('go-away');
		     	setTimeout(function() {
	      			$(overlay).removeClass('active');
				}, 500)
		     	setTimeout(function() {
	      			$(overlay).removeClass('go-away');
				}, 700)
	     	});

	     	// Hides video overlay

	     	$('#close-video').on('tap',function(){

	     		var overlay = $('#video-overlay'); 

	     		$(overlay).addClass('go-away');
		     	setTimeout(function() {
	      			$(overlay).removeClass('active');
				}, 500)
		     	setTimeout(function() {
	      			$(overlay).removeClass('go-away');
				}, 700)
	     	});

			// Adds animate class on load.
			$('.wobblies').addClass('animate');

			// Adds or removes animate & pre-animate classes on / after scroll
			$('#viewport').scroll(function(){
			  if( $(this).scrollTop() <= 0 ) {
			    $('.wobblies').removeClass('pre-animate').addClass('animate');
			  } if ( $(this).scrollTop() >= 1024 ){
			    $('.wobblies').removeClass('animate').addClass('pre-animate');			 
			  }
			});

	        // Hides open child menu on submenu scroll

	        $('.submenu').scroll(function(){
	            $('.child-menu').removeClass('active');
	            $('.third-level').removeClass('active');
	            $('.sidebar').removeClass('show-overlay');
	        });

	        $('.overlay').on('tap',function(){
	            $('.child-menu').removeClass('active');
	            $('.third-level').removeClass('active');
	            $('.sidebar').removeClass('show-overlay');
	            $('#linkList .active').removeClass('active');
	        });

	        $('#linkList .live').on('tap',function(){

	        	if ($(this).hasClass('active')){
					$(this).removeClass('active');
					$('.sidebar').removeClass('show-overlay');
					$('.child-menu').removeClass('active');
	        	} else {

					var choice = $(this).index(); 

					// Hides any open menus
					$('.child-menu, .third-level, .hotspot').removeClass('active');

					// Gains active state
					$(this).addClass('active');
					$('.sidebar').addClass('show-overlay');

					// Reveals chosen menus
					$('.child-menu:eq(' + choice + ')').addClass('active');
	        	}
	        });

	        $('#show-third-level').on('tap',function(){
	        	$('.third-level').addClass('active');
	        });

	       	$('#hide-third-level').on('tap',function(){
	        	$('.third-level').removeClass('active');
	        });

	        $('.logo').on('tap', function() {
	            $('#viewport').animate({ scrollTop: 0 }, "slow");
	            return false;
	        });

		}

		p.rescale = function(isMobile) {
			if(isMobile) {
				$('.topbar').show();
	     	 	$('.sidebar').hide();
			}
			else {
				$('.topbar').hide();
	     	 	$('.sidebar').show();		
			}
		}


	}

})();
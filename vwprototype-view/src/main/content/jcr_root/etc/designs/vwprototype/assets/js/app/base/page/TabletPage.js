(function(){

	var ns = MKK.getNamespace('mkk.page');
	var BasicPage = MKK.getNamespace('mkk.page').BasicPage;
	var Carousel = MKK.getNamespace('mkk.components').Carousel;
	var TouchEvent = MKK.getNamespace('mkk.events').TouchEvent;

	if(!ns.TabletPage){

		var TabletPage = function TabletPage(width, height) {

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

		var p = TabletPage.prototype = new BasicPage();

		ns.TabletPage = TabletPage;

		p.setup = function() {

			if(this.width<=768) {
				this.pointerPos = this.potinerPotraitPos;
			}
			else {
				this.pointerPos = this.potinerLandscapePos;
			}
			this.pointerPos = this.potinerLandscapePos;

			this.init();
			this.initCarousel();

			this.carouselTweenTo(0);

			var touchEvent = new TouchEvent(this.carousel[0]);
			var that = this;
			this.leftSwipeBound = function(e){ that.leftSwipeFunc( e, this ) };
			this.rightSwipeBound = function(e) { that.rightSwipeFunc( e, this ) };

			touchEvent.addEventListener('swipeleft', this.leftSwipeBound);
			touchEvent.addEventListener('swiperight', this.rightSwipeBound);
		}

		p.leftSwipeFunc = function(e, obj) {
			if(this.currentIndex<4) {
					this.carouselTweenTo(this.currentIndex+1);
			}
			else {
				this.currentIndex = 4;
			}
		}

		p.rightSwipeFunc = function(e, obj) {
			if(this.currentIndex>0) {
					this.carouselTweenTo(this.currentIndex-1);
			}
			else if(this.currentIndex<=0) {
				this.currentIndex = 0;
			}
		}

		p.resetToPortrait = function() {
			console.log('reset to portrait');
			this.pointerPos = this.potinerPotraitPos;
			this.carouselTweenTo(0);
		}

		p.resetToLandscape = function() {
			console.log('reset to landscape');
			this.pointerPos = this.potinerLandscapePos;
			this.carouselTweenTo(0);
		}

		p.init = function() {

			$('.topbar').hide();
	     	$('.sidebar').show();

	 		$('#viewport').on('taphold',function(){
	 			$('#social-overlay').addClass('active');
	 		});

	 		$('#open-video-overlay').on('tap',function(){
	 			$('#video-overlay').addClass('active');
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

		p.initCarousel = function() {

			this.carousel = $('#tablet-carousel');
			this.carbut = $('#tablet-carousel .carousel-topbar .img-section');
			this.bg = $('#tablet-carousel .carousel-inner');
			this.pointer = $('#carousel-pointer');
			this.pointer.css({'left':this.pointerPos[0]+'px'});
			console.log(this.pointer);

			var that = this;
			this.butTapBound = function(e) { that.butTapFunc(e, this); }
			for(var i=0; i<5; i++) {
				$(this.carbut[i]).css({'opacity':0.5});
				if(i==0) $(this.carbut[i]).css({'opacity':1});

				$(this.carbut[i]).on('touchend', this.butTapBound);
			}
		}

		p.carouselTweenTo = function(index) {

			if(this.isAnimating) return; 

			for(var i=0; i<5; i++) {
				if(i == index) $(this.carbut[index]).fadeTo(200, 1);
				else $(this.carbut[i]).fadeTo(200, 0.5);
			}
			this.prevIndex = parseInt(this.currentIndex);
			this.currentIndex = parseInt(index);
			var that = this;
			this.tapTweenBound = function(e) { that.tapTweenFunc(e, this) };
			this.tapCompleteBound = function(e) { that.tapCompleteFunc(this) };
			var tweener = new TWEEN.Tween({x: 0, bgx:0 })
										.to({x:0 , bgx:0 }, this._speed )
										.easing(TWEEN.Easing.Cubic.InOut)
										.onUpdate(this.tapTweenBound)
										.onComplete(this.tapCompleteBound)
										.start();
			this.isAnimating = true;						


		}

		p.butTapFunc = function(e, obj) {

			var index = $(obj).attr('data-bind');
			this.carouselTweenTo(index);
		}

		p.tapTweenFunc = function(e, obj) {
			var out = e*(this.pointerPos[this.currentIndex] - this.pointerPos[this.prevIndex]) + this.pointerPos[this.prevIndex];

			if(this.currentIndex>this.prevIndex) { var out2 = -this.width * ( e * (this.currentIndex - this.prevIndex) + this.prevIndex); }
			else { var out2 = -this.width * ( (1-e) * (this.prevIndex - this.currentIndex) + this.currentIndex) }
			this.pointer.css({'left':out+'px'});
			// this.bg.css({'left':out2+'px'});
			this.bg[0].style.webkitTransform = 'translate3d('+ out2 +'px, 0px, 0px)';

		}

		p.tapCompleteFunc = function(obj) {
			// this.bg.css({'left': (-this.currentIndex*this.width )+'px'});
			this.isAnimating = false;
			this.bg[0].style.webkitTransform = 'translate3d('+ (-this.currentIndex*this.width ) +'px, 0px, 0px)';
		}




	}


})();
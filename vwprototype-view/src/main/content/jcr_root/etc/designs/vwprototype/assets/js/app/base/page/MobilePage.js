(function(){

	var ns = MKK.getNamespace('mkk.page');
	var BasicPage = MKK.getNamespace('mkk.page').BasicPage;
	var Carousel = MKK.getNamespace('mkk.components').Carousel;

	if(!ns.MobilePage){

		var MobilePage = function MobilePage(width, height) {

			this.width = width || 320;
			this.height = height;

			this.setup();

			this.topbarPos = [10, -147, -297];
		}

		var p = MobilePage.prototype = new BasicPage();

		ns.MobilePage = MobilePage;

		p.setup = function() {

			//stop bounce

			this.init();
			this.initProductCarousel();
			this.initTopbar();
			this.initPointerAnim();

			this.index = 0;
			this.activeIndicator = $(this.indicator[0]);
			this.currentX = 0;
			this.currentScrollTop = 0;
		}


		p.init = function() {
			//hide show stuff
			$('.topbar').show();
			$('.sidebar').hide();
		}

		p.initPointerAnim = function() {
			this.mapPointer = $('#home-05-map-pointer');
			var that = this;
			this.pointerTweenBound = function(e) { that.pointerTweenFunc(e, this) };
			this.pointerTween = new TWEEN.Tween({ y:1550 })
										.to({ y:1600 }, 650)
										.easing(TWEEN.Easing.Bounce.Out)
										.repeat(Infinity)
										.delay(3000)
										// .yoyo(true)
										.onUpdate( this.pointerTweenBound )
										.start();
		}

		p.pointerTweenFunc = function(e, obj) {
			// console.log($('#viewport')[0].scrollTop);
			if($('#viewport')[0].scrollTop>=1245 && $('#viewport')[0].scrollTop<=1700) {
				this.mapPointer.css({'top':obj.y});
			}
		}	
		// ----------------------------------
		// create and init carousel
		// ----------------------------------		
		p.initProductCarousel = function() {

			this.mainCarousel = new Carousel($('#viewport')[0]);

			var that = this;
			this.mainCarousel.leftSwipeStartCallback = function(e) { that.mainLeftSwipeStart(e) };
			this.mainCarousel.leftSwipeTweenCallback = function(e, obj) { that.mainLeftSwipeTween(e, obj) };
			this.mainCarousel.leftSwipeCompleteCallback = function(obj) { that.mainLeftSwipeComplete(obj) };

			this.mainCarousel.rightSwipeStartCallback = function(e) { that.mainRightSwipeStart(e) };
			this.mainCarousel.rightSwipeTweenCallback = function(e, obj) { that.mainRightSwipeTween(e, obj) };
			this.mainCarousel.rightSwipeCompleteCallback = function(obj) { that.mainRightSwipeComplete(obj) };


			this.viewport = $('#viewport');
			this.pane = $('#viewport .pane .mobile-carousel');
			this.indicator = $('#home-02-carousel .carousel-nav-section');
			this.topbar = $('#home-02-carousel .topbar-inner');
			this.topbarimg = $('#home-02-carousel .topbar-inner .topbar-img');
		}

		p.updateIndicator = function(index) {
			var inLen = this.indicator.length;

			console.log('lala indi', (this.topbar[i]))
			for(var i=0; i<inLen; i++) {
				if(i==index) {
					$(this.indicator[i]).addClass('active');
					$(this.topbarimg[i]).addClass('active');
				}
				else {
					$(this.indicator[i]).removeClass('active');
					$(this.topbarimg[i]).removeClass('active');
				}
			}
		}

		//home-02 swipe left start
		p.mainLeftSwipeStart = function(e) {
			this.currentScrollTop = $('#viewport')[0].scrollTop;

			this.activeCarousel = null;
			this.activeTopbar = null;
			for(var i=0; i<this.pane.length; i++) {				
				var calT = this.pane[i].parentNode.parentNode.offsetTop - 200;
				var calH = (calT + this.pane[i].parentNode.parentNode.offsetHeight);
				console.log('asdf', this.currentScrollTop, calT, calH);

				if(this.currentScrollTop>calT && this.currentScrollTop<calH) {
					this.activeCarousel = $(this.pane[i]).find('.carousel-bg-inner')[0];
					this.activeTopbar = $(this.topbar[i])[0];
					if(this.index>0) this.index--;
					else if(this.index<=0) this.index = 0;
				}
				
			}

		}

		//home-02 swipe left tween
		p.mainLeftSwipeTween = function(e, obj) {

			if(this.index==this.prevIndex) return;

			var out = -((this.index+1) - e) * this.width;
			var tout = this.topbarPos[this.index] + ( this.topbarPos[this.index+1] - this.topbarPos[this.index] ) * (1-e);
			if(this.activeCarousel) {
				console.log(out);
				this.activeCarousel.style.webkitTransform = 'translate3d('+ out +'px, 0px, 0px)';
			}

			if(this.activeTopbar) {
				this.activeTopbar.style.webkitTransform = 'translate3d('+ tout +'px, 0px, 0px)';
			}

		}

		//home-02 swipe left complete
		p.mainLeftSwipeComplete = function(e) {
			// this.currentX = -this.index * this.width;
			this.prevIndex = this.index;
			this.updateIndicator(this.index);
		}


		//home-02 swipe right start
		p.mainRightSwipeStart = function(e) {
			this.currentScrollTop = $('#viewport')[0].scrollTop;
			this.activeCarousel = null;
			this.activeTopbar = null;
			for(var i=0; i<this.pane.length; i++) {				
				var calT = this.pane[i].parentNode.parentNode.offsetTop - 200;
				var calH = (calT + this.pane[i].parentNode.parentNode.offsetHeight);
				console.log('asdf right', this.currentScrollTop, calT, calH);

				if(this.currentScrollTop>calT && this.currentScrollTop<calH) {
					this.activeCarousel = $(this.pane[i]).find('.carousel-bg-inner')[0];
					this.activeTopbar = $(this.topbar[i])[0];
					if(this.index<2) this.index++;
					else if(this.index>=2) this.index=2;
				}
			}	

		}

		//home-02 swipe right tweening
		p.mainRightSwipeTween = function(e, obj) {

			if(this.index==this.prevIndex) return;
			var out = -((this.index-1) + e) * this.width;
			var tout = this.topbarPos[this.index] - ( this.topbarPos[this.index] - this.topbarPos[this.index-1] ) * (1-e);
			if(this.activeCarousel) {
				this.activeCarousel.style.webkitTransform = 'translate3d('+ out +'px, 0px, 0px)';
			}

			if(this.activeTopbar) {
				this.activeTopbar.style.webkitTransform = 'translate3d('+ tout +'px, 0px, 0px)';
			}
		}

		//home-02 swipe right complete 
		p.mainRightSwipeComplete = function(e) {
			// this.currentX = -this.index * this.width;
			this.prevIndex = this.index;
			this.updateIndicator(this.index);
		}


		// ----------------------------------
		// create and init the top bar menu
		// ----------------------------------
		p.initTopbar = function() {

			var that = this;

			//top nav click and begins!
			this.topnav = $('.topbar');
			this.lasttaptime = Date.now();;
			this.topnav.on('tap', function(){ 

				event.stopPropagation(); 
				$(this).toggleClass('open');
				var tmp = $(this).find('.menu-inner')[0];
				if($(this).hasClass('open')) {
					$(tmp).css({ 'overflow-y': 'auto', 'overflow-x': 'hidden'});
				}
				else {
					
					$(tmp).delay(120).queue(function(){ $(this).css({ 'overflow-y': 'hidden', 'overflow-x': 'hidden'}).dequeue() });
				}

			});

			//menu level 1
			this.menu1 = $('#menu-01 .fake-topbar-button');
			this.menu1.on('tap', function(event){ 
													event.stopPropagation();  
													var currenttaptime = Date.now();
													console.log(currenttaptime, that.lasttaptime)
													if( (currenttaptime - that.lasttaptime)<=(800) ) return;
													that.lasttaptime = currenttaptime;
													$('.menu-scrollbox').animate({left:-320}, 180);
													$('#menu-02-fixtop').animate({left:0}, 180);
			});

			// menu level 2
			this.menu2 = $('#menu-02-fixtop');
			this.menu2.on('tap', function(event){ 
													event.stopPropagation(); 
													var currenttaptime = Date.now();
													console.log(currenttaptime, that.lasttaptime)
													if( (currenttaptime - that.lasttaptime)<=(800) ) return;
													that.lasttaptime = currenttaptime; 
													$('.menu-scrollbox').animate({left:0}, 180);
													$('#menu-02-fixtop').animate({left:320}, 180);
			});
		}





	}


})();
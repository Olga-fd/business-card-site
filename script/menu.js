'use strict';
$(function() {
	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	const keys = {37: 1, 38: 1, 39: 1, 40: 1};

	function preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	}

	function preventDefaultForScrollKeys(e) {
		if (keys[e.keyCode]) {
			preventDefault(e);
			return false;
		}
	}

	function disableScroll() {
		if (window.addEventListener) // older FF
			window.addEventListener('DOMMouseScroll', preventDefault, false);

		console.log('modernizr', Modernizr.passiveeventlisteners);

		window.addEventListener('wheel', preventDefault,
			Modernizr.passiveeventlisteners ? {passive: false} : false); // modern standard
		document.addEventListener('mousewheel', preventDefault,
			Modernizr.passiveeventlisteners ? {passive: false} : false); // older browsers, IE
		window.addEventListener('mousewheel', preventDefault,
			Modernizr.passiveeventlisteners ? {passive: false} : false); // older browsers, IE
		window.addEventListener('touchmove', preventDefault,
			Modernizr.passiveeventlisteners ? {passive: false} : false); // mobile
		document.onkeydown = preventDefaultForScrollKeys;
	}

	function enableScroll() {
		if (window.removeEventListener)
			window.removeEventListener('DOMMouseScroll', preventDefault, false);
		document.removeEventListener('mousewheel', preventDefault, false);
		window.removeEventListener('mousewheel', preventDefault, false);
		window.removeEventListener('wheel', preventDefault, false);
		window.removeEventListener('touchmove', preventDefault, false);
		document.onkeydown = null;
	}

	const burger = $('.intro__burger-menu');
	const mobileMenu = $('.intro__nav');
	const tag = $('.tag-three');
	const item = $('.intro__item');
	
	burger.click(function() {

		burger.toggleClass('close');
    mobileMenu.toggleClass('active').animate({opacity: '1'},
      1500, "linear");
    tag.toggleClass('visually-hidden');

   	if (mobileMenu.hasClass('active')) {
			disableScroll();
		} else {
			enableScroll();
		}
	});
	
	item.click(function() {

	  	mobileMenu.toggle();
	  	burger.removeClass('close');
	  	enableScroll();
 	});
});
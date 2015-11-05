jQuery(document).ready(function($){

	//variables
		delta = 0,
        scrollThreshold = 5,
        actual = 1,
        animating = false,
        body = $('body');

    var jsbody = document.getElementById('demo');
    
    //DOM elements
     sectionsAvailable = $('.cd-section'),
    	verticalNav = $('.cd-vertical-nav'),
    	prevArrow = verticalNav.find('a.cd-prev'),
    	nextArrow = verticalNav.find('a.cd-next'),
    	sectionHolder=$('#demo');

	// var hammertime = new Hammer(jsbody);
	// hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
		
	bindEvents();

	function bindEvents() {
    	  		
    		//bind the animation to the window scroll event, arrows click and keyboard

		initHijacking();
		$(window).on('DOMMouseScroll mousewheel', scrollHijacking);
		sectionHolder.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			animating = false;
		});
		// hammertime.on('swipeup',function(event){
		// 	event.preventDefault();
		// 	nextSection();
		// });
		// hammertime.on('swipedown',function(event){
		// 	event.preventDefault();
		// 	prevSection();
		// });



		$('#down').on('click',nextSection)		
		prevArrow.on('click', prevSection);
		nextArrow.on('click', nextSection);
		
		$(document).on('keydown', function(event){
			if( event.which=='40' && !nextArrow.hasClass('inactive') ) {
				event.preventDefault();
				nextSection();
			} else if( event.which=='38' && (!prevArrow.hasClass('inactive') || (prevArrow.hasClass('inactive') && $(window).scrollTop() != sectionsAvailable.eq(0).offset().top) ) ) {
				event.preventDefault();
				prevSection();
			}
		});
		//set navigation arrows visibility
		// checkNavigation();
		
    }
});




function initHijacking() {
	setColor();
}

function scrollHijacking (event) {
		// on mouse scroll - check if animate section
        if (event.originalEvent.detail < 0 || event.originalEvent.wheelDelta > 0) { 
            delta--;
            ( Math.abs(delta) >= scrollThreshold) && prevSection();
        } else {
            delta++;
            (delta >= scrollThreshold) && nextSection();
        }
        return false;
    }


function prevSection(event) {
    	
    	//go to previous section
    	console.log("dxfv");
    	typeof event !== 'undefined' && event.preventDefault();
    	
    	var visibleSection = sectionsAvailable.filter('.visible');

        if( !animating && !visibleSection.hasClass('top-section') && !visibleSection.is(":last-of-type") ) {
        	animating = true;
        	setTop('prev'); 
            visibleSection.removeClass('visible').prev('.cd-section').addClass('visible');			
            actual = actual - 1;
        }else if(!animating && !visibleSection.hasClass('top-section')){
        	if ($('.cd-section-card').css('top')=='0px') {
					$('.cd-section-card').css('top','100vh');
				}else{
					animating = true;
        			setTop('prev'); 
		            visibleSection.removeClass('visible').prev('.cd-section').addClass('visible');			
		            actual = actual - 1;
		            sectionHolder.css("top","-200vh");	
				};
        }
        delta = 0;
        setColor();
    }


function nextSection(event) {
	
	//go to next section
	typeof event !== 'undefined' && event.preventDefault();

    var visibleSection = sectionsAvailable.filter('.visible');
    if(!animating && !visibleSection.is(":last-of-type") ) {
        animating = true;
        setTop('next');
        visibleSection.removeClass('visible').next('.cd-section').addClass('visible');     
        actual = actual +1;
    }else if(!animating){if ($('.cd-section-card').css('top')!='0px') {
					$('.cd-section-card').css('top','0vh');
				};
    }
    delta = 0;
    setColor();
}

function setColor() {
	var sectionsAvailable=$(".cd-section");
	var visibleSection=$(".visible")[0];
	var pos = sectionsAvailable.index(visibleSection);
	var header=$('#navbar');
	switch(pos){
		case 0: body.css("background-color","#010520");header.css("background-color","#010520");
		break;
		case 1: body.css("background-color","#005EA1");header.css("background-color","#005EA1");
		break;
		case 2: body.css("background-color","#4CAB4F");header.css("background-color","#4CAB4F");setTimeout(function(){$('.fa-angle-right').trigger('click');},500);
		break;
		case 3: body.css("background-color","#CA543B");header.css("background-color","#CA543B");
		break;
		case 4: body.css("background-color","#fbfbfb");header.css("background-color","#fbfbfb");
		break;
	}
}

function setTop(dir) {
	var sectionsAvailable=$(".cd-section");
	var visibleSection=$(".visible")[0];
	var pos = sectionsAvailable.index(visibleSection);
	var card=$('.cd-section-card');
	if (dir=="prev"){
		switch(pos){
		case 1: sectionHolder.css("top","0vh");$("#iitbhu_logo_left").attr('src','static/css/images/logo_technex_white.png');
		break;
		case 2: sectionHolder.css("top","-100vh");
		break;
		case 3: 
				if (card.css('top')=='0px') {
					card.css('top','100vh');
				}else{
					sectionHolder.css("top","-200vh");	
				};
		break;
		case 4: sectionHolder.css("top","-300vh");
		break;
		default: break;
		}
	}
	else{
		switch(pos){
		case 0: sectionHolder.css("top","-100vh");$("#iitbhu_logo_left").attr('src','static/css/images/logo_technex_white_black.png');
			break;
		case 1: sectionHolder.css("top","-200vh");
		break;
		case 2: sectionHolder.css("top","-300vh");console.log('out-2');
		break;
		case 3: //sectionHolder.css("top","-400vh");
		console.log('out');
		if (card.css('top')!='0px') {
					card.css('top','0vh');
					console.log('in');
				};
		break;
		default: break;
		}
	}
}




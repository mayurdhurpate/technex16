$(document).ready(function(){ 
    //** notice we are including jquery and the color plugin at 
    //** http://code.jquery.com/color/jquery.color-2.1.0.js
    
    var scroll_pos = 0;
    var animation_begin_pos = 0; //where you want the animation to begin
    var animation_mid_pos = 1000;
	var animation_mid1_pos = 1600;
	var animation_end_pos = 3500;//where you want the animation to stop
    var beginning_color = new $.Color('#010520');
	var midding_color = new $.Color( '#0071BC' );
	var midding1_color = new $.Color( '#4ead4d' ); //we can set this here, but it'd probably be better to get it from the CSS; for the example we're setting it here.
    var ending_color = new $.Color( 'rgb(244,54,54)' );//what color we want to use in the end
	
	$(document).scroll(function() {
        scroll_pos = $(this).scrollTop(); 
        if(scroll_pos >= animation_begin_pos && scroll_pos <= animation_mid_pos ) { 
           // console.log( 'scrolling and animating' );
            //we want to calculate the relevant transitional rgb value
            var percentScrolled = scroll_pos / ( animation_mid_pos - animation_begin_pos );
            var newRed = beginning_color.red() + ( ( midding_color.red() - beginning_color.red() ) * percentScrolled );
            var newGreen = beginning_color.green() + ( ( midding_color.green() - beginning_color.green() ) * percentScrolled );
            var newBlue = beginning_color.blue() + ( ( midding_color.blue() - beginning_color.blue() ) * percentScrolled );
            var newColor = new $.Color( newRed, newGreen, newBlue );
            console.log( newColor.red(), newColor.green(), newColor.blue() );
            $('body').animate({ backgroundColor: newColor }, 0);
            $('#navbar').animate({ backgroundColor: newColor }, 0);
        }  else if(scroll_pos >= animation_mid1_pos && scroll_pos <= animation_end_pos ) { 
           console.log( 'scrolling and animating' );
            //we want to calculate the relevant transitional rgb value
            var percentScrolled = (scroll_pos-700) / ( animation_end_pos - animation_mid1_pos );
            var newRed = midding1_color.red() + ( ( ending_color.red() - midding1_color.red() ) * percentScrolled );
            var newGreen = midding1_color.green() + ( ( ending_color.green() - midding1_color.green() ) * percentScrolled );
            var newBlue = midding1_color.blue() + ( ( ending_color.blue() - midding1_color.blue() ) * percentScrolled );
            var newColor = new $.Color( newRed, newGreen, newBlue );
            console.log( newColor.red(), newColor.green(), newColor.blue() );
            $('body').animate({ backgroundColor: newColor }, 0);
            $('#navbar').animate({ backgroundColor: newColor }, 0);
        } else if(scroll_pos >= animation_mid_pos && scroll_pos <= animation_mid1_pos ) { 
           // console.log( 'scrolling and animating' );
            //we want to calculate the relevant transitional rgb value
            var percentScrolled = (scroll_pos -1000) / ( animation_mid1_pos - animation_mid_pos );
            var newRed = midding_color.red() + ( ( midding1_color.red() - midding_color.red() ) * percentScrolled );
            var newGreen = midding_color.green() + ( ( midding1_color.green() - midding_color.green() ) * percentScrolled );
            var newBlue = midding_color.blue() + ( ( midding1_color.blue() - midding_color.blue() ) * percentScrolled );
            var newColor = new $.Color( newRed, newGreen, newBlue );
            console.log( newColor.red(), newColor.green(), newColor.blue() );
            $('body').animate({ backgroundColor: newColor }, 0); 
            $('#navbar').animate({ backgroundColor: newColor }, 0);
		} else if ( scroll_pos > animation_end_pos ) {
             $('body').animate({ backgroundColor: ending_color }, 0);
        } else if ( scroll_pos <= animation_begin_pos ) {
             $('body').animate({ backgroundColor: beginning_color }, 0);
        } else { }
    });
});	
	
window.setTimeout(myFunction,4000);

		function myFunction(){
			$('.about').attr("class","about1");
		};
       


$('.hover-block').hover(
  function() {
    explodeLetter($(this).parents('section').attr('id'), $(this).data('letter'), $(this).data('color'));
  }, function() {
    implodeLetter($(this).parents('section').attr('id'), $(this).data('letter'), $(this).data('color'));
  }
);
introStuff();
var xyz = 400;
var wxyz = 200;
var qwe = 200;
var wer = 0;



function explodeLetter(parentID, letter, fillColor) {
    $('#'+parentID+' .word-technex .letter.'+letter).find('rect').each(function() {
        $(this).css({
            'fill': fillColor,
            '-webkit-transform': 'translate3d('+randomIntFromInterval(-xyz, xyz)+'px, '+randomIntFromInterval(-wxyz, wxyz)+'px, 0)',
            '-moz-transform': 'translate3d('+randomIntFromInterval(-xyz, xyz)+'px, '+randomIntFromInterval(-wxyz, wxyz)+'px, 0)',
            '-ms-transform': 'translate3d('+randomIntFromInterval(-xyz, xyz)+'px, '+randomIntFromInterval(-wxyz, wxyz)+'px, 0)',
            '-o-transform': 'translate3d('+randomIntFromInterval(-xyz, xyz)+'px, '+randomIntFromInterval(-wxyz, wxyz)+'px, 0)',
            'transform': 'translate3d('+randomIntFromInterval(-xyz, xyz)+'px, '+randomIntFromInterval(-wxyz, wxyz)+'px, 0)'
        });
    });
}
function implodeLetter(parentID, letter) {
    if(letter!="x"){
    $('#'+parentID+' .word-technex .letter.'+letter).find('rect').css({
        'fill': '#fff',
        '-webkit-transform': 'translate3d(0, 0, 0)',
        '-moz-transform': 'translate3d(0, 0, 0)',
        '-ms-transform': 'translate3d(0, 0, 0)',
        '-o-transform': 'translate3d(0, 0, 0)',
        'transform': 'translate3d(0, 0, 0)'
    });
}else{
    $('#'+parentID+' .word-technex .letter.'+letter).find('rect').css({
        'fill': '#AF0707',
        '-webkit-transform': 'translate3d(0, 0, 0)',
        '-moz-transform': 'translate3d(0, 0, 0)',
        '-ms-transform': 'translate3d(0, 0, 0)',
        '-o-transform': 'translate3d(0, 0, 0)',
        'transform': 'translate3d(0, 0, 0)'
    });
}
}
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
function introStuff() {
	//alert("intro");
    $('body').addClass('show-background');
    setTimeout(function() {
        $('body').addClass('show-stars');
        
        $('.hover-block.t').trigger("mouseover");
        setTimeout(function() {
            $('.hover-block.t').trigger("mouseout");
        }, 1*qwe+wer);


        $('.hover-block.e1').trigger("mouseover");
        setTimeout(function() {
            $('.hover-block.e1').trigger("mouseout");
        }, 2*qwe+wer);

        $('.hover-block.c').trigger("mouseover");
        setTimeout(function() {
            $('.hover-block.c').trigger("mouseout");
        }, 3*qwe+wer);


        $('.hover-block.h').trigger("mouseover");
        setTimeout(function() {
            $('.hover-block.h').trigger("mouseout");
        }, 4*qwe+wer);

        $('.hover-block.n').trigger("mouseover");
        setTimeout(function() {
            $('.hover-block.n').trigger("mouseout");
        }, 5*qwe+wer);

        $('.hover-block.e2').trigger("mouseover");
        setTimeout(function() {
            $('.hover-block.e2').trigger("mouseout");
        }, 6*qwe+wer);

        $('.hover-block.x').trigger("mouseover");
        setTimeout(function() {
            $('.hover-block.x').trigger("mouseout");
        }, 7*qwe+wer);

    }, 0);

}



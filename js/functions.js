$(window).scroll(function(){
    
    var wScroll = $(this).scrollTop();
    
    $('.title').css({
        'transform' : 'translate(0px, '+ wScroll /3.5 +'%)'
    });
    
    if(wScroll > $('.certs').offset().top - ($(window).height() / 1.3)) {
    
        $('.certs img').each(function(){
        
            $('.certs img').addClass('is-showing');
        });
    };
});


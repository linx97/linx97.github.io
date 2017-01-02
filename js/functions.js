$(document).ready(function(){

    // $(window).scroll(function(){
        
    //     var wScroll = $(this).scrollTop();
        
    //     if(wScroll > $('.certs').offset().top - ($(window).height() / 1.3)) {
        
    //         $('.certs img').each(function(){
            
    //             $('.certs img').addClass('is-showing');
    //         });
    //     }
    // });


    var nav, yPos, collapse, brand;
    function yScroll(){
        nav = document.getElementById('nav');
        collapse = document.getElementById('bs-example-navbar-collapse-1');
        brand = document.getElementById('brand');
        yPos = window.pageYOffset;
        if(yPos > 100) {
            nav.style.height = "85px";
            nav.style.padding = "0 20px";
            collapse.style.marginTop = "26px";
            brand.style.height = "75px";
        } else {
            nav.style.height = "150px";
            nav.style.padding = "0";
            collapse.style.marginTop = "60px";
            brand.style.height = "140px";
        }
    }
        
    window.addEventListener("scroll", yScroll);

    $(document).click(function (event) {
        var clickover = $(event.target);
        var $navbar = $(".navbar-collapse");               
        var _opened = $navbar.hasClass("in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {      
            $navbar.collapse('hide');
        }
    });

});


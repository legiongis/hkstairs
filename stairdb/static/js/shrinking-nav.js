// resizing based on window width// media query event handler


// resizing the header based on scroll bar position
$(function(){
    $('#header-nav').data('size','big');
});

$(window).scroll(function(){
    if($(document).scrollTop() > 0)
    {
        if($('#header-nav').data('size') == 'big')
        {
            $('#header-nav').data('size','small');
            $('#header-nav').stop().animate({
                height:'55px'
            },600);
            $('#header-logo').data('size','small');
            $('#header-logo').stop().animate({
                height:'25px'
            },600);
        }
    }
    else
    {
        if($('#header-nav').data('size') == 'small')
        {
            $('#header-nav').data('size','big');
            $('#header-nav').stop().animate({
                height:'100px'
            },600);
            $('#header-logo').data('size','big');
            $('#header-logo').stop().animate({
                height:'65px'
            },600);
        }
    }
});
let headerHeight = 80;
let nav = $('header');
$(window).scroll(function () {
    if ($(this).scrollTop() > headerHeight) {
        nav.addClass("header_fixed");
        $('body').addClass('body_fixed');
    } else {
        nav.removeClass("header_fixed");
        $('body').removeClass("body_fixed");
    }
});


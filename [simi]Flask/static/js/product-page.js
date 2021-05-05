document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// set owl-carousel width equals to owl-wrapper width
function owlWrapperWidth(selector) {
    $(selector).each(function() {
        $(this).find('.owl-carousel').outerWidth($(this).closest(selector).innerWidth());
    });
}

// trigger on start and resize
owlWrapperWidth('.owl-wrapper');
$(window).resize(function() {
    owlWrapperWidth($('.owl-wrapper'));
});

// then trigger owl Carousel
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    // slideTransition: 'linear',
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
});
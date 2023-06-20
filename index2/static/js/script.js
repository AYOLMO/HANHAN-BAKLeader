jQuery(function ($) {
    "use strict";

// Columned Portfolio Slider
    var swiper = new Swiper('.columned-slider-inner', {
        slidesPerView: 4,
        spaceBetween: 0,

        breakpoints: {
            1250: {
                slidesPerView: 4,
            },
            1050: {
                slidesPerView: 4,
            },
            750: {
                slidesPerView: 3,
            },
            550: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            }
        }
    });


//navigation
    $('#toggle-btn').on('mouseover',function () {

        $('#toggle-btn').on("click", function () {
            $('.broad').removeClass('reverse-nav');
            setTimeout(function () {
                $('.broad').addClass('broad-nav');
            }, 200);
            $("#toggle-btn").addClass("close_nav");
            $("#toggle-btn").attr("id", "close_nav");
            $("#close_nav").removeClass("toggle-btn");

        });

        $('#close_nav').on("click", function () {

            $('.broad').addClass('reverse-nav');

            // $('.broad').removeClass('broad-nav');
            $("#close_nav").removeClass("close_nav");
            $("#close_nav").attr("id", "toggle-btn");
            $("#toggle-btn").removeClass("close_nav");
            setTimeout(function () {
                $('.broad').removeClass('broad-nav');
                $('.broad').removeClass('reverse-nav');
            }, 200);
            // $('.broad').removeClass('reverse-nav');
        });

    });


    $("[data-fancybox]").fancybox({
        // Options will go here
    });

});
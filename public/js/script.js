/*
 * Initializing some of the plugins
 *
 */
 
//Show hide home icon
$(window).scroll(function () {
    if ($(this).scrollTop()) {
        $('#icon-home:hidden').stop(true, true).fadeIn();
    } else {
        $('#icon-home').stop(true, true).fadeOut();
    }
});

//	Toggle / Responsive Menu 
$(document).ready(function () {
    $('#nav-icon').click(function () {
        $('#navigation').slideToggle()
    })


});



//	Toggle / Portfolio Filter
$(document).ready(function () {
    $('#trigger-portfolio-filter').click(function () {
        if ($('#filter-container').css('display') === 'none') {
            $('.button-open').removeClass('button-open').addClass('button-close');
        } else {
            $('.button-close').removeClass('button-close').addClass('button-open');
        }
        //                    $(".filter").slideToggle(500);
        $('#filter-container').toggle('slide', function () {
            $('#trigger-portfolio-filter-label').toggle('slide')
        });

    });

});

//Toggle / Project Brief
jQuery(function(){
        jQuery('.trigger').click(function(){
              box = $('#div'+$(this).attr('target'));
              jQuery('.hidden-content').not(box).slideUp();
              box.slideToggle();
        });
});



// Google Maps
$(window).load(function () {
    initGoogleMap(); //init Gmap3
});

function initGoogleMap() {
    //var position = new google.maps.LatLng(40.77627, -73.910965); //change this to your coordinates
    var position = new google.maps.LatLng(51.5411361, 0.6863684999999577);
    $('#my-map').gmap3({
        map: {
            options: {
                center: position,
                zoom: 16, //adjust this depending upon how much you want to see
                styles: [{
                    stylers: [{
                            hue: '#1ab2f0'
                        }, //this is the accent color
                        {
                            saturation: -30
                        }
                    ]
                }]
            }
        },
        marker: {
            values: [{
                latLng: position,
                options: {
                    icon: 'images/ico/map-marker.svg'
                }
            }],
            options: {
                draggable: true,
            }
        }
    });

}


// Initialize prettyPhoto plugin

function initPrettyPhoto() {
    $(".portfolio a[data-gal^='prettyPhoto']").prettyPhoto({
        theme: 'light_square',
        autoplay_slideshow: false,
        overlay_gallery: false,
        show_title: false
    });
}

$(document).ready(function () {

    //Thumbnail mouse over
    $(".portfolio a").hover(function () {
        $(this).children("img").animate({
            opacity: 0.25
        }, "fast");
    }, function () {
        $(this).children("img").animate({
            opacity: 1.0
        }, "slow");
    });

    //set bg color for odd checklist items
    $('ul.check-list li:odd').css('background-color', '#1ab2f0');

    //Initialize pretty photo
    initPrettyPhoto();

    // Clone portfolio items 
    var $data = $(".portfolio").clone();

    // Attempt to call Quicksand on every click event handler
    $(".filter a").click(function (e) {

        $(".filter li").removeClass("current");

        // Get the class attribute value of the clicked link
        var $filterClass = $(this).parent().attr("class");

        if ($filterClass == "all") {
            var $filteredPortfolio = $data.find("li");
        } else {
            var $filteredPortfolio = $data.find("li[data-type~=" + $filterClass + "]");
        }

        // Call quicksand
        $(".portfolio").quicksand($filteredPortfolio, {
            duration: 800,
            easing: 'easeInOutQuad'
        }, function () {
            initPrettyPhoto();

        });


        $(this).parent().addClass("current");

        // Prevent the browser jump to the link anchor
        e.preventDefault();
    })
});
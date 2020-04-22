var axisJS = {
    PreloaderInit: function() {
        $("body").jpreLoader({
            autoClose: !0,
            loaderVPos: 0,
            onetimeLoad: !0
        }, function() {
            $(window).trigger("jqOnLoad")
        }), $(document).on("click", "a:not([href=#])", function() {
            var t = $(this),
                a = t.attr("href");
            return void 0 != t.attr("target") ? !0 : ($("body")
                .animate({
                    opacity: 0
                }, "fast", function() {
                    location.href = a
                }), !1)
        })
    },
    HeaderInit: function() {
        var t = $(window),
            a = $("#main-header"),
            e = a.find(".shadow-helper"),
            o = a.find("ul.menu"),
            n = a.find(".menu-toggle"),
            i = "open";
        Modernizr.csstransforms || (n.find(".icon").attr("class",
                "entypo menu"), n = n.find(".entypo:eq(0)"), i =
            "cancel-o"), n.on("click", function() {
            n.toggleClass(i), o.stop().slideToggle(300), e.toggleClass(
                "open")
        }), t.on("scroll", function() {
            t.scrollTop() <= 0 && !a.hasClass("ontop") && a.addClass(
                "ontop"), t.scrollTop() > 0 && a.hasClass(
                "ontop") && a.removeClass("ontop"), 1 == e.css(
                "opacity") && t.scrollTop() >= 100 || e.css(
                "opacity", t.scrollTop() / 100)
        })
    },
    BigSections: function() {
        var t = $(window).height();
        500 >= t && (t = 500);
        var a = $(".hero-section").css("display", "block");
        a.filter(":not([data-disable-resize])").css("height", t)
    },
    ParallaxInit: function() {
        var t = $("[data-parallax]");
        t.length <= 0 || Modernizr.touch || t.each(function() {
            var t = $(this),
                a = t.attr("data-parallax") || 3,
                e = t.attr("data-parallax-type") || "bg";
            t.parallax("50%", a, e)
        })
    },
    Ul2Select: function() {
        var t = $("ul.convert-to-select");
        t.each(function() {
            var t = $(this),
                a = "select_" + $.randomID();
            $(
                '<select class="mobile-filter visible-xs-block" id="' +
                a + '" />').insertAfter(t), t.find("> li").each(
                function() {
                    var t = $(this);
                    $("<option />", {
                        value: t.attr("href"),
                        text: t.text(),
                        "data-filter": t.attr(
                            "data-filter")
                    }).appendTo("#" + a)
                })
        })
    },
    IsotopeInit: function() {
        var t = $(".isotope[data-isotope-id]"),
            a = t.length;
        t.each(function() {
            var e = $(this),
                o = e.attr("data-isotope-id"),
                n = $('.desktop-filter[data-isotope-id="' + o +
                    '"]'),
                i = n.find("> li a");
            e.isotope({
                itemSelector: "li",
                layoutMode: "packery"
            }), i.on("click", function() {
                return $(this).parents("li").addClass(
                    "active").siblings().removeClass(
                    "active"), e.isotope({
                    filter: $(this).attr(
                        "data-filter")
                }), !1
            }), n.parent().find(".mobile-filter").on(
                "change", function() {
                    i.eq($(this)[0].selectedIndex).trigger(
                        "click")
                }), --a || t.each(function() {
                $(this).isotope()
            })
        })
    },
    SlidersInit: function() {
        var t = $(".slick.photo-slider, .slick.testimonials"),
            a = {
                adaptiveHeight: !0,
                autoplaySpeed: 5e3,
                arrows: !1,
                dots: !Modernizr.touch,
                slide: "article, div"
            };
        t.each(function() {
            var t = $(this),
                e = a;
            t.hasClass("vertical") && (e.vertical = !0), t.hasClass(
                    "with-arrows") && (e.arrows = !0), void 0 !==
                t.attr("slick-autoplay") && (e.autoplay = !0),
                t.slick(e)
        })
    },
    SmoothScrollInit: function() {
        $('a[data-toggle="smoothscroll"]').click(function() {
            if (location.pathname.replace(/^\//, "") != this.pathname
                .replace(/^\//, "") && location.hostname !=
                this.hostname) return !0;
            var t = $(this.hash);
            return t = t.length ? t : $("[name=" + this.hash.slice(
                1) + "]"), t.length ? ($("html,body").animate({
                scrollTop: t.offset().top
            }, 1e3), !1) : void 0
        })
    },
    GoogleMapsInit: function() {
        if (google && google.maps) {
            var t = {
                streetViewControl: !1,
                scrollwheel: !1,
                panControl: !0,
                mapTypeControl: !1,
                overviewMapControl: !1,
                zoomControl: !0,
                center: new google.maps.LatLng(40.805478, -73.96522499999998),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                draggable: !0
            };
            $(".place-map").each(function() {
                var a = $(this),
                    e = parseFloat(a.data("lat")),
                    o = parseFloat(a.data("long")),
                    n = a.html();
                a.html("");
                var i = "map_" + $.randomID();
                a.append('<div id="' + i +
                    '" class="embed-responsive-item"/>');
                var s = $.extend(t, {
                        zoom: a.data("zoom") || 14,
                        center: new google.maps.LatLng(e, o)
                    }),
                    r = new google.maps.Map(document.getElementById(
                        i), s),
                    l = new google.maps.Marker({
                        map: r,
                        position: new google.maps.LatLng(e,
                            o)
                    }),
                    c = new google.maps.InfoWindow({
                        content: n
                    });
                google.maps.event.addListener(l, "click",
                    function() {
                        c.open(r, l)
                    }), google.maps.event.addListenerOnce(r,
                    "idle", function() {
                        a.addClass("initialized")
                    }), c.open(r, l)
            })
        }
    },
    FormsInit: function() {
        var t = function(t) {
            return function(a) {
                a.preventDefault();
                var e = $(a.target);
                $.ajax(e.attr("action"), {
                    type: "post",
                    data: e.serialize(),
                    dataType: t ? "jsonp" : "html",
                    jsonp: "c",
                    complete: function(a) {
                        var o =
                            ".alert.alert-success",
                            n =
                            ".alert.alert-danger",
                            i = 200 != a.status;
                        if (t) {
                            var s = a.responseJSON;
                            i = s && "success" !==
                                s.result, i && (a.responseText =
                                    s.msg)
                        }
                        i ? ($(o, e).fadeOut("fast"),
                            $(n, e).find("span")
                            .html(a.responseText),
                            $(n, e).fadeIn(
                                "fast")) : ($(n,
                                e).fadeOut(
                                "fast"), $(o, e)
                            .fadeIn("fast"), e[
                                0].reset())
                    }
                })
            }
        };
        $("#contact_form").isHappy({
            classes: {
                field: "has-error"
            },
            fields: {
                "#fullname_field": {
                    required: !0,
                    test: formHappy.betweenLength,
                    arg: {
                        min: 3,
                        max: 150
                    }
                },
                "#subject_field": {
                    required: !0,
                    test: formHappy.betweenLength,
                    arg: {
                        min: 3,
                        max: 250
                    }
                },
                "#email_field": {
                    required: !0,
                    test: formHappy.email
                },
                "#message_field": {
                    required: !0,
                    test: formHappy.betweenLength,
                    arg: {
                        min: 15,
                        max: 3e3
                    }
                }
            },
            happy: t()
        });
        var a = $("#subscribe_form");
        a.length && (a.attr("action", a.attr("action").replace("/post",
            "/post-json")), a.isHappy({
            classes: {
                field: "has-error"
            },
            fields: {
                "#email_field": {
                    required: !0,
                    test: formHappy.email
                }
            },
            happy: t(!0)
        }))
    },
    TabsInit: function() {
        var t = $("[data-slick-tabs]");
        t && $.fn.slick && (t.each(function() {
            $(this).slick({
                arrows: !1,
                adaptiveHeight: !0,
                draggable: !1,
                touchMove: !1,
                swipe: !1
            })
        }), $('[data-toggle="slick-tab"]').on("click", function() {
            var t = $(this),
                a = $(t.attr("href"));
            if (!a) return !0;
            var e = a.attr("index");
            return a.parents(".slick-slider").slickGoTo(e),
                t.parents("li").addClass("active").siblings()
                .removeClass("active"), !1
        }))
    },
    CountUpInit: function() {
        "undefined" != typeof countUp && ($("[data-countup] .number").each(
            function() {
                var t = $(this),
                    a = "counter-" + $.randomID();
                t.text(0).attr("id", a).appear();
                var e = new countUp(a, 0, t.attr("data-value"),
                    0, 2.5);
                t.on("appear.onscroll", function() {
                    e.start(), $(this).unbind(
                        "appear.onscroll")
                })
            }), $.force_appear())
    },
    YTPlayerInit: function() {
        if ("function" == typeof $.fn.YTPlayer) {
            var t = $("[data-video-bg]");
            t.each(function() {
                var t = $(this),
                    a = "ytvideo_" + $.randomID();
                t.attr("id", a), t.YTPlayer({
                    videoURL: t.attr("data-video-bg"),
                    containment: "#" + a,
                    showControls: !1,
                    autoPlay: !0,
                    loop: !0,
                    mute: !0,
                    startAt: 0,
                    opacity: 1,
                    addRaster: !1,
                    quality: "default",
                    onReady: function() {
                        t.addClass("ready")
                    }
                })
            })
        }
    },
    TypedJSInit: function() {
        "function" == typeof $.fn.typed && $("[data-typed-str]").each(
            function() {
                var t = $(this),
                    a = t.attr("data-typed-str").split("|");
                t.html("").append(
                        '<span class="typed-container"></span>'), t
                    .find(".typed-container").typed({
                        strings: a,
                        typeSpeed: 45,
                        loop: !0,
                        backDelay: 1e3,
                        showCursor: !1
                    })
            })
    }
};
! function(t) {
    "use strict";
    top.location != location && (top.location.href = document.location.href),
        FastClick.attach(document.body), t.randomID = function() {
            return Math.random().toString(36).substr(2)
        }, t(document).ready(function() {
            axisJS.TabsInit(), axisJS.PreloaderInit(), axisJS.HeaderInit(),
                axisJS.Ul2Select(), axisJS.SlidersInit(), axisJS.SmoothScrollInit(),
                axisJS.FormsInit(), axisJS.CountUpInit(), axisJS.YTPlayerInit(),
                axisJS.TypedJSInit()
        }), t(window).on("resize jqOnLoad", function() {
            axisJS.BigSections()
        }), t(window).on("jqOnLoad", function() {
            axisJS.ParallaxInit()
        }), t(window).on("load", function() {
            axisJS.GoogleMapsInit(), axisJS.IsotopeInit()
        })
}(jQuery);
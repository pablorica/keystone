!function(n){var t=n(window),e=t.height();t.resize(function(){e=t.height()}),n.fn.parallax=function(o,u,r,i){function l(){var i=t.scrollTop();a.each(function(){var t=n(this),l=t.offset().top,c=h(t);i>l+c||l>i+e||("bg"==r?a.css("backgroundPosition",o+" "+Math.round((s-i)*u)+"px"):a.css("top",Math.round((s-i)*u)+"px"))})}var h,s,a=n(this);(arguments.length<1||null===o)&&(o="50%"),(arguments.length<2||null===u)&&(u=.1),(arguments.length<3||null===r)&&(r="bg"),(arguments.length<4||null===i)&&(i=!0),a.each(function(){s=a.offset().top}),h=i?function(n){return n.outerHeight(!0)}:function(n){return n.height()},t.bind("scroll",l).resize(l),l()}}(jQuery);
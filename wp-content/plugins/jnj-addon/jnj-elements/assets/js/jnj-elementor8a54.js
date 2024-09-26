/*
*
*     --------- --------  ***  --------   ---------
*             JNJ main js
*     --------- --------  ***  --------   ---------
*
*     Template: jnj
*     Author: jnj
*     Version: 1.0.0
*
*
*
*/

(function ($) {
    "use stict";   

    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Mouse cursor
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

    const cursor = document.querySelector('#cursor');
    const cursorCircle = cursor.querySelector('.cursor__circle');
    const mouse = { x: -100, y: -100 };
    const pos = { x: 0, y: 0 }; 
    const speed = 0.1;
    const updateCoordinates = e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
    window.addEventListener('mousemove', updateCoordinates);

    function getAngle(diffX, diffY) {
        return Math.atan2(diffY, diffX) * 180 / Math.PI;
    }

    function getSqueeze(diffX, diffY) {
        const distance = Math.sqrt(
            Math.pow(diffX, 2) + Math.pow(diffY, 2)
        );
        const maxSqueeze = 0.15;
        const accelerator = 1500;
        return Math.min(distance / accelerator, maxSqueeze);
    }

    const updateCursor = () => {
        const diffX = Math.round(mouse.x - pos.x);
        const diffY = Math.round(mouse.y - pos.y);
        
        pos.x += diffX * speed;
        pos.y += diffY * speed;
        
        const angle = getAngle(diffX, diffY);
        const squeeze = getSqueeze(diffX, diffY);
        
        const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
        const rotate = 'rotate(' + angle +'deg)';
        const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

        cursor.style.transform = translate;
        cursorCircle.style.transform = rotate + scale;
    };

    function loop() {
        updateCursor();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
    const cursorModifiers = document.querySelectorAll('[cursor-class]');
    cursorModifiers.forEach(curosrModifier => {
        curosrModifier.addEventListener('mouseenter', function() {
            const className = this.getAttribute('cursor-class');
            cursor.classList.add(className);
        });
        curosrModifier.addEventListener('mouseleave', function() {
            const className = this.getAttribute('cursor-class');
            cursor.classList.remove(className);
        });
    });

    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    JNJ Skill
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    jQuery(document).ready(function(){
        jQuery('.jnj-skill-percent').appear(function() {
            setTimeout(function(){
                var elements = document.querySelectorAll('.jnj-skill-percent');
                for(var i = 0; i<elements.length; i++){
                    document.getElementById(elements[i].id).innerHTML = document.getElementById(elements[i].id).getAttribute('data-number');
                }
            }, 1000);
        });
    });

    jQuery(document).ready(function( $ ) {

        /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        JNJ Menu Item
        +++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
        if (!jQuery("body").hasClass("home")) {
            var href_attr = jQuery('a.jnj-logo').attr('href');
            jQuery('.navbar ul li a, .widget ul.menu li a').each(function () {
                var jnj_a_attr = jQuery(this).attr('href');
                if (!jnj_a_attr) {
                    return;
                }
                if (jnj_a_attr.indexOf("#") != -1) {
                    var jnj_mini_url = href_attr + jnj_a_attr; 
                    jQuery(this).attr("href", jnj_mini_url)
                }
            });
        }

        if (jQuery("body").hasClass("home")) {
            jQuery(window).on("scroll", WindowScroll);
            jQuery('header #jnj-menu a[href^="#"]').on('click', function (e) {
                jQuery('.jnj-sticky').addClass('jnj-header-fix');
                jQuery(window).off("scroll");
                jQuery('header #jnj-menu a').each(function () {
                    jQuery(this).parent().removeClass('current_page_item');
                })
                jQuery(this).parent().addClass('current_page_item');
                var link_target = this.hash;
                var url_nav = jQuery(link_target);
                if (url_nav.length) {
                    var top_item = url_nav.offset().top;
                    jQuery('html, body').stop().animate({
                        'scrollTop': top_item
                    }, 500, 'swing', function () {
                        window.location.hash = link_target;
                        jQuery(window).on("scroll", WindowScroll);
                    });
                }
            });
        }

        /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        JNJ Magnific Popup
        +++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
        jQuery('.jnj-popup-video-item').each(function() { 
            jQuery('.jnj-popup-video-item').magnificPopup({
                type: 'iframe'
            });
        });

        /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        JNJ Line Progressbar
        +++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
        jQuery('.progress-bar').each(function() {
            var tlthis = jQuery(this);
            tlthis.appear(function() {
                jQuery(this).find('.progress-content').animate( {
                    width:jQuery(this).attr('data-percentage')
                },2000 );
                jQuery(this).find('.progress-number-mark').animate( {
                    left:jQuery(this).attr('data-percentage')},{
                        duration: 2000,
                        step: function(now, fx) {
                            var data = Math.round(now);
                            jQuery(this).find('.percent').html(data + '%');
                        }
                    }
                );
            });    
        });

        window.dispatchEvent(new Event('resize'));

    });

    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    JNJ Counter
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    jQuery('.jnj-counter-numbers').each(function () {
        var tlthis = jQuery(this);
        tlthis.appear(function() {
            jQuery(this).prop('Counter',0).animate({
                Counter: jQuery(this).text()
            }, {
                duration: 3000,
                easing: 'swing',
                step: function (now) {
                    jQuery(this).text(Math.ceil(now));
                }
            });
        });
    });

    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    JNJ Circle Progressbar
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    jQuery(".chart").each(function() {
        var tlthis = jQuery(this);
        setTimeout(function() {
            tlthis.appear(function() {
                tlthis.easyPieChart({
                    easing: 'easeOutElastic',
                    delay: 3000,
                    barColor: '#e83e8c',
                    trackColor: '#e2e8ea',
                    scaleColor: false,
                    lineWidth: 10,
                    trackWidth: 10,
                    size: 250,
                    lineCap: 'square',
                    onStep: function(from, to, percent) {
                        this.el.children[0].innerHTML = Math.round(percent);
                    }
                });
            });     
        }, 600);
    });

    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    JNJ swiper
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    JNJswiper();
   
    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Hover image
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    jQuery(".jnj-move-cursor").each(function() {
        let curs = document.querySelector(".jnj-move-cursor");
        document.addEventListener("mousemove", (e) => {
            let x = e.clientX;
            let y = e.clientY;
            curs.style.left = x - 25 + "px";
            curs.style.top = y - 25 + "px";
        });

        let images = document.querySelectorAll(".jnj-service-area-images .jnj-service-area");

        var ima_inner = document.querySelectorAll('.jnj-inner-image');
        for(var i = 0; i<ima_inner.length; i++){

            images.forEach((image, i) => {
                image.addEventListener("mouseover", (e) => {
                    curs.classList.add("jnj-cursor-show");
                    curs.style.backgroundImage = "url('"+ima_inner[i].getAttribute('data-image')+"')";
                });
                image.addEventListener("mouseleave", (e) => {
                    curs.classList.remove("jnj-cursor-show");
                    curs.style.backgroundImage = "none";
                });
            });

        }
    });


})(jQuery);

function JNJswiper(){

    jQuery('.jnj-swiper').each(function() {

        var jnj_swiper = jQuery(this);
        ( jnj_swiper.data("dots") == true ) ? jnj_return = { el: ".swiper-pagination", dynamicBullets: true, } : jnj_return = 'false' ;

        var swiper = new Swiper(".jnj-swiper", {
            slidesPerView: jnj_swiper.data("items"),
            spaceBetween: 30,
            loop: jnj_swiper.data("loop"),
            autoplay : jnj_swiper.data("autoplay"),
            pagination: jnj_return,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: jnj_swiper.data("mobile"),
                    spaceBetweenSlides: 30
                },
                767: {
                    slidesPerView: jnj_swiper.data("tablet"),
                    spaceBetweenSlides: 40
                },
                1024: {
                    slidesPerView: jnj_swiper.data("items"),
                    spaceBetweenSlides: 40
                }
            }
        });       
  
    });

}

function WindowScroll(event) {
    var jnj_target_area = jQuery(window).scrollTop() + 83;
    var scroll = jQuery(window).scrollTop();
    jQuery('header #jnj-menu a[href^="#"]').each(function () {
        if (jQuery(this).attr("href").indexOf('https://') == -1) {
            var jnj_href_ele = jQuery(jQuery(this).attr("href"));
        } else {
            var jnj_href_ele = jQuery(this);
        }
        if (jQuery(this).attr("href").indexOf('https://') == -1) {
            if (!jnj_href_ele.length) return;
            if (jnj_href_ele.position().top <= jnj_target_area) {
                jQuery(document).find('.menu-item').removeClass("current_page_item current-menu-parent");
                jQuery(this).parent().addClass("current_page_item");
            } else {
                jQuery(this).parent().removeClass("current_page_item");
            }
            if (scroll <= 0) {
                jQuery(".menu-item-type-custom").first().addClass("current_page_item");
            }
    
        }
    });
}

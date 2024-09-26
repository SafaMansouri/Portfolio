/*
Theme Name: hevin - Personal Portfolio/CV WordPress Theme
Author: jandjteams
Description: Hevin is Personal Portfolio/CV  WordPress Theme for developer, designer, programmer, freelancer, writer, lawyer, musician, trainer, photographer or any other professions.
*/
(function($) {

	"use strict";
	
	jQuery(window).on('load', function(e) {
        
		jQuery('.jnj-loader').fadeOut("slow", function()  {
			jQuery(this).remove();
		});
        
	});

	jQuery(document).ready(function( $ ) {

		jQuery('.jnj-padding-0').parent().addClass('jnj-padding');

		/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	    JNJ Scroll up
	    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	    var btn = jQuery('#jnj-scroll-up');
	    jQuery(window).scroll(function() {
	        if (jQuery(window).scrollTop() > 10) {
	            btn.addClass('show');
	        } else {
	            btn.removeClass('show');
	        }
	    });
	    btn.on('click', function(e) {
	        e.preventDefault();
	        jQuery('html, body').animate({scrollTop:0}, '10');
	    });

		jQuery( '#jnj-menu' ).slicknav({
			'openedSymbol': '-', 
			'closedSymbol': '+', 
			appendTo : '#jnj-mobile-view',
			'label' : ' ',
		});

	});  

    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	JNJ Header Sticky/Fix
	+++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	jQuery(window).scroll(function(){	
	    if (jQuery(window).scrollTop() > 100) {		    	
	        jQuery('.jnj-sticky').addClass('jnj-header-fix');
	    } else {		    	
	        jQuery('.jnj-sticky').removeClass('jnj-header-fix');
		}	
	});

	if ( document.getElementsByClassName('jnj-theme-preferences').length > 0) {
		const jnj_toggle_slide = document.querySelector('.jnj-theme-preferences input[type="checkbox"]');
		const jnj_current_mode = localStorage.getItem('preferences');

		if (jnj_current_mode) {
			document.documentElement.setAttribute('data-preferences', jnj_current_mode);
		
			if (jnj_current_mode === 'dark') {
				jnj_toggle_slide.checked = true;
			}
		}

		function switchTheme(e) {
			if (e.target.checked) {
				document.documentElement.setAttribute('data-preferences', 'dark');
				localStorage.setItem('preferences', 'dark');
			}
			else {        
				document.documentElement.setAttribute('data-preferences', 'light');
				localStorage.setItem('preferences', 'light');
			}    
		}

		jnj_toggle_slide.addEventListener('change', switchTheme, false);
	}

	if ( document.getElementsByClassName('jnj-theme-preferences-true').length > 0) {
		document.documentElement.setAttribute('data-preferences', 'dark');
	}
	if ( document.getElementsByClassName('jnj-theme-preferences-false').length > 0) {
		document.documentElement.setAttribute('data-preferences', 'light');
	}


})(jQuery);
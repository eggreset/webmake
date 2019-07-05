/* -----------------------------------------------------------------------------

 common.js

----------------------------------------------------------------------------- */


/* userAgent
---------------------------------------------------*/
$(function () {
	var ua = navigator.userAgent;
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
		// sp
		$('body').addClass("spView");
	} else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
		// tb
		$('body').addClass("tabView");
	} else {
		// pc
		$('body').addClass("pcView");
	}
	
	var version = window.navigator.appVersion.toLowerCase();
	if (version.indexOf("msie 9.") != -1) {
			$('body').addClass("ie9");
	}
	
})


/* SVG
---------------------------------------------------*/
$(window).on('load ', function(){
	$.ajax({
		type: 'get',
		url: '/img/common/sprite.svg'
	}).done(function(data) {
		var svg = $(data).find('svg');
		$('body').prepend(svg);
	});
});


/* header
---------------------------------------------------*/
$(function() {
	
	headerAdjust('#header');
	$(window).on('scroll', function() {
		headerAdjust('#header');
	});
	var adjustPoint = 0;
	var adjustClass = 'fixed';
	function headerAdjust(tgt) {
		var scrollTop = $(window).scrollTop();
		if(scrollTop > adjustPoint) {
			$(tgt).addClass(adjustClass);
		} else {
			$(tgt).removeClass(adjustClass);
		}
	}
	
	$("#header .btnMenu").on("click", function() {
		if($("#header").hasClass('fixed')){
			$("#header").addClass("fixedOpen");
		}
		if($(this).children("div").hasClass('active')){
			$('body').removeClass('fixed').css({'top': 0});
			window.scrollTo( 0 , scrollpos );
			$("#header").removeClass("fixedOpen");
			$("#header,#globalNav").removeClass("open");
			$(this).children("div").removeClass("active");
			$("#bgGlobalNav").stop().fadeOut(400);
		} else {
			scrollpos = $(window).scrollTop();
			$('body').addClass('fixed').css({'top': -scrollpos});
			$("#header,#globalNav").addClass("open");
			$(this).children("div").addClass("active");
			$("#bgGlobalNav").stop().fadeIn(400);
		}
	});
	
	$("#bgGlobalNav").on("click", function() {
		$('body').removeClass('fixed').css({'top': 0});
			window.scrollTo( 0 , scrollpos );
		$("#header").removeClass("fixedOpen");
		$("#header,#globalNav").removeClass("open");
		$("#header .btnMenu").children("div").removeClass("active");
		$("#bgGlobalNav").stop().fadeOut();
	});
	
});


/* pageTop
---------------------------------------------------*/
$(function() {
	var showFlag = false;
	var topBtn = $('#footer .pageTop');
	topBtn.css('bottom', '-70px');
	var showFlag = false;
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			if (showFlag == false) {
				showFlag = true;
				topBtn.stop().animate({'bottom' : '0'}, 500);
			}
		} else {
			if (showFlag) {
					showFlag = false;
					topBtn.stop().animate({'bottom' : '-70px'}, 500); 
			}
		}
	});
	topBtn.click(function () {
		$('body,html').animate({
				scrollTop: 0
		}, 500);
		return false;
	});
});


/* scroll
---------------------------------------------------*/
$(function(){
	var headerHight = $('#header').innerHeight();
	$('a.anc[href^="#"]').click(function() {
			var speed = 400;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top - headerHight;
			$('body,html').animate({scrollTop:position}, speed, 'swing');
			return false;
	});
});


/* loading
---------------------------------------------------*/
$(function(){
	setTimeout(function(){
		$('body').addClass("loaded");
		setTimeout(function(){
			$('.splash').hide();
		},3000);
	},1000);
});
window.addEventListener('pageshow', function(evt) {
	$('body').addClass("loaded");
	setTimeout(function(){
		$('.splash').hide();
	},3000);
});



/* matchHeight
----------------------------------------------*/
$(window).on('load resize', function(){
	setTimeout(function(){
		$('.footerSitemap li').matchHeight();
	},500);
});


/* animation
---------------------------------------------------*/
$(function(){
	
	$(window).on('load scroll', function(){
		
		$(".animate").each(function(){
			var targetPos = $(this).offset().top;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll > targetPos - windowHeight +100){
				$(this).addClass("animated");
				
			}
		});
		
	});
	
	setTimeout(function(){
		$("#intro").find(".animate").addClass("animated");
	},500);
	
});


/* tab
---------------------------------------------------*/
$(function() {
	
	var hash = location.hash; 
	hash = (hash.match(/^#tab0\d+$/) || [])[0];
	if($(hash).length){
		var tabname = hash.slice(1);
	} else{
		var tabname = "tab01";
	}
	$('.tabContent').hide();
	$('.tabBtn li').removeClass('active');
	var tabno = $('.tabBtn li#' + tabname).index();
	$('.tabContent').eq(tabno).fadeIn(200);
	$('.tabBtn li').eq(tabno).addClass('active')
	
	
	$('.tabBtn li').click(function() {
		var index = $('.tabBtn li').index(this);
		$('.tabContent').hide().removeClass("active");
		$('.tabContent').find(".animated").removeClass("animated");
		$('.tabContent').eq(index).fadeIn(200).addClass("active");
		$('.tabBtn li').removeClass('active');
		$(this).addClass('active');
	});
	
});


/* accordion
---------------------------------------------------*/
$(function() {
	$(".acHead").on("click", function() {
		$(this).toggleClass("active").next().stop().slideToggle();
		return false;
	});
});




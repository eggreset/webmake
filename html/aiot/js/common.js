$(function() {
	//menu selected
	var urlArray = ["growup","course","job","guideline","campus_life","open_campus","about","member"];
	var $dir = location.href.split("/");  
    var $dir2 = $dir[$dir.length -2];  
	
	var navX = $.inArray($dir2, urlArray);
	if(navX != -1 ) {
		$('header nav > ul > li').eq(navX).addClass("selected");
		$('header .header_container--fixed nav > ul > li').eq(navX).addClass("selected");
	}
	
	$(window).bind("load", function(){
		if(document.URL.match("/course/")) {
		  $('header nav > ul > li').eq(1).addClass("selected");
		  $('header .header_container--fixed nav > ul > li').eq(1).addClass("selected");
		}
		if(document.URL.match("/job/")) {
		   $('header nav > ul > li').eq(2).addClass("selected");
			$('header .header_container--fixed nav > ul > li').eq(2).addClass("selected");
		}
		if(document.URL.match("/guideline/")) {
		   $('header nav > ul > li').eq(3).addClass("selected");
			$('header .header_container--fixed nav > ul > li').eq(3).addClass("selected");
		}
		if(document.URL.match("/campus_life/")) {
		   $('header nav > ul > li').eq(4).addClass("selected");
			$('header .header_container--fixed nav > ul > li').eq(4).addClass("selected");
		}
		if(document.URL.match("/open_campus/")) {
		   $('header nav > ul > li').eq(5).addClass("selected");
			$('header .header_container--fixed nav > ul > li').eq(5).addClass("selected");
		}
		if(document.URL.match("/about/")) {
		   $('header nav > ul > li').eq(6).addClass("selected");
			$('header .header_container--fixed nav > ul > li').eq(6).addClass("selected");
		}
			if(document.URL.match("/member/")) {
		   $('header nav > ul > li').eq(7).addClass("selected");
			$('header .header_container--fixed nav > ul > li').eq(6).addClass("selected");
		}
	});
	
	var menuFlg = true;
	setTimeout(function() {
		menuFlg = false;
	},1500);
	
	//menu hover
	$('header nav > ul > li').on({
		'mouseenter':function(){
			if($(window).width() <= 1023) return false;
			var index = $('header nav > ul > li').index(this);
			if(index === 0 | menuFlg) return false;
			$('.nav_sub',this).css({'z-index' : 2 }).stop().slideDown(300);
			$('.nav_back').show();
		},
		'mouseleave':function(){
			if($(window).width() <= 1023) return false;
			$('.nav_sub',this).css({'z-index' : 1 }).stop().slideUp(250);
			$('.nav_back').hide();
		}
	});
	
	
	
	//header sp 
	$(".header_menu").on({'click':function(){
			$('body').toggleClass('header--open');
		}
	});
	
	//header footer sp 
	$('header nav > ul > li > span').on({'click':function(){
		var index = $('header nav > ul > li > span').index(this) + 1;
		$('header nav > ul > li:eq('+ index +')').toggleClass('active');
		$('header nav > ul > li:eq('+ index +') .nav_sub').slideToggle(200);
		return false;
		}
	});	
	
	$('footer .footer_container .footer_container--nav > ul > li .footer_nav--sp').on({'click':function(){
		var index = $('footer .footer_container .footer_container--nav > ul > li .footer_nav--sp').index(this) + 1;
		$('footer .footer_container .footer_container--nav > ul > li:eq('+ index +')').toggleClass('active');
		$('footer .footer_container .footer_container--nav > ul > li:eq('+ index +') dd').slideToggle(200);
		return false;
		}
	});	
	// SP HOVER解除
	var $w = $(window), $target = $('a');
	  $target.on('touchstart', function(){
		var $this = $(this), isScrolling = false;
		$w.on('scroll', function(){
		  isScrolling = true;
		});
		$this.on('touchend', function(){
		  if(!isScrolling){
			var url = $this.find('a').attr('href');
			if(url){
			  window.location.href = url;
			}
		  }
		  isScrolling = false;
		  $this.off('touchend');
		});
	  });
	
	
	//scroll
	var start_pos = 0;
	var scrollFlg = false;
	var scrollTimer
	$(window).scroll(function () {
		var scrollY = $(this).scrollTop();
		var footerY = $('footer').offset().top - $(window).height();
		if(scrollY >= footerY) {
			$('body').addClass('footered');
		} else {
			$('body').removeClass('footered');
		}
		if(scrollY >= 300) {
			$('.pagetop').addClass('active');
		} else {
			$('.pagetop').removeClass('active');
		}
		//header scroll
		var headerH = $('header').height() + 200;
		if($(window).width() > 1024) {
			if(scrollY > headerH ) {
				$('header').addClass('menu--fixed');			
			}else{
				$('header').removeClass('menu--fixed');
				$('header').removeClass('active');
				scrollFlg = false;
			}
		} else {
			if (scrollY > start_pos && $(window).width() < 1024 ) {
				$('header').addClass('menu--fixed');		
			} else {
				$('header').removeClass('menu--fixed');
			}
			if(scrollY <= 3) {
				$('header').removeClass('menu--fixed');
			}
			start_pos = scrollY;
		}
		
		
	 });
	//page top
	$(".pagetop").on({'click':function(){
			$('html,body').stop().animate({ scrollTop: 0 },1500,'easeInOutQuart');
			return false;
		}
	});
	//lazyload
	//$(".lazyload").lazyload({
	//	effect : "fadeIn",
	//	threshold : 200,
	//	placeholder: '/assets/img/common/dummy.gif',
	// });
	//matchHeight
	$('footer .footer_container .footer_container--nav > ul > li').matchHeight();
	
	//hash more btn
	$(".hash_contents .hash .btn").on({'click':function(){
		$('.hash_contents').toggleClass('active');
		var bH = 0;
		if($(window).width() <= 768) bH = 30;
		if($('.hash_contents').hasClass('active')) {
			var hashH = $('.hash_contents ul').height() + bH;
			TweenMax.to('.hash_contents', .2, { height : hashH, ease: Power2.easeInOut });
		} else {
			TweenMax.to('.hash_contents', .2, { height : 38, ease: Power2.easeInOut });
		}
			
		}
	});
	
	var weekArray = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

	function getFunc(myData){
		var leng = myData.openList.length;
		var obj = myData.openList;
		var nowTime = new Date().getTime();
		var calUrl;
		for(var i = 0; i < leng; i++) {
			var date = obj[i].date;
			var url = obj[i].url;
			var campusDate = new Date(date.split('.').join('/')).getTime();
			var week = new Date(date.split('.').join('/')).getDay();
			
			if(campusDate >= nowTime) {
				var s1 = date.substring(5, 7).substring(0, 1);
				var s2 = date.substring(5, 7).substring(1, 2);
				var s3 = date.substring(8, 10).substring(0, 1);
				var s4 = date.substring(8, 10).substring(1, 2);
				$('header .header_calendar ul li').eq(0).html(s1);
				$('header .header_calendar ul li').eq(1).html(s2);
				$('header .header_calendar ul li').eq(3).html(s3);
				$('header .header_calendar ul li').eq(4).html(s4);
				$('header .header_calendar ul li').eq(5).html(weekArray[week]);
				calUrl = url;
				break;
			}
		}
		$('.header_calendar').show();
		TweenMax.set('.header_calendar', { transformPerspective:900 });
		TweenMax.set('.header_calendar ul li', { transformPerspective:100 });
		TweenMax.fromTo('.header_calendar', 1, { rotationX : 90 }, {  delay : .3, rotationX : 0, ease: Back.easeOut.config(1.7),onComplete: function(){
			TweenMax.staggerFromTo('.header_calendar ul li', 1, { rotationX : 90 }, { rotationX : 0, ease: Back.easeOut.config(1.7) }, 0.1);
		}});
		$("header .header_calendar").on({'click':function(){
			window.location = calUrl;
			}
		});
	}
	
	//news
	function newsImgSet(){
		$('.newsContents > li').each(function(i){
			var $this = $('dt span', this).data('original');
			if($this == '') {
				$('dt span', this).attr('data-original', '/assets/img/common/noimg.png');
			}
		});
		$('.news--new').each(function(i){
			var $this = $('dt span', this).data('original');
			if($this == '') {
				$('dt span', this).attr('data-original', '/assets/img/common/noimg.png');
			}
		});
	}
	newsImgSet();
});

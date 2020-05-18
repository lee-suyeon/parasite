$(function () {

    $("html,body").stop().animate({scrollTop:0}, 10);

// main wheel event 
var $mainView = $(".main-box"),
    frontView = $mainView.find(".front-view");

var count = 0,
    steps = 15;

$mainView.on("mousewheel", function (e, delta) {
    e.preventDefault();
    e.stopPropagation();

    if($mainView.find(".bar").outerWidth() < 700) return false;

    if(delta > 0){
        if(count > 0){
            count--;
        }
    } else{           
        count++;  
    }

    var visible = frontView.css("opacity");
    console.log(visible);
    if(count == steps){
        frontView.css({display:"none"});
        $(this).addClass("active");
        $(this).off("mousewheel");
    } 
    frontView.css({opacity: 1 - (count * 0.1)});
    $mainView.find(".poster-bg").css({filter : "grayscale(" + count * 10 + "%)"});
});

// main animation
frontView.find(".title-en").addClass("active");

// menu click event
var $nav = $(".nav"),
    menu = $nav.find(".gnb .menu li");

$nav.click(function (e) {
    e.preventDefault();
    $(this).find(".ico-menu").toggleClass("active");
});

// menu hover event
menu.hover(function () {
    $(this).addClass("active");
},function () {
    $(this).removeClass("active");
});

// menu 

menu.click(function (e) {
    e.preventDefault();
    var idx = $(this).index();
    var section = $page.eq(idx);
    var sectionDistance = section.offset().top;

    $("html,body").stop().animate({scrollTop:sectionDistance}, 200);

})



// wheel event - page 
window.addEventListener("wheel", function (e) { e.preventDefault();}, {passive: false});

var pageIndex = 0;
var $page = $(".page > div");
var lastPage = $page.length;

var scrolling = false; 



    $(window).on("wheel", function () {
        if(scrolling) return;
        //console.log(pageIndex);
        if(event.deltaY < 0){
            if(pageIndex <= 0) return;
            pageIndex--;
        } else {   
            if(pageIndex >= lastPage - 1) return;
            pageIndex++;
        }
        var scrollTop = $(window).height() * pageIndex;
        //console.log("pageIndex",pageIndex)

        if(pageIndex == 1){
            $(".together").addClass("active");
        }


        scrolling = true;

        $("html").animate({"scrollTop" : scrollTop}, function () {
            scrolling = false;
        });
    });

$(window).scroll(function (e) {
    e.preventDefault();
    var scrollTop = $(window).scrollTop();

    $page.each(function () {
        var pagePos = $(this).offset().top;
        //console.log("scrollTop",scrollTop);
        //console.log("pagePos",pagePos);
        if(scrollTop == pagePos){
            $(this).addClass("active");
            //$(".award .winner .shining").addClass("animation");
        }
    })
})

    // top sticky 
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        if(scrollTop > 0){
            $mainView.find(".title-kor").addClass("sticky");
        } else {
            $mainView.find(".title-kor").removeClass("sticky");
        }
    });


    //family slide
    var $house = $(".house > div");
    var $familySlide = $(".family-slide");

    $house.hover(function () {
        $(this).find(".overlay").stop().fadeIn(300);
    }, function () {
        $(this).find(".overlay").stop().fadeOut(300);
    });

    $house.click(function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.siblings().css({opacity:0});
        if($this.hasClass("gt-house")){
            $familySlide.eq(0).addClass("animation");
        } else {
            $familySlide.eq(1).addClass("animation");
        }

        // $house.eq(1).css({opacity:0});
        // $(this).find(".family-slide").css({transform:"translateX(-50%) scale(1)"});
        // $(".house").css({top:"45%"});
    })

   

    $familySlide.each(function () {
        var $this = $(this),
            member = $this.find(".member"),
            $nav = $this.find(".slide-nav");

        var memberCount = member.length,
        currentSlide = 0;

        member.eq(0).css("display","block");

        $nav.find("a").click(function (e) {
            e.preventDefault();
            if($(this).hasClass("close")){
                $familySlide.removeClass("animation");
                $house.css({opacity:1});
            } else if($(this).hasClass("prev")){
                fadeOutSlide(currentSlide - 1);
                hideNav();
            } else {
                fadeOutSlide(currentSlide + 1);
                hideNav();
            }
            
            console.log("currentSlide",currentSlide);
            if(currentSlide >= 4){
                $("#family").addClass("change");
            } else {
                $("#family").removeClass("change");
            }
        });
    
        function fadeOutSlide (index) {
            member.eq(index).fadeIn();
            member.eq(index).siblings().fadeOut();
            currentSlide = index;
        }
    
        function hideNav () {
            if(currentSlide == 0){
                $nav.find(".prev").css({display:"none"});
            } else {
                $nav.find(".prev").css({display:"block"});
            }
            if(currentSlide == memberCount - 1){
                $nav.find(".next").css({display:"none"});
            } else {
                $nav.find(".next").css({display:"block"});
            }
        }
    
        hideNav();

    });
        



    




// 트로피 클릭 이벤트
// 포스터를 클릭하면 
// 트로피가 1개 나온다
// 또 클릭하면 2번째가 나온다..
// 다 클릭하면 봉준호가 나온다. 

var $trophy = $(".trophy ul li");
var trophyIndex = 0;
    


    $(".oscars").click(function (e) {
        e.preventDefault();
        showTrophy(trophyIndex);
        trophyIndex++;
        if(trophyIndex == $trophy.length + 1){
            var $this = $(this);
            // var imgUrl = $this.find("a").attr("href");
            // $this.find(".empty").attr("src",imgUrl);
            $(this).hide();
            $(".bong").addClass("active");
        }
        $(".award .video").animate({opacity: 0.2});
    });

    function showTrophy (index) {
        $trophy.eq(index).animate({opacity:1});
        trophyIndex = index;
    }


// metaphor click event 
    var $item = $(".item > div");

    //아이템을 클릭하면
    // a 태그의 href 속성을 불러와서
    // img src를 a태그이 href 속성에 대입한다.

    $item.click(function (e) {
        $this = $(this);
        e.preventDefault();
        
        var imgUrl = $this.find("a").attr("href");
        $this.find("img").attr("src",imgUrl);
        $this.addClass("animation");
    });


    //트레일러 클릭 이벤트

    $(".sibling").click(function () {
        $(".trailer").addClass("animation");
    })
});
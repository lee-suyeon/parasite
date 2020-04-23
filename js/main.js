$(function () {
    
    $("h1").click(function (e) {
        e.preventDefault();
        goToHome();
        updateNav();
        pageIndex = 0;
    });
    goToHome ();

    function goToHome () {
        $("html").animate({ "scrollTop" : 0}, 10);
    }
        

    // main
    var $posterObj = $(".main .poster_obj > div");

    $posterObj.eq(0).animate({top:"90px",opacity:1},800,function () {
        $posterObj.eq(1).animate({left:"-3%",opacity:1},1000,function () {
            $posterObj.eq(2).animate({left:"800px",opacity:1},800,function () {
                $("h2").fadeIn(1200);
            });
        });
    });
    
    //story 

    var $select = $(".story .synopsis .select");
    var $bar = $(".story .fam .bars > span");
    
    $select.hover(function () {
        if($(this).hasClass("black")){
            $bar.filter(".black").css({"width":"140px"});
        } else {
            $bar.filter(".white").css({"width":"140px"});
        }
    },function () {
        if($(this).hasClass("black")){
            $bar.filter(".black").css({"width":"0"});
        } else {
            $bar.filter(".white").css({"width":"0"});
        }
    })
    


    //wheel event 
    window.addEventListener("wheel", function (e) { e.preventDefault();}, {passive: false});

    var pageIndex = 0;
    var lastPage = $(".page").length;

    var scrolling = false; 

    $(window).on("wheel", function () {
        if(scrolling) return;

        if(event.deltaY < 0){
            if(pageIndex <= 0) return;
            pageIndex--;
            updateNav();
        } else {   
            if(pageIndex >= lastPage - 1) return;
            pageIndex++;
            updateNav();
            $header.addClass("sticky");
        }
        if(pageIndex == 0) {
            $header.removeClass("sticky");
        }
        if(scrollTop = 985){
            var $title = $(".story > h3 > span");
            $title.css({transform: "translateY(0)"});
        }
        var scrollTop = $(window).height() * pageIndex;

        scrolling = true;

        console.log("pageIndex", pageIndex);
        console.log("eventdeltaY", event.deltaY);

        $("html").animate({"scrollTop" : scrollTop}, function () {
            scrolling = false;
        });
    });
    //$(window).trigger("wheel");

    // sticky header 

    var $header = $(".header");

    function stickyHeader () {
        $header.addClass("sticky");
    }



    //indicator
    var $nav = $(".nav");
    var menu = $nav.find("li");
    var pageHeight = $(window).height();
    
    menu.click(function (e) {
        e.preventDefault();
        var idx = $(this).index();
        goToPage(idx);
    });

    function updateNav () {
        menu.eq(pageIndex).addClass("active").siblings().removeClass("active");
        $(".page_num .number").text("0" + (pageIndex + 1 ));
    }
    function goToPage (index) {
        $("html").animate({scrollTop: index * pageHeight });
        pageIndex = index;
        updateNav();
    }

    //page event
    var $chatbubble = $(".chatbubble");
    var $interview = $(".interview > p");

    $chatbubble.click(function () {
        $interview.css({display:"block"});
        $(this).fadeOut(400);
    });

   // var productCount = $productList.eq(slideIndex).children().length;
    //slide 
     var $container = $(".slide_container"),
         slide = $container.find(".slide"),
        member = $(".member"),
        memberCount = member.length,
        currentSlide = 0;
        
    var $nav = $(".slide_nav");
    console.log(memberCount);
    member.eq(0).css("display","block");
    member.eq(4).css("display","block");
    $nav.find("a").click(function (e) {
        e.preventDefault();

        if($(this).hasClass("prev")){
            goToSlide(currentSlide - 1);
        } else {
            goToSlide(currentSlide + 1);
        }
        console.log(currentSlide);
    });
    member.eq(0).css("display","block")
    function goToSlide (index) {
        member.eq(index).fadeIn();
        member.eq(index).siblings().fadeOut()
        //slide.css({left: -100 * (index) + "%"});
        currentSlide = index;
        hideBtn();
    }

    hideBtn();

    function hideBtn () {
        var $navPrev = $nav.find(".prev");
        var $navNext = $nav.find(".next");
    
        if(currentSlide == 0){
            $navPrev.css("display","none")
        } else {
            $navPrev.css("display","block");
        }

        if(currentSlide == memberCount - 1){
            $navNext.css("display","none")
        } else {
            $navNext.css("display","block");
        }
    }



}); 
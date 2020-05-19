$(function () {

    // goToHome
    function goToHome () {
        $("html,body").stop().animate({scrollTop:0}, 100);
    }
    //goToHome ();

    $(".title-kor").click(function (e) {
        e.preventDefault();
        goToHome ();
    });



    // main event 
    var $mainView = $(".main-box"),
        frontView = $mainView.find(".front-view");

    var count = 0,
        steps = 15;

    frontView.find(".title-en").addClass("active");

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

        frontView.css({opacity: 1 - (count * 0.1)});
        $mainView.find(".poster-bg").css({filter : "grayscale(" + count * 10 + "%)"});

        if(count == steps){
            frontView.css({display:"none"});
            $(this).off("mousewheel");
        } 
    });


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

   

    // wheel event - page 

    var $page = $(".page > div");
    var lastPage = $page.length;
    var pageIndex = 0;
    var scrolling = false; 

     // menu 
     menu.click(function (e) {
        e.preventDefault();
        var idx = $(this).index();
        var section = $page.eq(idx);
        var sectionDistance = section.offset().top;



        $("html,body").stop().animate({scrollTop:sectionDistance}, 200,
            function () {
            pageIndex = idx;
        });
        
    });

    window.addEventListener("wheel", function (e) { e.preventDefault();}, {passive: false});

    $(window).on("mousewheel", function (event) {

        if(scrolling) return;

        if(event.deltaY > 0){
            if(pageIndex <= 0) return;
            pageIndex--;
        } else {           
            if(pageIndex >= lastPage - 1) return;
            pageIndex++;  
        }

        var scrollTop = $(window).height() * pageIndex,
            pagePos = $page.eq(pageIndex).offset().top;

        scrolling = true;

        $("html").animate({"scrollTop" : scrollTop}, function () {
            scrolling = false;
        });

        if(scrollTop >= pagePos){
            $page.eq(pageIndex).addClass("active");
        }

        function sickyLogo () {
            if(scrollTop > 0){
                $mainView.find(".title-kor").addClass("sticky");
            } else {
                $mainView.find(".title-kor").removeClass("sticky");
            }
        }
        sickyLogo();

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
    });

    

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
            

    // award trophy event

    var $trophy = $(".trophy ul li");
    var trophyIndex = 0;


    $(".oscars").click(function (e) {
        e.preventDefault();
        showTrophy(trophyIndex);
        trophyIndex++;
        if(trophyIndex == $trophy.length + 1){
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

    $item.click(function (e) {
        e.preventDefault();
        $this = $(this);
        
        var imgUrl = $this.find("a").attr("href");
        $this.find("img").attr("src",imgUrl);
        $this.addClass("animation");
    });

    //trailer click event
    $(".sibling").click(function () {
        $(".view-box").addClass("animation");
    });




    // youtube  -----------------------------
    
        var $selector = {
            body : $("body"),
            overlay : $("#blackout"),
            modal : $("#trailerModal"),
            showButton : $("#showTrailer"),
            hideButton : $("#hideTrailer")
        };


        // 플레이어 
        var player = {
            obj: null, // 플레이어 오브젝트
            query : {
                theme: "dark",
                color: "white",
                controls: 1, 
                autoplay: 1,
                enablejsapi: 1,
                modestbranding: 0, // YouTube 로고 감춤
                rel: 0,  // 관련 동영상 표시
                showinfo: 0, // 제목, 업로더 감춤
                iv_load_policy: 3 // 특수효과 감춤
            },
            visible: false
        };

        // hide, show btn
        $selector.showButton.on("click", showPlayer);
        $selector.hideButton.on("click", hidePlayer);


        //YouTube API를 이용해 iframe을 생성
        function setPlayer ( id ) {
            player.obj = new YT.Player( "trailer", {
                width: 480,
                height: 282,
                videoId: id,    
                playerVars: player.query
            });

            // 처음 플레이어 크기 설정
            resizePlayer();

            // 리사이즈나 화면 회전시 플레이어 크기 다시 설정
            $( window ).on( "resize orientationchange", function() {
                resizePlayer();
            });
        };

        // 화면 크기에 비례해 iframe의 크기 조절
        function resizePlayer() {
            var viewport = {}, frame = {}, modal = {};

            viewport.width = $( window ).width();
            viewport.height = $( window ).height();

            frame.width = viewport.width;
            frame.height = frame.width / 1.6; // 16 : 10

            modal.top = ( ( viewport.height - frame.height ) / 2 ) + "px";
            modal.left = "0px";

            $selector.modal.css( modal );

            player.obj.setSize( frame.width, frame.height );
        }



        // iframe 보이기
        function showPlayer () {
            if ( !player.obj ) {
                setPlayer( $selector.showButton.data("youtube") );
            }
            $selector.body.addClass("modal-on");
            $selector.overlay.show();
            player.visible = true;
        };

        // iframe 감추기 
        function hidePlayer () {
            player.obj.stopVideo();
            $selector.overlay.hide();
            $selector.body.removeClass("modal-on");
            player.visible = false;

        };
    

});
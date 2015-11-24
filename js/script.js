/* 12_Widgets - JS */


$(function() {

    var navColour = "#FF794C";

    // Nav button
    $(".nav-button, .nav-bar ul li").on("click", function(event) {
        event.stopPropagation();
        $(".nav-bar").slideToggle(400, "easeOutBounce");
    });

    // Nav bar styling
    $(".nav-bar ul li a").hover(
        function() {
            $(this).addClass("pulse").css("color", navColour);
        },
        function() {
            $(this).removeClass("pulse").css("color", "#605B56");
        }
    );

    // Colour settings button
    $(".settings-button").on("click", function(event) {
        event.stopPropagation();

        if ($(this).hasClass("open")) {
            $(".content").animate({ left: "0" }, 800, "easeOutQuint");
            $(this).removeClass("open");
        } else {
            $(".content").animate({ left: "150px" }, 800, "easeOutQuint");
            $(this).addClass("open");
        }
    });

    // Close menus
    $(".content").on("click", function() {
            // Colour settings
            $(".content").animate({ left: "0" }, 800, "easeOutQuint");
            $(".settings-button").removeClass("open");

            // Nav bar
            if ($(".nav-bar").css("display") === "block") {
                $(".nav-bar").slideToggle(400, "easeOutBounce");
            }
    });



    /* =======================================================
        Colour
    ======================================================= */
    $(".colour-menu").on("click", ".colour", function() {
        navColour = $(this).css("background-color");
        $("h1").css("color", navColour);
    });



    /* =======================================================
        Carousel
    ======================================================= */
    var count = $(".carousel-image").length,
        next = 2,
        prev = 6,
        loop;

    startLoop();

    // Stop and start loop on hover
    $(".carousel-widget").hover(
        function() {
            stopLoop();
        },
        function() {
            startLoop();
        }
    );

    // Start loop
    function startLoop() {
        loop = setInterval(function() {
            $(".carousel-widget > div").css("display", "none");
            $("div.carousel-image-" + next).css("display", "block");

            prev = next - 1;
            if (prev < 1) {
                prev = count;
            }

            next += 1;
            if (next > count) {
                next = 1;
            }
        }, 2500);
    }

    // Stop loop
    function stopLoop() {
        window.clearInterval(loop);
    }

    // Replace current image
    function display(choice) {
        $(".carousel-widget > div").css("display", "none");
        $("div.carousel-image-" + choice).css("display", "block");
    }

    // Show previous image
    $(".previous").on("click", function(event) {
        event.preventDefault();
        display(prev);
        
        next = prev + 1;
        if (next > count) {
            next = 1;
        }

        prev -= 1;
        if (prev < 1) {
            prev = count;
        }
    });

    // Show next image
    $(".next").on("click", function(event) {
        event.preventDefault();
        display(next);
        
        prev = next - 1;
        if (prev < 1) {
            prev = count;
        }

        next += 1;
        if (next > count) {
            next = 1;
        }
    });



    /* =======================================================
        Image Viewer Widget
    ======================================================= */
    var imageList = [2, 3, 4, 5],
        last = imageList.length - 1,
        $screen = $(".image-viewer-screen"),
        $image,
        right,
        left;

    // Image select
    $(".image-viewer-menu").on("click", ".image-viewer-image", function() {
        $image = $(this).children();
        $screen.empty();
        $image.clone().appendTo($screen);
    });

    // Move menu right
    $(".left-arrow").on("click", function() {
        $(".image-viewer-image-" + imageList[last]).css("display", "none");
        right = imageList[0] - 1;
        imageList.pop();

        if (right === 0) {
            right = 8;
        }

        imageList.unshift(right);
        $(".image-viewer-image-" + right).prependTo($(".image-viewer-menu")).css("display", "inline-block");
    });

    // Move menu left
    $(".right-arrow").on("click", function() {
        $(".image-viewer-image-" + imageList[0]).css("display", "none");
        left = imageList[last] + 1;
        imageList.shift();
        
        if (left === 9) {
            left = 1;
        }

        imageList.push(left);
        $(".image-viewer-image-" + left).appendTo($(".image-viewer-menu")).css("display", "inline-block");
    });



    /* =======================================================
        Image Select Widget
    ======================================================= */
    // Open full screen image
    $(".image-select-widget").on("click", ".image-select-column", function() {
        $(".full-screen").css("display", "block");
        $(this).children().clone().appendTo(".full-screen");
    });

    // Close full screen image
    $(".full-screen").on("click", function() {
        $(this).css("display", "none");
    });



    /* =======================================================
        Accordion Widget
    ======================================================= */
    var accordSections = $(".accordion-widget h3").length,
        currentAccord = "accord-title-1";

    $(".accordion-widget").on("click", "h3", function() {
        // Current selection
        if ($(this).hasClass(currentAccord)) {
            return;
        }

        // New selection
        for (var i = 1; i <= accordSections; i++) {
            if ($(this).hasClass("accord-title-" + i)) {
                $(".accordion-widget div").slideUp(800, "easeOutQuint");
                $(".accord-body-" + i).slideDown(800, "easeOutQuint");
                currentAccord = "accord-title-" + i;
            }
        }

        // Adjust border-radius styling for last section when active
        if (currentAccord === "accord-title-4") {
            $(".accord-title-4").attr("id", "active");
        } else {
            $(".accord-title-4").removeAttr("id");
        }
    });

});
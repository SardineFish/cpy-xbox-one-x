function init()
{
    // Top Menu
    var topMenuItems = $("#top-menu .item");
    for (let i = 0; i < topMenuItems.length; i++) {
        $(topMenuItems[i], "*").click(function (e)
        {
            e.stopImmediatePropagation();
            topMenuItems[i].addClass("selected");
        });
    }
    topMenuItems.click(function (e)
    {
        topMenuItems.removeClass("selected")
        e.stopImmediatePropagation();
        $(e.target).addClass("selected");
    });
    window.onclick = function (e)
    {
        topMenuItems.removeClass("selected");
    }
    // Fold
    var foldBlocks = $(".fold-area");
    for (var i = 0; i < foldBlocks.length; i++) {
        (function (foldBlock){
            var height = $(foldBlock, "#fold").height();
            $(foldBlock, "#fold").css("max-height", "0px");
            var fold = true;
            $(foldBlock, "#top *").click(function (e)
            {
                if (fold) {
                    $(foldBlock, "#fold").removeClass("fold-fold");
                    $(foldBlock, "#fold").addClass("fold-extend");
                }
                else {
                    $(foldBlock, "#fold").removeClass("fold-extend");
                    $(foldBlock, "#fold").addClass("fold-fold");
                }
                fold = !fold;

            });
        })(foldBlocks[i]);
    }

    // Video play
    var pendingVideo = $(".pending-video");
    window.onscroll = function (e)
    {
        for (var i = 0; i < pendingVideo.length; i++) {
            (function (video)
            {
                var played = false;
                var bound = video.getBoundingClientRect();
                if (0 < bound.top + $(video).height() && bound.top < window.innerHeight) {
                    $(video, ".poster").css("visibility", "hidden");
                    $(video, "video").css("visibility", "visible");
                    if (!played) {
                        $(video, "video")[0].play();
                        played = true;
                    }
                }
            })(pendingVideo[i]);
        }
    }

    // Xbox 360
    var xbox = $("#xbox-around");
    var slideBlockWidth = $("#xbox-around #slide-bar #slide-block").width();
    var hold = false;
    $("#xbox-around #slide-bar").mouseDown(function (e)
    {
        hold = true;
    });
    $("#xbox-around #slide-bar").touchStart(function (e)
    {
        hold = true;
    });
    function move(x)
    {
        var bound = $("#xbox-around #slide-bar #background")[0].getBoundingClientRect();
        x = x - bound.left;
        x = x - slideBlockWidth / 2;
        x = x < 0 ? 0 : x;
        x = bound.width - slideBlockWidth < x ? bound.width - slideBlockWidth : x;
        $("#xbox-around #slide-bar #slide-block").css("left", x + "px");
        x = x / (bound.width - slideBlockWidth);
        var idx = parseInt(x * 29);
        $("#xbox-around #wrap img").css("top", (-idx * 100) + "%");
    }
    window.onmousemove = function (e)
    {
        if (hold) {
            var bound = $("#xbox-around #slide-bar #background")[0].getBoundingClientRect();
            move(e.clientX);
        }
    }
    window.addEventListener("touchmove", function (e)
    {
        if (hold) {
            var bound = $("#xbox-around #slide-bar #background")[0].getBoundingClientRect();
            move(e.changedTouches[0].clientX);
        }
    });
    window.addEventListener("mouseup", function (e)
    {
        hold = false;
    });
    window.addEventListener("touchend", function (e)
    {
        hold = false;
    });

    // Games
    var games = $("#play-4k #games .item");
    for (var i = 0; i < games.length; i++) {
        (function (item)
        {
            $(item, "#detail-button").click(function (e)
            {
                games.removeClass("extended");
                games.removeClass("normal");
                games.addClass("fold");
                $(item).removeClass("fold");
                $(item).addClass("extended");
                var bg = $(item, "#summary").css("background-image");
                $("#play-4k #games").css("background-image", bg);
            });
            $(item, "#close-button").click(function (e)
            {
                games.removeClass("extended");
                games.removeClass("fold");
                games.addClass("normal");
            });
        })(games[i]);
    }

    // Top menu
    var menuExtended = false;
    $("#top-menu #button-menu").click(function (e)
    {
        if (menuExtended) {
            $("#top-menu").removeClass("extended");
            menuExtended = false;
        }
        else {
            $("#top-menu").addClass("extended");
            menuExtended = true;
        }
    });
}
window.onload = init;
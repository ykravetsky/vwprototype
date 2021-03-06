<%@include file="/libs/foundation/global.jsp" %>

<div id="site-wrapper">

<div id="social-overlay">
    <div class="content">
        <a href="#" id="close-social"></a>
    </div>
</div>

<div id="video-overlay">
    <div class="content">
        <video controls poster="/etc/designs/vwprototype/assets/img/video-placeholder.jpg">
            <source src="/etc/designs/vwprototype/assets/video/findyourmatch720.mp4"
                    type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' />
        </video>
        <a href="#" id="close-video"></a>
    </div>
</div>

<div class="sidebar">

    <div class="overlay"></div>

    <div class="head">
        <a href="#" class="logo"></a>
    </div>

    <div class="submenu">
        <div id="linkList" class="scroll-box">
            <a href="#" id="link-01" class="hotspot"></a>
            <a href="#" id="link-02" class="hotspot"></a>
            <a href="#" id="link-03" class="hotspot"></a>
            <a href="#" id="link-04" class="hotspot live"></a>
            <a href="#" id="link-05" class="hotspot live"></a>
            <a href="#" id="link-06" class="hotspot live"></a>
        </div>
    </div>

    <div id="child-01" class="child-menu">
        <div class="scroll-box">
        </div>
    </div>

    <div id="child-02" class="child-menu">
        <div class="scroll-box">
        </div>
    </div>

    <div id="child-03" class="child-menu">
        <div class="scroll-box">
        </div>
    </div>

    <div id="child-04" class="child-menu">
        <div class="scroll-box">
        </div>
    </div>

    <div id="child-05" class="child-menu">
        <div class="scroll-box">
            <div class="third-level">
                <a href="#" id="hide-third-level" class="hotspot"></a>
            </div>
            <a href="#" id="show-third-level" class="hotspot"></a>
        </div>
    </div>

    <div id="child-06" class="child-menu">
        <div class="scroll-box">
        </div>
    </div>
</div>

<div class="topbar">
    <div class="head">
        <div class="menu-inner">
            <div class="menu">
                <div class="menu-scrollbox">
                    <div id="menu-01" class="menu-section"><div class="fake-topbar-button"></div></div>
                    <div id="menu-02" class="menu-section"></div>
                </div>
            </div>
        </div>
        <div id="menu-02-fixtop"></div>
        <div class="searchbar"></div>
    </div>
</div>

<div id="viewport">
    <div id="home-01" class="pane">
        <a href="#" class="share-this"></a>
        <div class="wobblies">
            <div class="heading"></div>
            <div class="text"></div>
            <div class="tweet"></div>
        </div>

        <cq:include path="centralpar" resourceType="foundation/components/parsys"/>
    </div>
    <div id="home-02" class="pane">
        <div class="car-carousel">
            <div class="tabs">
                <a href="#" id="slide-link-01" class="active"></a>
                <a href="#" id="slide-link-02"></a>
                <a href="#" id="slide-link-03"></a>
                <a href="#" id="slide-link-04"></a>
                <a href="#" id="slide-link-05"></a>
            </div>
            <div id="slide-wrapper" class="show-01">
                <div class="slide" id="slide-01"></div>
                <div class="slide" id="slide-02"></div>
                <div class="slide" id="slide-03"></div>
                <div class="slide" id="slide-04"></div>
                <div class="slide" id="slide-05"></div>
            </div>
        </div>
    </div>
    <div id="home-03" class="pane">
        <a href="#" class="share-this"></a>
        <div class="content-wrapper">
            <a href="#" id="open-video-overlay" class="hotspot"></a>
        </div>
    </div>
    <div id="home-04" class="pane">
        <a href="#" class="share-this"></a>
        <div class="content-wrapper">
        </div>
    </div>
    <div id="home-05" class="pane">
        <a href="#" class="share-this"></a>
        <div class="content-wrapper">
        </div>
    </div>
    <div id="home-06" class="pane">
        <a href="#" class="share-this"></a>
        <div class="content-wrapper">
        </div>
    </div>
    <div id="home-07" class="pane">
        <a href="#" class="share-this"></a>
        <div class="content-wrapper">
        </div>
    </div>
    <div id="footer" class="pane">
        <div class="content-wrapper">
        </div>
    </div>
</div>

<!-- Add your site or application content here -->
<script src="/etc/designs/vwprototype/assets/js/lib/head.min.js"></script>
<script>
    var lib = '/etc/designs/vwprototype/assets/js/lib/';
    var app = '/etc/designs/vwprototype/assets/js/app/';
    var base = '/etc/designs/vwprototype/assets/js/app/base/';
    var component = "/etc/designs/vwprototype/assets/js/app/components/";
    var events = '/etc/designs/vwprototype/assets/js/app/base/events/';
    var data = '/etc/designs/vwprototype/assets/js/data/';
    var template = '/etc/designs/vwprototype/assets/template/';
    var page = '/etc/designs/vwprototype/assets/js/app/base/page/';

    head.load(


            // external libraries
                    lib+"Polyfills.js",
                    lib+"modernizr.min.js",
                    lib+"jquery.js",
                    lib+"jquery.mobile-1.4.2.js",
                    lib+"bootstrap.js",
                    lib+"PxLoader.js",
                    lib+"soundManager.js",
                    lib+"soundManager.fn.js",
                    lib+"PxLoaderImage.js",
                    lib+"PxLoaderSound.js",
                    lib+"PxLoaderVideo.js",
                    lib+"TWEEN.js",
                    //lib+"cordova.js",

                    base+"SiteManager.js",

            //base libraries
                    base+"math/MathBase.js",

                    data+"AssetData.js",

                    events+"EventDispatcher.js",
                    events+"ListenerFunctions.js",
                    events+"TouchEvent.js",
                    events+"Scroller.js",
                    events+"Trackpad.js",

            //assets and core
                    base+"core/Core.js",
                    base+"loader/AssetManager.js",

            //components
                    component+"carousel.js",

            //page
                    page+"BasicPage.js",
                    page+"MobilePage.js",
                    page+"TabletPage.js",
                    page+"DesktopPage.js",

            //begins!
            "/etc/designs/vwprototype/assets/js/main.js"





    );

    head.ready(function () {

        // some callback stuff
        //begins
        var Main = MKK.getNamespace('mkk').Main;
        var main = new Main();

        //animation function
        var animate = function () {

            window.requestAnimationFrame(animate);
            TWEEN.update();
            if(!main.isLoaded) return;

            main.update();
            main.render();

        }
        animate();


    });
</script>
</div>
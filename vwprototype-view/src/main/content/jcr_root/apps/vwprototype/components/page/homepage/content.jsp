<%@include file="/apps/vwprototype/global.jsp" %>

<div id="site-wrapper" class="">

    <!--             <div class="navigation">
                    <div class="tab"></div>
                    <div class="list"></div>
                </div> -->

    <div class="sidebar">
        <div class="head">
            <a href="#" class="logo"></a>
            <a class="menu-trigger">Search</a>
        </div>

        <div class="submenu">
            <div class="scroll-box">
                <a href="#" class="hotspot"></a>
            </div>
        </div>

        <div class="child-menu">
            <div class="scroll-box">
            </div>
        </div>
    </div>

    <div id="viewport">
        <div id="home-01" class="pane">
            <cq:include path="centralpar" resourceType="foundation/components/parsys"/>
        </div>
        <div id="home-02" class="pane">
            <div class="content-wrapper">
            </div>
        </div>
        <div id="home-03" class="pane">
            <div class="content-wrapper">
            </div>
            <a href="#" class="close">Close</a>
        </div>
        <div id="home-04" class="pane">
            <div class="content-wrapper">
            </div>
            <a href="#" class="close">Close</a>
        </div>
        <div id="home-05" class="pane">
            <div class="content-wrapper">
            </div>
            <a href="#" class="close">Close</a>
        </div>
        <div id="home-06" class="pane">
            <div class="content-wrapper">
            </div>
            <a href="#" class="close">Close</a>
        </div>
        <div id="footer" class="pane">
            <div class="content-wrapper">
            </div>
        </div>
    </div>

</div>

<!-- Add your site or application content here -->

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="/etc/designs/vwprototype/assets/js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
<script src="/etc/designs/vwprototype/assets/js/plugins.js"></script>

<script data-main="/etc/designs/vwprototype/assets/js/main" src="/etc/designs/vwprototype/assets/js/lib/require.js"></script>
<script>
    // Load the main app module to start the app
    requirejs(["app/Home"]);

    $(function(){

        // Toggles menu
        $('.navigation .tab').on('click',function(){
            $('#site-wrapper').toggleClass('menu-visible');
        });

        $('.close').on('click',function(){
            $(this).parent().fadeOut();
        });

    })
</script>
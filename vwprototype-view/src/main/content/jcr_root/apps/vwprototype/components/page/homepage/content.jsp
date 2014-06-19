<%@include file="/apps/vwprototype/global.jsp" %>
<div id="site-wrapper">
    <div class="navigation">
        <div class="tab"></div>
        <div class="list"></div>
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

<script data-main="/etc/designs/vwprototype/assets/js/main" src="/etc/designs/vwprototype/assets/js/lib/require.js"></script>
<script>
    // Load the main app module to start the app
    requirejs(["app/Home"]);
</script>
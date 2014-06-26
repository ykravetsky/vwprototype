<%@include file="/libs/foundation/global.jsp" %>
<%@page session="false" %>
<body class="uk cms">
    <cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext_optimized"/>
    <div>
        <cq:include script="header.jsp"/>
        <cq:include script="content.jsp"/>
        <cq:include script="footer.jsp"/>
    </div>
</body>
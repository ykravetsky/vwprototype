<%@page session="false" %>
<%@include file="/apps/vwprototype/global.jsp" %>

<jsp:useBean id="textcomp" scope="page" class="com.sapientnitro.vwprototype.components.TextComponent"></jsp:useBean>
<jsp:setProperty name="textcomp" property="slingRequest" value="<%=slingRequest %>"/>

<cq:text property="text" tagName="p" escapeXml="true" placeholder="This 'Text'component is not confiured!"/>

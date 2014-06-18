package com.sapientnitro.vwprototype.components;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMMode;
import com.day.cq.wcm.api.components.ComponentContext;
import com.day.cq.wcm.commons.WCMUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Abstract Class for CQ5 Components
 */
public abstract class AbstractComponent {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractComponent.class);

    private Boolean editMode;
    private Boolean previewMode;
    private Boolean publishMode;
    private Boolean designMode;

    private SlingHttpServletRequest slingRequest;
    private ComponentContext componentContext;

    private ResourceResolver resourceResolver;
    private Resource resource;
    private ValueMap properties;

    private Page currentPage;
    private Page resourcePage;
    private ValueMap pageProperties;
    private PageManager pageManager;

    public void setSlingRequest(final SlingHttpServletRequest slingRequest) {
        this.slingRequest = slingRequest;
        init();
    }

    protected abstract void init();

    public void init(Resource resource) {
        this.resource = resource;
        this.properties = resource.adaptTo(ValueMap.class);
        this.init();
    }

    protected final SlingHttpServletRequest getSlingRequest() {
        return this.slingRequest;
    }

    protected final ComponentContext getComponentContext() {
        if (this.componentContext == null) {
            this.componentContext = WCMUtils.getComponentContext(this.slingRequest);
        }
        return this.componentContext;
    }

    protected final PageManager getPageManager() {
        if (this.pageManager == null) {
            this.pageManager = getResourceResolver().adaptTo(PageManager.class);
        }
        return this.pageManager;
    }

    public final Page getCurrentPage() {
        if (this.currentPage == null) {
            this.currentPage = getComponentContext() == null ? null : getComponentContext().getPage();
            if (this.currentPage == null) {
                this.currentPage = getResourcePage();
            }
            if (this.currentPage == null) {
                throw new IllegalArgumentException("Current Page is Null");
            }
        }
        return this.currentPage;
    }

    protected final Page getResourcePage() {
        if (this.resourcePage == null) {
            this.resourcePage = getPageManager().getContainingPage(getResource());
        }
        return this.resourcePage;
    }

    public final ResourceResolver getResourceResolver() {
        if (this.resourceResolver == null) {
            this.resourceResolver = getResource().getResourceResolver();
        }
        return this.resourceResolver;
    }

    protected Resource getResource() {
        if (this.resource == null) {
            this.resource = getSlingRequest().getResource();
        }
        return this.resource;
    }

    public final ValueMap getPageProperties() {
        if (this.pageProperties == null) {
            this.pageProperties = getCurrentPage() == null ? ValueMap.EMPTY : getCurrentPage().getProperties();
        }
        return this.pageProperties;
    }

    public final ValueMap getProperties() {
        if (this.properties == null) {
            this.properties = getResource().adaptTo(ValueMap.class);
            if (this.properties == null) {
                this.properties = ValueMap.EMPTY;
            }
        }
        return this.properties;
    }

    protected String getStringProperty(String name) {
        return getProperties().get(name, "");
    }

    public final String getStringProperty(final String propertyName, final String defaultValue) {
        return getProperties().get(propertyName, defaultValue);
    }

    protected List<String> getStringArrayProperty(String name) {
        String[] properties = getProperties().get(name, String[].class);
        return (properties != null) ? Arrays.asList(properties) : new ArrayList<String>();
    }

    protected final Integer getIntegerProperty(final String propertyName) {
        return getProperties().get(propertyName, Integer.class);
    }

    protected final Boolean getBooleanProperty(final String propertyName) {
        Boolean propertyValue = getProperties().get(propertyName, Boolean.class);
        return (propertyValue != null) ? propertyValue : false;

    }

    public final boolean isEditMode() {
        if (this.editMode == null) {
            this.editMode = WCMMode.fromRequest(getSlingRequest()) == WCMMode.EDIT;
        }
        return this.editMode;
    }

    public final boolean isPreviewMode() {
        if (this.previewMode == null) {
            this.previewMode = WCMMode.fromRequest(getSlingRequest()) == WCMMode.PREVIEW;
        }
        return this.previewMode;
    }

    public final boolean isPublishMode() {
        if (this.publishMode == null) {
            this.publishMode = WCMMode.fromRequest(getSlingRequest()) == WCMMode.DISABLED;
        }
        return this.publishMode;
    }

    protected final boolean isDesignMode() {
        if (this.designMode == null) {
            this.designMode = WCMMode.fromRequest(getSlingRequest()) == WCMMode.DESIGN;
        }
        return this.designMode;
    }
}

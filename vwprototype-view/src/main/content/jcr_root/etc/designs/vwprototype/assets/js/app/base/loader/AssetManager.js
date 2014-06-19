// -------------------------------------
// Asset loader class
// -------------------------------------

define(['PxLoader', 'PxLoaderImage', 'PxLoaderSound', 'base/events/EventDispatcher'], function(PxLoader, PxLoaderImage, PxLoaderSound, EventDispatcher) {


    var AssetManager = function(data) {

        this.data = data;
        this.progress = 0;
        this.assets = null;
        this.setup();

        return this;
    }

    var p = AssetManager.prototype = new EventDispatcher();


    p.setup = function() {

    }

    p.load = function() {

        this.pxloader = new PxLoader();

        this.assets = this.loadAssets(this.data);

        var that = this;
        var loaderprogressBound = function(e) { that.loadProgress(e) };
        var loadercompleteBound = function(e) { that.loaderComplete(e) };
        this.pxloader.addProgressListener(loaderprogressBound);
        this.pxloader.addCompletionListener(loadercompleteBound);
        this.pxloader.start();
        return this;
    }

    p.loadAssets = function(object) {
         var collection= {}, index= 0, next, item;
        for(item in object){
            if(object.hasOwnProperty(item)){
                next= object[item];
                if(typeof next== 'object' && next!= null){
                    collection[item] = this.loadAssets(next);
                }
                else {

                    var tmp = String(next);
                    var suffix = tmp.split(".");
                    switch(suffix[suffix.length-1]){
                        case 'jpg':
                            collection[item] = this.pxloader.addImage(String(next));
                            break; 
                        case 'wav':
                            collection[item] = new Audio(String(next)); 
                            break;
                    }
                }
            }
        }
        return collection;   
    }

    p.loadProgress = function(e, callback) {
        var progress = e.completedCount / e.totalCount;
        console.log('load progress', progress);

        if (callback) { callback.call(e) };
        this.progress = progress;
        return progress;
    }

    p.loaderComplete = function(e) {
        console.log('load complete');
        this.dispatchCustomEvent('loadComplete', {data: this.assets});
    }



    return AssetManager;
    
});
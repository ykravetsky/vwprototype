// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
    "baseUrl": "/etc/designs/vwprototype/assets/js/lib",
    "paths": {
      "app": "/etc/designs/vwprototype/assets/js/app",
      "data": "/etc/designs/vwprototype/assets/js/data",
      "components": "/etc/designs/vwprototype/assets/js/app/components",
      "dom": "/etc/designs/vwprototype/assets/js/app/base/dom",
      "base": "/etc/designs/vwprototype/assets/js/app/base",
      "template": "/etc/designs/vwprototype/assets/template"
    },
    "shim": {
        //"soundManager.fn": ["soundManager"],
        //"PxLoaderImage":["PxLoader"],
        //"PxLoaderSound":["PxLoader", "SoundManager"],
        //"PxLoaderVideo":["PxLoader"],
        // "bootstrap.min": [] 
    }
});


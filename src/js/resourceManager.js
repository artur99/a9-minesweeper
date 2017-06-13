function resourceManager(){
    var resources_0 = [];
    var resources = {};
    var prep = 0;
    var loaded = 0;

    this.preload = function(name, route, type){
        if(typeof type == 'undefined'){
            type = 'image';
        }
        resources_0.push({
            name: name,
            route: route,
            type: type
        });
    }

    this.load = function(callback){
        var l = resources_0.length;
        for(var i=0;i<l;i++){
            (function(nr){
                var route = resources_0[nr].route;
                var name = resources_0[nr].name;
                var type = resources_0[nr].type;
                var finobj, cb1, cb2;
                if(typeof resources[name] != 'undefined')
                    return;

                var f_route = 'assets/'+route;

                if(type == 'image'){
                    var img = new Image();
                    img.src = f_route;
                    img.onload = function(e){
                        loadedP1(e, callback);
                    };
                    img.onerror = function(e){
                        loadedP2(e, callback);
                    };
                    finobj = img;
                }else if(type == 'audio'){
                    var audio = new Audio(f_route);
                    audio.oncanplaythrough = function(e){
                        loadedP1(e, callback);
                    };
                    audio.onerror = function(e){
                        loadedP2(e, callback);
                    };
                    finobj = audio;
                }
                finobj.initial_name = name;
                resources[name] = finobj;
                prep++;
            })(i);
        }
    }

    var loadedP1 = function(e, callback){
        loaded++;
        if(loaded == prep){
            console.log("Loaded "+loaded+" resources...");
            callback();
        }
    }

    var loadedP2 = function(e, callback){
        console.log("Error loading resource: ", e.target.initial_name);
        console.log(e);
        loadedP1(e, callback);
    }

    this.getStatus = function(){
        return loaded / prep;
    }

    this.get = function(name){
        return resources[name];
    }

    return this;
}

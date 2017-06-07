function resourceManager(){
    var images_0 = [];
    var images = {};
    var prep = 0;
    var loaded = 0;

    this.preload = function(name, route){
        images_0.push({
            name: name,
            route: route
        });
    }

    this.load = function(callback){
        var l = images_0.length;
        for(var i=0;i<l;i++){
            (function(nr){
                var route = images_0[nr].route;
                var name = images_0[nr].name;
                if(typeof images[name] != 'undefined')
                    return;
                var f_route = 'assets/'+route;
                var img = new Image();
                img.src = f_route;
                images[name] = img;
                prep++;
                img.onload = function(){
                    loaded++;
                    if(loaded == prep){
                        callback();
                    }
                }
            })(i);
        }
    }

    this.getStatus = function(){
        return loaded / prep;
    }

    this.get = function(name){
        return images[name];
    }

    return this;
}

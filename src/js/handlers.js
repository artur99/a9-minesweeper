var Handlers = function(canvas, initW, initH){
    var move_listeners = [];
    var click_listeners = [];
    var rclick_listeners = [];
    var last_pos = {
        x: 0,
        y: 0
    };

    canvas.addEventListener('mousemove', function(evt) {
        var pos = getMousePos(canvas, evt);
        last_pos = pos;
        for(var i=0;i<move_listeners.length;i++){
            move_listeners[i](pos);
        }
    }, false);
    canvas.addEventListener('click', function(evt) {
        var pos = getMousePos(canvas, evt);
        for(var i=0;i<click_listeners.length;i++){
            click_listeners[i](pos);
        }
    }, false);
    canvas.addEventListener('contextmenu', function(evt) {
        evt.preventDefault();
        var pos = getMousePos(canvas, evt);
        for(var i=0;i<rclick_listeners.length;i++){
            rclick_listeners[i](pos);
        }
    }, false);

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        var x = evt.clientX - rect.left;
        var y = evt.clientY - rect.top;
        var cw = $(canvas).width();
        var ch = $(canvas).height();
        if(initW != cw || initH != ch){
            x = (x * initW) / cw;
            y = (y * initH) / ch;
        }


        return {
            x: x,
            y: y
        };
    }

    this.regMove = function(callback){
        move_listeners.push(callback);
    }
    this.regClick = function(callback){
        click_listeners.push(callback);
    }
    this.regRClick = function(callback){
        rclick_listeners.push(callback);
    }
    this.lastPos = function(){
        return last_pos;
    }
    this.reset = function(){
        move_listeners = [];
        click_listeners = [];
        rclick_listeners = [];
    }

    return this;
}

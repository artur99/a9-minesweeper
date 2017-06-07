var Handlers = function(canvas){
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
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
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

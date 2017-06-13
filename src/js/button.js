var Button = function(ctx, utils, data){
    var ctx = ctx;
    var handlers = utils.handlers;
    var w = utils.width;
    var h = utils.height;
    var loc_y = data.loc_y;
    var loc_x = false;
    if(typeof data.loc_x != 'undefined')
        loc_x = data.loc_x;
    var b_width_p = data.w;
    var b_size = data.size;
    var t_size = b_size;
    if(typeof data.t_size != 'undefined')
        t_size = data.t_size;
    var text = data.text;
    var img1 = data.img1;
    var img2 = img1;
    if(typeof data.img2 != 'undefined')
        var img2 = data.img2;
    var img1 = data.img1;
    var stroke = 4;
    if(typeof data.stroke != 'undefined')
        stroke = data.stroke;
    var color = data.color;
    var pattern1, pattern2;
    var graph = {
        w: 0,
        h: 0,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    };
    var click_sound = false;
    if(typeof data.click_sound != 'undefined')
        click_sound = data.click_sound;

    var init = function(){
        var center_line = loc_y * h;
        var ow = b_width_p*w;
        var top = center_line - b_size/2 - 10;
        var bottom = center_line + b_size/2 + 10;
        if(loc_x !== false){
            var left = loc_x*w;
            var right = loc_x*w + ow;
        }else{
            var left = (w-ow)/2;
            var right = w-left;
        }
        graph = {
            w: (right-left),
            h: (bottom-top),
            x1: left,
            y1: top,
            x2: right,
            y2: bottom
        };

        pattern1 = ctx.createPattern(img1, 'repeat');
        pattern2 = ctx.createPattern(img2, 'repeat');

        handlers.regClick(clicked);
    }

    this.draw = function(){

        ctx.beginPath();
        ctx.fillStyle = hovered()?pattern2:pattern1;
        ctx.fillRect(graph.x1, graph.y1, graph.w, graph.h);
        ctx.strokeStyle = color;
        ctx.lineWidth = stroke;
        ctx.strokeRect(graph.x1, graph.y1, graph.w, graph.h);
        ctx.beginPath();
        ctx.font = t_size.toString()+'px'+' Verdana';
        ctx.textAlign = "center";
        ctx.fillStyle = color;
        ctx.textBaseline="middle";
        ctx.fillText(text, (graph.x1+graph.x2)/2, (graph.y1+graph.y2)/2-5*(t_size/60));
        // ctx.closePath();
    }

    var clicked = function(mp){
        if(typeof data.callback != 'function')
            return;
        if(mp.x >= graph.x1 && mp.x <= graph.x2 && mp.y >= graph.y1 && mp.y <= graph.y2){
            setTimeout(function(){
                data.callback();
            }, 50);
        }
        if(click_sound){
            utils.audioPlayer.play('click', click_sound);
        }
    }
    var hovered = function(){
        var mp = handlers.lastPos();
        if(mp.x >= graph.x1 && mp.x <= graph.x2 && mp.y >= graph.y1 && mp.y <= graph.y2){
            return true;
        }
        return false;

    }
    this.reinit = function(){
        handlers.regClick(clicked);
    }


    // handlers.move(moved);
    init();
    return this;
}

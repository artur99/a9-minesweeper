var Drawer = function(ctx, w, h){
    var w = w;//utils.width;
    var h = h;//utils.height;

    this.clearRect = function(){
        ctx.clearRect(0, 0, w, h);
    }

    this.textCenter = function(text, top_prec, size, color, font, outer){
        if(typeof top_prec == 'undefined') top_prec = 0.1;
        if(typeof font != 'string') font = 'Verdana';
        if(typeof color != 'string') color = '#fff';
        if(typeof bold == 'undefined') bold = false;
        if(typeof size != 'string')
            if(typeof size == 'number')
                size = size.toString() + 'px';
            else
                size = '20px';

        ctx.beginPath();

        var fin_fnt = size+' '+font;
        ctx.font = fin_fnt;
        ctx.textAlign = "center";
        ctx.fillStyle = color;
        if(typeof text == 'object'){
            var data = text.data;
            if(typeof data == 'string'){
                data = data.split("\n");
            }
            for(var k in data){
                ctx.fillText(data[k], w/2, h*(top_prec+k*text.distance));
            }
        }else{
            ctx.fillText(text, w/2, h*top_prec);
        }
        if(outer){
            ctx.strokeStyle = color;
            ctx.lineWidth = outer === true?1:outer;
            ctx.strokeText(text, w/2, h*top_prec);
        }

        ctx.closePath();
    }

    this.text = function(text, x_p, y_p, color, size){
        if(typeof color != 'string') color = '#fff';
        if(typeof size != 'string')
            if(typeof size == 'number')
                size = size.toString() + 'px';
            else
                size = '20px';


        var fin_fnt = size+' Verdana';
        ctx.beginPath();
        ctx.font = fin_fnt;
        ctx.textAlign = "left";
        ctx.fillStyle = color;
        ctx.fillText(text, w*x_p, h*y_p);
    }

    this.rect = function(x_p, y_p, w_p, h_p, color){
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(x_p*w, y_p*h, w_p*w, h_p*h, color);

    }

    this.imgFull = function(img){
        ctx.drawImage(img, 0, 0, w, h);
    }

    return this;
}

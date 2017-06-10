var AnimationSprite = function(frame_w, frame_h, frames, ms_duration){
    var frame_w = frame_w;
    var frame_h = frame_h;
    var frames = frames;
    var ms_duration = ms_duration / frames;
    var delta_bg = 0;

    this.getCoords = function(delta){
        var frame = parseInt(delta_bg / ms_duration);
        if(frame >= frames){
            return false;
        }
        var rsp = {
            sx: frame_w*frame,
            sy: 0,
            sw: frame_w,
            sh: frame_h
        };
        // console.log(rsp);
        delta_bg += delta;
        return rsp;
    }

    return this;
}

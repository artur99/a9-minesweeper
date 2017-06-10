var AnimationOpacity = function(start_o, stop_o, ms_duration){
    var delta_bg = 0;

    this.getOpacity = function(delta){
        var frame_perc = Math.round((delta_bg / ms_duration)*100)/100;
        if(frame_perc > 1){
            return stop_o;
        }
        var rsp = Math.round((start_o + frame_perc * (stop_o - start_o))*100)/100;

        delta_bg += delta;
        return rsp;
    }

    return this;
}

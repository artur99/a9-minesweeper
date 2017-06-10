var audioPlayer = function(){
    var started = 1;
    
    this.play = function(audio_obj){
        audio_obj.currentTime = 0
        audio_obj.play();
    }



    return this;
}

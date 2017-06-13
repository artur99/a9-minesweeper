var audioPlayer = function(storage){
    var players = {};
    var mute = 0;

    var init = function(){
        var mt = storage.get('mute').toString();
        if(mt === "1" || mt === "0"){
            mute = parseInt(mt);
        }
    }

    this.play = function(id, audio_obj, loop, volume){
        if(typeof audio_obj == 'undefined' || audio_obj === null){
            return;
        }
        players[id] = audio_obj;
        if(mute){
            audio_obj.volume = 0
        }else if(typeof volume != 'undefined'){
            audio_obj.volume = volume;
            audio_obj.persistent_volume = volume;
        }
        audio_obj.currentTime = 0
        audio_obj.play();

        if(typeof loop != 'undefined' && loop){
            audio_obj.ended = function(e){
                audio_obj.currentTime = 0;
                audio_obj.play();
            }
            audio_obj.onerror = function(e){
                audio_obj.play();
            }
        }
    }

    this.toggleMute = function(){
        console.log("Changing mute to: "+(1-mute));
        if(mute == 0){
            mute = 1;
            for(var i in players){
                players[i].volume = 0;
            }
        }else{
            mute = 0;
            for(var i in players){
                if(typeof players[i].persistent_volume != 'undefined'){
                    players[i].volume = players[i].persistent_volume;
                }else{
                    players[i].volume = 1;
                }
            }
        }
        storage.set('mute', mute);
    }


    init();

    return this;
}

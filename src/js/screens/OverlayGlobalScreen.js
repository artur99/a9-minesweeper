function OverlayGlobalScreen(ctx, utils, changeMenu){
    var ctx = ctx;
    var res = utils.resources;
    var w = utils.width;
    var h = utils.height;
    var d = utils.drawer;
    var changeMenu = changeMenu;
    var btns;

    var started = 0;

    var datatxt;

    var init = function(){
        console.log('Started OverlayGlobalScreen');
    }

    this.start = function(){
        started = 1;
        btns = [];
        btns[0] = new Button(ctx, utils, {
            text: 'Mute',
            img1: res.get('btn1'),
            img2: res.get('btn2'),
            size: 6,
            t_size: 10,
            w: 0.07,
            loc_y: 0.03,
            loc_x: 0.925,
            color: '#fff',
            stroke: 1,
            callback: function(){
                utils.audioPlayer.toggleMute();
            }
        });
    }

    this.restart = function(){
        if(typeof btns != 'undefined')
            btns[0].reinit();
    }

    this.update = function(){
        if(started){
            btns[0].draw();
        }
    }


    init();
    return this;
}

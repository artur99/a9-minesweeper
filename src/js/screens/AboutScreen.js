function AboutScreen(ctx, utils, changeMenu){
    var ctx = ctx;
    var res = utils.resources;
    var w = utils.width;
    var h = utils.height;
    var d = utils.drawer;
    var changeMenu = changeMenu;
    var btns;

    var datatxt;

    var init = function(){
        res.preload('bg1', 'bg1.png');
        res.preload('btn1', 'bg_btn.png');
        res.preload('btn2', 'bg_btn2.png');
        console.log('Started help page');
    }

    this.start = function(){
        // d.clearRect();
        btns = [];
        btns[0] = new Button(ctx, utils, {
            text: 'Main Menu',
            img1: res.get('btn1'),
            img2: res.get('btn2'),
            size: 40,
            t_size: 30,
            w: 0.9,
            loc_y: 0.9,
            color: '#fff',
            callback: function(){
                changeMenu('mainMenu')
            }
        });
        datatxt = [
            'Game built by',
            'artur99',
            ' ',
            '- June 2017 -'
        ]
    }

    this.update = function(){
        d.clearRect();
        d.imgFull(res.get('bg1'));

        d.textCenter({
            data: datatxt,
            distance: 0.1
        }, 0.3, 35, '#fff');
        btns[0].draw();
        // d.img(res.get(''));
    }


    init();
    return this;
}

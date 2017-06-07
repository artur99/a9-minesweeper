function MainMenuScreen(ctx, utils, changeMenu){
    var ctx = ctx;
    var res = utils.resources;
    var w = utils.width;
    var h = utils.height;
    var d = utils.drawer;
    var changeMenu = changeMenu;

    var btns;

    var init = function(){
        res.preload('bg1', 'bg1.png');
        res.preload('btn1', 'bg_btn.png');
        res.preload('btn2', 'bg_btn2.png');
        console.log('Started main menu...');
    }

    this.start = function(){
        // d.clearRect();
        btns = [];
        btns[0] = new Button(ctx, utils, {
            text: 'Play',
            img1: res.get('btn1'),
            img2: res.get('btn2'),
            size: 60,
            t_size: 40,
            w: 0.7,
            loc_y: 0.4,
            color: '#fff',
            callback: function(){
                changeMenu('levels')
            }
        });
        btns[1] = new Button(ctx, utils, {
            text: 'Help',
            img1: res.get('btn1'),
            img2: res.get('btn2'),
            size: 60,
            t_size: 40,
            w: 0.7,
            loc_y: 0.6,
            color: '#fff',
            callback: function(){
                changeMenu('help')
            }
        });
        btns[2] = new Button(ctx, utils, {
            text: 'About',
            img1: res.get('btn1'),
            img2: res.get('btn2'),
            size: 60,
            t_size: 40,
            w: 0.7,
            loc_y: 0.8,
            color: '#fff',
            callback: function(){
                changeMenu('about')
            }
        });
    }

    this.update = function(){
        d.clearRect();
        d.imgFull(res.get('bg1'));
        d.textCenter('A9 MineSweeper', 0.15, 50, 'rgba(0, 0, 0, 0.3)', 'Verdana', 4);
        d.textCenter('A9 MineSweeper', 0.15, 50, '#fff');
        btns[0].draw();
        btns[1].draw();
        btns[2].draw();
        // d.img(res.get(''));
    }

    init();
    return this;
}

function HelpScreen(ctx, utils, changeMenu){
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
            'Hello! You need to click on all the empty',
            'places without clicking the mines.',
            'The numbers near the covered places',
            'show the number of mines around that',
            'point in all the 8 directions.',
            ' ',
            'If you click a mine, you\'l lose the game.'
        ]
    }

    this.update = function(){
        d.clearRect();
        d.imgFull(res.get('bg1'));

        d.textCenter({
            data: datatxt,
            distance: 0.07
        }, 0.2, 23, '#fff');
        btns[0].draw();
        // d.img(res.get(''));
    }


    init();
    return this;
}

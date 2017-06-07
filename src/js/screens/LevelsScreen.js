function LevelsScreen(ctx, utils, changeMenu){
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
        console.log('Started levels menu...');
    }

    this.start = function(){
        // d.clearRect();
        btns = [];
        btns[0] = new Button(ctx, utils, {
            text: 'Easy',
            img1: res.get('btn1'),
            img2: res.get('btn2'),
            size: 30,
            t_size: 26,
            w: 0.7,
            loc_y: 0.4,
            color: '#fff',
            callback: function(){
                utils.globals.difficulty = 1;
                changeMenu('game')
            }
        });
        btns[1] = new Button(ctx, utils, {
            text: 'Medium',
            img1: res.get('btn1'),
            img2: res.get('btn2'),
            size: 30,
            t_size: 26,
            w: 0.7,
            loc_y: 0.52,
            color: '#fff',
            callback: function(){
                utils.globals.difficulty = 2;
                changeMenu('game')
            }
        });
        btns[2] = new Button(ctx, utils, {
            text: 'Hard',
            img1: res.get('btn1'),
            img2: res.get('btn2'),
            size: 30,
            t_size: 26,
            w: 0.7,
            loc_y: 0.64,
            color: '#fff',
            callback: function(){
                utils.globals.difficulty = 3;
                changeMenu('game')
            }
        });
        btns[3] = new Button(ctx, utils, {
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
    }

    this.update = function(){
        var best;
        d.clearRect();
        d.imgFull(res.get('bg1'));
        d.textCenter('A9 MineSweeper', 0.15, 50, 'rgba(0, 0, 0, 0.3)', 'Verdana', 4);
        d.textCenter('A9 MineSweeper', 0.15, 50, '#fff');
        btns[0].draw();
        btns[1].draw();
        btns[2].draw();
        btns[3].draw();
        if(best = utils.storage.get('score1'))
            d.text('(Best: '+best+'s)', 0.65, 0.41, '#fff', 15);
        if(best = utils.storage.get('score2'))
            d.text('(Best: '+best+'s)', 0.65, 0.53, '#fff', 15);
        if(best = utils.storage.get('score3'))
            d.text('(Best: '+best+'s)', 0.65, 0.65, '#fff', 15);
        // d.img(res.get(''));
    }

    var play = function(){
        utils.changeTo('levels');
    }

    init();
    return this;
}

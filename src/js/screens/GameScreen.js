function GameScreen(ctx, utils, changeMenu){
    var ctx = ctx;
    var res = utils.resources;
    var w = utils.width;
    var h = utils.height;
    var d = utils.drawer;
    var changeMenu = changeMenu;

    var btns;
    var time_s;
    var time_e;
    var game;
    var diff = 0;

    var init = function(){
        res.preload('bg1', 'bg1.png');
        res.preload('terr', 'terr.png');
        res.preload('block_h', 'block_h.png');
        res.preload('flag', 'flag.png');

        console.log('Started game...');
    }

    this.start = function(){
        // d.clearRect();
        btns = [];
        time_s = new Date();
        time_e = false;
        diff = utils.globals.difficulty;
        if(diff == 1){
            game = new MineSweeperClass(ctx, utils, {
                num_x: 8,
                num_y: 8,
                size_sq: 40,
                mines: 8,
                center_x: w/2,
                center_y: h/2,
                terrain: res.get('terr'),
                block1: res.get('block_h'),
                flag: res.get('flag')
            });
        }else if(diff == 2){
            game = new MineSweeperClass(ctx, utils, {
                num_x: 12,
                num_y: 12,
                mines: 14,
                size_sq: 30,
                center_x: w/2,
                center_y: h/2,
                terrain: res.get('terr'),
                block1: res.get('block_h'),
                flag: res.get('flag')
            });
        }else if(diff = 3){
            game = new MineSweeperClass(ctx, utils, {
                num_x: 16,
                num_y: 16,
                mines: 25,
                size_sq: 20,
                center_x: w/2,
                center_y: h/2,
                terrain: res.get('terr'),
                block1: res.get('block_h'),
                flag: res.get('flag')
            });
        }
        btns[0] = new Button(ctx, utils, {
            text: 'Back',
            img1: res.get('btn1'),
            img2: res.get('btn2'),
            size: 20,
            t_size: 16,
            w: 0.15,
            loc_x: 0.77,
            loc_y: 0.9,
            color: '#fff',
            callback: function(){
                changeMenu('mainMenu');
            }
        });
    }

    this.update = function(){
        d.clearRect();
        d.imgFull(res.get('bg1'));
        d.textCenter('A9 MineSweeper', 0.08, 50, 'rgba(0, 0, 0, 0.3)', 'Verdana', 1);
        d.textCenter('A9 MineSweeper', 0.08, 50, '#fff');
        d.rect(0.08, 0.86, 0.15, 0.08, 'rgba(0, 0, 0, 0.3)');
        var te = new Date();
        if(time_e !== false)
            te = time_e;
        var time = parseInt((te-time_s)/1000);
        if(time<10) time = '00'+time;
        else if(time<100) time = '0'+time;
        else if(time>999) time = 999;
        d.text(time, 0.1, 0.9, '#fff', 30);
        btns[0].draw();

        game.draw();

    }

    function gameEnd(status){
        if(status == "won"){
            alert("Won!");
        }else{
            alert("OOver!")
        }
    }


    init();
    return this;
}

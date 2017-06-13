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
    var game_done;
    var gst;

    var init = function(){
        res.preload('bg1', 'bg1.png');
        res.preload('terr', 'terr.png');
        res.preload('block_h', 'block_h.png');
        res.preload('flag', 'flag.png');
        res.preload('bomb', 'bomb.png');
        res.preload('bomb_exploded', 'bomb_exploded.png');
        res.preload('explosion', 'explosion.png');
        res.preload('explosion_sprite', 'explosion_sprite.png');
        res.preload('audio_explosion', 'audio_explosion.mp3', 'audio');
        res.preload('audio_uncover', 'uncover.mp3', 'audio');

        console.log('Started game...');
    }

    this.start = function(){
        // d.clearRect();
        btns = [];
        time_s = new Date();
        time_e = false;
        game_done = 0;
        gst = false;
        diff = utils.globals.difficulty;
        if(diff == 1){
            game = new MineSweeperClass(ctx, utils, {
                num_x: 8,
                num_y: 8,
                size_sq: 40,
                mines: 8,
                center_x: w/2,
                center_y: h/2,
                img_terrain: res.get('terr'),
                img_block1: res.get('block_h'),
                img_flag: res.get('flag'),
                img_bomb: res.get('bomb'),
                img_bomb_exploded: res.get('bomb_exploded'),
                img_explosion: res.get('explosion'),
                img_explosion_sprite: res.get('explosion_sprite'),
                audio_explosion: res.get('audio_explosion'),
                audio_uncover: res.get('audio_uncover')
            });
        }else if(diff == 2){
            game = new MineSweeperClass(ctx, utils, {
                num_x: 12,
                num_y: 12,
                mines: 14,
                size_sq: 28,
                center_x: w/2,
                center_y: h/2,
                img_terrain: res.get('terr'),
                img_block1: res.get('block_h'),
                img_flag: res.get('flag'),
                img_bomb: res.get('bomb'),
                img_bomb_exploded: res.get('bomb_exploded'),
                img_explosion: res.get('explosion'),
                img_explosion_sprite: res.get('explosion_sprite'),
                audio_explosion: res.get('audio_explosion'),
                audio_uncover: res.get('audio_uncover')
            });
        }else if(diff = 3){
            game = new MineSweeperClass(ctx, utils, {
                num_x: 16,
                num_y: 16,
                mines: 25,
                size_sq: 21,
                center_x: w/2,
                center_y: h/2,
                img_terrain: res.get('terr'),
                img_block1: res.get('block_h'),
                img_flag: res.get('flag'),
                img_bomb: res.get('bomb'),
                img_bomb_exploded: res.get('bomb_exploded'),
                img_explosion: res.get('explosion'),
                img_explosion_sprite: res.get('explosion_sprite'),
                audio_explosion: res.get('audio_explosion'),
                audio_uncover: res.get('audio_uncover')
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
            stroke: 2,
            callback: function(){
                changeMenu('mainMenu');
            }
        });
    }

    this.update = function(delta){
        gst = game.getStatus();
        if(gst !== false && time_e === false){
            time_e = new Date();
            if(game_done == 0){
                game_done = 1;
                if(gst == 'won')
                    wonSave();
            }
        }

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

        if(gst){
            var txt2, colort;
            if(gst == 'won'){
                txt2 = 'You Won ('+parseInt(time)+'s)';
                colort = '#8cff12';
            }else{
                txt2 = 'Game Over!';
                colort = '#ff5c5c';
            }

            d.rect(0.3, 0.86, 0.4, 0.08, 'rgba(0, 0, 0, 0.3)');
            d.textCenter(txt2, 0.9, 20, colort, 'Verdana', 2);
        }

        btns[0].draw();

        game.draw(delta);

    }

    function gameEnd(status){
        if(status == "won"){
            alert("Won!");
        }else{
            alert("OOver!")
        }
    }
    function wonSave(){
        var df = diff;
        var tm = parseInt((time_e - time_s)/1000);
        var best = utils.storage.set('score'+df);
        if(best === false || tm < parseInt(best)){
            utils.storage.set('score'+df, tm);
        }
    }


    init();
    return this;
}

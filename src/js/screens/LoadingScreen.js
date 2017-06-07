function LoadingScreen(ctx, utils){
    var ctx = ctx;
    var res = utils.resources;
    var w = utils.width;
    var h = utils.height;
    var d = utils.drawer;

    // My local vars
    var l_st;

    var init = function(){
        res.preload('bg1', 'bg1.png');
    }

    this.start = function(){
        console.log('Initializing game...');

        l_st = 0;
    }

    this.update = function(){
        d.clearRect();
        d.imgFull(res.get('bg1'));
        d.textCenter('A9 MineSweeper', 0.4, 50, 'rgba(0, 0, 0, 0.3)', 'Verdana', 4);
        d.textCenter('A9 MineSweeper', 0.4, 50, '#fff');
        var l_txt = '.';
        if(l_st>10) l_txt +='.';
        if(l_st>20) l_txt +='.';
        if(l_st++>30) l_st = 0;
        d.textCenter('Loading'+l_txt, 0.6, 40, '#ddd');

    }

    init();
    return this;
}

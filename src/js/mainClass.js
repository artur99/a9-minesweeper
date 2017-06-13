function mainClass(canvas){
    var width = initWidth;
    var height = initHeight;

    var ctx = canvas.getContext("2d");
    var utils = {};
    var theInterval = null;
    var intervalTime = 50; //ms

    var resources;
    var handlers;
    var storage;
    var audio_player;
    var screens = {};
    var currentScreen;
    var delta_l;
    var delta;

    // this.reinitSize = function(){
    //     width = $(canvas).width();
    //     height = $(canvas).height();
    //     utils.width = width;
    //     utils.height = height;
    // }

    function init(){
        // this.reinitSize();
        utils = {
            width: width,
            height: height,
            globals: {}
        }
        resources = new resourceManager();
        handlers = new Handlers(canvas, initWidth, initHeight);
        drawer = new Drawer(ctx, width, height);
        storage = new Storage();
        audio_player = new audioPlayer(storage);

        utils.resources = resources;
        utils.handlers = handlers;
        utils.drawer = drawer;
        utils.storage = storage;
        utils.audioPlayer = audio_player;

        screens['loading'] = new LoadingScreen(ctx, utils, setScreenAux);
        screens['mainMenu'] = new MainMenuScreen(ctx, utils, setScreenAux);
        screens['about'] = new AboutScreen(ctx, utils, setScreenAux);
        screens['help'] = new HelpScreen(ctx, utils, setScreenAux);
        screens['levels'] = new LevelsScreen(ctx, utils, setScreenAux);
        screens['game'] = new GameScreen(ctx, utils, setScreenAux);
        screens['global'] = new OverlayGlobalScreen(ctx, utils, setScreenAux);

        currentScreen = 'loading';
    }
    function setScreenAux(scr){
        setScreen(scr);
    }

    this.run = function(){
        resources.load(loaded);
        setScreen(currentScreen);
        delta_l = new Date();
    }

    var loaded = function(){
        console.log("All loaded, ayy!");
        setTimeout(function(){
            screens['global'].start();
            setScreen('mainMenu');
        }, 1500);
    }

    var setScreen = function(screen){
        if(typeof screens[screen] == 'undefined')
            throw new Error('Sorry, no screen like this!');

        handlers.reset();
        console.log("Changing to "+screen+"...");

        currentScreen = screen;
        if(typeof screens[currentScreen].screenHandler == 'function'){
            screens[currentScreen].screenHandler(function(scr){
                setScreen(scr);
            });
        }
        screens[currentScreen].start();
        screens['global'].restart();

        if(theInterval != null){
            clearInterval(theInterval);
        }

        theInterval = setInterval(function(){
            delta = new Date() - delta_l;
            delta_l = new Date();
            screens[currentScreen].update(delta);
            screens['global'].update(delta);
        }, intervalTime);
    }

    init();
    return this;
}

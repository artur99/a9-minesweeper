function mainClass(canvas){
    var width = $(canvas).width();
    var height = $(canvas).height();

    var ctx = canvas.getContext("2d");
    var utils = {
        width: width,
        height: height,
        globals: {}
    };
    var theInterval = null;
    var intervalTime = 50; //ms

    var resources;
    var handlers;
    var screens = {};
    var currentScreen;

    function init(){
        resources = new resourceManager();
        handlers = new Handlers(canvas);
        drawer = new Drawer(ctx, width, height);

        utils.resources = resources;
        utils.handlers = handlers;
        utils.drawer = drawer;

        screens['loading'] = new LoadinScreen(ctx, utils, setScreenAux);
        screens['mainMenu'] = new MainMenuScreen(ctx, utils, setScreenAux);
        screens['about'] = new AboutScreen(ctx, utils, setScreenAux);
        screens['help'] = new HelpScreen(ctx, utils, setScreenAux);
        screens['levels'] = new LevelsScreen(ctx, utils, setScreenAux);
        screens['game'] = new GameScreen(ctx, utils, setScreenAux);

        currentScreen = 'loading';
    }
    function setScreenAux(scr){
        setScreen(scr);
    }

    this.run = function(){
        resources.load(loaded);
        setScreen(currentScreen);
    }

    var loaded = function(){
        console.log("All loaded, ayy!");
        setTimeout(function(){
            setScreen('mainMenu');
        }, 1500);
    }

    var setScreen = function(screen){
        if(typeof screens[screen] == 'undefined')
            throw new Error('Sorry, no screen like this!');

        handlers.reset();
        console.log("changing to "+screen);

        currentScreen = screen;
        if(typeof screens[currentScreen].screenHandler == 'function'){
            screens[currentScreen].screenHandler(function(scr){
                setScreen(scr);
            });
        }
        screens[currentScreen].start();

        if(theInterval != null){
            clearInterval(theInterval);
        }

        theInterval = setInterval(screens[currentScreen].update, intervalTime);
    }

    init();
    return this;
}

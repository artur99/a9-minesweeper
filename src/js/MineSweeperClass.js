function MineSweeperClass(ctx, utils, data){
    var data = data;
    var start_x;
    var start_y;
    var width;
    var height;
    var size_sq;

    var matrix_human;
    var matrix_real;
    var flags;
    var game_status;

    var pattern1;

    var init = function(){
        width = data.size_sq * data.num_x;
        height = data.size_sq * data.num_y;
        start_x = data.center_x - width/2;
        start_y = data.center_y - height/2;
        size_sq = data.size_sq;

        game_status = false;
        generateMatrixes();

        pattern1 = ctx.createPattern(data.terrain, 'repeat');

        utils.handlers.regClick(click);
        utils.handlers.regRClick(rclick);

    }

    this.draw = function(){
        ctx.beginPath();
        ctx.fillStyle = pattern1;
        ctx.fillRect(start_x, start_y, width, height);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(start_x, start_y, width, height);
        ctx.beginPath();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        for(var i=0;i<data.num_x;i++){
            for(var j=0;j<data.num_y;j++){
                // console.log(matrix_human, matrix_real);
                if(matrix_human[i][j] == -2){

                    ctx.drawImage(data.block1, (start_x + i*size_sq)+2, (start_y + j*size_sq)+2, size_sq-4, size_sq-4);
                    ctx.strokeRect((start_x + i*size_sq)+2, (start_y + j*size_sq)+2, size_sq-4, size_sq-4);
                    if(flags[i][j] == 1){
                        ctx.drawImage(data.flag, (start_x + i*size_sq)+5, (start_y + j*size_sq)+5, size_sq-10, size_sq-10);
                    }
                }else if(matrix_human[i][j] > 0){
                    ctx.font = '600 17px Verdana';
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    if(matrix_human[i][j] == 1)
                        ctx.fillStyle = '#5ab9ff';
                    else if(matrix_human[i][j] == 2)
                        ctx.fillStyle = '#8cff12';
                    else
                        ctx.fillStyle = '#ff5c5c';
                    ctx.fillText(matrix_human[i][j], start_x + (i+1/2)*size_sq, start_y + (j+1/2)*size_sq);
                }
            }
        }
        ctx.closePath();
    }

    var click = function(pos){
        var x = pos.x;
        var y = pos.y;
        if(x >= start_x && x <= start_x+width && y >= start_y && y <= start_y + height){
            x = x - start_x;
            y = y - start_y;
            var px = parseInt(x / size_sq);
            var py = parseInt(y / size_sq);
            handlePos(px, py);
        }
    }

    var rclick = function(pos){
        var x = pos.x;
        var y = pos.y;
        if(x >= start_x && x <= start_x+width && y >= start_y && y <= start_y + height){
            x = x - start_x;
            y = y - start_y;
            var px = parseInt(x / size_sq);
            var py = parseInt(y / size_sq);
            handlePosFlag(px, py);
        }
    }

    var handlePos = function(x, y){
        if(matrix_real[x][y] == 1){
            return gameOver(x, y);
        }else if(matrix_human[x][y] == -2){
            recursiveFill(x, y, 0);
        }
        checkWon();
    }
    var handlePosFlag = function(x, y){
        if(countFlags() >= data.mines){
            return;
        }
        if(matrix_human[x][y] == -2){
            flags[x][y] = !(flags[x][y]);
        }
    }
    var countFlags = function(){
        var x = data.num_x;
        var y = data.num_y;
        var s = 0;
        for(var i=0;i<x;i++)
            for(var j=0;j<y;j++)
                s+=flags[i][j];
        return s;
    }

    var recursiveFill = function(x, y, pp){
        if(
            typeof matrix_human[x] == 'undefined' ||
            typeof matrix_human[x][y] == 'undefined' ||
            matrix_human[x][y] != -2 ||
            matrix_real[x][y] == 1
        ){
            return;
        }
        var pp2;
        console.log("Checking "+x+" "+y);
        var mar = minesAround(x, y);
        if(mar > 0 && pp == 1){
            //We've gone too far on dangerous area
            return;
        }
        matrix_human[x][y] = mar;
        flags[x][y] = 0;
        if(mar == 0) pp2 = 0;
        else{
            pp2 = 1;
            return;
        }
        if(pp == 0){
            for(var i=-1;i<=1;i++)
                for(var j=-1;j<=1;j++)
                    if(!(i==0 && j==0))
                        recursiveFill(x+i, y+j, pp2);
            return;
        }
    }

    var minesAround = function(x, y){
        var s = 0;
        for(var i=-1;i<=1;i++){
            for(var j=-1;j<=1;j++){
                if(!(i == 0 && j == 0) && typeof matrix_real[x+i] != 'undefined' && typeof matrix_real[x+i][y+j] != 'undefined'){
                    s+= matrix_real[x+i][y+j];
                }
            }
        }
        return s;
    }

    var generateMatrixes = function(){
        matrix_human = [];
        matrix_real = [];
        flags = [];

        var x = data.num_x;
        var y = data.num_y;

        for(var i=0;i<x;i++){
            matrix_human[i] = [];
            matrix_real[i] = [];
            flags[i] = [];
            for(var j=0;j<y;j++){
                matrix_real[i][j] = 0;
                flags[i][j] = 0;
                matrix_human[i][j] = -2;
            }
        }
        var fields = x*y;
        var mines = data.mines;//parseInt(Math.sqrt(fields)*fields/64);
        for(var i=0;i<mines;i++){
            var k1 = parseInt(Math.random() * x);
            var k2 = parseInt(Math.random() * y);
            matrix_real[k1][k2] = 1;
        }
    }

    var checkWon = function(){
        var x = data.num_x;
        var y = data.num_y;
        var won = 1;
        for(var i=0;i<x;i++){
            for(var j=0;j<y;j++){
                console.log(matrix_real[i][j], matrix_human[i][j]);
                if(matrix_real[i][j] == 0 && matrix_human[i][j] == -2){
                    won = 0;
                }
            }
        }
        if(won) gameWon();
        return won;

    }

    this.setEndCallback = function(won_cb){
        won_cb = won_cb;
    }

    var gameOver = function(x, y){
        // alert('game over');
        won_cb('lost');
    }
    var gameWon = function(x, y){
        // alert('You won the game! :D');
        won_cb('won');
    }

    init();
    return this;
}

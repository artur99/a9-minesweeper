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
    var game_done;
    var clicked_bomb;

    var pattern1;
    var animations;

    var init = function(){
        width = data.size_sq * data.num_x;
        height = data.size_sq * data.num_y;
        start_x = data.center_x - width/2;
        start_y = data.center_y - height/2;
        size_sq = data.size_sq;

        game_status = false;
        game_done = false;
        clicked_bomb = {x:-1,y:-1,exploding:0};
        animations = [];
        generateMatrixes();

        pattern1 = ctx.createPattern(data.img_terrain, 'repeat');

        utils.handlers.regClick(click);
        utils.handlers.regRClick(rclick);

    }

    this.draw = function(delta){
        // console.log(delta);
        var sz1, sz2, sz3, an1, op1;
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
                    sz1 = imgSize(i, j, size_sq, 0.9, start_x, start_y);
                    ctx.drawImage(data.img_block1, sz1.start_x, sz1.start_y, sz1.size_x, sz1.size_y);
                    ctx.strokeRect(sz1.start_x, sz1.start_y, sz1.size_x, sz1.size_y);
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
                if(game_status == 'lost' && matrix_real[i][j] == 1){
                    // If game is lost, we will draw the mines and the explosion
                    if(i == clicked_bomb.x && j == clicked_bomb.y){
                        //draw the exploded behind
                        sz2 = imgSize(i, j, size_sq, 0.7, start_x, start_y);
                        ctx.save();
                        console.log(animations['opacity'].getOpacity(delta));
                        ctx.globalAlpha = animations['opacity'].getOpacity(delta);
                        ctx.drawImage(data.img_bomb_exploded, sz2.start_x, sz2.start_y, sz2.size_x, sz2.size_y);
                        ctx.restore();

                        //Draw the explosion animation
                        sz2 = imgSize(i, j, size_sq, 0.8, start_x, start_y);
                        an1 = animations['explosion'].getCoords(delta);
                        if(an1){
                            ctx.drawImage(data.img_explosion_sprite, an1.sx, an1.sy, an1.sw, an1.sh, sz2.start_x, sz2.start_y, sz2.size_x, sz2.size_y);
                        }
                    }else{
                        sz2 = imgSize(i, j, size_sq, 0.7, start_x, start_y);
                        ctx.drawImage(data.img_bomb, sz2.start_x, sz2.start_y, sz2.size_x, sz2.size_y);
                    }
                }
                if(flags[i][j] == 1 && matrix_human[i][j] == -2){
                    // Draw the set flags
                    sz3 = imgSize(i, j, size_sq, 0.75, start_x, start_y);
                    ctx.drawImage(data.img_flag, sz3.start_x, sz3.start_y, sz3.size_x, sz3.size_y);
                }
            }
        }
        ctx.closePath();
    }

    var imgSize = function(field_number_x, field_number_y, full_size, scale_size, add_to_x, add_to_y){
        var min_size = full_size * scale_size;
        var m_around = (full_size - min_size)/2;
        var start_x = field_number_x*full_size + m_around;
        var size_x = min_size;
        var start_y = field_number_y*full_size + m_around;
        var size_y = min_size;
        if(typeof add_to_x != 'number')
            add_to_x = 0;
        if(typeof add_to_y != 'number')
            add_to_y = 0;
        return {
            start_x: start_x + add_to_x,
            size_x: size_x,
            start_y: start_y + add_to_y,
            size_y: size_y
        };
    }

    var click = function(pos){
        if(game_done) return;
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
        if(game_done) return;
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
        if(flags[x][y] == 1){
            return;
        }
        if(matrix_real[x][y] == 1){
            flags[x][y] = 0;
            matrix_human[x][y] = minesAround(x, y);
            return gameOver(x, y);
        }else if(matrix_human[x][y] == -2){
            recursiveFill(x, y, 0);
        }
        checkWon();
    }

    var handlePosFlag = function(x, y){
        var hasFlag = flags[x][y];
        if(!hasFlag && countFlags() >= data.mines){
            return;
        }
        if(matrix_human[x][y] == -2){
            flags[x][y] = !(hasFlag);
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
        // console.log("Checking "+x+" "+y);
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
                // console.log(matrix_real[i][j], matrix_human[i][j]);
                if(matrix_real[i][j] == 0 && matrix_human[i][j] == -2){
                    won = 0;
                }
            }
        }
        if(won) gameWon();
        return won;

    }

    var gameOver = function(x, y){
        clicked_bomb.x = x;
        clicked_bomb.y = y;
        clicked_bomb.exploding = 1;
        animations['explosion'] = new AnimationSprite(74, 74, 11, 800);
        animations['opacity'] = new AnimationOpacity(0, 1, 800);
        utils.audioPlayer.play(data.audio_explosion);
        // data.audio_explosion.currentTime = 0
        // data.audio_explosion.play();
        game_done = true;
        game_status = 'lost';
    }
    var gameWon = function(x, y){
        game_done = true;
        game_status = 'won';
    }

    this.getStatus = function(){
        return game_status;
    }

    init();
    return this;
}

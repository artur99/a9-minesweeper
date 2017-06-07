var Storage = function(){

    this.set = function(name, value){
        if(typeof value == 'undefined'){
            return false;
        }
        if(typeof value == 'object'){
            value = JSON.stringify(value);
        }

        localStorage.setItem(name, value);
        return true;
    }
    this.get = function(name){
        var val = localStorage.getItem(name);
        if(val === null || typeof val == 'undefined'){
            return false;
        }
        try{
        	return JSON.parse(val);
        }catch(e){
        	return val;
        }
    }
    return this;
}

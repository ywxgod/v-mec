export class ObjUtil{

    static uuid(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    static clone(obj) {
        var copy;
    
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;
    
        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
    
        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }
    
        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }
    
        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    static isArray(obj){
        return Array.isArray?Array.isArray(obj):(Object.prototype.toString.call(obj) === '[object Array]');
    }
    static isDate(obj){
        return obj instanceof Date;
    };

    static isFun(obj){
        return typeof obj === 'function';
    }

    static partial(){
		let args = Array.from(arguments);
		let fun = args[0];
		args.shift();
		if(typeof fun !== 'function') {return;}
		return function(){
			return fun.apply(this, [...args,...arguments]);
		};
	}

	static single(source){
		var instance = null;
		var t = function(config){
			if (!instance)
				instance = new source(config);
			return instance;
		};
		t.prototype = source.prototype;
		t.prototype.constructor = source;
		return t;
	}

}
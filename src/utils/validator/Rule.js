import { ObjUtil } from "../ObjUtil";

export class Rule{

    constructor(opts){
        let {errMsg, type, trigger, validFun, args} = opts;
        this.errMsg = errMsg||'Error Occurred';
        this.type = type;
        this.trigger = trigger;
        this.validFun = validFun;
        this.args = args||[];
    }

    static clone(){

        let args = ObjUtil.clone(this.args);
        let opts = {
            message: this.errMsg,
            type: this.type,
            trigger: this.trigger,
            validFun: this.validFun,
            args
        };
        return new Rule(opts);
    }

    update(vo){
        if(!vo) return;
        let keys = Object.keys(vo);
        keys.forEach(key=>{
            if(this.hasOwnProperty(key)){
                this[key] = vo[key];
            }
        });
    }



}
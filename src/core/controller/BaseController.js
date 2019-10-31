import { EventBus } from "../event/EventBus";

export class BaseController{

    constructor(){
        this._evtBus = new EventBus();
    }

    listen(eType, handler){
        return this._evtBus.on(eType, handler);
    }

    ignore(token){
        return this._evtBus.un(token);
    }

    ignoreAll(){
        this._evtBus.unAll();
    }

    fire(eType, ...rest){
        return this._evtBus.emit(eType, ...rest);
    }

    init(){

    }

    destroy(){
        
    }

}
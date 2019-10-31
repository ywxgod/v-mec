import { ObjUtil } from "../../utils/ObjUtil";

export class EventDispatcher{
    
    constructor(){
        this._listeners = {};
    }
	
	on(eType,handler){
		if(typeof this._listeners[eType] === 'undefined'){
			this._listeners[eType] = [];
		}
		let token = ObjUtil.uuid();
		this._listeners[eType].push({
			token:token,
			handler:handler
		});
		return token;
	};
	
	un(token){
		if(!token) {return false;}
		for(let i in this._listeners){
			let handlers = this._listeners[i];
			if(!handlers) {continue;}
			let n = handlers.length;
			for(let j=0;j<n;j++){
				let handler = handlers[j];
				if(handler.token === token){
					handlers.splice(j,1);
					return true;
				}
			}
		}
		return false;
	};
	
	unAll(eType){
		if(eType) {
			delete this._listeners[eType];
		}else{
			this._listeners = {};
		}
	};
	
	emit(eType,...args){
		let handlers = this._listeners[eType];
		if(!handlers){return false;}
		let n = handlers.length;
		for(let i=0;i<n;i++){
			let handler = handlers[i];
			handler.handler.apply(null,args);
		}
		return true;
	};
}
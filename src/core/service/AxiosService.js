import { BaseService } from './BaseService';
import axios from 'axios';

let methods = ['get','post','delete','put','option','head'];

export class AxiosService extends BaseService{

    static _defaults = {
        timeout: 300000
    };

    static get defaults(){
        return AxiosService._defaults;
    };
    static set defaults(value){
        AxiosService._defaults = Object.assign(AxiosService._defaults, value);
    }

    constructor(){
        super(...arguments);
        this._axios = axios.create(Object.assign({},AxiosService.defaults));
    }

    promise(url,method='get'){
        method = method.toLocaleLowerCase();
        if(!~methods.indexOf(method)){
            throw new Error('invalid method '+ method);
        }
        let data = arguments[2]||{};
        let config = arguments[3]||{};
        return this._axios[method](url,data,config);
    }

    send(url,method='get'){
        let promise = this.promise(...arguments);
        return promise
            .then(response=>{
                return this.cmd.success(response);
            })
            .catch(error=>{
                return this.cmd.fail(error);
            });
    }

    ajax(url,method='get'){
        let promise = this.promise(...arguments);
        return function(success,fail,context){
            context = context||null;
            return promise
                .then(response=>{
                    success&&success.call(context,response);
                    promise = null;
                })
                .catch(error=>{
                    fail&&fail.call(context,error);
                    promise = null;
                });
        }
    }


}
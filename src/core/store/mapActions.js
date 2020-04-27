import {BaseCommand} from "../command/BaseCommand";

/**
 *
 * wyin
 * 4/27 027
 *
 */
export default function(actions) {
    let re = {};
    let keys = Object.keys(actions);
    keys.forEach(key=>{
        if(typeof actions[key] === 'function'){
            let actionsFun = actions[key];
            if(actionsFun.prototype instanceof BaseCommand){
                re[key] = function(){
                    return actionsFun.exec(...arguments);
                };
            }else{
                re[key] = actionsFun;
            }
        }else{
            console.log(`无效的actions：${key}`);
        }
    });
    return re;
}
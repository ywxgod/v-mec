export class Rules{

    required(form){
        return (rule, value, callback)=>{
            let { errMsg } = rule;
            if( !value || value.length===0 ){
                callback(new Error(errMsg||'必填项'));
                return;
            }
            callback();
        };
    }

    stringLength(form, min, max){
        return (rule, value, callback)=>{
            let { errMsg } = rule;
            if(value.length<min||value.length>max){
                callback(new Error(errMsg||`长度需在${min}与${max}之间`));
                return;
            }
            callback();
        }
    }


}
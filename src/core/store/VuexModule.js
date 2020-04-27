import { BaseCommand } from '../command/BaseCommand';
import mapActions from "./mapActions";

/**
 * @author Weixiong.Yin
 * @description 封装vuex的store模块，减少固定的set，get操作。
 * @export
 * @class VuexModule
 */
export class VuexModule{

    constructor(name,opt){
        let {state,actions,getters,mutations,namespaced=true} = opt;
        this.state = state||{};
        this.name = name;
        this.namespaced = namespaced;
        this.getters = this.mapGetters(state, getters||{});
        this.mutations = this.mapMutations(state, mutations||{});
        this.actions = this.mapActions(actions||{});
    }


    /**
     * 根据传入的getters与state转换成真正vuex使用的getters
     *
     * 如:
     * state={a:1,b:2,c:3};
     * gettersOpt={
     *      a: (state,id) => {return state.users.find(i=>i.id===id)},
     *      d: (state) => {return state.user.name}
     * }
     * 
     * 最终的getters：
     * 
     * {
     *      a: gettersOpt.a,
     *      b: state => {return state.b},
     *      c: state => {return state.c},
     *      d: gettersOpt.d
     * }
     * 
     * 
     * @param {*} state 
     * @param {*} getters 传入的getters
     * @returns getters
     * @author Weixiong.Yin
     * @memberof VuexModule
     * 
     */
    mapGetters(state, getters){
        let re = {};
        let keys = Object.keys(state);
        keys.forEach(key=>{
            // 存在于state，不存在于getters
            if(!getters.hasOwnProperty(key)){
                re[key] = state => {
                    return state[key];
                }
            }else{
                // 存在于state，且存在于getters，且值是函数
                if(typeof getters[key] === 'function'){
                    re[key] = getters[key];
                    delete getters[key];
                }else{
                    console.log(`无效的getters：${key}`);
                }
            }
        });

        // 不存在于state，存在于getters
        keys = Object.keys(getters);
        keys.forEach(key=>{
            if(typeof getters[key] === 'function'){
                re[key] = getters[key];
            }else{
                console.log(`无效的getters：${key}`);
            }
        });

        return re;
    }



    /**
     *
     * 转换传入的mutations
     * 
     * 如：
     * state = {a:1,b:2,c:3}
     * mutationsOpt = {
     *      a: (state, value) => {state.a = Object.assign({},state.a,value)},
     *      d: (state, value) => {state.b = value}
     * }
     * 最终的mutations：
     * {
     *      setA: mutationsOpt.a,
     *      setB: (state, value) => {state.b=value;}
     *      setC: (state, value) => {state.c=value;}
     *      d: mutationsOpt.d
     * }
     * 
     * @author Weixiong.Yin
     * @param {*} state
     * @param {*} mutations
     * @memberof VuexModule
     */
    mapMutations(state, mutations){
        let re = {};
        let keys = Object.keys(state);
        keys.forEach(key=>{

            // 存在于state，不存在于mutations

            // 改变state属性名称为setXXX
            let prop = 'set'+key[0].toLocaleUpperCase()+key.slice(1);
            if(!mutations.hasOwnProperty(key)){
                re[prop] = (state,value) => {
                    state[key] = value;
                }
            }else{
                // 存在于state，且存在于mutations，且值是函数
                if(typeof mutations[key] === 'function'){
                    re[prop] = mutations[key];
                    delete mutations[key];
                }else{
                    console.log(`无效的mutations：${key}`);
                }
            }
        });

        // 不存在于state，存在于mutations
        keys = Object.keys(mutations);
        keys.forEach(key=>{
            if(typeof mutations[key] === 'function'){
                re[key] = mutations[key];
            }else{
                console.log(`无效的mutations：${key}`);
            }
        });

        return re;
    }

    mapActions(actions){
        return mapActions(actions);
    }

}
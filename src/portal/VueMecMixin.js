import { VueComponentController } from "./VueComponentController";

export const VueMecMixin = {

    props:{
        listenResize: {type:Boolean, default: false}
    },

    created(){
        this.__ctrl = new VueComponentController(this);
    },

    methods: {
        $onWindowResize(){

        },
        $listen(eType, handler){
            return this.__ctrl.listen(eType, handler);
        },
        $ignore(token){
            return this.__ctrl.ignore(token);
        },
        $ignoreAll(){
            this.__ctrl.ignoreAll();
        },
        $fire(eType, ...rest){
            return this.__ctrl.fire(eType, ...rest);
        }
    },

    mounted(){
        this.__ctrl.init();
    },

    beforeDestroy(){
        this.__ctrl.destroy();
        this.__ctrl = null;
    }

};
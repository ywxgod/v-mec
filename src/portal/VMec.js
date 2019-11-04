import { VMecMixin } from "./VMecMixin";

export default {
    installed: false,
    install(Vue, option){
        if(this.installed) return;
        Vue.mixin(VMecMixin);
        this.installed = true;
    }
}
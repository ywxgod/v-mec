import { VueMecMixin } from "./VueMecMixin";

export default {
    installed: false,
    install(Vue, option){
        if(this.installed) return;
        Vue.mixin(VueMecMixin);
        this.installed = true;
    }
}
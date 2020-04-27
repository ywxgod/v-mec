import {EventBus} from "../core/event/EventBus";

export default {
    installed: false,
    install(Vue, option){
        if(this.installed) return;
        Vue.prototype.$eventBus = new EventBus();
        this.installed = true;
    }
}
import { BaseController } from "../core/controller/BaseController";

export class VueComponentController extends BaseController{
    constructor(vm){
        super();
        this._vm = vm;
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    init(){
        // listenResize属性为true时添加resize事件监听
        this._vm.listenResize && window.addEventListener('resize', this.onWindowResize);
        this.onWindowResize();
    }

    onWindowResize(){
        this._vm.$onWindowResize();
    }

    destroy(){
        this._vm = null;
        window.removeEventListener('resize', this.onWindowResize);
        this.onWindowResize = null;
    }
}
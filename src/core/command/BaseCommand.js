export class BaseCommand{

    static exec(...rest){
        let Clazz = this;
        if(!(Clazz.prototype instanceof BaseCommand)){
            throw new Error('未知类型的Command');
        }
        let cmd = new Clazz();
        return cmd.execute.apply(cmd, rest);
    }

    execute(){

    }

}
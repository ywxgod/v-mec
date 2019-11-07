import { BaseCommand } from "./BaseCommand";
import { AxiosService } from "../service/AxiosService";

export class AsyncCommand extends BaseCommand{

    get service(){
        return new AxiosService(this);
    }

    success(response){
        return response;
    }

    fail(error){
        console.log(error);
    }

}
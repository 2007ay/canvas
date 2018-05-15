

import {Injectable} from "@angular/core";

@Injectable()
export class Config{

    public baseUrl :string;

    constructor()
    {
          this.baseUrl = "http://192.168.25.121:7080/";
         
    }
}

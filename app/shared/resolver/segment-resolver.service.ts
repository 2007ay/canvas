import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

// import { IProduct } from './product';
// import { ProductService } from './product.service';
import { SegmentModel } from '../models/segment.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';


@Injectable()
export class SegmentResolver implements Resolve<SegmentModel>{

    data:SegmentModel;

    constructor(private router:Router){
    }

    private dataMessenger = new Subject<any>();
      setData(newData: any) {
        this.dataMessenger.next(newData);
        this.data = newData;
      }


    resolve(route:ActivatedRouteSnapshot,
            state:RouterStateSnapshot):SegmentModel{
               return this.data;
}

}
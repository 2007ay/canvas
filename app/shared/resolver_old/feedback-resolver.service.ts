import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

// import { IProduct } from './product';
// import { ProductService } from './product.service';
import { ActualFeedbackModel } from '../models/feedback.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';


@Injectable()
export class FeedbackResolver implements Resolve<ActualFeedbackModel>{

  data: ActualFeedbackModel;
  totalResult:number;

  constructor(private router: Router) {
  }

  private dataMessenger = new Subject<any>();

  setData(newData: any) {
    this.dataMessenger.next(newData);
    this.data = newData;
  }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): ActualFeedbackModel {
    return this.data;
  }

}

	import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';
import {  SearchSegmentModel } from "../models/searchsegment.model";
// import { DragDrop } from '../models/search.model';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Config } from "../../config/config";
import { FeedbackModel, MarkRelevance } from "../models/feedback.model";

@Injectable()
export class SegmentSearchImageService {


  ourUrl: string;

  constructor(private http: Http,
    private authenticationService: AuthenticationService,
    private slimLoadingBarService: SlimLoadingBarService,
    private config: Config) { }


  public authorizationHeader() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer' + this.authenticationService.tokenData.access_token
    })
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  //load more images
  loadMoreImages(count: Number) {
    let url = `${this.config.baseUrl}stss/loadmoreimages/${count}`;
    return this.http.get(url, this.authorizationHeader()).map((response: Response) => response.json());
  }

  SearchImagee(createSearchObject: SearchSegmentModel) {

    this.ourUrl = `${this.config.baseUrl}stss/segmentimagesearch`;
    let data = JSON.stringify(createSearchObject);

    return this.http.post(this.ourUrl, data, this.authorizationHeader())
      .map((response: Response)=>  {

        let x = response.json();
        if (response.status == 200 && x.results) {
        //  console.log(x);
          return x;
        }
        else {
          return false;
        }
      });
  }

 /* SegementImages(formData: FormData) {
    
       // this.ourUrl = "http://192.168.25.142:9090/segments";

        let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'bearer' + this.authenticationService.tokenData.access_token
        })
    

        let options = new RequestOptions({
          headers: headers
        })

        return this.http.post(this.ourUrl, formData, options)
          .map((response: Response)=>  {
    
            let x = response.json();
            if (response.status == 200 && x.results) {
              console.log(x);
              return x;
            }
            else {
              return false;
            }
          });
      }
*/
MarkRelevance(MarkRelevance: MarkRelevance) {
  this.ourUrl = `${this.config.baseUrl}stss/relevance`;

  let headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'bearer' + this.authenticationService.tokenData.access_token
  })


  let data = JSON.stringify(MarkRelevance);

  let options = new RequestOptions({
    headers: headers
  })

  return this.http.post(this.ourUrl, data, options)
    .map((response: Response) => {
      //  console.log(response);
      if (response.status == 201) {
        return true;
      }
      else {
        return false;
      }
    }
    );
}

}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';
import { FeedbackModel, MarkRelevance } from "../models/feedback.model";
import { DragDrop } from '../models/search.model';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Config } from "../../config/config";


@Injectable()
export class SearchImageService {


  ourUrl: string;

  constructor(private http: Http,
    private authenticationService: AuthenticationService,
    private slimLoadingBarService: SlimLoadingBarService,
    private config: Config) { }


  public authorizationHeader() {
    let headers = new Headers({ 'Authorization': 'bearer' + this.authenticationService.tokenData.access_token })
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  //load more images
  loadMoreImages(count: Number) {
    let url = `${this.config.baseUrl}stss/loadmoreimages/${count}`;
    return this.http.get(url, this.authorizationHeader()).map((response: Response) => response.json());
  }

  SearchImagee(formData: FormData) {

    this.ourUrl = `${this.config.baseUrl}stss/imagesearch`;
    //console.log(formData.has.arguments);
    return this.http.post(this.ourUrl, formData, this.authorizationHeader())
      .map((response: Response)=>  {

        let x = response.json();
        if (response.status == 200 && x.results) {
       //   console.log(x);
          return x;
        }
        else {
          return false;
        }
      });
  }

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
        //  console.log(response);
          return true;
        }
        else {
          return false;
        }
      }
      );
  }


}

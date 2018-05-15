	import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';

import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Config } from "../../config/config";


@Injectable()
export class SegmentImageService {


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



  SegementImages(formData: FormData) {

      //  this.ourUrl = "http://192.168.25.142:9090/segments";

      this.ourUrl = `${this.config.baseUrl}stss/segments`;

        let headers = new Headers({
         
          'Authorization': 'bearer' + this.authenticationService.tokenData.access_token
        })

        let options = new RequestOptions({
          headers: headers
        })
    
        return this.http.post(this.ourUrl, formData, options)
          .map((response: Response)=>  {
    
            let x = response.json();
            if (response.status == 200) {
         //     console.log(x);
              return x;
            }
            else {
              return false;
            }
          });
      }



}

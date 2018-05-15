// import {Injectable,Inject} from "@angular/core";
// import {Http, Headers, RequestOptions,Response} from "@angular/http";
// import {AuthenticationService} from "./authentication.service";
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import {Config} from "../config/config";
// import {TokenData} from "../models/loginData.model";
// export class ServiceResponse {
//     /*
//     *   Response of HttpService class
//     * */
//     Success: boolean;
//     Message: any;
//     ResponseCode: number;
// }
// @Injectable()
// export class HttpService {
//     constructor(private http: Http, 
//                 private auth: AuthenticationService,
//                 private config: Config)
//     {
//     }
//     Get(api: string): Observable<ServiceResponse> {
//         let headers = new Headers({
//             'Authorization': 'bearer ' + this.auth.tokenData.access_token,
//             'Content-Type': 'application/json'
//         });
//         let options = new RequestOptions({headers: headers});
//         return this.http.get(`${this.config.baseUrl}api/${api}`, options)
//             .map(this.Success).catch(this.Catch);
//     }
//     PostMultipart(api: string, data: FormData): Observable<ServiceResponse> {
//         /*
//          *   POST HTTP method, makes a http POST call to server with authorized headers
//          *      data:   data passed to http call
//          *      api:    name of api
//          *   returns ServiceResponse as result
//          * */
//         let headers = new Headers({
//             'Authorization': 'bearer ' + this.auth.tokenData.access_token,
//             'Accept': 'application/json',
//         });
//         let options = new RequestOptions({headers: headers});
//         return this.http.post(`${this.config.baseUrl}api/${api}`, data, options)
//             .map(this.Success).catch(this.Catch);
//     }
//     Post(api: string, data: any): Observable<ServiceResponse> {
//         let headers = new Headers({
//             'Authorization': 'bearer ' + this.auth.tokenData.access_token,
//             'Content-Type': 'application/json'
//         });
//         let options = new RequestOptions({headers: headers});
//         return this.http.post(`${this.config.baseUrl}${api}`, data, options)
//             .map(this.Success).catch(this.Catch);
//     }
//     private Success = (response:any) => {
//         /*
//          *  Returns a ServiceResponse with success as true
//          *  Message and response code is passed if any
//          *      Message: JSON object of response
//          * */
//         let res: ServiceResponse = new ServiceResponse();
//         res.Success = true;
//         if (response != null) {
//             //  create json object
//             let x = response.json();
//             console.log("Success : ", x);
//             res.Message = x;
//             if (response.status != null) {
//                 res.ResponseCode = response.status;
//             }
//         }
//         return res;
//     }
//     private Catch = (x:any) => {
//         /*
//          *  Returns a ServiceResponse with success as false
//          *  Message and response code is passed if any
//          * */
//         let errMsg = x.json().Message;
//         let y = new ServiceResponse();
//         y.Success = false;
//         if (x != null) {
//             if (x != null)
//                 y.ResponseCode = x.status;
//             y.Message = x.Message;
//             if (y.ResponseCode == 401) {
//                 //save message in session storage
//                 let abc = x.json();
//                 sessionStorage.setItem("logoutMessage", (abc.Message));
//                 this.auth.logout();
//             }
//             console.log("CATCH: ", x);
//         }
//         return Observable.throw(errMsg);
//     }
// } 
//# sourceMappingURL=httpHelper.service.js.map
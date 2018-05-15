import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { TokenData } from "../../shared/models/loginData.model";
import { Router, NavigationExtras } from "@angular/router";
import { Config } from "../../config/config";
let $ = require("https://code.jquery.com/jquery-3.1.1.js");

// for login contract
export class User {

    public email: string;
    public password: string;
	 roleArray: Array<string>;
	


    constructor() {
	
    }
}


export class LoginResponse {

    public Success: boolean;
    public StatusCode: number;

}

@Injectable()
export class AuthenticationService {

    private ourUrl: string;
    public redirectUrl: any;
    
    
    public setUsername = new TokenData();


    public get tokenData(): TokenData {
        return JSON.parse(localStorage.getItem("tokenData"));
    }

    public set tokenData(value: TokenData) {
        localStorage.setItem("tokenData", JSON.stringify(value));
    }



    constructor(private http: Http,
        private _router: Router,
        private config: Config) {

    }



    login(email: string, password: string): Observable<LoginResponse> {

        this.ourUrl = `${this.config.baseUrl}stss/login`;
        let roleArray : Array<string> = ["ROLE_CNN_USER","ROLE_SIFT_USER","ROLE_USER"];

        let x = {
            'grant_type': 'password',
            'username': email,
            'password': password
        }

        let data = JSON.stringify(x);

        let headers = new Headers({
            'Content-Type': 'application/json'
        })

        let options = new RequestOptions({
            headers: headers
        })

        let resp = new LoginResponse();
        return this.http.post(this.ourUrl, data, options)
            .map((response: Response):LoginResponse => {
            //    console.log(response);

                let token = response.json() && response.json().access_token;
                let username = response.json().username;
            //  console.log(token);
                this.tokenData = response.json();
			//console.log(roleArray.indexOf(this.tokenData.role) > -1);

                if (token && (roleArray.indexOf(this.tokenData.role) > -1)) {
                   // console.log("token present");
                    this.setUsername.username = this.tokenData.username;
                   // localStorage.removeItem('segmentedUrls');
                    // return true to indicate successful login
                    resp.Success = true;
                    resp.StatusCode = response.status;

                } else {
                    // return false to indicate failed login
                   // console.log("login failed");
                    resp.Success = false;
                    resp.StatusCode = response.status;
                    
                }
                return resp;
            });
        //   .catch(
        //     (error: any) => Observable.throw(error.json().error_description || 'Server error')
        // );
    }



    logout(): Observable<any> {

        this.ourUrl = `${this.config.baseUrl}stss/loggingout`;
        // this.ourUrl = 'https://demo4674025.mockable.io/stss/logout'

        let x = {
            "userToken": this.tokenData.access_token
        }

        let data = JSON.stringify(x);

        let headers = new Headers({
            'Content-Type': 'application/json'
        })

        let options = new RequestOptions({
            headers: headers
        })

        return this.http.post(this.ourUrl, data, options)
            .map((response: Response) => {
           //     console.log(response);
                if (response.status == 201) {
                    this.tokenData = null;
                    return true;
                }
                else {
                    return false;
                }
            }
            );
    }


    public get isLoggedIn(): boolean {
        if (this.tokenData == null) {
            return false;
        }
        return true;
    }


}

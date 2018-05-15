import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from "@angular/router";
import { TokenData } from "../shared/models/loginData.model";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import {TranslateService} from 'ng2-translate';
let $ = require("https://code.jquery.com/jquery-3.1.1.js");

@Component({
moduleId:module.id,
    templateUrl: "/app/home/home.component.html",
    styleUrls: ['home.css']
})
export class HomeComponent {

    username:string;
    tokenData:TokenData;

    constructor(private __authenticationService: AuthenticationService,
        private _router: Router,
        private slimLoadingBarService: SlimLoadingBarService,private translate: TranslateService) {


        var activityTimeout = setTimeout(() => {
        }, 1800000);

        $(document).bind('mousemove', () => {
            $(document.body)
            clearTimeout(activityTimeout);
            activityTimeout = setTimeout(() => {
               this.DoLogout();
            }, 1800000);
        });

        $(document).bind('click', () => {
            $(document.body)
            clearTimeout(activityTimeout);
            activityTimeout = setTimeout(() => {
                this.DoLogout();
            }, 1800000);
        });

        $(document).bind('keypress', () => {
            $(document.body)
            clearTimeout(activityTimeout);
            activityTimeout = setTimeout(() => {
                this.DoLogout();
            }, 1800000);
            
        });
    }

    DoLogout(){
                  localStorage.removeItem('tokenData');
                  localStorage.setItem("sessionTimeOutMessage", ('000'));
                let redirect = '/login';
                this._router.navigate([redirect]);
    }

    


    ngOnInit(){
        // this.username = this.__authenticationService.setUsername.username;
         this.tokenData = JSON.parse(localStorage.getItem("tokenData"));
        // console.log(this.tokenData.username);
        this.username = this.tokenData.username;
    }


    logout() {
        this.__authenticationService.logout()
            .subscribe(response => {
              //  console.log(response);
                if (response == true) {
                    // remove user from local storage to log user out
                    localStorage.removeItem('tokenData');
					localStorage.removeItem('Response');
					localStorage.clear();
                    let redirect = '/login';
                    this._router.navigate([redirect]);
                }
                else {
                    console.log('logout failed');
                }
            },
            error => {

                if(error.status == 401){
                    this.slimLoadingBarService.complete();
                     // remove user from local storage to log user out
                     localStorage.removeItem('tokenData');
					 localStorage.removeItem('Response');
                     localStorage.setItem("logoutMessage", ('401'));
                     let redirect = '/login';
                     this._router.navigate([redirect]);
                }
                else{
                    this.slimLoadingBarService.complete();
                    $("#openServerErrorModal").click();
                }
            })
    }

}
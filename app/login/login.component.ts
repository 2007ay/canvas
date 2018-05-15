
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User, LoginResponse } from '../shared/services/authentication.service';
import { Router, NavigationExtras } from '@angular/router';
import 'rxjs/add/operator/map';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
let $ = require("https://code.jquery.com/jquery-3.1.1.js");
import {TranslateService} from 'ng2-translate';

@Component({
    selector: 'm-login',
    templateUrl: "/app/login/login.component.html",
})
export class LoginComponent {

    user: User;
    errorMessage: string;
    errorShow: boolean = false;
    logoutMessage: any;
    textMessage: string;
    sessionTimeOutMessage: any;
    serverErrorText: string;
    authServiceInfo:AuthenticationService;


    constructor(private authService: AuthenticationService, private router: Router, private slimLoadingBarService: SlimLoadingBarService,private translate: TranslateService) {
        this.authServiceInfo = authService;
        this.user = new User();
        translate.addLangs(["English","Japanese"]);
        translate.setDefaultLang('English');
       
        let browserLang = translate.getBrowserLang();
      //  console.log("bowerlang" + browserLang);
       // let currlang = this.translate.currentLang;
        //console.log("current lang" + translate.currentLang);
       // translate.use(browserLang.match(/English|Japanese/) ? browserLang : 'English')
        
        
   
            
        
    }

    ngOnInit() {
        this.GetUnauthorizedMessage();
      
        
    }
    click(value:any){
      //  console.log("value" + value);
        let browserLang = this.translate.getBrowserLang();
        this.translate.use(value);
        localStorage.setItem("Language", value);
        let currlang = this.translate.currentLang;
      //  console.log("current lang" + currlang);

  
    }

    GetUnauthorizedMessage() {

        this.logoutMessage = localStorage.getItem("logoutMessage");
        this.sessionTimeOutMessage = localStorage.getItem("sessionTimeOutMessage");
        // CHECKING FOR '401' CODE
        if (this.logoutMessage) {
            this.errorShow = true;
            this.textMessage = 'Unauthorized. Please login again.'
            localStorage.removeItem("logoutMessage");
        }

        // CHECKING FOR SESSION TIMEOUT ERROR
        if (this.sessionTimeOutMessage) {
            this.errorShow = true;
            this.textMessage = 'Session Expired. Please login again.'
            localStorage.removeItem("sessionTimeOutMessage");
        }




        // this.logoutMessage = localStorage.getItem("logoutMessage");
        // if (this.logoutMessage) {
        //     this.errorShow = true;
        //     this.textMessage = 'Unauthorized. Please login again.'
        //     localStorage.removeItem("logoutMessage");
        // }
        // else {
        //     localStorage.removeItem("logoutMessage");
        //     this.showGetUnauthorizedMessage = false;
        // }
    }



    DoLogin() {

        this.errorShow = false;

        this.slimLoadingBarService.start();
        this.authService.login(this.user.email, this.user.password)
            .subscribe((response: LoginResponse) => {
                this.slimLoadingBarService.complete();
              //  console.log(response);
                if (response.Success == true) {
                    localStorage.removeItem('Response');
                    let redirect: string;

                    if(this.authServiceInfo.tokenData.role == "ROLE_SIFT_USER"){
                        redirect = 'home/search'
                   }else{
                    redirect = 'home/segment';
                   }
               
                       

                    this.router.navigate([redirect]);
                }
                else {
                    this.slimLoadingBarService.complete();
                   // console.log('login failed');
                    this.errorShow = true;
                    this.textMessage = 'Unauthorized.'
                }
            },
            (error: any) => {
                if (error.status == 400) {
                    this.slimLoadingBarService.complete();
                    this.errorShow = true;
                    this.textMessage = 'Invalid Username/Password'
                }
                

                if (error.status == 504) {
                    this.slimLoadingBarService.complete();
                    this.serverErrorText = 'Connection Timed Out.';
                    $("#openServerErrorModal").click();
                }
                
                if (error.status == 500 || error.status == 404) {
                    this.slimLoadingBarService.complete();
                    this.serverErrorText = 'We are sorry, but something went wrong.';
                    $("#openServerErrorModal").click();
                }



            })
    }

    disableErrorMessage() {
        this.errorShow = false;
    }


}
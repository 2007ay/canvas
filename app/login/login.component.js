"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var authentication_service_1 = require('../shared/services/authentication.service');
var router_1 = require('@angular/router');
require('rxjs/add/operator/map');
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var $ = require("https://code.jquery.com/jquery-3.1.1.js");
var ng2_translate_1 = require('ng2-translate');
var LoginComponent = (function () {
    function LoginComponent(authService, router, slimLoadingBarService, translate) {
        this.authService = authService;
        this.router = router;
        this.slimLoadingBarService = slimLoadingBarService;
        this.translate = translate;
        this.errorShow = false;
        this.authServiceInfo = authService;
        this.user = new authentication_service_1.User();
        translate.addLangs(["English", "Japanese"]);
        translate.setDefaultLang('English');
        var browserLang = translate.getBrowserLang();
        //  console.log("bowerlang" + browserLang);
        // let currlang = this.translate.currentLang;
        //console.log("current lang" + translate.currentLang);
        // translate.use(browserLang.match(/English|Japanese/) ? browserLang : 'English')
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.GetUnauthorizedMessage();
    };
    LoginComponent.prototype.click = function (value) {
        //  console.log("value" + value);
        var browserLang = this.translate.getBrowserLang();
        this.translate.use(value);
        localStorage.setItem("Language", value);
        var currlang = this.translate.currentLang;
        //  console.log("current lang" + currlang);
    };
    LoginComponent.prototype.GetUnauthorizedMessage = function () {
        this.logoutMessage = localStorage.getItem("logoutMessage");
        this.sessionTimeOutMessage = localStorage.getItem("sessionTimeOutMessage");
        // CHECKING FOR '401' CODE
        if (this.logoutMessage) {
            this.errorShow = true;
            this.textMessage = 'Unauthorized. Please login again.';
            localStorage.removeItem("logoutMessage");
        }
        // CHECKING FOR SESSION TIMEOUT ERROR
        if (this.sessionTimeOutMessage) {
            this.errorShow = true;
            this.textMessage = 'Session Expired. Please login again.';
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
    };
    LoginComponent.prototype.DoLogin = function () {
        var _this = this;
        this.errorShow = false;
        this.slimLoadingBarService.start();
        this.authService.login(this.user.email, this.user.password)
            .subscribe(function (response) {
            _this.slimLoadingBarService.complete();
            //  console.log(response);
            if (response.Success == true) {
                localStorage.removeItem('Response');
                var redirect = void 0;
                if (_this.authServiceInfo.tokenData.role == "ROLE_SIFT_USER") {
                    redirect = 'home/search';
                }
                else {
                    redirect = 'home/segment';
                }
                _this.router.navigate([redirect]);
            }
            else {
                _this.slimLoadingBarService.complete();
                // console.log('login failed');
                _this.errorShow = true;
                _this.textMessage = 'Unauthorized.';
            }
        }, function (error) {
            if (error.status == 400) {
                _this.slimLoadingBarService.complete();
                _this.errorShow = true;
                _this.textMessage = 'Invalid Username/Password';
            }
            if (error.status == 504) {
                _this.slimLoadingBarService.complete();
                _this.serverErrorText = 'Connection Timed Out.';
                $("#openServerErrorModal").click();
            }
            if (error.status == 500 || error.status == 404) {
                _this.slimLoadingBarService.complete();
                _this.serverErrorText = 'We are sorry, but something went wrong.';
                $("#openServerErrorModal").click();
            }
        });
    };
    LoginComponent.prototype.disableErrorMessage = function () {
        this.errorShow = false;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'm-login',
            templateUrl: "/app/login/login.component.html",
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, router_1.Router, ng2_slim_loading_bar_1.SlimLoadingBarService, ng2_translate_1.TranslateService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
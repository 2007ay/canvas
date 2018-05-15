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
var router_1 = require("@angular/router");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var ng2_translate_1 = require('ng2-translate');
var $ = require("https://code.jquery.com/jquery-3.1.1.js");
var HomeComponent = (function () {
    function HomeComponent(__authenticationService, _router, slimLoadingBarService, translate) {
        var _this = this;
        this.__authenticationService = __authenticationService;
        this._router = _router;
        this.slimLoadingBarService = slimLoadingBarService;
        this.translate = translate;
        var activityTimeout = setTimeout(function () {
        }, 1800000);
        $(document).bind('mousemove', function () {
            $(document.body);
            clearTimeout(activityTimeout);
            activityTimeout = setTimeout(function () {
                _this.DoLogout();
            }, 1800000);
        });
        $(document).bind('click', function () {
            $(document.body);
            clearTimeout(activityTimeout);
            activityTimeout = setTimeout(function () {
                _this.DoLogout();
            }, 1800000);
        });
        $(document).bind('keypress', function () {
            $(document.body);
            clearTimeout(activityTimeout);
            activityTimeout = setTimeout(function () {
                _this.DoLogout();
            }, 1800000);
        });
    }
    HomeComponent.prototype.DoLogout = function () {
        localStorage.removeItem('tokenData');
        localStorage.setItem("sessionTimeOutMessage", ('000'));
        var redirect = '/login';
        this._router.navigate([redirect]);
    };
    HomeComponent.prototype.ngOnInit = function () {
        // this.username = this.__authenticationService.setUsername.username;
        this.tokenData = JSON.parse(localStorage.getItem("tokenData"));
        // console.log(this.tokenData.username);
        this.username = this.tokenData.username;
    };
    HomeComponent.prototype.logout = function () {
        var _this = this;
        this.__authenticationService.logout()
            .subscribe(function (response) {
            //  console.log(response);
            if (response == true) {
                // remove user from local storage to log user out
                localStorage.removeItem('tokenData');
                localStorage.removeItem('Response');
                localStorage.clear();
                var redirect = '/login';
                _this._router.navigate([redirect]);
            }
            else {
                console.log('logout failed');
            }
        }, function (error) {
            if (error.status == 401) {
                _this.slimLoadingBarService.complete();
                // remove user from local storage to log user out
                localStorage.removeItem('tokenData');
                localStorage.removeItem('Response');
                localStorage.setItem("logoutMessage", ('401'));
                var redirect = '/login';
                _this._router.navigate([redirect]);
            }
            else {
                _this.slimLoadingBarService.complete();
                $("#openServerErrorModal").click();
            }
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "/app/home/home.component.html",
            styleUrls: ['home.css']
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, router_1.Router, ng2_slim_loading_bar_1.SlimLoadingBarService, ng2_translate_1.TranslateService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map
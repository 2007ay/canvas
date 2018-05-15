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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var loginData_model_1 = require("../../shared/models/loginData.model");
var router_1 = require("@angular/router");
var config_1 = require("../../config/config");
var $ = require("https://code.jquery.com/jquery-3.1.1.js");
// for login contract
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var LoginResponse = (function () {
    function LoginResponse() {
    }
    return LoginResponse;
}());
exports.LoginResponse = LoginResponse;
var AuthenticationService = (function () {
    function AuthenticationService(http, _router, config) {
        this.http = http;
        this._router = _router;
        this.config = config;
        this.setUsername = new loginData_model_1.TokenData();
    }
    Object.defineProperty(AuthenticationService.prototype, "tokenData", {
        get: function () {
            return JSON.parse(localStorage.getItem("tokenData"));
        },
        set: function (value) {
            localStorage.setItem("tokenData", JSON.stringify(value));
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.login = function (email, password) {
        var _this = this;
        this.ourUrl = this.config.baseUrl + "stss/login";
        var roleArray = ["ROLE_CNN_USER", "ROLE_SIFT_USER", "ROLE_USER"];
        var x = {
            'grant_type': 'password',
            'username': email,
            'password': password
        };
        var data = JSON.stringify(x);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({
            headers: headers
        });
        var resp = new LoginResponse();
        return this.http.post(this.ourUrl, data, options)
            .map(function (response) {
            //    console.log(response);
            var token = response.json() && response.json().access_token;
            var username = response.json().username;
            //  console.log(token);
            _this.tokenData = response.json();
            //console.log(roleArray.indexOf(this.tokenData.role) > -1);
            if (token && (roleArray.indexOf(_this.tokenData.role) > -1)) {
                // console.log("token present");
                _this.setUsername.username = _this.tokenData.username;
                // localStorage.removeItem('segmentedUrls');
                // return true to indicate successful login
                resp.Success = true;
                resp.StatusCode = response.status;
            }
            else {
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
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        this.ourUrl = this.config.baseUrl + "stss/loggingout";
        // this.ourUrl = 'https://demo4674025.mockable.io/stss/logout'
        var x = {
            "userToken": this.tokenData.access_token
        };
        var data = JSON.stringify(x);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({
            headers: headers
        });
        return this.http.post(this.ourUrl, data, options)
            .map(function (response) {
            //     console.log(response);
            if (response.status == 201) {
                _this.tokenData = null;
                return true;
            }
            else {
                return false;
            }
        });
    };
    Object.defineProperty(AuthenticationService.prototype, "isLoggedIn", {
        get: function () {
            if (this.tokenData == null) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, config_1.Config])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map
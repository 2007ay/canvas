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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var $ = require("https://code.jquery.com/jquery-3.1.1.js");
var core_2 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate');
//import {LoginComponent} from './login/login.component';
var AppComponent = (function () {
    function AppComponent(translate) {
        this.translate = translate;
        translate.setDefaultLang('English');
        var value = localStorage.getItem('Language');
        //let value = JSON.parse(localStorage.getItem('Language'));
        //  console.log("value from app component" + value);
        this.translate.use(value);
        var x = translate.getDefaultLang();
        // console.log("from app" + value)
    }
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: "app.component.html",
            styleUrls: ['app.component.css']
        }),
        __param(0, core_2.Inject(ng2_translate_1.TranslateService)), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
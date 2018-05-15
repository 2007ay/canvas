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
var router_1 = require('@angular/router');
// import {AuthGuard} from "../services/authGuard.service";
var feedback_component_1 = require("./feedback.component");
var feedback_resolver_service_1 = require('../shared/resolver/feedback-resolver.service');
var FeedbackRoute = [
    {
        path: "", component: feedback_component_1.FeedbackComponent, resolve: { feedback: feedback_resolver_service_1.FeedbackResolver },
        children: []
    }];
var FeedbackRoutingModule = (function () {
    function FeedbackRoutingModule() {
    }
    FeedbackRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(FeedbackRoute)
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], FeedbackRoutingModule);
    return FeedbackRoutingModule;
}());
exports.FeedbackRoutingModule = FeedbackRoutingModule;
//# sourceMappingURL=feedback.routing.module.js.map
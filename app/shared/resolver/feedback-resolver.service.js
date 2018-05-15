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
require('rxjs/add/operator/catch');
require('rxjs/add/observable/of');
require('rxjs/add/operator/map');
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/map');
var FeedbackResolver = (function () {
    function FeedbackResolver(router) {
        this.router = router;
        this.dataMessenger = new Subject_1.Subject();
    }
    FeedbackResolver.prototype.setData = function (newData) {
        this.dataMessenger.next(newData);
        this.data = newData;
    };
    FeedbackResolver.prototype.resolve = function (route, state) {
        return this.data;
    };
    FeedbackResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], FeedbackResolver);
    return FeedbackResolver;
}());
exports.FeedbackResolver = FeedbackResolver;
//# sourceMappingURL=feedback-resolver.service.js.map
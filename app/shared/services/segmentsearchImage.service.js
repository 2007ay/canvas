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
var authentication_service_1 = require('./authentication.service');
// import { DragDrop } from '../models/search.model';
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var config_1 = require("../../config/config");
var SegmentSearchImageService = (function () {
    function SegmentSearchImageService(http, authenticationService, slimLoadingBarService, config) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.slimLoadingBarService = slimLoadingBarService;
        this.config = config;
    }
    SegmentSearchImageService.prototype.authorizationHeader = function () {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'bearer' + this.authenticationService.tokenData.access_token
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return options;
    };
    //load more images
    SegmentSearchImageService.prototype.loadMoreImages = function (count) {
        var url = this.config.baseUrl + "stss/loadmoreimages/" + count;
        return this.http.get(url, this.authorizationHeader()).map(function (response) { return response.json(); });
    };
    SegmentSearchImageService.prototype.SearchImagee = function (createSearchObject) {
        this.ourUrl = this.config.baseUrl + "stss/segmentimagesearch";
        var data = JSON.stringify(createSearchObject);
        return this.http.post(this.ourUrl, data, this.authorizationHeader())
            .map(function (response) {
            var x = response.json();
            if (response.status == 200 && x.results) {
                //  console.log(x);
                return x;
            }
            else {
                return false;
            }
        });
    };
    /* SegementImages(formData: FormData) {
       
          // this.ourUrl = "http://192.168.25.142:9090/segments";
   
           let headers = new Headers({
             'Content-Type': 'application/json',
             'Authorization': 'bearer' + this.authenticationService.tokenData.access_token
           })
       
   
           let options = new RequestOptions({
             headers: headers
           })
   
           return this.http.post(this.ourUrl, formData, options)
             .map((response: Response)=>  {
       
               let x = response.json();
               if (response.status == 200 && x.results) {
                 console.log(x);
                 return x;
               }
               else {
                 return false;
               }
             });
         }
   */
    SegmentSearchImageService.prototype.MarkRelevance = function (MarkRelevance) {
        this.ourUrl = this.config.baseUrl + "stss/relevance";
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'bearer' + this.authenticationService.tokenData.access_token
        });
        var data = JSON.stringify(MarkRelevance);
        var options = new http_1.RequestOptions({
            headers: headers
        });
        return this.http.post(this.ourUrl, data, options)
            .map(function (response) {
            //  console.log(response);
            if (response.status == 201) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    SegmentSearchImageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authentication_service_1.AuthenticationService, ng2_slim_loading_bar_1.SlimLoadingBarService, config_1.Config])
    ], SegmentSearchImageService);
    return SegmentSearchImageService;
}());
exports.SegmentSearchImageService = SegmentSearchImageService;
//# sourceMappingURL=segmentsearchImage.service.js.map
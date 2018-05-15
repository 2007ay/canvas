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
var router_1 = require("@angular/router");
var router_2 = require('@angular/router');
var segmentImage_service_1 = require('../shared/services/segmentImage.service');
var segment_model_1 = require("../shared/models/segment.model");
var searchsegment_model_1 = require("../shared/models/searchsegment.model");
var feedback_model_1 = require("../shared/models/feedback.model");
var feedback_resolver_service_1 = require('../shared/resolver/feedback-resolver.service');
var segmentsearchImage_service_1 = require('../shared/services/segmentsearchImage.service');
var segment_resolver_service_1 = require('../shared/resolver/segment-resolver.service');
require('rxjs/add/observable/forkJoin');
var $ = require("https://code.jquery.com/jquery-3.1.1.js");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var config_1 = require('../config/config');
;
var SegmentSearchComponent = (function () {
    // segment:boolean = true;
    // search:boolean = false;
    //@ViewChild('tiffimage') el:ElementRef;
    function SegmentSearchComponent(_router, route, _segmentsearchImageService, _segmentImageService, slimLoadingBarService, feedbackResolver, segmentResolver, config) {
        this._router = _router;
        this.route = route;
        this._segmentsearchImageService = _segmentsearchImageService;
        this._segmentImageService = _segmentImageService;
        this.slimLoadingBarService = slimLoadingBarService;
        this.feedbackResolver = feedbackResolver;
        this.segmentResolver = segmentResolver;
        this.config = config;
        this.searchString = "";
        this.noClass = false;
        this.Response = new segment_model_1.SegmentModel();
        this.disableSearchBtn = false;
        this.segmentedUrls = [];
        this.createSearchObject = new searchsegment_model_1.SearchSegmentModel();
        this.onResize();
        //debugger
        var response = localStorage.getItem('SegmentResponse');
        if (response) {
            this.Response = JSON.parse(response);
        }
    }
    SegmentSearchComponent.prototype.onResize = function () {
        var height = $(window).height();
        // console.log('Browser Height :', height);
        var finalHeight = height - 460;
        $('.setScrolling').css('height', finalHeight);
        setTimeout(function () {
            $('.resultDiv.noheader .setScrolling').css('height', finalHeight + 40);
        }, 100);
    };
    SegmentSearchComponent.prototype.ngAfterViewInit = function () {
        this.onResize();
    };
    SegmentSearchComponent.prototype.ngOnInit = function () {
        // window.initialize(this.dragdropcallback);
        var _this = this;
        this.route.data.subscribe(function (data) {
            // 1st time
            if (data['segment'] != undefined) {
                var segment = data['segment'];
                _this.Response = segment;
                var _ResponseRef = new segment_model_1.ResponseRef();
                _ResponseRef = {
                    queryImageUrl: _this.Response.queryImageUrl,
                    segmentedUrls: _this.Response.segmentedUrls
                };
                localStorage.setItem("SegmentData", JSON.stringify(_ResponseRef));
                _this.AssignPropValues();
            }
            else {
                _this.slimLoadingBarService.start();
                // this.onRefresh();
                _this.slimLoadingBarService.complete();
            }
        });
    };
    SegmentSearchComponent.prototype.OnCheckSegment = function (i) {
        if (this.segmentedUrls) {
            this.segmentedUrls[i].active = !this.segmentedUrls[i].active;
        }
        console.log("selected value" + this.temp);
    };
    SegmentSearchComponent.prototype.AssignPropValues = function () {
        this.queryImageUrl = this.Response.queryImageUrl;
        for (var i = 0; i < this.Response.segmentedUrls.length; i++) {
            var selectSegmentModel = new segment_model_1.SelectedSegmentModel(this.Response.segmentedUrls[i], false);
            this.segmentedUrls.push(selectSegmentModel);
            var json_arr = JSON.stringify(this.segmentedUrls);
        }
        console.log("segmented Urls" + this.segmentedUrls);
        //finaly save Response to the local storage in case user dose reload window
        localStorage.setItem('Response', JSON.stringify(this.Response));
    };
    SegmentSearchComponent.prototype.checkFormStatus = function () {
        this.SearchImage();
    };
    SegmentSearchComponent.prototype.SearchImage = function () {
        var _this = this;
        this.slimLoadingBarService.start();
        this.disableSearchBtn = true;
        var formData = new FormData();
        for (var i = 0; i < this.segmentedUrls.length; i++) {
            if (this.segmentedUrls[i].active == true) {
                var url = this.segmentedUrls[i].segmentedUrl;
                this.createSearchObject.segmentedUrls.push(url);
            }
        }
        //      formData.append('queryImageUrl', this.queryImageUrl);
        //       formData.append('segmentedUrls', JSON.stringify(this.segmentedUrls));
        //     formData.append("classname", this.searchString);
        this.createSearchObject.queryImageUrl = this.queryImageUrl;
        if (this.createSearchObject.classname == undefined) {
            this.createSearchObject.classname = "all";
        }
        this._segmentsearchImageService.SearchImagee(this.createSearchObject)
            .subscribe(function (result) {
            _this.slimLoadingBarService.complete();
            var fileListObject = new feedback_model_1.ActualFeedbackModel();
            var imageurl = new feedback_model_1.FeedbackModel();
            fileListObject.feedbackCompClassName = _this.searchString;
            if (result.results) {
                fileListObject.searchResult = result.results;
                fileListObject.queryImageURL = result.queryImageURL;
                console.log("res" + result.queryImageURL);
            }
            else {
                fileListObject.searchResult = result;
            }
            //fileListObject.queryImageURL = fileListObject.searchResult[0].queryImageURL;
            // console.log("res"+  fileListObject.searchResult[0].queryImageURL);
            // fileListObject.searchResult = result.results;
            fileListObject.maxResultCount = result.resultSize;
            fileListObject.cnnResultSize = result.cnnResultSize;
            fileListObject.siftResultSize = result.siftResultSize;
            fileListObject.cnnAccess = result.isCNNAccess;
            fileListObject.siftAccess = result.isSiftAccess;
            var holdFileData = new feedback_model_1.HoldFileData();
            holdFileData.name = result.queryImageURL.substring(result.queryImageURL.lastIndexOf('/') + 1, result.queryImageURL.length);
            holdFileData.size = '2MB';
            holdFileData.type = holdFileData.name.substring(holdFileData.name.lastIndexOf('.') + 1, holdFileData.name.length);
            holdFileData.searchString = _this.searchString;
            // let emptyObj:any = {};
            console.log("File Object" + fileListObject);
            // localStorage.setItem('Response',fileListObject);
            for (var i_1 = 0; i_1 < fileListObject.searchResult.length; i_1++) {
                fileListObject.searchResult[i_1].uniqueID = i_1;
            }
            _this.feedbackResolver.setData(fileListObject);
            localStorage.setItem("Response", JSON.stringify(fileListObject));
            //  Config.holdData = holdFileData;
            // ---------------------------------------------------------------------------
            _this.disableSearchBtn = false;
            if (_this.searchString == "") {
                _this.noClass = true;
                _this.searchString = '   ';
            }
            localStorage.setItem("FileList", JSON.stringify(holdFileData));
            _this._router.navigate(['/home/feedback', _this.searchString]);
        }, function (error) {
            if (error.status == 401 || error.status == 0) {
                _this.slimLoadingBarService.complete();
                // remove user from local storage to log user out
                localStorage.removeItem('tokenData');
                localStorage.setItem("logoutMessage", ('401'));
                var redirect = '/login';
                _this._router.navigate([redirect]);
            }
            if (error.status == 504) {
                _this.disableSearchBtn = false;
                _this.slimLoadingBarService.complete();
                _this.serverErrorText = 'Connection Timed Out.';
                $("#openServerErrorModal").click();
            }
            if (error.status == 500 || error.status == 404) {
                _this.disableSearchBtn = false;
                _this.slimLoadingBarService.complete();
                _this.serverErrorText = 'We are sorry, but something went wrong.';
                $("#openServerErrorModal").click();
            }
        });
    };
    SegmentSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "segmentsearch.component.html",
            styleUrls: ['segmentsearch.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_2.ActivatedRoute, segmentsearchImage_service_1.SegmentSearchImageService, segmentImage_service_1.SegmentImageService, ng2_slim_loading_bar_1.SlimLoadingBarService, feedback_resolver_service_1.FeedbackResolver, segment_resolver_service_1.SegmentResolver, config_1.Config])
    ], SegmentSearchComponent);
    return SegmentSearchComponent;
}());
exports.SegmentSearchComponent = SegmentSearchComponent;
//# sourceMappingURL=segmentsearch.component.js.map
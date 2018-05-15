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
        this.StoreMarkedImages = [];
        this.disableCheckbox = false;
        this.noInput = false;
        this.disableClearBth = false;
        // segment:boolean = true;
        // search:boolean = false;
        this.invalidClassMessage = false;
        this.filesList = null;
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
                    segmentedUrls: _this.Response.segmentedUrls,
                    preprocessedImageUrl: _this.Response.preprocessedImageUrl,
                    className: _this.Response.className
                };
                localStorage.setItem("SegmentData", JSON.stringify(_ResponseRef));
                _this.AssignPropValues();
            }
            else {
                _this.slimLoadingBarService.start();
                _this.onRefresh();
                _this.slimLoadingBarService.complete();
            }
        });
    };
    SegmentSearchComponent.prototype.OnCheckSegment = function (i) {
        var allFieldsChecked = false;
        if (this.segmentedUrls) {
            this.segmentedUrls[i].active = !this.segmentedUrls[i].active;
        }
        for (var i = 0; i < this.segmentedUrls.length; i++) {
            if (this.segmentedUrls[i].active == true) {
                allFieldsChecked = true;
            }
            else {
                allFieldsChecked = false;
                break;
            }
        }
        this.checkboxValue = allFieldsChecked;
        localStorage.setItem("SegmentedUrls", JSON.stringify(this.segmentedUrls));
        localStorage.setItem("CheckAllSegments", JSON.stringify(this.checkboxValue));
    };
    SegmentSearchComponent.prototype.classMessageVisi = function (event) {
        var regx = /^\d+(?:,\d+)*$/g;
        if (event == "") {
            this.invalidClassMessage = false;
            this.classname = event;
            localStorage.setItem("classname", JSON.stringify(this.classname));
        }
        else if (regx.test(event)) {
            this.invalidClassMessage = false;
            this.classname = event;
            localStorage.setItem("classname", JSON.stringify(this.classname));
        }
        else {
            this.invalidClassMessage = true;
        }
    };
    SegmentSearchComponent.prototype.checkAll = function (ev) {
        this.checkboxValue = ev.target.checked;
        this.segmentedUrls.forEach(function (x) { return x.active = ev.target.checked; });
        //  console.log("segmented Urls" + this.segmentedUrls);
        //finaly save Response to the local storage in case user dose reload window
        localStorage.setItem("SegmentedUrls", JSON.stringify(this.segmentedUrls));
        localStorage.setItem("CheckAllSegments", JSON.stringify(this.checkboxValue));
    };
    SegmentSearchComponent.prototype.AssignPropValues = function () {
        this.checkboxValue = true;
        this.queryImageUrl = this.Response.queryImageUrl;
        this.preprocessedImageUrl = this.Response.preprocessedImageUrl;
        this.classname = this.Response.className;
        for (var i = 0; i < this.Response.segmentedUrls.length; i++) {
            var selectSegmentModel = new segment_model_1.SelectedSegmentModel(this.Response.segmentedUrls[i], true);
            this.segmentedUrls.push(selectSegmentModel);
            //localStorage.setItem('Allurls', JSON.stringify(this.segmentedUrls));
            var json_arr = JSON.stringify(this.segmentedUrls);
        }
        //   console.log("segmented Urls" + this.segmentedUrls);
        //finaly save Response to the local storage in case user dose reload window
        localStorage.setItem("classname", JSON.stringify(this.classname));
        localStorage.setItem("SegmentedUrls", JSON.stringify(this.segmentedUrls));
        localStorage.setItem("CheckAllSegments", JSON.stringify(this.checkboxValue));
        localStorage.setItem('Response', JSON.stringify(this.Response));
    };
    SegmentSearchComponent.prototype.getStatus = function (str) {
        this.segmentedUrls = JSON.parse(localStorage.getItem('segmentedUrls'));
        if (this.segmentedUrls != null) {
            for (var i = 0; i < this.segmentedUrls.length; i++) {
                var selectedSegmentModel = this.segmentedUrls[i];
                if (selectedSegmentModel.segmentedUrl == str) {
                    return selectedSegmentModel.active;
                }
            }
        }
        else {
            return false;
        }
    };
    SegmentSearchComponent.prototype.checkFormStatus = function () {
        this.SegmentImage();
    };
    SegmentSearchComponent.prototype.ClearResult = function () {
        this._router.navigate(['/home/segment']);
    };
    SegmentSearchComponent.prototype.SegmentImage = function () {
        var _this = this;
        var filesList = null;
        this.disableClearBth = true;
        this.noInput = true;
        this.disableCheckbox = true;
        this.slimLoadingBarService.start();
        this.disableSearchBtn = true;
        var formData = new FormData();
        for (var i = 0; i < this.segmentedUrls.length; i++) {
            if (this.segmentedUrls[i].active == true) {
                var url = this.segmentedUrls[i].segmentedUrl;
                this.createSearchObject.segmentedUrls.push(url);
            }
        }
        this.createSearchObject.queryImageUrl = this.queryImageUrl;
        this.createSearchObject.preprocessedImageUrl = this.preprocessedImageUrl;
        if (this.classname == undefined) {
            this.createSearchObject.classname = "all";
        }
        if (this.classname == '') {
            this.createSearchObject.classname = "all";
        }
        else {
            this.createSearchObject.classname = this.classname;
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
            //   fileListObject.fileType = result.queryImageURL.substring(result.queryImageURL.lastIndexOf('.')+1,result.queryImageURL.length).toLowerCase();
            //  fileListObject.size = result.queryImageURL.size;
            fileListObject.fileType = JSON.parse(localStorage.getItem('FileType'));
            fileListObject.size = JSON.parse(localStorage.getItem('FileSize'));
            fileListObject.feedbackCompClassName = _this.createSearchObject.classname;
            //    fileListObject.size = this.filesList.size;
            var holdFileData = new feedback_model_1.HoldFileData();
            holdFileData.name = result.queryImageURL.substring(result.queryImageURL.lastIndexOf('/') + 1, result.queryImageURL.length);
            holdFileData.size = '2MB';
            holdFileData.type = holdFileData.name.substring(holdFileData.name.lastIndexOf('.') + 1, holdFileData.name.length);
            holdFileData.searchString = _this.searchString;
            // let emptyObj:any = {};
            //  console.log("File Object" + fileListObject);
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
                _this.disableClearBth = false;
                _this.noInput = false;
                _this.disableSearchBtn = false;
                _this.slimLoadingBarService.complete();
                _this.serverErrorText = 'We are sorry, but something went wrong.';
                $("#openServerErrorModal").click();
            }
        });
    };
    SegmentSearchComponent.prototype.onRefresh = function () {
        this.Response = JSON.parse(localStorage.getItem('SegmentData'));
        this.queryImageUrl = this.Response.queryImageUrl;
        this.preprocessedImageUrl = this.Response.preprocessedImageUrl;
        //    this.segmentedUrls = JSON.parse(localStorage.getItem('Allurls'));
        this.segmentedUrls = JSON.parse(localStorage.getItem('SegmentedUrls'));
        this.checkboxValue = JSON.parse(localStorage.getItem('CheckAllSegments'));
        this.classname = JSON.parse(localStorage.getItem('classname'));
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
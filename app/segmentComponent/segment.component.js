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
var segmentImage_service_1 = require('../shared/services/segmentImage.service');
var searchImage_service_1 = require('../shared/services/searchImage.service');
var authentication_service_1 = require('../shared/services/authentication.service');
var ng2_translate_1 = require('ng2-translate');
var $ = require("https://code.jquery.com/jquery-3.1.1.js");
//import { DragDrop } from '../shared/models/search.model';
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var segment_resolver_service_1 = require('../shared/resolver/segment-resolver.service');
var feedback_resolver_service_1 = require('../shared/resolver/feedback-resolver.service');
var segment_model_1 = require("../shared/models/segment.model");
var config_1 = require('../config/config');
var feedback_model_1 = require("../shared/models/feedback.model");
var SegmentComponent = (function () {
    function SegmentComponent(_router, _segmentImageService, _searchImageService, slimLoadingBarService, authService, segmentResolver, feedbackResolver, translate, config) {
        var _this = this;
        this._router = _router;
        this._segmentImageService = _segmentImageService;
        this._searchImageService = _searchImageService;
        this.slimLoadingBarService = slimLoadingBarService;
        this.authService = authService;
        this.segmentResolver = segmentResolver;
        this.feedbackResolver = feedbackResolver;
        this.translate = translate;
        this.config = config;
        this.searchString = "";
        this.queryImageUrl = "";
        this.filesList = null;
        this.browseFileData = null;
        this.hideDummyImageOnDragDrop = false;
        this.ImageNotFoundMessage = false;
        this.dummyVar = false;
        this.errorMessageVisi = false;
        this.errorVisi = false;
        this.disableSearchBtn = true;
        this.disableSegmentBth = true;
        this.disableCheckbox = true;
        this.checkIsImageIsSelected = false;
        this.hideDragDropTextWhenZipFileDropped = false;
        this.fileName = '';
        this.queryImageURL = '';
        this.noClass = false;
        this.disableDIV = false;
        this.activettfClass = false;
        // activettfClass1:boolean = false;
        this.activeClass = false;
        // activeClass1:boolean = false;
        this.notTakeImageOnDragDrop = false;
        this.tif = false;
        this.nontif = false;
        this.segment = true;
        this.search = false;
        this.display = false;
        this.nodisplay = false;
        this.segmentcallornot = false;
        this.invalidClassMessage = false;
        this.japaneseImage = false;
        this.noInput = false;
        // this method will execute when user drag and drop the file
        this.dragdropcallback = function (files, $event) {
            _this.disableCheckbox = false;
            $("#tiffImageId").find("canvas.preview").remove();
            _this.fileName = files[0].name;
            var index = _this.fileName.lastIndexOf('.');
            var fileType = _this.fileName.substring(index, _this.fileName.length).toLowerCase();
            _this.ImageNotFoundMessage = false;
            _this.errorMessageVisi = false;
            _this.disableSegmentBth = false;
            _this.disableSearchBtn = false;
            _this.dummyVar = false;
            if (_this.notTakeImageOnDragDrop == false) {
                _this.fileName = files[0].name;
                //  console.log("file type"+files[0].type);
                _this.noInput = false;
                var fileReader = new FileReader();
                var fileSizeInBytes = files[0].size;
                var fileSizeInMB = (fileSizeInBytes) / (1024 * 1024);
                var index = _this.fileName.lastIndexOf('.');
                var fileType_1 = _this.fileName.substring(index, _this.fileName.length).toLowerCase();
                localStorage.setItem("FileType", JSON.stringify(fileType_1));
                localStorage.setItem("FileSize", JSON.stringify(fileSizeInBytes));
                // console.log("File type is " + fileType);
                if ((fileType_1 == '.png' || fileType_1 == '.jpg' || fileType_1 == '.jpeg' || fileType_1 == '.tiff' || fileType_1 == '.tif' || fileType_1 == '.mmr') && (fileSizeInMB <= 2)) {
                    if ((fileType_1 == '.png' || fileType_1 == '.jpg' || fileType_1 == '.jpeg' || fileType_1 == '.mmr')) {
                        _this.hideDummyImageOnDragDrop = true;
                    }
                    else {
                        _this.hideDummyImageOnDragDrop = false;
                    }
                    _this.dummyVar = true;
                    if (files && files[0]) {
                        if (fileType_1 == '.tiff' || fileType_1 == '.tif') {
                            _this.tif = true;
                        }
                        else {
                            _this.nontif = true;
                            _this.activeClass = true;
                            //  this.activeClass1 = true;
                            _this.activettfClass = false;
                            //   this.activettfClass1 = false;
                            _this.errorMessageVisi = false;
                            var reader = new FileReader();
                            reader.onload = function (event) {
                                if (_this.notTakeImageOnDragDrop == false) {
                                    _this.url = event.target.result;
                                    //  $("#nontiffImageId").append('<img src="' + this.url + '" class="preview"/>');
                                    var contents = event.target.result;
                                    //     console.log('data length'+contents.data.length)
                                    if (contents == 'data:') {
                                        _this.errorMessageVisi = true;
                                        _this.disableSearchBtn = true;
                                        _this.disableSegmentBth = true;
                                        _this.activettfClass = true;
                                        _this.noInput = true;
                                    }
                                    //  console.log("length" + contents.length);
                                    _this.setPic();
                                }
                            };
                            reader.readAsDataURL(files[0]);
                        }
                    }
                    if (files != null && files.length > 0) {
                        _this.checkIsImageIsSelected = true;
                        _this.errorMessageVisi = false;
                        var fileType_2 = _this.fileName.substring(index, _this.fileName.length).toLowerCase();
                        if (fileType_2 == '.tiff' || fileType_2 == '.tif') {
                            //  console.log('not set');
                            var validation1;
                            var check;
                            var reader1 = new FileReader();
                            reader1.onload = function (event) {
                                console.debug("Parsing TIFF image...");
                                //   console.log("hii" + event.target.result);
                                var arr = (new Uint8Array(event.target.result)).subarray(0, 4);
                                var header = "";
                                for (var i = 0; i < arr.length; i++) {
                                    header += arr[i].toString(16);
                                }
                                var bytes = [];
                                var hex = bytes.join('').toUpperCase();
                                validation1 = header;
                                // console.log("hex" + validation1.substring(0,7));
                                check = validation1.substring(0, 7);
                                //  console.log("check" + header);
                                if (check === "49492a0") {
                                    //   console.log("it is   tif");
                                    _this.errorMessageVisi = false;
                                    _this.disableSegmentBth = false;
                                    _this.disableSearchBtn = false;
                                    _this.noInput = false;
                                }
                                else {
                                    // console.log("it is not tiff");
                                    _this.errorMessageVisi = true;
                                    _this.disableSearchBtn = true;
                                    _this.disableSegmentBth = true;
                                    _this.activettfClass = true;
                                    _this.noInput = true;
                                }
                                //initialize with 100MB for large files
                                Tiff.initialize({
                                    TOTAL_MEMORY: 100000000
                                });
                                var tiff = new Tiff({
                                    buffer: event.target.result
                                });
                                //  console.log("contents" + buffer);
                                var tiffCanvas = tiff.toCanvas();
                                $(tiffCanvas).css({
                                    "max-width": "331px",
                                    "min-width": "331px",
                                    "width": "100%",
                                    "z-index": "0",
                                    "height": "237px"
                                }).addClass("preview");
                                $("#tiffImageId").append(tiffCanvas);
                                var buffer = event.target.result;
                                var uint = new Uint8Array(event.target.result);
                                uint.forEach(function (byte) {
                                    bytes.push(byte.toString(16));
                                });
                                _this.setPic();
                            };
                            reader1.readAsArrayBuffer(files[0]);
                            console.log("validation1" + validation1);
                        }
                        else {
                            setTimeout(function () {
                                _this.setPic();
                            }, 0);
                        }
                        _this.filesList = files[0];
                        _this.feedbackCompMainImageName = files[0].name;
                    }
                    else {
                        _this.filesList = null;
                    }
                }
                else {
                    _this.disableSegmentBth = true;
                    _this.errorMessageVisi = true;
                    _this.disableSearchBtn = true;
                }
            }
        };
        this.authServiceInfo = authService;
    }
    SegmentComponent.prototype.ngOnInit = function () {
        window.initialize(this.dragdropcallback);
        var response = localStorage.getItem('Language');
        //   console.log("Response" + response);
    };
    SegmentComponent.prototype.classMessageVisi = function (event) {
        var regx = /^\d+(?:,\d+)*$/g;
        if (event == "") {
            this.invalidClassMessage = false;
        }
        else if (regx.test(event)) {
            this.invalidClassMessage = false;
        }
        else {
            this.invalidClassMessage = true;
        }
    };
    SegmentComponent.prototype.setPic = function () {
        $('.hideImage').removeClass('setWidth');
        $('.hideImage').removeClass('setheight');
        var picwidth = $('.hideImage').width();
        var picheight = $('.hideImage').height();
        //console.log(picwidth);
        //console.log(picheight);
        if (picheight <= picwidth) {
            $('.hideImage').addClass('setheight');
        }
        else {
            $('.hideImage').addClass('setWidth');
        }
    };
    SegmentComponent.prototype.checkFormStatus = function () {
        this.disableSegmentBth = true;
        if (this.filesList != null) {
            this.SegmentImage();
        }
    };
    SegmentComponent.prototype.segmentClick = function () {
        this.disableSegmentBth = true;
        this.disableSearchBtn = true;
        if (this.filesList != null) {
            this.SegmentImage();
        }
    };
    SegmentComponent.prototype.FileLoaded = function (ev) {
        var data = ev.target;
        localStorage.setItem("FileData", data.result);
    };
    SegmentComponent.prototype.SegmentImage = function () {
        var _this = this;
        this.disableDIV = true;
        this.notTakeImageOnDragDrop = true;
        this.slimLoadingBarService.start();
        this.errorMessageVisi = false;
        var formData = new FormData();
        var reader = new FileReader();
        reader.onload = this.FileLoaded;
        reader.readAsArrayBuffer(this.filesList);
        //  console.log('[' + new Date().toISOString() + ']');
        //  console.log(this.filesList);
        formData.append('file', this.filesList, this.filesList.name);
        //    formData.append("classname", this.searchString);
        this._segmentImageService.SegementImages(formData)
            .subscribe(function (result) {
            _this.slimLoadingBarService.complete();
            var fileListObject = new feedback_model_1.ActualFeedbackModel();
            var segmentModelObject = new segment_model_1.SegmentModel();
            segmentModelObject.queryImageUrl = _this.queryImageUrl;
            segmentModelObject.segmentedUrls = _this.segmentedUrls;
            segmentModelObject.className = _this.searchString;
            segmentModelObject.queryImageUrl = result.queryImageUrl;
            segmentModelObject.segmentedUrls = result.segmentedUrls;
            segmentModelObject.preprocessedImageUrl = result.preprocessedImageUrl;
            //  console.log("res"+  result);
            // let emptyObj:any = {};
            //   console.log("segmentModel Object" + segmentModelObject);
            // localStorage.setItem('Response',fileListObject);
            _this.segmentResolver.setData(segmentModelObject);
            localStorage.setItem("SegmentResponse", JSON.stringify(segmentModelObject));
            //  console.log("segment model object :" + JSON.stringify(segmentModelObject) ) ;
            //  Config.holdData = holdFileData;
            // ---------------------------------------------------------------------------
            _this._router.navigate(['/home/segmentsearch']);
        }, function (error) {
            _this.notTakeImageOnDragDrop = false;
            if (error.status == 401 || error.status == 0) {
                _this.slimLoadingBarService.complete();
                // remove user from local storage to log user out
                localStorage.removeItem('tokenData');
                localStorage.setItem("logoutMessage", ('401'));
                var redirect = '/login';
                _this._router.navigate([redirect]);
            }
            if (error.status == 504) {
                _this.notTakeImageOnDragDrop = false;
                _this.disableSearchBtn = false;
                _this.disableSegmentBth = false;
                _this.slimLoadingBarService.complete();
                _this.serverErrorText = 'Connection Timed Out.';
                $("#openServerErrorModal").click();
            }
            if (error.status == 500 || error.status == 404) {
                _this.notTakeImageOnDragDrop = false;
                _this.disableSearchBtn = false;
                _this.disableSegmentBth = false;
                _this.disableDIV = false;
                _this.slimLoadingBarService.complete();
                _this.serverErrorText = 'We are sorry, but something went wrong.';
                $("#openServerErrorModal").click();
                var redirect = 'home/segment';
                _this._router.navigate([redirect]);
            }
        });
    };
    SegmentComponent.prototype.searchClick = function () {
        var _this = this;
        this.disableDIV = true;
        this.disableSegmentBth = true;
        this.disableSearchBtn = true;
        this.notTakeImageOnDragDrop = true;
        this.slimLoadingBarService.start();
        this.errorMessageVisi = false;
        var formData = new FormData();
        var reader = new FileReader();
        reader.onload = this.FileLoaded;
        reader.readAsArrayBuffer(this.filesList);
        //  console.log('[' + new Date().toISOString() + ']');
        //  console.log(this.filesList);
        if (this.searchString == undefined) {
            this.searchString = "all";
        }
        if (this.searchString == '') {
            this.searchString = "all";
        }
        formData.append('file', this.filesList, this.filesList.name);
        formData.append("classname", this.searchString);
        this._searchImageService.SearchImagee(formData)
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
            fileListObject.feedbackCompClassName = _this.searchString;
            //    fileListObject.size = this.filesList.size;
            var holdFileData = new feedback_model_1.HoldFileData();
            holdFileData.name = result.queryImageURL.substring(result.queryImageURL.lastIndexOf('/') + 1, result.queryImageURL.length);
            holdFileData.size = '2MB';
            holdFileData.type = holdFileData.name.substring(holdFileData.name.lastIndexOf('.') + 1, holdFileData.name.length);
            holdFileData.searchString = _this.searchString;
            // let emptyObj:any = {};
            //  console.log("File Object" + fileListObject);
            // localStorage.setItem('Response',fileListObject);
            for (var i = 0; i < fileListObject.searchResult.length; i++) {
                fileListObject.searchResult[i].uniqueID = i;
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
            _this.slimLoadingBarService.complete();
            if (error.status == 401 || error.status == 0) {
                // remove user from local storage to log user out
                localStorage.removeItem('tokenData');
                localStorage.setItem("logoutMessage", ('401'));
                var redirect = '/login';
                _this._router.navigate([redirect]);
            }
            if (error.status == 504) {
                _this.disableSearchBtn = false;
                _this.disableSegmentBth = false;
                _this.disableDIV = false;
                _this.notTakeImageOnDragDrop = false;
                _this.slimLoadingBarService.complete();
                _this.serverErrorText = 'Connection Timed Out.';
                $("#openServerErrorModal").click();
            }
            if (error.status == 500 || error.status == 404) {
                _this.notTakeImageOnDragDrop = false;
                _this.disableSearchBtn = false;
                _this.disableSegmentBth = false;
                _this.disableDIV = false;
                _this.slimLoadingBarService.complete();
                _this.serverErrorText = 'We are sorry, but something went wrong.';
                $("#openServerErrorModal").click();
            }
        });
    };
    SegmentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "segment.component.html",
            styleUrls: ['segment.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, segmentImage_service_1.SegmentImageService, searchImage_service_1.SearchImageService, ng2_slim_loading_bar_1.SlimLoadingBarService, authentication_service_1.AuthenticationService, segment_resolver_service_1.SegmentResolver, feedback_resolver_service_1.FeedbackResolver, ng2_translate_1.TranslateService, config_1.Config])
    ], SegmentComponent);
    return SegmentComponent;
}());
exports.SegmentComponent = SegmentComponent;
//# sourceMappingURL=segment.component.js.map
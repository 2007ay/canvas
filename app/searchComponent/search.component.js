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
var searchImage_service_1 = require('../shared/services/searchImage.service');
var $ = require("https://code.jquery.com/jquery-3.1.1.js");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var feedback_model_1 = require("../shared/models/feedback.model");
var feedback_resolver_service_1 = require('../shared/resolver/feedback-resolver.service');
var config_1 = require('../config/config');
var SearchComponent = (function () {
    //@ViewChild('tiffimage') el:ElementRef;
    function SearchComponent(_router, _searchImageService, slimLoadingBarService, feedbackResolver, config) {
        var _this = this;
        this._router = _router;
        this._searchImageService = _searchImageService;
        this.slimLoadingBarService = slimLoadingBarService;
        this.feedbackResolver = feedbackResolver;
        this.config = config;
        this.searchString = "";
        this.filesList = null;
        this.browseFileData = null;
        this.hideDummyImageOnDragDrop = false;
        this.ImageNotFoundMessage = false;
        this.dummyVar = false;
        this.errorMessageVisi = false;
        this.errorMessageTif = false;
        this.disableSearchBtn = true;
        //disablebtn: boolean = true;
        this.disableSegmentBth = true;
        this.checkIsImageIsSelected = false;
        this.hideDragDropTextWhenZipFileDropped = false;
        this.showImageNameVisi = false;
        this.fileName = '';
        this.queryImageURL = '';
        this.noClass = false;
        this.disableDIV = false;
        this.activettfClass = false;
        this.activeClass = false;
        this.notTakeImageOnDragDrop = false;
        this.tif = false;
        this.nontif = false;
        this.segment = true;
        this.search = false;
        this.invalidClassMessage = false;
        this.invalidformat = false;
        // this method will execute when user drag and drop the file
        this.dragdropcallback = function (files, $event) {
            _this.invalidformat = false;
            $("#tiffImageId").find("canvas.preview").remove();
            _this.fileName = files[0].name;
            var index = _this.fileName.lastIndexOf('.');
            var fileType = _this.fileName.substring(index, _this.fileName.length).toLowerCase();
            _this.ImageNotFoundMessage = false;
            _this.errorMessageVisi = false;
            _this.disableSearchBtn = false;
            //   this.disablebtn = false;
            _this.disableSegmentBth = false;
            _this.hideDragDropTextWhenZipFileDropped = false;
            _this.dummyVar = false;
            if (_this.notTakeImageOnDragDrop == false) {
                _this.fileName = files[0].name;
                //   console.log("file type"+files[0].type);
                var fileReader = new FileReader();
                var fileSizeInBytes = files[0].size;
                var fileSizeInMB = (fileSizeInBytes) / (1024 * 1024);
                var index = _this.fileName.lastIndexOf('.');
                var fileType_1 = _this.fileName.substring(index, _this.fileName.length).toLowerCase();
                // console.log("File type is " + fileType);
                if ((fileType_1 == '.png' || fileType_1 == '.jpg' || fileType_1 == '.jpeg' || fileType_1 == '.tiff' || fileType_1 == '.tif' || fileType_1 == '.mmr') && (fileSizeInMB <= 2)) {
                    if ((fileType_1 == '.png' || fileType_1 == '.jpg' || fileType_1 == '.jpeg' || fileType_1 == '.mmr')) {
                        _this.hideDummyImageOnDragDrop = true;
                    }
                    else {
                        _this.hideDummyImageOnDragDrop = false;
                    }
                    _this.dummyVar = true;
                    _this.showImageNameVisi = false;
                    if (files && files[0]) {
                        if (fileType_1 == '.tiff' || fileType_1 == '.tif') {
                            _this.tif = true;
                        }
                        else {
                            _this.nontif = true;
                            _this.activeClass = true;
                            _this.activettfClass = false;
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
                                        _this.activettfClass = true;
                                        _this.invalidformat = true;
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
                                //  console.log("hii" + event.target.result);
                                var arr = (new Uint8Array(event.target.result)).subarray(0, 4);
                                var header = "";
                                for (var i = 0; i < arr.length; i++) {
                                    header += arr[i].toString(16);
                                }
                                var bytes = [];
                                var hex = bytes.join('').toUpperCase();
                                validation1 = header;
                                //    console.log("hex" + validation1.substring(0,7));
                                check = validation1.substring(0, 7);
                                //   console.log("check" + header);
                                if (check === "49492a0") {
                                    //    console.log("it is   tif");
                                    _this.errorMessageVisi = false;
                                    _this.disableSegmentBth = false;
                                    _this.disableSearchBtn = false;
                                    _this.invalidformat = false;
                                }
                                else {
                                    //   console.log("it is not tiff");
                                    _this.errorMessageVisi = true;
                                    _this.disableSearchBtn = true;
                                    _this.disableSegmentBth = true;
                                    _this.activettfClass = true;
                                    _this.invalidformat = true;
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
                                ;
                                $("#tiffImageId").append(tiffCanvas);
                                var buffer = event.target.result;
                                var uint = new Uint8Array(event.target.result);
                                uint.forEach(function (byte) {
                                    bytes.push(byte.toString(16));
                                });
                                _this.setPic();
                            };
                            reader1.readAsArrayBuffer(files[0]);
                        }
                        else {
                            setTimeout(function () {
                                _this.setPic();
                            }, 0);
                        }
                        _this.filesList = files[0];
                        //  this.errorMessageVisi = false;
                        _this.feedbackCompMainImageName = files[0].name;
                    }
                    else {
                        _this.filesList = null;
                    }
                }
                else {
                    _this.showImageNameVisi = false;
                    _this.errorMessageVisi = true;
                    _this.disableSearchBtn = true;
                }
            }
        };
    }
    SearchComponent.prototype.ngOnInit = function () {
        window.initialize(this.dragdropcallback);
    };
    SearchComponent.prototype.setPic = function () {
        $('.hideImage').removeClass('setWidth');
        $('.hideImage').removeClass('setheight');
        var picwidth = $('.hideImage').width();
        var picheight = $('.hideImage').height();
        if (picheight <= picwidth) {
            $('.hideImage').addClass('setheight');
        }
        else {
            $('.hideImage').addClass('setWidth');
        }
    };
    // this method will execute, to check whether fileslist is not null
    SearchComponent.prototype.checkFormStatus = function () {
        if (this.filesList != null) {
            this.SearchImage();
        }
    };
    SearchComponent.prototype.classMessageVisi = function (event) {
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
    SearchComponent.prototype.FileLoaded = function (ev) {
        var data = ev.target;
        localStorage.setItem("FileData", data.result);
    };
    SearchComponent.prototype.SearchImage = function () {
        var _this = this;
        this.disableDIV = true;
        this.notTakeImageOnDragDrop = true;
        this.slimLoadingBarService.start();
        this.errorMessageVisi = false;
        this.disableSearchBtn = true;
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
            fileListObject.fileName = _this.fileName;
            fileListObject.fileType = _this.filesList.type;
            fileListObject.size = _this.filesList.size;
            fileListObject.mainImage = _this.url;
            fileListObject.mainImage1 = _this.url1;
            if (result.results) {
                fileListObject.searchResult = result.results;
                fileListObject.queryImageURL = result.queryImageURL;
            }
            else {
                fileListObject.searchResult = result;
            }
            // fileListObject.searchResult = result.results;
            fileListObject.maxResultCount = result.resultSize;
            fileListObject.cnnResultSize = result.cnnResultSize;
            fileListObject.siftResultSize = result.siftResultSize;
            fileListObject.cnnAccess = result.isCNNAccess;
            fileListObject.siftAccess = result.isSiftAccess;
            var holdFileData = new feedback_model_1.HoldFileData();
            holdFileData.lastModifiedDate = _this.filesList.lastModifiedDate;
            holdFileData.name = _this.filesList.name;
            holdFileData.size = _this.filesList.size;
            holdFileData.type = _this.filesList.type;
            holdFileData.webkitRelativePath = _this.filesList.webkitRelativePath;
            holdFileData.searchString = _this.searchString;
            // let emptyObj:any = {};
            //  console.log("File Object" + fileListObject);
            // localStorage.setItem('Response',fileListObject);
            for (var i = 0; i < fileListObject.searchResult.length; i++) {
                fileListObject.searchResult[i].uniqueID = i;
            }
            _this.feedbackResolver.setData(fileListObject);
            localStorage.setItem("Response", JSON.stringify(fileListObject));
            localStorage.setItem("FileList", JSON.stringify(_this.filesList));
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
                _this.slimLoadingBarService.complete();
                _this.serverErrorText = 'Connection Timed Out.';
                $("#openServerErrorModal").click();
            }
            if (error.status == 500 || error.status == 404) {
                _this.notTakeImageOnDragDrop = false;
                _this.disableSearchBtn = false;
                _this.disableDIV = false;
                _this.slimLoadingBarService.complete();
                _this.serverErrorText = 'We are sorry, but something went wrong.';
                $("#openServerErrorModal").click();
            }
        });
    };
    SearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "search.component.html",
            styleUrls: ['search.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, searchImage_service_1.SearchImageService, ng2_slim_loading_bar_1.SlimLoadingBarService, feedback_resolver_service_1.FeedbackResolver, config_1.Config])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map
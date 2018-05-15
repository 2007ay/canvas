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
var searchImage_service_1 = require('../shared/services/searchImage.service');
var authentication_service_1 = require('../shared/services/authentication.service');
var feedback_model_1 = require("../shared/models/feedback.model");
require('rxjs/add/observable/forkJoin');
var $ = require("https://code.jquery.com/jquery-3.1.1.js");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var FeedbackComponent = (function () {
    function FeedbackComponent(_router, route, _searchImageService, authService, slimLoadingBarService) {
        this._router = _router;
        this.route = route;
        this._searchImageService = _searchImageService;
        this.authService = authService;
        this.slimLoadingBarService = slimLoadingBarService;
        this.disableScrollDown = false;
        this.NoStringFound = false;
        this.markRelevance = new feedback_model_1.MarkRelevance();
        this.modalOpen = false;
        this.listView = true;
        this.gridView = false;
        this.myFavTab = false;
        this.allResultTectVisiWhenListViewActive = true;
        this.allResultTectVisiWhenGridViewActive = false;
        this.myfavTabVisiWhenListTabActive = true;
        this.myFavTabVisiWhenGridTabActive = false;
        this.AllListView = true;
        this.myFavTabInListView = false;
        this.AllgridView = false;
        this.nextArrowVisi = false;
        this.preArrowVisi = false;
        this.holdFileNameForTTF = '';
        this.showMainImage = true;
        this.showFileName = false;
        this.tableHeaderVisi = false;
        this.cnnAccess = false;
        this.siftAccess = false;
        this.disableEntire = false;
        this.Response = new feedback_model_1.ActualFeedbackModel();
        this.StoreMarkedImages = [];
        this.throttle = 300;
        this.scrollDistance = 1;
        this.scrollUpDistance = 2;
        this.direction = '';
        // first time how many items will show in list
        this.pageSize = 20;
        //to check the number of items in list(this value will vary if we press load more button)
        // first time its value will be 0 and when we press load more than its value will be 20 and so on..
        this.skip = 0;
        this.cnnDescending = false;
        this.siftDescending = true;
        this.authServiceInfo = authService;
        this.onResize();
        //debugger
        var response = localStorage.getItem('Response');
        if (response) {
            this.Response = JSON.parse(response);
        }
    }
    FeedbackComponent.prototype.onScroll = function () {
        // console.log("inside scroll");
        var element = this.myScrollContainer.nativeElement;
        var x = Math.ceil(element.scrollHeight);
        // console.log("scrollHeight" + x);
        var y = Math.ceil(element.scrollTop);
        // console.log("scrollTop" + y);
        var z = Math.ceil(element.clientHeight);
        console.log("clientHeight" + z);
        var atBottom = element.scrollHeight - Math.ceil(element.scrollTop) <= element.clientHeight;
        //let atBottom  = this.myScrollContainer.nativeElement.scrollTop >= this.myScrollContainer.nativeElement.scrollHeight;
        //let atBottom   = (x- y )<=z;
        //let atBottom = Math.abs(q) < 10;
        // let atBottom1 = element.scrollHeight - Math.ceil(element.scrollTop) <= element.clientHeight
        if (this.disableScrollDown && atBottom) {
            this.disableScrollDown = false;
            if (this.skip <= this.maxResultCount) {
                this.loadMoreClick();
            }
        }
        else {
            this.disableScrollDown = true;
        }
    };
    FeedbackComponent.prototype.onResize = function () {
        var height = $(window).height();
        // console.log('Browser Height :', height);
        var finalHeight = height - 460;
        $('.setScrolling').css('height', finalHeight);
        setTimeout(function () {
            $('.resultDiv.noheader .setScrolling').css('height', finalHeight + 40);
        }, 100);
    };
    FeedbackComponent.prototype.ngAfterViewInit = function () {
        this.onResize();
    };
    FeedbackComponent.prototype.onRefresh = function () {
        this.formatDataSet();
    };
    FeedbackComponent.prototype.formatDataSet = function () {
        var markedImagesFromLocalStorage = JSON.parse(localStorage.getItem('MarkedImages'));
        if (markedImagesFromLocalStorage != null) {
            var _loop_1 = function(i) {
                var item = this_1.Response.searchResult.find(function (x) { return (x.imageName == markedImagesFromLocalStorage[i].imageName) && (x.source == markedImagesFromLocalStorage[i].source); });
                if (item != undefined || item != null) {
                    item.status = 1;
                }
            };
            var this_1 = this;
            for (var i = 0; i < markedImagesFromLocalStorage.length; i++) {
                _loop_1(i);
            }
        }
        this.AssignPropValues();
    };
    /**
     * tsip call
     */
    FeedbackComponent.prototype.formatDataSet2 = function () {
        var markedImagesFromLocalStorage = JSON.parse(localStorage.getItem('MarkedImages'));
        if (markedImagesFromLocalStorage != null) {
            var _loop_2 = function(i) {
                var item = this_2.Response.searchResult.find(function (x) { return (x.imageName == markedImagesFromLocalStorage[i].imageName) && (x.source == markedImagesFromLocalStorage[i].source); });
                if (item != undefined || item != null) {
                    item.status = 1;
                }
            };
            var this_2 = this;
            for (var i = 0; i < markedImagesFromLocalStorage.length; i++) {
                _loop_2(i);
            }
        }
        this.AssignPropValues();
    };
    /**end call */
    FeedbackComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            // 1st time
            if (data['feedback'] != undefined) {
                var feedback = data['feedback'];
                _this.Response = feedback;
                var _ResponseRef = new feedback_model_1.ResponseRef();
                _ResponseRef = {
                    feedbackCompClassName: _this.Response.feedbackCompClassName,
                    fileType: _this.Response.fileType,
                    fileName: _this.Response.fileName,
                    mainImage: _this.Response.mainImage,
                    mainImage1: _this.Response.mainImage1,
                    queryImageURL: _this.Response.queryImageURL,
                    size: _this.Response.size,
                    source1: _this.Response.source1
                };
                localStorage.setItem("currentData", JSON.stringify(_ResponseRef));
                localStorage.removeItem('MarkedImages');
                _this.AssignPropValues();
            }
            else {
                _this.slimLoadingBarService.start();
                _this.onRefresh();
                _this.slimLoadingBarService.complete();
            }
        });
    };
    // getting data from search component, based on user type in search box or drag drop
    FeedbackComponent.prototype.AssignPropValues = function () {
        this.maxResultCount = this.Response.maxResultCount;
        this.siftResultSize = this.Response.siftResultSize;
        this.cnnResultSize = this.Response.cnnResultSize;
        // this.holdMainImage = this.Response.mainImage;
        //this.holdMainImage1 = this.Response.mainImage1;
        this.queryImageURL = this.Response.queryImageURL;
        //  console.log("test" + this.Response.mainImage);
        //console.log('url'+this.queryImageURL);
        this.ImageType = this.Response.fileType;
        this.holdMainImageSize = this.Response.size;
        /*var stringArray = this.holdMainImageInfo.split('/');
        if (stringArray.length == 2) {
          this.ImageType = stringArray[1];
        }*/
        /* if (this.ImageType == 'tiff' || this.ImageType == 'tif') {
           this.showMainImage = false;
           this.showFileName = true;
         }*/
        this.holdClassEnteredByUser = this.Response.feedbackCompClassName;
        this.holdFileNameForTTF = this.Response.fileName;
        if (this.Response.searchResult) {
            this.getFirstTabTableData();
        }
        else {
            this.NoStringFound = true;
            this.listView = true;
            this.gridView = true;
            this.myFavTab = true;
            this.myFavTabInListView = true;
        }
        //finaly save Response to the local storage in case user dose reload window
        localStorage.setItem('Response', JSON.stringify(this.Response));
    };
    FeedbackComponent.prototype.incrementLoadCount = function () {
        //console.log("inside incrementLoadCount");
        if (this.myFavTab || this.myFavTabInListView) {
        }
        else {
            this.skip = this.skip + this.pageSize;
        }
    };
    FeedbackComponent.prototype.loadNext = function (data) {
        var take = 0;
        take = this.skip;
        if (data == null) {
            return data;
        }
        if (this.maxResultCount <= (take + 40)) {
            return data.slice(0, this.maxResultCount);
        }
        if (data.length <= take) {
            return data;
        }
        if (data.length > take) {
            return data.slice(0, take);
        }
        // this.size=take;
    };
    FeedbackComponent.prototype.hasMore = function () {
        if (!this.Response.searchResult)
            return false;
        if (this.maxResultCount < this.Response.searchResult.length) {
            return false;
        }
        else {
            return true;
        }
    };
    FeedbackComponent.prototype.loadNextItems = function (filtered) {
        // debugger
        var cnn = this.cnnTableData || [];
        var sift = this.siftTableData || [];
        if (filtered) {
            //cnn = this.loadNext(this.cnnTableData.filter(x => x.status == 1));
            // sift = this.loadNext(this.siftTableData.filter(x => x.status == 1));
            cnn = this.cnnTableData.filter(function (x) { return x.status == 1; }) || [];
            sift = this.siftTableData.filter(function (x) { return x.status == 1; }) || [];
        }
        else {
            cnn = this.loadNext(this.cnnTableData);
            sift = this.loadNext(this.siftTableData);
        }
        this.cnnTableDisplayData = this.cnnDescending ? this.sortCNNByDesc(cnn) : this.sortCNNByAsc(cnn);
        //this.cnnTableDisplayData = this.cnnTableData;
        // for showing class name in tables.
        for (var i = 0; i < this.cnnTableDisplayData.length; i++) {
            this.cnnTableDisplayData[i].imageClassType2 = this.cnnTableDisplayData[i].imageClassType.split(',');
        }
        this.siftTableDisplayData = this.siftDescending ? this.sortSIFTByAsc(sift) : this.sortSIFTByDesc(sift);
        //this.siftTableDisplayData = this.siftTableData;
        for (var i = 0; i < this.siftTableDisplayData.length; i++) {
            this.siftTableDisplayData[i].imageClassType2 = this.siftTableDisplayData[i].imageClassType.split(',');
        }
    };
    FeedbackComponent.prototype.loadMoreItemFromBackend = function () {
        var _self = this;
        this._searchImageService.loadMoreImages(this.skip).subscribe(function (data) {
            var results = data.results || [];
            results.forEach(function (record) {
                var random = Math.random() * 10000;
                record.uniqueID = new Date().getTime() + parseInt(random, 10);
            });
            var isFilter = false;
            if (_self.myFavTab || _self.myFavTabInListView) {
                isFilter = true;
            }
            _self.Response.searchResult = _self.Response.searchResult.concat(results);
            _self.formatDataSet();
            _self.slimLoadingBarService.complete();
        }, function (error) {
            console.log(error);
            _self.slimLoadingBarService.complete();
        });
    };
    /**tsip Code */
    FeedbackComponent.prototype.loadMoreItemFromBackend1 = function () {
        var _this = this;
        debugger;
        var _self = this;
        this._searchImageService.loadMoreImages(this.skip - 20).subscribe(function (data) {
            var response2 = localStorage.getItem('Response');
            if (response2) {
                _this.Response1 = JSON.parse(response2);
            }
            var localstore1 = _this.Response1.searchResult;
            var results = data.results || [];
            debugger;
            results = localstore1.concat(results);
            _this.Response.searchResult = results;
            localStorage.setItem("Response", JSON.stringify(_this.Response));
            results.forEach(function (record) {
                var random = Math.random() * 10000;
                record.uniqueID = new Date().getTime() + parseInt(random, 10);
            });
            // let isFilter: boolean = false;
            // if (_self.myFavTab || _self.myFavTabInListView) {
            //   isFilter = true;
            //}
            //  let isFilter: boolean = false;
            // if (_self.myFavTab || _self.myFavTabInListView) {
            //   isFilter = true;
            //  }
            //_self.formatDataSet2();
            _self.slimLoadingBarService.complete();
            //let isFilter: boolean = true;
            // if (this.myFavTab || this.myFavTabInListView) {
            //  isFilter = true;
            // }
            _self.cnnTableData = _this.Response.searchResult.filter(function (x) { return x.source == "CNN"; });
            _self.siftTableData = _this.Response.searchResult.filter(function (x) { return x.source == "SIFT"; });
            _this.loadNextItems(false);
            _this.updateResultCount();
        }, function (error) {
            console.log(error);
            _self.slimLoadingBarService.complete();
        });
    };
    /** end Code */
    FeedbackComponent.prototype.loadMoreClick2 = function () {
        // let _self = this;
        this.slimLoadingBarService.start();
        //check if still aviable then load from in memory object otherwise call backend api for
        //next set of data
        this.incrementLoadCount();
        var isFilter = false;
        if (this.skip >= this.Response.searchResult.length) {
            this.formatDataSet();
        }
        else {
        }
    };
    FeedbackComponent.prototype.loadMoreClick = function () {
        //console.log("inside loadmoreclick");
        this.incrementLoadCount();
        debugger;
        var res = {};
        var cnnCount = 0;
        var siftCount = 0;
        var maxCount = 0;
        this.Response.searchResult.forEach(function (v) {
            if (v.source == "CNN") {
                res[v.source] = (res[v.source] || 0) + 1;
                cnnCount++;
            }
            else {
                res[v.source] = (res[v.source] || 0) + 1;
                siftCount++;
            }
        });
        if (cnnCount >= siftCount) {
            maxCount = cnnCount;
        }
        else {
            maxCount = siftCount;
        }
        if (this.skip <= maxCount) {
            var isFilter = false;
            if (this.myFavTab || this.myFavTabInListView) {
                isFilter = true;
            }
            this.loadNextItems(isFilter);
            this.updateResultCount();
        }
        else {
            debugger;
            this.loadMoreItemFromBackend1();
        }
    };
    FeedbackComponent.prototype.resetLoadCount = function () {
        this.skip = this.pageSize;
    };
    FeedbackComponent.prototype.getFirstTabTableData = function () {
        // debugger
        this.totalSearchResult = this.Response.searchResult.length;
        this.cnnAccess = this.Response.cnnAccess;
        this.siftAccess = this.Response.siftAccess;
        var _self = this;
        if (_self.Response.searchResult.length > 0) {
            for (var i = 0; i < _self.Response.searchResult.length; i++) {
                this.Response.searchResult[i].localId = i;
                if (_self.Response.searchResult[i].status == undefined) {
                    _self.Response.searchResult[i].status = 0;
                }
            }
            // FeedbackComponent.searchResult = this.sortByAsc(FeedbackComponent.searchResult);
            _self.cnnTableData = _self.Response.searchResult.filter(function (x) { return x.source == "CNN"; });
            _self.siftTableData = _self.Response.searchResult.filter(function (x) { return x.source == "SIFT"; });
            //   this.cnnTableDisplayData =  this.cnnTableData.filter(x => x.status == 1);
            _self.resetLoadCount();
            _self.loadNextItems(false);
            _self.updateResultCount();
            // if both CNN and SIFT data are presents
            if (this.cnnTableDisplayData.length >= 1 && this.siftTableDisplayData.length >= 1) {
                this.ifAllcat = true;
                this.cnnCat = false;
                this.siftCat = false;
                this.blank = false;
                this.ifSiftCatPresent = true;
                this.NoStringFound = false;
            }
            //here we are checking if only SIFT data present or not
            if (this.cnnTableDisplayData.length <= 0 && this.siftTableDisplayData.length >= 1) {
                this.ifAllcat = false;
                this.cnnCat = true;
                this.siftCat = false;
                this.blank = false;
                this.ifSiftCatPresent = true;
                this.NoStringFound = false;
            }
            //here we are checking if only CNN data present or not
            if (_self.cnnTableDisplayData.length >= 1 && this.siftTableDisplayData.length <= 0) {
                _self.ifAllcat = true;
                _self.cnnCat = false;
                _self.siftCat = true;
                _self.blank = false;
                _self.ifSiftCatPresent = false;
                _self.NoStringFound = false;
            }
            //if no data found
            if (this.cnnTableDisplayData.length <= 0 && this.siftTableDisplayData.length <= 0 || this.Response.searchResult.length <= 0) {
                this.ifAllcat = false;
                this.cnnCat = false;
                this.siftCat = false;
                this.blank = false;
                this.ifSiftCatPresent = false;
                this.NoStringFound = true;
            }
        }
        else {
            this.NoStringFound = true;
            this.listView = true;
            this.gridView = true;
            this.myFavTab = true;
        }
    };
    FeedbackComponent.prototype.MarkrelevanceCNN = function (i, data) {
        var _this = this;
        this.slimLoadingBarService.start();
        console.log(this.Response, 'Data :', data);
        //var markRelevance1 =  new markRelevance();
        // -------------------------------------------------------------------
        // this.markRelevance.queryImageID = data.queryImageID;
        // this.markRelevance.relevanceImage = data.name;
        // ----------------------------------------------------------------------
        this.slimLoadingBarService.start();
        this.markRelevance.queryImageURL = data.queryImageURL;
        this.markRelevance.relevantImageURL = data.imageURL;
        this.markRelevance.source = data.source;
        this.markRelevance.score = data.score;
        // ---------------------------------------------------------------------
        if (this.cnnTableDisplayData[i].status == 0) {
            this.markRelevance.status = 1;
        }
        else {
            this.markRelevance.status = 0;
        }
        console.log("cnn mark relevance called" + this.markRelevance.status);
        this.disableEntire = true;
        this._searchImageService.MarkRelevance(this.markRelevance)
            .subscribe(function (result) {
            //  console.log(result)
            _this.disableEntire = false;
            if (result) {
                var item = _this.Response.searchResult.find(function (x) { return x.uniqueID == data.uniqueID; });
                _this.slimLoadingBarService.complete();
                if (_this.cnnTableDisplayData[i].status == 1) {
                    _this.cnnTableDisplayData[i].status = 0;
                    item.status = 0;
                }
                else {
                    _this.slimLoadingBarService.complete();
                    _this.cnnTableDisplayData[i].status = 1;
                    item.status = 1;
                }
                if ((_this.myFavTab || _this.myFavTabInListView) && _this.modalOpen == false) {
                    _this.slimLoadingBarService.complete();
                    _this.loadNextItems(true);
                    _this.updateResultCount();
                }
                // console.log(this.Response.searchResult);
                localStorage.setItem("Response", JSON.stringify(_this.Response));
                var findInLocalStorage = JSON.parse(localStorage.getItem('MarkedImages'));
                if (findInLocalStorage != undefined) {
                    _this.StoreMarkedImages = findInLocalStorage;
                    // first find object, if not exist, push in array
                    var locObj = _this.StoreMarkedImages.find(function (x) { return (x.imageName == data.imageName) && (x.source == data.source); });
                    if (locObj == undefined || locObj == null) {
                        _this.StoreMarkedImages.push(data);
                    }
                    else {
                        var indexOfObj = _this.StoreMarkedImages.indexOf(locObj);
                        _this.StoreMarkedImages.splice(indexOfObj, 1);
                    }
                    // update the MarkedImagesArray in localStorage
                    localStorage.setItem("MarkedImages", JSON.stringify(_this.StoreMarkedImages));
                }
                else {
                    _this.StoreMarkedImages.push(data);
                    localStorage.setItem("MarkedImages", JSON.stringify(_this.StoreMarkedImages));
                }
            }
        }, function (error) {
            _this.disableEntire = false;
            if (error.status == 401 || error.status == 0) {
                _this.slimLoadingBarService.complete();
                // remove user from local storage to log user out
                localStorage.removeItem('tokenData');
                localStorage.setItem("logoutMessage", ('401'));
                var redirect = '/login';
                _this._router.navigate([redirect]);
                //   here try catch is used to remove the black background of modal
                try {
                    $(".modal-backdrop").remove();
                    $("body").removeClass('modal-open');
                }
                catch (e) {
                    console.log("Logout", e);
                }
            }
            else {
                if (error.status == 504) {
                    _this.slimLoadingBarService.complete();
                    _this.serverErrorText = 'Connection Timed Out.';
                    $("#openServerErrorModal").click();
                }
                if (error.status == 500 || error.status == 404) {
                    _this.slimLoadingBarService.complete();
                    _this.serverErrorText = 'We are sorry, but something went wrong.';
                    $("#openServerErrorModal").click();
                }
            }
        });
    };
    FeedbackComponent.prototype.MarkrelevanceSIFT = function (i, data) {
        var _this = this;
        this.slimLoadingBarService.start();
        this.markRelevance.queryImageURL = data.queryImageURL;
        this.markRelevance.relevantImageURL = data.imageURL;
        this.markRelevance.source = data.source;
        this.markRelevance.score = data.score;
        if (this.siftTableDisplayData[i].status == 0) {
            this.markRelevance.status = 1;
        }
        else {
            this.markRelevance.status = 0;
        }
        console.log("sift mark relevance called" + this.markRelevance.status);
        this.disableEntire = true;
        this._searchImageService.MarkRelevance(this.markRelevance)
            .subscribe(function (result) {
            _this.disableEntire = false;
            _this.slimLoadingBarService.complete();
            //  console.log(result)
            if (result) {
                var item = _this.Response.searchResult.find(function (x) { return x.uniqueID == data.uniqueID; });
                if (_this.siftTableDisplayData[i].status == 1) {
                    _this.siftTableDisplayData[i].status = 0;
                    item.status = 0;
                }
                else {
                    _this.siftTableDisplayData[i].status = 1;
                    item.status = 1;
                }
                if ((_this.myFavTab || _this.myFavTabInListView) && _this.modalOpen == false) {
                    _this.loadNextItems(true);
                    _this.updateResultCount();
                }
                localStorage.setItem("Response", JSON.stringify(_this.Response));
                var findInLocalStorage = JSON.parse(localStorage.getItem('MarkedImages'));
                if (findInLocalStorage != undefined) {
                    _this.StoreMarkedImages = findInLocalStorage;
                    // first find object, if not exist, push in array
                    var locObj = _this.StoreMarkedImages.find(function (x) { return (x.imageName == data.imageName) && (x.source == data.source); });
                    if (locObj == undefined || locObj == null) {
                        _this.StoreMarkedImages.push(data);
                    }
                    else {
                        var indexOfObj = _this.StoreMarkedImages.indexOf(locObj);
                        _this.StoreMarkedImages.splice(indexOfObj, 1);
                    }
                    // update the MarkedImagesArray in localStorage
                    localStorage.setItem("MarkedImages", JSON.stringify(_this.StoreMarkedImages));
                }
                else {
                    _this.StoreMarkedImages.push(data);
                    localStorage.setItem("MarkedImages", JSON.stringify(_this.StoreMarkedImages));
                }
            }
        }, function (error) {
            _this.disableEntire = false;
            if (error.status == 401 || error.status == 0) {
                _this.slimLoadingBarService.complete();
                // remove user from local storage to log user out
                localStorage.removeItem('tokenData');
                localStorage.setItem("logoutMessage", ('401'));
                try {
                    $(".modal-backdrop").remove();
                    $("body").removeClass('modal-open');
                }
                catch (e) {
                    console.log("Logout", e);
                }
                var redirect = '/login';
                _this._router.navigate([redirect]);
            }
            if (error.status == 504) {
                _this.slimLoadingBarService.complete();
                _this.serverErrorText = 'Connection Timed Out.';
                $("#openServerErrorModal").click();
            }
            if (error.status == 500 || error.status == 404) {
                _this.slimLoadingBarService.complete();
                _this.serverErrorText = 'We are sorry, but something went wrong.';
                $("#openServerErrorModal").click();
            }
        });
    };
    FeedbackComponent.prototype.ClearResult = function () {
        var redirect;
        if (this.authServiceInfo.tokenData.role == "ROLE_SIFT_USER") {
            redirect = 'home/search';
        }
        else {
            redirect = 'home/segment';
        }
        this._router.navigate([redirect]);
        //this._router.navigate(['/home/search']);
    };
    FeedbackComponent.prototype.WhichModalToShow = function (someString, imageName) {
        switch (someString) {
            case 'CNN':
                {
                    this.onlyShowToCNNModal = true;
                    this.onlyShowToSIFTModal = false;
                    this.cnnImageIndex = imageName;
                }
                break;
            case 'SIFT':
                {
                    this.onlyShowToCNNModal = false;
                    this.onlyShowToSIFTModal = true;
                    this.siftImageIndex = imageName;
                    $('#relevantImagesClose').click();
                }
                break;
        }
        this.modalOpen = true;
    };
    FeedbackComponent.prototype.clearModal = function () {
        this.modalOpen = false;
        var divElem = document.getElementsByClassName("item active");
        console.log(divElem);
        var divClassName = divElem[0];
        divClassName.className = "item";
        this.onlyShowToSIFTModal = false;
        this.onlyShowToCNNModal = false;
        this.nextArrowVisi = false;
        this.preArrowVisi = false;
        if ((this.myFavTab || this.myFavTabInListView) && this.modalOpen == false) {
            this.loadNextItems(true);
            this.updateResultCount();
        }
    };
    FeedbackComponent.prototype.ListTabClicked = function () {
        var height = $(window).height();
        var finalHeight = height - 460;
        $('.setScrolling').css('height', finalHeight);
        if (this.NoStringFound == true) {
            this.listView = true;
            this.gridView = true;
            this.myFavTab = true;
            this.tableHeaderVisi = false;
        }
        else {
            this.tableHeaderVisi = false;
            this.AllListView = true;
            this.myFavTabInListView = false;
            this.myFavTabVisiWhenGridTabActive = false;
            this.myfavTabVisiWhenListTabActive = true;
            this.allResultTectVisiWhenGridViewActive = false;
            this.allResultTectVisiWhenListViewActive = true;
            this.listView = true;
            this.gridView = false;
            this.myFavTab = false;
            this.loadNextItems(false);
            this.updateResultCount();
        }
    };
    FeedbackComponent.prototype.GridTabClicked = function () {
        var height = $(window).height();
        var finalHeight = height - 460;
        setTimeout(function () {
            $('.resultDiv.noheader .setScrolling').css('height', finalHeight + 40);
        }, 100);
        if (this.NoStringFound == true) {
            this.listView = true;
            this.gridView = true;
            this.myFavTab = true;
            this.tableHeaderVisi = true;
        }
        else {
            this.myFavTabInListView = false;
            this.AllgridView = true;
            this.myFavTabVisiWhenGridTabActive = true;
            this.myfavTabVisiWhenListTabActive = false;
            this.allResultTectVisiWhenGridViewActive = true;
            this.allResultTectVisiWhenListViewActive = false;
            this.listView = false;
            this.gridView = true;
            this.myFavTab = false;
            this.tableHeaderVisi = true;
            this.loadNextItems(false);
            this.updateResultCount();
        }
    };
    FeedbackComponent.prototype.myFavTabClicked = function () {
        if (this.NoStringFound == true) {
            this.listView = true;
            this.gridView = true;
            this.myFavTab = true;
        }
        else {
            this.AllgridView = false;
            this.listView = false;
            this.gridView = true;
            this.myFavTab = true;
            this.loadNextItems(true);
            this.updateResultCount();
        }
    };
    FeedbackComponent.prototype.updateResultCount = function () {
        this.cnnTableDataLength = this.cnnTableData.length;
        this.siftTableDataLength = this.siftTableData.length;
        this.cnnTableDisplayDataLength = this.cnnTableDisplayData.length;
        this.siftTableDisplayDataLength = this.siftTableDisplayData.length;
    };
    FeedbackComponent.prototype.allListResult = function () {
        var height = $(window).height();
        var finalHeight = height - 460;
        $('.setScrolling').css('height', finalHeight);
        this.loadNextItems(false);
        this.updateResultCount();
        this.AllListView = true;
        this.myFavTabInListView = false;
    };
    FeedbackComponent.prototype.myFavInListViewClicked = function () {
        /*  var height = $(window).height();
          var finalHeight = height - 460;
          setTimeout(function() {
            $('.resultDiv.noheader .setScrolling').css('height', finalHeight + 40);
          }, 100); */
        this.loadNextItems(true);
        this.updateResultCount();
        this.AllListView = false;
        this.myFavTabInListView = true;
    };
    FeedbackComponent.prototype.AllGridResultClicked = function () {
        var height = $(window).height();
        var finalHeight = height - 460;
        setTimeout(function () {
            $('.resultDiv.noheader .setScrolling').css('height', finalHeight + 40);
        }, 100);
        this.AllgridView = true;
        this.myFavTabInListView = false;
        this.myFavTab = false;
        this.loadNextItems(false);
        this.updateResultCount();
    };
    FeedbackComponent.prototype.sortAsc = function (typ) {
        if (typ == 'CNN') {
            this.cnnDescending = false;
            this.cnnTableDisplayData = this.sortCNNByAsc(this.cnnTableDisplayData);
        }
        if (typ == 'SIFT') {
            this.siftDescending = true;
            this.siftTableDisplayData = this.sortSIFTByAsc(this.siftTableDisplayData);
        }
    };
    FeedbackComponent.prototype.sortDesc = function (typ) {
        if (typ == 'CNN') {
            this.cnnDescending = true;
            this.cnnTableDisplayData = this.sortCNNByDesc(this.cnnTableDisplayData);
        }
        if (typ == 'SIFT') {
            this.siftDescending = false;
            this.siftTableDisplayData = this.sortSIFTByDesc(this.siftTableDisplayData);
        }
    };
    FeedbackComponent.prototype.sortByAsc = function (arr) {
        arr.sort(function (left, right) {
            return left.score - right.score;
        });
        return arr;
    };
    FeedbackComponent.prototype.sortCNNByAsc = function (arr) {
        arr.sort(function (left, right) {
            return left.score - right.score;
        });
        return arr;
    };
    FeedbackComponent.prototype.sortSIFTByAsc = function (arr) {
        arr.sort(function (left, right) {
            return right.score - left.score;
        });
        return arr;
    };
    FeedbackComponent.prototype.sortByDesc = function (arr) {
        arr.sort(function (left, right) {
            return left.score - right.score;
        });
        arr = arr.reverse();
        return arr;
    };
    FeedbackComponent.prototype.sortCNNByDesc = function (arr) {
        arr.sort(function (left, right) {
            return right.score - left.score;
        });
        return arr;
    };
    FeedbackComponent.prototype.sortSIFTByDesc = function (arr) {
        arr.sort(function (left, right) {
            return left.score - right.score;
        });
        return arr;
    };
    FeedbackComponent.prototype.up = function () {
        alert('up clicked');
    };
    FeedbackComponent.prototype.Down = function () {
        alert('down clicked');
    };
    FeedbackComponent.prototype.ShowNextItemInModal = function (siftTableDisplayData, cnnTableDisplayData) {
        $('#relevantImagesClose').click();
    };
    __decorate([
        core_1.ViewChild('scrollMe'), 
        __metadata('design:type', core_1.ElementRef)
    ], FeedbackComponent.prototype, "myScrollContainer", void 0);
    FeedbackComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "feedback.component.html",
            styleUrls: ['feedback.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_2.ActivatedRoute, searchImage_service_1.SearchImageService, authentication_service_1.AuthenticationService, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], FeedbackComponent);
    return FeedbackComponent;
}());
exports.FeedbackComponent = FeedbackComponent;
//# sourceMappingURL=feedback.component.js.map
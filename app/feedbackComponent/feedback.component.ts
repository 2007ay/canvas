import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { SearchImageService } from '../shared/services/searchImage.service';
import { AuthenticationService, User, LoginResponse } from '../shared/services/authentication.service';
import { FeedbackModel, MarkRelevance, ActualFeedbackModel, ResponseRef } from "../shared/models/feedback.model";
import 'rxjs/add/observable/forkJoin';
let $ = require("https://code.jquery.com/jquery-3.1.1.js");
declare var jQuery: any;
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Config } from '../config/config';


@Component({
  moduleId: module.id,
  templateUrl: "feedback.component.html",
  styleUrls: ['feedback.component.css']
})
export class FeedbackComponent {
  Response1: any;


  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  disableScrollDown:boolean = false;

  ifAllcat: boolean;
  cnnCat: boolean;
  siftCat: boolean;
  blank: boolean;
  ifSiftCatPresent: boolean;
  NoStringFound: boolean = false;
  firstTabTableData: Array<FeedbackModel>;
  cnnTableData: Array<FeedbackModel>;
    data: Array<FeedbackModel>;
  siftTableData: Array<FeedbackModel>;
  cnnTableDisplayData: Array<FeedbackModel>;
  siftTableDisplayData: Array<FeedbackModel>;
  onlyShowToCNNModal: boolean;
  onlyShowToSIFTModal: boolean;
  //holdMainImage: any;
  queryImageURL: any;
  //holdMainImage1: any;
  searchString: string;
  holdMainImageInfo: string;
    queryImage: string;
  holdClassEnteredByUser: string;
  markRelevance: MarkRelevance = new MarkRelevance();
  cnnImageIndex: any;
  siftImageIndex: any;
  serverErrorText: string;

  modalOpen: boolean = false;
  totalSearchResult: number;
  listView: boolean = true;
  gridView: boolean = false;
  myFavTab: boolean = false;

  cnnTableDataLength: number;
  siftTableDataLength: number;
  siftTableDisplayDataLength: number;
  cnnTableDisplayDataLength: number;

  allResultTectVisiWhenListViewActive: boolean = true;
  allResultTectVisiWhenGridViewActive: boolean = false;
  myfavTabVisiWhenListTabActive: boolean = true;
  myFavTabVisiWhenGridTabActive: boolean = false;
  AllListView: boolean = true;
  myFavTabInListView: boolean = false;
  AllgridView: boolean = false;
  ImageType: string;
  nextArrowVisi: boolean = false;
  
  preArrowVisi: boolean = false;
  holdFileNameForTTF: string = '';
  showMainImage: boolean = true;
  showFileName: boolean = false;
  tableHeaderVisi: boolean = false;
  cnnAccess: boolean = false;
  siftAccess: boolean = false;
  disableEntire: boolean = false;
  redirect: string;
  mainImage: any;
  fileList: any;
  feedbackCompClassName: string;
  holdMainImageSize: number;
  fileName: string;
  searchResult: Array<FeedbackModel>;
  Response: ActualFeedbackModel = new ActualFeedbackModel();
  StoreMarkedImages: Array<FeedbackModel> = [];
  maxResultCount: number;
  cnnResultSize: number;
  siftResultSize: number;

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  authServiceInfo:AuthenticationService;
  
  
  constructor(private _router: Router,
    private route: ActivatedRoute,
    private _searchImageService: SearchImageService,
    private authService: AuthenticationService,
    private slimLoadingBarService: SlimLoadingBarService) {
      this.authServiceInfo = authService;
    this.onResize();

    //debugger
    let response = localStorage.getItem('Response');
    
    if(response) {
      this.Response = JSON.parse(response);
    }
  }

  private onScroll() {
  // console.log("inside scroll");
    let element = this.myScrollContainer.nativeElement
    var x = Math.ceil(element.scrollHeight);
    
   // console.log("scrollHeight" + x);
    var y = Math.ceil(element.scrollTop);
   // console.log("scrollTop" + y);
    var z = Math.ceil(element.clientHeight);
    console.log("clientHeight" + z);
    let atBottom = element.scrollHeight - Math.ceil(element.scrollTop) <= element.clientHeight
    //let atBottom  = this.myScrollContainer.nativeElement.scrollTop >= this.myScrollContainer.nativeElement.scrollHeight;
    //let atBottom   = (x- y )<=z;
   //let atBottom = Math.abs(q) < 10;
   // let atBottom1 = element.scrollHeight - Math.ceil(element.scrollTop) <= element.clientHeight
    if (this.disableScrollDown && atBottom ) {
        this.disableScrollDown = false;
        if(this.skip <= this.maxResultCount){
        this.loadMoreClick();
        }
    } else {
        this.disableScrollDown = true
    }
}

  onResize() {
    var height = $(window).height();
    // console.log('Browser Height :', height);
    var finalHeight = height - 460;
    $('.setScrolling').css('height', finalHeight);
    setTimeout(function() {
      $('.resultDiv.noheader .setScrolling').css('height', finalHeight + 40);
    }, 100);

  }

  ngAfterViewInit() {
    this.onResize();
  }

  
  onRefresh() {
    this.formatDataSet();
  }

  formatDataSet(): void {
    let markedImagesFromLocalStorage: Array<FeedbackModel> = JSON.parse(localStorage.getItem('MarkedImages'));
    if (markedImagesFromLocalStorage != null) {
      for (let i = 0; i < markedImagesFromLocalStorage.length; i++) {
        let item = this.Response.searchResult.find(x => (x.imageName == markedImagesFromLocalStorage[i].imageName) && (x.source == markedImagesFromLocalStorage[i].source));
        if (item != undefined || item != null) {
          item.status = 1;
        }
      }
    }
    this.AssignPropValues();
  }

/**
 * tsip call
 */
formatDataSet2(): void {
  let markedImagesFromLocalStorage: Array<FeedbackModel> = JSON.parse(localStorage.getItem('MarkedImages'));
  if (markedImagesFromLocalStorage != null) {
    for (let i = 0; i < markedImagesFromLocalStorage.length; i++) {
      let item = this.Response.searchResult.find(x => (x.imageName == markedImagesFromLocalStorage[i].imageName) && (x.source == markedImagesFromLocalStorage[i].source));
      if (item != undefined || item != null) {
        item.status = 1;
      }
    }
  }

  this.AssignPropValues();
}

/**end call */

  ngOnInit() {

    this.route.data.subscribe(data => {

      // 1st time
      if (data['feedback'] != undefined) {

        let feedback = data['feedback'];

        this.Response = feedback;

        let _ResponseRef: ResponseRef = new ResponseRef();

                _ResponseRef = {
                    feedbackCompClassName: this.Response.feedbackCompClassName,
                    fileType:this.Response.fileType,
                    fileName: this.Response.fileName,
                    mainImage: this.Response.mainImage,
                    mainImage1: this.Response.mainImage1,
                    queryImageURL: this.Response.queryImageURL,
                    size: this.Response.size ,       
                    source1: this.Response.source1          
                }

        localStorage.setItem("currentData", JSON.stringify(_ResponseRef));
        localStorage.removeItem('MarkedImages');
       
        this.AssignPropValues();
      }
      // on refresh
      else {
        this.slimLoadingBarService.start();
        this.onRefresh();
        this.slimLoadingBarService.complete();
      }
    });
  }

  // getting data from search component, based on user type in search box or drag drop

  AssignPropValues() {

    this.maxResultCount = this.Response.maxResultCount;
    this.siftResultSize = this.Response.siftResultSize;
    this.cnnResultSize = this.Response.cnnResultSize;

  // this.holdMainImage = this.Response.mainImage;
   //this.holdMainImage1 = this.Response.mainImage1;
   this.queryImageURL = this.Response.queryImageURL; 
      //  console.log("test" + this.Response.mainImage);
//console.log('url'+this.queryImageURL);
   this.ImageType= this.Response.fileType;
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
  }

  // first time how many items will show in list
  private pageSize: number = 20;
  //to check the number of items in list(this value will vary if we press load more button)
  // first time its value will be 0 and when we press load more than its value will be 20 and so on..
  private skip: number = 0;


  incrementLoadCount(){
  //console.log("inside incrementLoadCount");
    if(this.myFavTab || this.myFavTabInListView){
      
    }else{
      this.skip = this.skip + this.pageSize;
    }
  }

  loadNext(data: Array<FeedbackModel>): Array<FeedbackModel> {

    let take = 0;
    take = this.skip;

    if (data == null) {
      return data;
    }

    if (this.maxResultCount <= ( take+40)) {
      
      return data.slice(0, this.maxResultCount);
    }

    if (data.length <= take) {
      return data;
    }

    if (data.length > take) {
      return data.slice(0, take);
    }
    
   // this.size=take;
  }

  hasMore(): boolean {

    if (!this.Response.searchResult) return false;

    if (this.maxResultCount < this.Response.searchResult.length) {
      return false;
    } else {
      return true;
      // if (this.Response.searchResult) {
      //     if (this.myFavTab || this.myFavTabInListView) {
      //         if (this.cnnTableData.filter(x => x.status == 1).length == this.cnnTableDisplayDataLength &&
      //             this.siftTableData.filter(x => x.status == 1).length == this.siftTableDisplayDataLength) {
      //             return false;
      //         } else {
      //             return true;
      //         }
      //     } else {
      //         if (this.cnnTableDataLength == this.cnnTableDisplayDataLength && this.siftTableDataLength == this.siftTableDisplayDataLength) {
      //             return false;
      //         } else {
      //             return true;
      //         }
      //     }
      // }
    }
  }

  loadNextItems(filtered: boolean) {
   // debugger

    let cnn: Array<FeedbackModel> = this.cnnTableData || [];
    let sift: Array<FeedbackModel> = this.siftTableData || [];

    if (filtered) {
      //cnn = this.loadNext(this.cnnTableData.filter(x => x.status == 1));
    // sift = this.loadNext(this.siftTableData.filter(x => x.status == 1));
      cnn = this.cnnTableData.filter(x => x.status == 1) || [];
      sift = this.siftTableData.filter(x => x.status == 1) || [];

    }
      else {
         cnn = this.loadNext(this.cnnTableData);
        sift = this.loadNext(this.siftTableData);
    
    }

 this.cnnTableDisplayData = this.cnnDescending ? this.sortCNNByDesc(cnn) : this.sortCNNByAsc(cnn);
//this.cnnTableDisplayData = this.cnnTableData;
    // for showing class name in tables.
    for (let i = 0; i < this.cnnTableDisplayData.length; i++) {
      this.cnnTableDisplayData[i].imageClassType2 = this.cnnTableDisplayData[i].imageClassType.split(',');
    }
   this.siftTableDisplayData = this.siftDescending ? this.sortSIFTByAsc(sift) : this.sortSIFTByDesc(sift);
  //this.siftTableDisplayData = this.siftTableData;
    for (let i = 0; i < this.siftTableDisplayData.length; i++) {
      this.siftTableDisplayData[i].imageClassType2 = this.siftTableDisplayData[i].imageClassType.split(',');
    }
  
  }

  loadMoreItemFromBackend():void {
    
    

    let _self = this;
    this._searchImageService.loadMoreImages(this.skip).subscribe(data => {
      let results = data.results || [];
      results.forEach(function(record: any) {
        let random: any = Math.random() * 10000;
        record.uniqueID = new Date().getTime() + parseInt(random, 10);
      });

      let isFilter: boolean = false;
      if (_self.myFavTab || _self.myFavTabInListView) {
        isFilter = true;
      }
      _self.Response.searchResult = _self.Response.searchResult.concat(results);
      

        
      _self.formatDataSet();
      _self.slimLoadingBarService.complete();
    }, (error: any) => {
      console.log(error);
      _self.slimLoadingBarService.complete();
    });
  }


/**tsip Code */


loadMoreItemFromBackend1():void {
  
  debugger

    let _self = this;
    this._searchImageService.loadMoreImages(this.skip-20).subscribe(data => {
    let response2 = localStorage.getItem('Response');
    if(response2) {
      this.Response1 = JSON.parse(response2); 
  }
    let localstore1= this.Response1.searchResult;
    let results = data.results || [];
    debugger
    results=localstore1.concat(results);
    this.Response.searchResult = results;
    localStorage.setItem("Response", JSON.stringify(this.Response));
    results.forEach(function(record: any) {
      let random: any = Math.random() * 10000;
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
   _self.cnnTableData = this.Response.searchResult.filter(x => x.source == "CNN");
    _self.siftTableData = this.Response.searchResult.filter(x => x.source == "SIFT");
            this.loadNextItems(false);
            this.updateResultCount();

  }, (error: any) => {
    console.log(error);
    _self.slimLoadingBarService.complete();
  });
}



/** end Code */
  loadMoreClick2() {

    // let _self = this;

   
    this.slimLoadingBarService.start();

    //check if still aviable then load from in memory object otherwise call backend api for
    //next set of data
    this.incrementLoadCount();

        
        let isFilter: boolean = false;
    if(this.skip >=this.Response.searchResult.length) {

      this.formatDataSet();
    } else {

    //   this.loadMoreItemFromBackend();
    }
  }

  loadMoreClick() {
  //console.log("inside loadmoreclick");
            this.incrementLoadCount();
    
    debugger
    var res = {};
    var cnnCount = 0;
    var siftCount = 0;
    var maxCount = 0;
    this.Response.searchResult.forEach(function(v) {
      if(v.source == "CNN"){
        res[v.source] = (res[v.source] || 0) + 1;
        cnnCount++
      }else{
        res[v.source] = (res[v.source] || 0) + 1;
        siftCount++;
      }
    })
    if(cnnCount>=siftCount){
      maxCount = cnnCount
    }else{
      maxCount = siftCount;
    }

    if(this.skip <=maxCount) {

        let isFilter: boolean = false;
              if (this.myFavTab || this.myFavTabInListView) {
                  isFilter = true;
              }
              this.loadNextItems(isFilter);
              this.updateResultCount();
    }

else{
              debugger
              this.loadMoreItemFromBackend1();
 
}
          
        }
    


  resetLoadCount() {
            this.skip = this.pageSize;
        }
    






  getFirstTabTableData() {
   // debugger
    this.totalSearchResult = this.Response.searchResult.length;
    this.cnnAccess = this.Response.cnnAccess;
    this.siftAccess = this.Response.siftAccess;
    let _self = this;

    if (_self.Response.searchResult.length > 0) {

      for (let i = 0; i < _self.Response.searchResult.length; i++) {
        this.Response.searchResult[i].localId = i;

        if (_self.Response.searchResult[i].status == undefined) {
          _self.Response.searchResult[i].status = 0;
        }

      }
      // FeedbackComponent.searchResult = this.sortByAsc(FeedbackComponent.searchResult);
      _self.cnnTableData = _self.Response.searchResult.filter(x => x.source == "CNN");
      _self.siftTableData = _self.Response.searchResult.filter(x => x.source == "SIFT");
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
  }




  MarkrelevanceCNN(i: number, data: FeedbackModel) {


    this.slimLoadingBarService.start();

     console.log(this.Response, 'Data :',data);
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
      .subscribe(result => {
        //  console.log(result)
        this.disableEntire = false;
        if (result) {
          var item = this.Response.searchResult.find(x => x.uniqueID == data.uniqueID);
          this.slimLoadingBarService.complete();
          if (this.cnnTableDisplayData[i].status == 1) {
            this.cnnTableDisplayData[i].status = 0;
            item.status = 0;
          }
          else {
            this.slimLoadingBarService.complete();
            this.cnnTableDisplayData[i].status = 1;
            item.status = 1;
          }
          if ((this.myFavTab || this.myFavTabInListView) && this.modalOpen == false) {
            this.slimLoadingBarService.complete();
            this.loadNextItems(true);
            this.updateResultCount();
          }
          // console.log(this.Response.searchResult);
          localStorage.setItem("Response", JSON.stringify(this.Response));

          let findInLocalStorage = JSON.parse(localStorage.getItem('MarkedImages'));

          if (findInLocalStorage != undefined) {
            this.StoreMarkedImages = findInLocalStorage;

            // first find object, if not exist, push in array
            let locObj = this.StoreMarkedImages.find(x => (x.imageName == data.imageName) && (x.source == data.source));
            if (locObj == undefined || locObj == null) {
              this.StoreMarkedImages.push(data);
            }
            // if exist, remove from array.
            else {
              let indexOfObj = this.StoreMarkedImages.indexOf(locObj);
              this.StoreMarkedImages.splice(indexOfObj, 1);
            }
            // update the MarkedImagesArray in localStorage
            localStorage.setItem("MarkedImages", JSON.stringify(this.StoreMarkedImages));
          }

          else {
            this.StoreMarkedImages.push(data);
            localStorage.setItem("MarkedImages", JSON.stringify(this.StoreMarkedImages));
          }


        }
      }, error => {
        this.disableEntire = false;
        if (error.status == 401 || error.status == 0) {
          this.slimLoadingBarService.complete();
          // remove user from local storage to log user out
          localStorage.removeItem('tokenData');

          localStorage.setItem("logoutMessage", ('401'));
          let redirect = '/login';
          this._router.navigate([redirect]);
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

            this.slimLoadingBarService.complete();
            this.serverErrorText = 'Connection Timed Out.';
            $("#openServerErrorModal").click();
          }
          if (error.status == 500 || error.status == 404) {

            this.slimLoadingBarService.complete();
            this.serverErrorText = 'We are sorry, but something went wrong.';
            $("#openServerErrorModal").click();
          }
        }

      })
  }


  MarkrelevanceSIFT(i: number, data: FeedbackModel) {
    

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
    console.log("sift mark relevance called" + this.markRelevance.status)
    this.disableEntire = true;
    this._searchImageService.MarkRelevance(this.markRelevance)
      .subscribe(result => {
        this.disableEntire = false;
        this.slimLoadingBarService.complete();
              //  console.log(result)
        if (result) {
          var item = this.Response.searchResult.find(x => x.uniqueID == data.uniqueID);
          if (this.siftTableDisplayData[i].status == 1) {
            this.siftTableDisplayData[i].status = 0;
            item.status = 0;
          }
          else {
            this.siftTableDisplayData[i].status = 1;
            item.status = 1

          }
          if ((this.myFavTab || this.myFavTabInListView) && this.modalOpen == false) {

            this.loadNextItems(true);
            this.updateResultCount();
          }

          localStorage.setItem("Response", JSON.stringify(this.Response));
          let findInLocalStorage = JSON.parse(localStorage.getItem('MarkedImages'));
          if (findInLocalStorage != undefined) {
            this.StoreMarkedImages = findInLocalStorage;
            // first find object, if not exist, push in array
            let locObj = this.StoreMarkedImages.find(x => (x.imageName == data.imageName) && (x.source == data.source));
            if (locObj == undefined || locObj == null) {
              this.StoreMarkedImages.push(data);
            }
            // if exist, remove from array.
            else {
              let indexOfObj = this.StoreMarkedImages.indexOf(locObj);
              this.StoreMarkedImages.splice(indexOfObj, 1);
            }
            // update the MarkedImagesArray in localStorage
            localStorage.setItem("MarkedImages", JSON.stringify(this.StoreMarkedImages));
          }
          else {
            this.StoreMarkedImages.push(data);
            localStorage.setItem("MarkedImages", JSON.stringify(this.StoreMarkedImages));
          }
        }
      }, error => {
        this.disableEntire = false;

        if (error.status == 401 || error.status == 0) {
          this.slimLoadingBarService.complete();
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
          let redirect = '/login';
          this._router.navigate([redirect]);

        }
        if (error.status == 504) {

          this.slimLoadingBarService.complete();
          this.serverErrorText = 'Connection Timed Out.';
          $("#openServerErrorModal").click();
        }
        if (error.status == 500 || error.status == 404) {

          this.slimLoadingBarService.complete();
          this.serverErrorText = 'We are sorry, but something went wrong.';
          $("#openServerErrorModal").click();
        }
      })
  }


  ClearResult() {
    let redirect: string;
    if(this.authServiceInfo.tokenData.role == "ROLE_SIFT_USER"){
      redirect = 'home/search';
  }else{
      redirect = 'home/segment';
  }
  this._router.navigate([redirect]);
 //this._router.navigate(['/home/search']);
  }

  WhichModalToShow(someString: string, imageName: string) {

    switch (someString) {
      case 'CNN': {
        this.onlyShowToCNNModal = true;
        this.onlyShowToSIFTModal = false;
        this.cnnImageIndex = imageName;
      } break;

      case 'SIFT': {
        this.onlyShowToCNNModal = false;
        this.onlyShowToSIFTModal = true;
        this.siftImageIndex = imageName;
        $('#relevantImagesClose').click();
      } break;
    }
    this.modalOpen = true;
  }


  clearModal() {
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
  }

  ListTabClicked() {

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
  }

  GridTabClicked() {

    var height = $(window).height();
    var finalHeight = height - 460;
    setTimeout(function() {
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

  }

  myFavTabClicked() {
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
  }


  updateResultCount() {
    this.cnnTableDataLength = this.cnnTableData.length;
    this.siftTableDataLength = this.siftTableData.length;
    this.cnnTableDisplayDataLength = this.cnnTableDisplayData.length;
    this.siftTableDisplayDataLength = this.siftTableDisplayData.length;
  }


  allListResult() {
    var height = $(window).height();
    var finalHeight = height - 460;
    $('.setScrolling').css('height', finalHeight);
    this.loadNextItems(false);
    this.updateResultCount();
    this.AllListView = true;
    this.myFavTabInListView = false;
  }

  myFavInListViewClicked() {

  /*  var height = $(window).height();
    var finalHeight = height - 460;
    setTimeout(function() {
      $('.resultDiv.noheader .setScrolling').css('height', finalHeight + 40);
    }, 100); */

    this.loadNextItems(true);
    this.updateResultCount();
    this.AllListView = false;
    this.myFavTabInListView = true;

  }



  AllGridResultClicked() {

    var height = $(window).height();
    var finalHeight = height - 460;

    setTimeout(function() {
      $('.resultDiv.noheader .setScrolling').css('height', finalHeight + 40);
    }, 100);

    this.AllgridView = true;
    this.myFavTabInListView = false;
    this.myFavTab = false;
    this.loadNextItems(false);
    this.updateResultCount();
  }


  cnnDescending: boolean = false;
  siftDescending: boolean = true;
  sortAsc(typ: string) {
    if (typ == 'CNN') {
      this.cnnDescending = false;
      this.cnnTableDisplayData = this.sortCNNByAsc(this.cnnTableDisplayData);
    }
    if (typ == 'SIFT') {
      this.siftDescending = true;
      this.siftTableDisplayData = this.sortSIFTByAsc(this.siftTableDisplayData);
    }
  }
  sortDesc(typ: string) {
    if (typ == 'CNN') {
      this.cnnDescending = true;
      this.cnnTableDisplayData = this.sortCNNByDesc(this.cnnTableDisplayData);
    }
    if (typ == 'SIFT') {
      this.siftDescending = false;
      this.siftTableDisplayData = this.sortSIFTByDesc(this.siftTableDisplayData);
    }
  }

  sortByAsc(arr: Array<FeedbackModel>): Array<FeedbackModel> {
    arr.sort
      ((left, right): number => {
        return left.score - right.score;
      });
    return arr;
  }

  sortCNNByAsc(arr: Array<FeedbackModel>): Array<FeedbackModel> {
    arr.sort
      ((left, right): number => {
        return left.score - right.score;
      });
    return arr;
  }

  sortSIFTByAsc(arr: Array<FeedbackModel>): Array<FeedbackModel> {
    arr.sort
      ((left, right): number => {
        return  right.score-left.score;
      });
    return arr;
  }
  sortByDesc(arr: Array<FeedbackModel>): Array<FeedbackModel> {
    arr.sort
      ((left, right): number => {
       return left.score - right.score;
      });
    arr = arr.reverse();
    return arr;
  }

  sortCNNByDesc(arr: Array<FeedbackModel>): Array<FeedbackModel> {
    arr.sort
      ((left, right): number => {
        return  right.score-left.score;
      });
    return arr;
  }

  sortSIFTByDesc(arr: Array<FeedbackModel>): Array<FeedbackModel> {
    arr.sort
      ((left, right): number => {
       return left.score - right.score;
      });
    return arr;
  }
 




  up() {
    alert('up clicked');
  }

  Down() {
    alert('down clicked')
  }


  ShowNextItemInModal(siftTableDisplayData: Array<FeedbackModel>, cnnTableDisplayData: Array<FeedbackModel>) {
    $('#relevantImagesClose').click();
  }

}

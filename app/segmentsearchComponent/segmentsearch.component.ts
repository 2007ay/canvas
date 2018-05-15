import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { SegmentImageService } from '../shared/services/segmentImage.service';
import {  SegmentModel, ResponseRef, SelectedSegmentModel } from "../shared/models/segment.model";
import {  SearchSegmentModel } from "../shared/models/searchsegment.model";
import { ActualFeedbackModel, HoldFileData, FeedbackModel } from "../shared/models/feedback.model";
import { FeedbackResolver } from '../shared/resolver/feedback-resolver.service';
import { SegmentSearchImageService } from '../shared/services/segmentsearchImage.service';
import { SegmentResolver } from '../shared/resolver/segment-resolver.service';
import 'rxjs/add/observable/forkJoin';
let $ = require("https://code.jquery.com/jquery-3.1.1.js");
declare var jQuery: any;
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Config } from '../config/config';;



declare var window: any;
declare var Tiff: any;
@Component({
    moduleId: module.id,
    templateUrl: "segmentsearch.component.html",
    styleUrls: ['segmentsearch.component.css']
})
export class SegmentSearchComponent {

    private searchString: string = "";
    noClass:boolean = false;
    Response: SegmentModel = new SegmentModel();
    queryImageUrl: any;
   classname: string;
    disableSearchBtn:boolean = false;
    serverErrorText:string;
    segmentedUrls: SelectedSegmentModel[]=[];
    preprocessedImageUrl: any;    
    createSearchObject: SearchSegmentModel = new SearchSegmentModel();
    StoreMarkedImages: Array<SelectedSegmentModel> = [];
    disableCheckbox: boolean = false;
    noInput: boolean = false;
    disableClearBth: boolean = false;
   // segment:boolean = true;
   // search:boolean = false;
   invalidClassMessage: boolean = false;
   filesList: File = null;
   checkboxValue: any;   
    //@ViewChild('tiffimage') el:ElementRef;
 


    constructor(private _router: Router,
        private route: ActivatedRoute,
        private _segmentsearchImageService: SegmentSearchImageService,
        private _segmentImageService: SegmentImageService,
        private slimLoadingBarService: SlimLoadingBarService,
        private feedbackResolver:FeedbackResolver,
        private segmentResolver:SegmentResolver,
        private config:Config) { 

            this.onResize();
            
                //debugger
                let response = localStorage.getItem('SegmentResponse');
                
                if(response) {
                  this.Response = JSON.parse(response);
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



    ngOnInit() {
        // window.initialize(this.dragdropcallback);


        this.route.data.subscribe(data => {
            
                  // 1st time
                  if (data['segment'] != undefined) {
            
                    let segment = data['segment'];
            
                    this.Response = segment;
            
                    let _ResponseRef: ResponseRef = new ResponseRef();
            
                            _ResponseRef = {
                                queryImageUrl: this.Response.queryImageUrl,
                                segmentedUrls:this.Response.segmentedUrls  ,
                                preprocessedImageUrl: this.Response.preprocessedImageUrl,
                                className:  this.Response.className
                            }
            
                    localStorage.setItem("SegmentData", JSON.stringify(_ResponseRef));
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

  
    OnCheckSegment(i:number,) {
        var allFieldsChecked = false;
        if (this.segmentedUrls) {

            this.segmentedUrls[i].active = !this.segmentedUrls[i].active;
          }
          for(var i=0;i<this.segmentedUrls.length;i++){
              if(this.segmentedUrls[i].active == true){
                allFieldsChecked = true;
              }else{
                allFieldsChecked = false;
                break;
              }
          }
          this.checkboxValue = allFieldsChecked;
          localStorage.setItem("SegmentedUrls", JSON.stringify(this.segmentedUrls));
          localStorage.setItem("CheckAllSegments",  JSON.stringify(this.checkboxValue));
        
    }



    
    classMessageVisi(event: any) {
        const regx = /^\d+(?:,\d+)*$/g;
      
        if (event == "") {
            this.invalidClassMessage = false;
            this.classname=event;
            localStorage.setItem("classname", JSON.stringify(this.classname));        
        }else if (regx.test(event)) {
            this.invalidClassMessage = false;
            this.classname=event;
            localStorage.setItem("classname", JSON.stringify(this.classname));        
        }
        else {
            this.invalidClassMessage = true;
        }


    }



checkAll(ev: { target: { checked: any; }; }) { 


    this.checkboxValue = ev.target.checked;
    this.segmentedUrls.forEach(x => x.active =  ev.target.checked) 
  //  console.log("segmented Urls" + this.segmentedUrls);
    //finaly save Response to the local storage in case user dose reload window
    localStorage.setItem("SegmentedUrls", JSON.stringify(this.segmentedUrls));
    localStorage.setItem("CheckAllSegments",  JSON.stringify(this.checkboxValue));
 
    }
    
    AssignPropValues() {
        
            this.checkboxValue = true;
            this.queryImageUrl = this.Response.queryImageUrl;
            this.preprocessedImageUrl = this.Response.preprocessedImageUrl;
            this.classname = this.Response.className;
            for (var i = 0; i < this.Response.segmentedUrls.length; i++) {
                let selectSegmentModel = new SelectedSegmentModel(
                    this.Response.segmentedUrls[i],true);
                this.segmentedUrls.push(selectSegmentModel);
                //localStorage.setItem('Allurls', JSON.stringify(this.segmentedUrls));
                var json_arr = JSON.stringify(this.segmentedUrls);
            }
         //   console.log("segmented Urls" + this.segmentedUrls);
            //finaly save Response to the local storage in case user dose reload window
            localStorage.setItem("classname", JSON.stringify(this.classname));
            localStorage.setItem("SegmentedUrls", JSON.stringify(this.segmentedUrls));
            localStorage.setItem("CheckAllSegments",  JSON.stringify(this.checkboxValue));
            localStorage.setItem('Response', JSON.stringify(this.Response));
          }
          

            getStatus(str:String){
                this.segmentedUrls = JSON.parse(localStorage.getItem('segmentedUrls'));
                if(this.segmentedUrls!=null){
                    for (var i = 0; i < this.segmentedUrls.length; i++) {
                        let selectedSegmentModel:SelectedSegmentModel= this.segmentedUrls[i];
                        if(selectedSegmentModel.segmentedUrl == str){
                            return selectedSegmentModel.active;
                        }
                    }
                }else{
                     return false;
                }
            }


          checkFormStatus() {
                this.SegmentImage();
        }

        
        ClearResult() {
            this._router.navigate(['/home/segment']);
          }

          SegmentImage() {
        let filesList: File = null;
        this.disableClearBth = true;
        this.noInput = true;
        this.disableCheckbox = true;
        this.slimLoadingBarService.start();
         this.disableSearchBtn = true;
        let formData = new FormData();
        for (var i = 0; i < this.segmentedUrls.length; i++) {
            if(this.segmentedUrls[i].active == true)
            {
                var url = this.segmentedUrls[i].segmentedUrl;
                this.createSearchObject.segmentedUrls.push(url);
            }
        }

        this.createSearchObject.queryImageUrl =  this.queryImageUrl;
        this.createSearchObject.preprocessedImageUrl=this.preprocessedImageUrl;
       
        if(this.classname == undefined){
            this.createSearchObject.classname = "all";
        }
        if(this.classname == ''){
            this.createSearchObject.classname = "all";
        }else{
            this.createSearchObject.classname = this.classname;
        }
        this._segmentsearchImageService.SearchImagee(this.createSearchObject)
            .subscribe(result => {
                this.slimLoadingBarService.complete();
               
                let fileListObject = new ActualFeedbackModel();
               
                let imageurl = new FeedbackModel();
                fileListObject.feedbackCompClassName = this.searchString;
                 if(result.results){
                    fileListObject.searchResult = result.results;
                    fileListObject.queryImageURL = result.queryImageURL;
                   // console.log("res"+  result.queryImageURL);
                }
                else{
                    fileListObject.searchResult = result;
                }
		//fileListObject.queryImageURL = fileListObject.searchResult[0].queryImageURL;
		// console.log("res"+  fileListObject.searchResult[0].queryImageURL);
	        
                // fileListObject.searchResult = result.results;
                fileListObject.maxResultCount = result.resultSize;
                fileListObject.cnnResultSize = result.cnnResultSize;
                fileListObject.siftResultSize = result.siftResultSize;
                fileListObject.cnnAccess= result.isCNNAccess;
                fileListObject.siftAccess = result.isSiftAccess;
             //   fileListObject.fileType = result.queryImageURL.substring(result.queryImageURL.lastIndexOf('.')+1,result.queryImageURL.length).toLowerCase();
             //  fileListObject.size = result.queryImageURL.size;
               fileListObject.fileType = JSON.parse(localStorage.getItem('FileType'));
               fileListObject.size = JSON.parse(localStorage.getItem('FileSize'));
               fileListObject.feedbackCompClassName =  this.createSearchObject.classname;
           //    fileListObject.size = this.filesList.size;

                let holdFileData = new HoldFileData();
                holdFileData.name = result.queryImageURL.substring(result.queryImageURL.lastIndexOf('/')+1,result.queryImageURL.length);
                holdFileData.size = '2MB';
                holdFileData.type = holdFileData.name.substring(holdFileData.name.lastIndexOf('.')+1,holdFileData.name.length);
                holdFileData.searchString = this.searchString;
                // let emptyObj:any = {};
              //  console.log("File Object" + fileListObject);
                // localStorage.setItem('Response',fileListObject);
                for(let i =0; i < fileListObject.searchResult.length; i++){
                    fileListObject.searchResult[i].uniqueID = i;
                }
               this.feedbackResolver.setData(fileListObject);
                 localStorage.setItem("Response", JSON.stringify(fileListObject));
                
               //  Config.holdData = holdFileData;
                // ---------------------------------------------------------------------------
                this.disableSearchBtn = false;
                if(this.searchString == ""){
                     this.noClass = true;
                    this.searchString = '   ';

                }

                localStorage.setItem("FileList", JSON.stringify(holdFileData));
                this._router.navigate(['/home/feedback', this.searchString]);
            }, error =>{
               
                if(error.status == 401 || error.status == 0){
                    this.slimLoadingBarService.complete();
                     // remove user from local storage to log user out
                     localStorage.removeItem('tokenData');

                     localStorage.setItem("logoutMessage", ('401'));
                     let redirect = '/login';
                     this._router.navigate([redirect]);
                }
                if (error.status == 504) {
                   
                    this.disableSearchBtn = false;
                    this.slimLoadingBarService.complete();
                    this.serverErrorText = 'Connection Timed Out.';
                    $("#openServerErrorModal").click();
                }
                if(error.status == 500 || error.status == 404){
                    this.disableClearBth = false;
                    this.noInput = false;
                    this.disableSearchBtn = false;
                    this.slimLoadingBarService.complete();
                    this.serverErrorText = 'We are sorry, but something went wrong.';
                    $("#openServerErrorModal").click();
                }

            })
    }

    onRefresh(){

        this.Response = JSON.parse(localStorage.getItem('SegmentData'));
        this.queryImageUrl = this.Response.queryImageUrl;
        this.preprocessedImageUrl=this.Response.preprocessedImageUrl;
    //    this.segmentedUrls = JSON.parse(localStorage.getItem('Allurls'));
        this.segmentedUrls = JSON.parse(localStorage.getItem('SegmentedUrls'));
        this.checkboxValue = JSON.parse(localStorage.getItem('CheckAllSegments'));
        this.classname = JSON.parse(localStorage.getItem('classname'));
      
    }

}

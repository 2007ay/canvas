import { Component, ElementRef, Renderer, Input, HostListener, HostBinding, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SegmentImageService } from '../shared/services/segmentImage.service';
import { SearchImageService } from '../shared/services/searchImage.service';
import { SegmentSearchComponent } from "../segmentsearchComponent/segmentsearch.component";
import { AuthenticationService, User, LoginResponse } from '../shared/services/authentication.service';
import { SearchComponent } from "../searchComponent/search.component";
import {TranslateService} from 'ng2-translate';
let $ = require("https://code.jquery.com/jquery-3.1.1.js");
//import { DragDrop } from '../shared/models/search.model';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { SegmentResolver } from '../shared/resolver/segment-resolver.service';
import { FeedbackResolver } from '../shared/resolver/feedback-resolver.service';
import { SegmentModel} from "../shared/models/segment.model";
import { Config } from '../config/config';
import { ViewChild } from '@angular/core';
import { ActualFeedbackModel, HoldFileData, FeedbackModel } from "../shared/models/feedback.model";

declare var window: any;
declare var Tiff: any;
@Component({
    moduleId: module.id,
    templateUrl: "segment.component.html",
    styleUrls: ['segment.component.css']
})
export class SegmentComponent {

    private searchString: string = "";
    private queryImageUrl: string = "";
    private segmentedUrls:Array<string>;
    filesList: File = null;
    browseFileData: any = null;
    filePathOfBrowseButton: string;
    public url: any;
    public url1: any;
    public feedbackCompMainImageName: string;
    hideDummyImageOnDragDrop: boolean = false;
    ImageNotFoundMessage: boolean = false;
    dummyVar: boolean = false;
    errorMessageVisi:boolean = false;
    errorVisi: boolean = false
    disableSearchBtn:boolean = true;
    disableSegmentBth: boolean = true;
    disableCheckbox: boolean = true;
    checkIsImageIsSelected:boolean = false;
    hideDragDropTextWhenZipFileDropped:boolean = false;
    fileName:string = '';
    size : string;
    queryImageURL:string = '';
    noClass:boolean = false;
    disableDIV: boolean = false;
    activettfClass:boolean = false;
   // activettfClass1:boolean = false;
    activeClass:boolean = false;
   // activeClass1:boolean = false;
    notTakeImageOnDragDrop:boolean = false;
    serverErrorText:string;
    tif:boolean = false;
    nontif:boolean = false;
    segment:boolean = true;
    search:boolean = false;
    display: boolean = false;
    nodisplay: boolean = false;
    segmentcallornot:boolean=false;
    invalidClassMessage: boolean = false;
    japaneseImage: boolean =false;
    backgrondImageUrl: string;
    noInput: boolean = false;
   // isSiftRole: boolean = true;
    //@ViewChild('tiffimage') el:ElementRef;
 
    authServiceInfo:AuthenticationService;

    constructor(private _router: Router,
        private _segmentImageService: SegmentImageService,
        private _searchImageService: SearchImageService,
        private slimLoadingBarService: SlimLoadingBarService,
        private authService: AuthenticationService,
        private segmentResolver:SegmentResolver,
        private feedbackResolver:FeedbackResolver,
        private translate: TranslateService,
        private config:Config) {
            
            this.authServiceInfo = authService;
          
        }


    ngOnInit() {
       
        window.initialize(this.dragdropcallback);
        let response = localStorage.getItem('Language');
     //   console.log("Response" + response);
        
       
    }




    classMessageVisi(event: any) {
        const regx = /^\d+(?:,\d+)*$/g;
        if (event == "") {
            this.invalidClassMessage = false;
        }else if (regx.test(event)) {
            this.invalidClassMessage = false;
        }
        else {
            this.invalidClassMessage = true;
        }


    }


    // this method will execute when user drag and drop the file
     public  dragdropcallback = (files: Array<any>, $event: any) => {

       

        this.disableCheckbox = false;
        $("#tiffImageId").find("canvas.preview").remove();
        this.fileName = files[0].name as string;
        var index = this.fileName.lastIndexOf('.');
         let fileType = this.fileName.substring(index, this.fileName.length).toLowerCase();
        this.ImageNotFoundMessage = false;
        this.errorMessageVisi = false;
       
             this.disableSegmentBth = false;
        
       
        this.disableSearchBtn = false;
        this.dummyVar = false;

    
if(this.notTakeImageOnDragDrop == false){
    this.fileName = files[0].name as string;
  //  console.log("file type"+files[0].type);
  this.noInput = false;

    var fileReader = new FileReader();
   

  
    let fileSizeInBytes = files[0].size as number;
    let fileSizeInMB = (fileSizeInBytes)/(1024*1024);

    var index = this.fileName.lastIndexOf('.');
   
 
    let fileType = this.fileName.substring(index, this.fileName.length).toLowerCase();
    localStorage.setItem("FileType", JSON.stringify(fileType));
    localStorage.setItem("FileSize", JSON.stringify(fileSizeInBytes));
   // console.log("File type is " + fileType);
    if ((fileType == '.png' || fileType == '.jpg' || fileType == '.jpeg' || fileType == '.tiff' || fileType == '.tif' || fileType == '.mmr') && (fileSizeInMB <=2)) {
        if((fileType == '.png' || fileType == '.jpg' || fileType == '.jpeg' || fileType == '.mmr')){
         this.hideDummyImageOnDragDrop = true;
    }else{
        this.hideDummyImageOnDragDrop = false;
    }
         this.dummyVar = true;

        if (files && files[0]) {
           if(fileType == '.tiff' || fileType == '.tif'){
                this.tif = true;
            }
            else
            
                {
                  
                this.nontif = true;
                this.activeClass = true;
              //  this.activeClass1 = true;
                this.activettfClass = false;
             //   this.activettfClass1 = false;
                this.errorMessageVisi = false;
                var reader = new FileReader();
                reader.onload = (event: any) => {
                    if(this.notTakeImageOnDragDrop == false){
                        this.url = event.target.result;
                      //  $("#nontiffImageId").append('<img src="' + this.url + '" class="preview"/>');
                      
                      var contents = event.target.result;
                 //     console.log('data length'+contents.data.length)
                     if(contents =='data:'){
                         this.errorMessageVisi = true;
                         this.disableSearchBtn = true;
                         this.disableSegmentBth = true;
                        this.activettfClass = true;
                      this.noInput = true;
                        
                     }
                     
                    //  console.log("length" + contents.length);
                      

                       this.setPic();



                }

            }
            reader.readAsDataURL(files[0]);
        }
         }       

        if (files != null && files.length > 0) {
            
            this.checkIsImageIsSelected = true;
            this.errorMessageVisi = false;
          
            let fileType = this.fileName.substring(index, this.fileName.length).toLowerCase();
          if  (fileType == '.tiff' || fileType == '.tif') {
           
              //  console.log('not set');

                var validation1 :any;
                var check : any;
                    var reader1 = new FileReader();
                  reader1.onload = (event: any) => {
                   console.debug("Parsing TIFF image...");
                //   console.log("hii" + event.target.result);


                   var arr = (new Uint8Array(event.target.result)).subarray(0, 4);
                   var header = "";
                   for(var i = 0; i < arr.length; i++) {
                      header += arr[i].toString(16);
                   }
                   let bytes :any = []
                   const hex = bytes.join('').toUpperCase();
                   validation1=header;
                  // console.log("hex" + validation1.substring(0,7));
                   check =  validation1.substring(0,7);
                 //  console.log("check" + header);
                   if(check === "49492a0"){
                 //   console.log("it is   tif");

                    this.errorMessageVisi = false;
                    this.disableSegmentBth = false;
                    this.disableSearchBtn = false; 
                    this.noInput = false;
                  
                }else{
                   // console.log("it is not tiff");
                   this.errorMessageVisi = true;
                    this.disableSearchBtn = true;
                    this.disableSegmentBth = true;
                   this.activettfClass = true;
                   this.noInput = true;
                }


                   //initialize with 100MB for large files
                   Tiff.initialize({
                     TOTAL_MEMORY: 100000000
                   });
                   var tiff = new Tiff({
                     buffer: event.target.result
                    
                   });
                 //  console.log("contents" + buffer);
                   var tiffCanvas=tiff.toCanvas();
                  $(tiffCanvas).css({
                    "max-width": "331px",
                    "min-width": "331px",
                    "width": "100%",
                    "z-index": "0",
                    "height": "237px"
                  }).addClass("preview");
             
                  $("#tiffImageId").append(tiffCanvas);
                  var buffer = event.target.result;
                
                  const uint = new Uint8Array(event.target.result)
                
                  uint.forEach((byte) => {
                      bytes.push(byte.toString(16))
                  })
         

                  
                    this.setPic();
                }
                reader1.readAsArrayBuffer(files[0]);
             


            console.log("validation1"+validation1);
   
   
 
             //this.setPic();
            }else{  
              
                setTimeout(() => {
                    this.setPic();
                }, 0)
            }
          
         
            this.filesList = files[0];

        
            this.feedbackCompMainImageName = files[0].name;
   
       
            
        } else {
            
            this.filesList = null;
        }
    } else {
        this.disableSegmentBth = true;
        this.errorMessageVisi = true;
        this.disableSearchBtn = true;
    }
}



    }


    setPic() {
        $('.hideImage').removeClass('setWidth');
        $('.hideImage').removeClass('setheight');
        var picwidth = $('.hideImage').width();
        var picheight = $('.hideImage').height();

        //console.log(picwidth);
        //console.log(picheight);
        if (picheight <= picwidth) {
            $('.hideImage').addClass('setheight');
        } else {
            $('.hideImage').addClass('setWidth');
        }
    }

  
    checkFormStatus() {

        this.disableSegmentBth = true;
        if (this.filesList != null ) {
            this.SegmentImage();
        }
    }

    segmentClick(){
        this.disableSegmentBth = true;
        this.disableSearchBtn = true;
        if (this.filesList != null ) {
            this.SegmentImage();
        }

    }


  


    
    public FileLoaded(ev:Event)
    {
        var data = ev.target as FileReader
            localStorage.setItem("FileData",data.result);
    }


    SegmentImage() {
        this.disableDIV = true;
        
        this.notTakeImageOnDragDrop = true;
        this.slimLoadingBarService.start();
         this.errorMessageVisi = false;
        let formData = new FormData();




        var reader = new FileReader();

        reader.onload = this.FileLoaded;

        reader.readAsArrayBuffer(this.filesList);
      //  console.log('[' + new Date().toISOString() + ']');
      //  console.log(this.filesList);


        formData.append('file', this.filesList, this.filesList.name);
    //    formData.append("classname", this.searchString);

        this._segmentImageService.SegementImages(formData)
            .subscribe(result => {
                this.slimLoadingBarService.complete();


                let fileListObject = new ActualFeedbackModel();
             

                let segmentModelObject = new SegmentModel();
              
                segmentModelObject.queryImageUrl = this.queryImageUrl;
                segmentModelObject.segmentedUrls = this.segmentedUrls;
                segmentModelObject.className = this.searchString;

                segmentModelObject.queryImageUrl = result.queryImageUrl;
                segmentModelObject.segmentedUrls = result.segmentedUrls;
                segmentModelObject.preprocessedImageUrl= result.preprocessedImageUrl;
              //  console.log("res"+  result);
               

                // let emptyObj:any = {};
             //   console.log("segmentModel Object" + segmentModelObject);
                // localStorage.setItem('Response',fileListObject);
                
                 this.segmentResolver.setData(segmentModelObject);
                 localStorage.setItem("SegmentResponse", JSON.stringify(segmentModelObject));
               //  console.log("segment model object :" + JSON.stringify(segmentModelObject) ) ;
 
               //  Config.holdData = holdFileData;
                // ---------------------------------------------------------------------------
            

                this._router.navigate(['/home/segmentsearch']);
            }, error => {
                this.notTakeImageOnDragDrop = false;
                if(error.status == 401 || error.status == 0){
                    this.slimLoadingBarService.complete();
                     // remove user from local storage to log user out
                     localStorage.removeItem('tokenData');

                     localStorage.setItem("logoutMessage", ('401'));
                     let redirect = '/login';
                     this._router.navigate([redirect]);
                }
                if (error.status == 504) {
                    this.notTakeImageOnDragDrop = false;
                    this.disableSearchBtn = false;
                    this.disableSegmentBth = false;
                    this.slimLoadingBarService.complete();
                    this.serverErrorText = 'Connection Timed Out.';
                    $("#openServerErrorModal").click();
                }
                if(error.status == 500 || error.status == 404){
                   
                    this.notTakeImageOnDragDrop = false;
                    this.disableSearchBtn = false;
                    this.disableSegmentBth = false;
                    this.disableDIV = false;
                    this.slimLoadingBarService.complete();
                    this.serverErrorText = 'We are sorry, but something went wrong.';
                    $("#openServerErrorModal").click();

                    let redirect = 'home/segment';
                    this._router.navigate([redirect]);
                   
                }

            })
    }

    searchClick() {
        this.disableDIV = true;
        this.disableSegmentBth = true;
        this.disableSearchBtn = true;
        this.notTakeImageOnDragDrop = true;
        this.slimLoadingBarService.start();
         this.errorMessageVisi = false;
        let formData = new FormData();




        var reader = new FileReader();

        reader.onload = this.FileLoaded;

        reader.readAsArrayBuffer(this.filesList);
      //  console.log('[' + new Date().toISOString() + ']');
      //  console.log(this.filesList);

      if(this.searchString == undefined){
        this.searchString = "all";
    }
    if(this.searchString == ''){
        this.searchString = "all";
    }


        formData.append('file', this.filesList, this.filesList.name);
        formData.append("classname", this.searchString);

        this._searchImageService.SearchImagee(formData)
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
                fileListObject.feedbackCompClassName =  this.searchString;
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
                this.slimLoadingBarService.complete();              
                 if(error.status == 401 || error.status == 0){
                      // remove user from local storage to log user out
                      localStorage.removeItem('tokenData');
 
                      localStorage.setItem("logoutMessage", ('401'));
                      let redirect = '/login';
                      this._router.navigate([redirect]);
                 }
                 if (error.status == 504) {
                    
                     this.disableSearchBtn = false;
                     this.disableSegmentBth = false;
                     this.disableDIV = false;
                     this.notTakeImageOnDragDrop = false;
                     this.slimLoadingBarService.complete();
                     this.serverErrorText = 'Connection Timed Out.';
                     $("#openServerErrorModal").click();
                 }
                 if(error.status == 500 || error.status == 404){
                    this.notTakeImageOnDragDrop = false;
                     this.disableSearchBtn = false;
                     this.disableSegmentBth = false;
                     this.disableDIV = false;
                     this.slimLoadingBarService.complete();
                     this.serverErrorText = 'We are sorry, but something went wrong.';
                     $("#openServerErrorModal").click();
                 }
 
             })
    }



}

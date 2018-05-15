import { Component, ElementRef, Renderer, Input, HostListener, HostBinding, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SearchImageService } from '../shared/services/searchImage.service';
import { FeedbackComponent } from "../feedbackComponent/feedback.component";
let $ = require("https://code.jquery.com/jquery-3.1.1.js");
import { DragDrop } from '../shared/models/search.model';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";

import { ActualFeedbackModel, HoldFileData, FeedbackModel } from "../shared/models/feedback.model";
import { FeedbackResolver } from '../shared/resolver/feedback-resolver.service';
import { Config } from '../config/config';
import { ViewChild } from '@angular/core';


declare var window: any;
declare var Tiff: any;
@Component({
    moduleId: module.id,
    templateUrl: "search.component.html",
    styleUrls: ['search.component.css']
})
export class SearchComponent {


    private searchString: string = "";
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
    errorMessageTif:boolean = false;
    disableSearchBtn:boolean = true;
    //disablebtn: boolean = true;
    disableSegmentBth: boolean = true;
    checkIsImageIsSelected:boolean = false;
    hideDragDropTextWhenZipFileDropped:boolean = false;
    showImageNameVisi:boolean = false;
    fileName:string = '';
    queryImageURL:string = '';
    noClass:boolean = false;
    disableDIV: boolean = false;
    activettfClass:boolean = false;
    activeClass:boolean = false;
    notTakeImageOnDragDrop:boolean = false;
    serverErrorText:string;
    tif:boolean = false;
    nontif:boolean = false;
    segment:boolean = true;
    search:boolean = false;
    invalidClassMessage: boolean = false;
    invalidformat: boolean = false;
    //@ViewChild('tiffimage') el:ElementRef;
 


    constructor(private _router: Router,
        private _searchImageService: SearchImageService,
        private slimLoadingBarService: SlimLoadingBarService,
        private feedbackResolver:FeedbackResolver,
        private config:Config) { }


    ngOnInit() {
        window.initialize(this.dragdropcallback);
    }


    // this method will execute when user drag and drop the file
    public dragdropcallback = (files: Array<any>, $event: any) => {
this.invalidformat = false;

        $("#tiffImageId").find("canvas.preview").remove();
        this.fileName = files[0].name as string;
        var index = this.fileName.lastIndexOf('.');
         let fileType = this.fileName.substring(index, this.fileName.length).toLowerCase();
        this.ImageNotFoundMessage = false;
        this.errorMessageVisi = false;
        this.disableSearchBtn = false;
     //   this.disablebtn = false;
        this.disableSegmentBth = false;
        this.hideDragDropTextWhenZipFileDropped = false;
        this.dummyVar = false;

    
if(this.notTakeImageOnDragDrop == false){
    this.fileName = files[0].name as string;
 //   console.log("file type"+files[0].type);


    var fileReader = new FileReader();
   

  
    let fileSizeInBytes = files[0].size as number;
    let fileSizeInMB = (fileSizeInBytes)/(1024*1024);

    var index = this.fileName.lastIndexOf('.');
   
 
    let fileType = this.fileName.substring(index, this.fileName.length).toLowerCase();
   // console.log("File type is " + fileType);
    if ((fileType == '.png' || fileType == '.jpg' || fileType == '.jpeg' || fileType == '.tiff' || fileType == '.tif' || fileType == '.mmr') && (fileSizeInMB <=2)) {
        if((fileType == '.png' || fileType == '.jpg' || fileType == '.jpeg' || fileType == '.mmr')){
         this.hideDummyImageOnDragDrop = true;
    }else{
        this.hideDummyImageOnDragDrop = false;
    }
         this.dummyVar = true;
         this.showImageNameVisi = false;
        if (files && files[0]) {
           if(fileType == '.tiff' || fileType == '.tif'){
                this.tif = true;
            }
            else{
                this.nontif = true;
                this.activeClass = true;
                this.activettfClass = false;
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
                         this.activettfClass = true;
                        this.invalidformat = true;
                        // console.log("inside length" + contents.length);
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
                 //  console.log("hii" + event.target.result);


                   var arr = (new Uint8Array(event.target.result)).subarray(0, 4);
                   var header = "";
                   for(var i = 0; i < arr.length; i++) {
                      header += arr[i].toString(16);
                   }
                   let bytes :any = []
                   const hex = bytes.join('').toUpperCase();
                   validation1=header;
               //    console.log("hex" + validation1.substring(0,7));
                   check =  validation1.substring(0,7);
                //   console.log("check" + header);
                   if(check === "49492a0"){
                //    console.log("it is   tif");

                    this.errorMessageVisi = false;
                    this.disableSegmentBth = false;
                    this.disableSearchBtn = false; 
                    this.invalidformat = false;
                  
                }else{
                 //   console.log("it is not tiff");
                   this.errorMessageVisi = true;
                    this.disableSearchBtn = true;
                    this.disableSegmentBth = true;
                   this.activettfClass = true;
                   this.invalidformat = true;
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
            );
                  $("#tiffImageId").append(tiffCanvas);
                  var buffer = event.target.result;
          
                  const uint = new Uint8Array(event.target.result)
                
                  uint.forEach((byte) => {
                      bytes.push(byte.toString(16))
                  })
            
                    this.setPic();
                }
                reader1.readAsArrayBuffer(files[0]);
            

   
 
            }else{  
              
                setTimeout(() => {
                    this.setPic();
                }, 0)
            }
          
         
            this.filesList = files[0];
          //  this.errorMessageVisi = false;
        
            this.feedbackCompMainImageName = files[0].name;
         
        } else {
            this.filesList = null;
        }
    } else {
        this.showImageNameVisi = false;
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

        if (picheight <= picwidth) {
            $('.hideImage').addClass('setheight');
        } else {
            $('.hideImage').addClass('setWidth');
        }
    }


   

    // this method will execute, to check whether fileslist is not null
    checkFormStatus() {
        if (this.filesList != null) {
            this.SearchImage();
        }
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

    public FileLoaded(ev:Event)
    {
        var data = ev.target as FileReader
            localStorage.setItem("FileData",data.result);
    }


    SearchImage() {
        this.disableDIV = true;
        this.notTakeImageOnDragDrop = true;
        this.slimLoadingBarService.start();
         this.errorMessageVisi = false;
         this.disableSearchBtn = true;
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
                fileListObject.fileName = this.fileName;
                fileListObject.fileType = this.filesList.type;
                fileListObject.size = this.filesList.size;
                fileListObject.mainImage = this.url;
                fileListObject.mainImage1 = this.url1;
                 if(result.results){
                    fileListObject.searchResult = result.results;
                    fileListObject.queryImageURL = result.queryImageURL;
                  //  console.log("res"+  result.queryImageURL);
                }
                else{
                    fileListObject.searchResult = result;
                }
	
                // fileListObject.searchResult = result.results;
                fileListObject.maxResultCount = result.resultSize;
                fileListObject.cnnResultSize = result.cnnResultSize;
                fileListObject.siftResultSize = result.siftResultSize;
                fileListObject.cnnAccess= result.isCNNAccess;
                fileListObject.siftAccess = result.isSiftAccess;
                

                let holdFileData = new HoldFileData();
                holdFileData.lastModifiedDate = this.filesList.lastModifiedDate;
                holdFileData.name = this.filesList.name;
                holdFileData.size = this.filesList.size;
                holdFileData.type = this.filesList.type;
                holdFileData.webkitRelativePath = this.filesList.webkitRelativePath;
                holdFileData.searchString = this.searchString;
                // let emptyObj:any = {};
              //  console.log("File Object" + fileListObject);
                // localStorage.setItem('Response',fileListObject);
                for(let i =0; i < fileListObject.searchResult.length; i++){
                    fileListObject.searchResult[i].uniqueID = i;
                }
               this.feedbackResolver.setData(fileListObject);
                 localStorage.setItem("Response", JSON.stringify(fileListObject));
                 localStorage.setItem("FileList", JSON.stringify(this.filesList));

               //  Config.holdData = holdFileData;
                // ---------------------------------------------------------------------------
                this.disableSearchBtn = false;
                if(this.searchString == ""){
                     this.noClass = true;
                    this.searchString = '   ';

                }

                localStorage.setItem("FileList", JSON.stringify(holdFileData));
                this._router.navigate(['/home/feedback', this.searchString]);
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
                    this.slimLoadingBarService.complete();
                    this.serverErrorText = 'Connection Timed Out.';
                    $("#openServerErrorModal").click();
                }
                if(error.status == 500 || error.status == 404){
                    this.notTakeImageOnDragDrop = false;
                    this.disableSearchBtn = false;
                    this.disableDIV = false;
                    this.slimLoadingBarService.complete();
                    this.serverErrorText = 'We are sorry, but something went wrong.';
                    $("#openServerErrorModal").click();
                }

            })
    }



}

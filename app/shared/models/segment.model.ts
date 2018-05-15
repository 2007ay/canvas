
export class SegmentModel{
    queryImageUrl: string;
    preprocessedImageUrl: string;
    segmentedUrls: Array<string>;
    className:any;
  }

  export class SelectedSegmentModel{
    public segmentedUrl: string;
    public active:boolean;
    constructor(x: string, y: boolean) {
      this.segmentedUrl = x;
      this.active = y;
  }
  }



  export class ResponseRef{
    queryImageUrl : string;
    segmentedUrls: Array<string>;
    preprocessedImageUrl: string;
    className:any;
    

  }



  export class ActualSegmentModel{
    feedbackCompClassName:string;
    fileType:string;
    source: string;
    fileName:string;
    mainImage:string;
    mainImage1:string;
    source1: string;
    queryImageURL: any;
    size:number;
    searchResult:Array<SegmentModel>;
    maxResultCount:number;
    cnnResultSize:number;
    siftResultSize:number;
    cnnAccess:boolean;
    siftAccess:boolean;
  }
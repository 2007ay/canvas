
export class FeedbackModel{
    queryImageURL: string;
    imageName : string;
    imageURL: string;
    imageClassType: string;
    imageClassType2:Array<string>;
    publicationCountry : string;
    publicationDate : Date;
    officialGazetteType : string;
    registrationNumber : number;
    registrationDate : string;
    applicationNumber: string;
    collectiveTrademarkIndication : string;
    regionalTrademarkIndication : string;
    goodsServiceClassficationClass : string;
    goodsServiceClassIDs: Array<string>;
    niceVersionClass: string;
    trademarkLaw32Flag: string;
    TrademarkLawSec91: string;
    distinctionLaw: string;
    examinerName: string;
    pronunciation: string;
    trademarkIndication: string;
    similarGroups: Array<any>;
    viennaFigureClassification : boolean;
    similargroup : Array<any>;
    createDate: Date;
    createdByUser: string;
    lastUpdateDate: Date;
    lastUpdatedByUser: string;
    source: string;
    score: number;
    status : number ;
    localId:number;
    uniqueID:number;
  }


export class MarkRelevance {
  public queryImageURL : string;
  public relevantImageURL : string;
  public status : number;
  public source : string;
  public score : number;
}



export class ActualFeedbackModel{
  feedbackCompClassName:string;
  fileType:string;
  source: string;
  fileName:string;
  mainImage:string;
  mainImage1:string;
  source1: string;
  queryImageURL: any;
  size:number;
  searchResult:Array<FeedbackModel>;
  maxResultCount:number;
  cnnResultSize:number;
  siftResultSize:number;
  cnnAccess:boolean;
  siftAccess:boolean;
}


export class ResponseRef{
  feedbackCompClassName:string;
  fileType:string;
  fileName:string;
  mainImage:string;
  mainImage1: string;
  queryImageURL : any;
  size:number;
  source1: string;
}

export class HoldFileData {
  lastModified:any;
  lastModifiedDate:any;
  name:any;
  size:any;
  type:any;
  webkitRelativePath:any;
  searchString:any;
}

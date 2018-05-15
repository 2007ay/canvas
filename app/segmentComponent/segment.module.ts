import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { SegmentComponent } from "./segment.component";
import { SegmentRoutingModule } from "./segment.routing.module";
import { SegmentImageService } from '../shared/services/segmentImage.service';
import { SearchImageService } from '../shared/services/searchImage.service';
import {TranslateModule} from 'ng2-translate';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        SegmentRoutingModule,
        TranslateModule
    ],
    declarations: [
        SegmentComponent
    ],
    providers: [SegmentImageService,SearchImageService]
})
export class SegmentModule { }

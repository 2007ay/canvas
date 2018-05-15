import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { SegmentSearchComponent } from "./segmentsearch.component";
import { SegmentSearchRoutingModule } from "./segmentsearch.routing.module";
import { SegmentImageService } from '../shared/services/segmentImage.service';
import { SegmentSearchImageService } from '../shared/services/segmentsearchImage.service';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        TranslateModule,
        SegmentSearchRoutingModule
    ],
    declarations: [
        SegmentSearchComponent
    ],
    providers: [SegmentImageService,SegmentSearchImageService]
})
export class SegmentSearchModule { }

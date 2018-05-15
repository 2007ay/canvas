import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {HttpModule, JsonpModule, Http} from '@angular/http';
import {FeedbackComponent} from "./feedback.component";
import { SegmentSearchImageService } from '../shared/services/segmentsearchImage.service';
import { SearchImageService } from '../shared/services/searchImage.service';
 import {FeedbackRoutingModule} from "./feedback.routing.module";
 import {TranslateModule} from 'ng2-translate';
 import { DebounceClickDirective } from './debounce-click.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        TranslateModule,
        FeedbackRoutingModule
    ],
    declarations: [
       FeedbackComponent,
       DebounceClickDirective
    ],
    providers: [SegmentSearchImageService,SearchImageService]
})
export class FeedbackModule {}

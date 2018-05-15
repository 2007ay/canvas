import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { SearchComponent } from "./search.component";
import { SearchRoutingModule } from "./search.routing.module";
import { SearchImageService } from '../shared/services/searchImage.service';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        SearchRoutingModule,
        TranslateModule
    ],
    declarations: [
        SearchComponent
    ],
    providers: [SearchImageService]
})
export class SearchModule { }

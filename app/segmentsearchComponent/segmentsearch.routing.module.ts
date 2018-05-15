import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SegmentSearchComponent} from "./segmentsearch.component";
import { SegmentResolver } from '../shared/resolver/segment-resolver.service';
 const SearchRoute: Routes = [
    {
        path: "", component: SegmentSearchComponent,resolve: { segment: SegmentResolver },
        children: []
    }];

@NgModule({
    imports: [
        RouterModule.forChild(SearchRoute)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class SegmentSearchRoutingModule {}
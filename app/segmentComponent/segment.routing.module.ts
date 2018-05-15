import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SegmentComponent} from "./segment.component";
 const SegmentRoute: Routes = [
    {
        path: "", component: SegmentComponent,
        children: []
    }];

@NgModule({
    imports: [
        RouterModule.forChild(SegmentRoute)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class SegmentRoutingModule {}
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchComponent} from "./search.component";
const SearchRoute: Routes = [
    {
        path: "", component: SearchComponent,
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
export class SearchRoutingModule {}
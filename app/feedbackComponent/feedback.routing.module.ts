import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {AuthGuard} from "../services/authGuard.service";
import {FeedbackComponent} from "./feedback.component";
import { FeedbackResolver } from '../shared/resolver/feedback-resolver.service';
const FeedbackRoute: Routes = [
    {
        path: "", component: FeedbackComponent,resolve: { feedback: FeedbackResolver },
        children: [
            

        ]
    }];

@NgModule({
    imports: [
        RouterModule.forChild(FeedbackRoute)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        
    ]
})
export class FeedbackRoutingModule {}
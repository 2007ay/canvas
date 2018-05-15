import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }       from './home.component';
import {AuthGuard} from "../shared/services/authGuard.service";

const homeRoutes: Routes = [
    { path: '', component: HomeComponent,
        canActivateChild: [AuthGuard],

      children: [
           {
              path:'feedback/:name',
              loadChildren:'app/feedbackComponent/feedback.module#FeedbackModule'
          },
          {
              path:'segmentsearch',
              loadChildren:'app/segmentsearchComponent/segmentsearch.module#SegmentSearchModule'
          },
          {
            path:'search',
            loadChildren:'app/searchComponent/search.module#SearchModule'
        },
          {
            path:'segment',
            loadChildren:'app/segmentComponent/segment.module#SegmentModule'
        }
       
      ]  }
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [

    ]
})
export class HomeRoutingModule {}
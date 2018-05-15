import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module'
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import {TranslateModule} from "ng2-translate";
import { Config } from "./config/config";
import { FeedbackResolver } from './shared/resolver/feedback-resolver.service';
import { SegmentResolver } from './shared/resolver/segment-resolver.service';

@NgModule({
  imports: [BrowserModule,
    LoginModule,
    AppRoutingModule,InfiniteScrollModule,
    SlimLoadingBarModule.forRoot(),
    TranslateModule.forRoot()
  ],

  declarations: [AppComponent],

  providers: [Title, Config,FeedbackResolver,SegmentResolver],

  bootstrap: [AppComponent]
})

export class AppModule { }

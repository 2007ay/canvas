import { NgModule }       from '@angular/core';
import { HomeRoutingModule }       from './home.routing.module';
import {HomeComponent} from "./home.component";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {TranslateModule} from 'ng2-translate';
@NgModule({
    imports: [
        HomeRoutingModule,SlimLoadingBarModule, TranslateModule
    ],
    declarations: [
        HomeComponent],
    providers: []
})
export class HomeModule {}
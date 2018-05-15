import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule ,JsonpModule} from '@angular/http';
import { LoginComponent }           from './login.component';
import { LoginRoutingModule }       from './login.routing.module';
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        LoginRoutingModule,
        SlimLoadingBarModule,
        TranslateModule
    ],
    declarations: [
        LoginComponent,
      ]
})
export class LoginModule {}
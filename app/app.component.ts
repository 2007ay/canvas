import {Component, OnInit } from '@angular/core';
let $ = require("https://code.jquery.com/jquery-3.1.1.js");
import {Injectable, Inject} from '@angular/core';
import {TranslateService} from 'ng2-translate';
//import {LoginComponent} from './login/login.component';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl:"app.component.html",
    styleUrls: ['app.component.css']

})
export class AppComponent {
   constructor(@Inject(TranslateService)private translate: TranslateService) {

      translate.setDefaultLang('English')
    
       let value = localStorage.getItem('Language');
      //let value = JSON.parse(localStorage.getItem('Language'));
    //  console.log("value from app component" + value);
      this.translate.use(value);
      var x = translate.getDefaultLang();
    
     // console.log("from app" + value)
   


      
    } 
}

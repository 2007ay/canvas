import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./shared/services/authGuard.service";


const appRoutes: Routes = [
     {
         path: 'home',
         loadChildren:'app/home/home.module#HomeModule',
         canLoad: [AuthGuard],
     },
     {
         path: '',
         redirectTo: '/login',
         pathMatch: 'full'
     }

];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
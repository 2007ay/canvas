import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { AuthenticationService } from '../shared/services/authentication.service';
import { LoginComponent }       from './login.component';

const loginRoutes: Routes = [
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(loginRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthenticationService
    ]
})
export class LoginRoutingModule {}
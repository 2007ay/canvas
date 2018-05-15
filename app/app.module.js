"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var app_routing_module_1 = require('./app-routing.module');
var login_module_1 = require('./login/login.module');
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var angular2_infinite_scroll_1 = require('angular2-infinite-scroll');
var ng2_translate_1 = require("ng2-translate");
var config_1 = require("./config/config");
var feedback_resolver_service_1 = require('./shared/resolver/feedback-resolver.service');
var segment_resolver_service_1 = require('./shared/resolver/segment-resolver.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                login_module_1.LoginModule,
                app_routing_module_1.AppRoutingModule, angular2_infinite_scroll_1.InfiniteScrollModule,
                ng2_slim_loading_bar_1.SlimLoadingBarModule.forRoot(),
                ng2_translate_1.TranslateModule.forRoot()
            ],
            declarations: [app_component_1.AppComponent],
            providers: [platform_browser_1.Title, config_1.Config, feedback_resolver_service_1.FeedbackResolver, segment_resolver_service_1.SegmentResolver],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
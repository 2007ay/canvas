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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var feedback_component_1 = require("./feedback.component");
var segmentsearchImage_service_1 = require('../shared/services/segmentsearchImage.service');
var searchImage_service_1 = require('../shared/services/searchImage.service');
var feedback_routing_module_1 = require("./feedback.routing.module");
var ng2_translate_1 = require('ng2-translate');
var debounce_click_directive_1 = require('./debounce-click.directive');
var FeedbackModule = (function () {
    function FeedbackModule() {
    }
    FeedbackModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                ng2_translate_1.TranslateModule,
                feedback_routing_module_1.FeedbackRoutingModule
            ],
            declarations: [
                feedback_component_1.FeedbackComponent,
                debounce_click_directive_1.DebounceClickDirective
            ],
            providers: [segmentsearchImage_service_1.SegmentSearchImageService, searchImage_service_1.SearchImageService]
        }), 
        __metadata('design:paramtypes', [])
    ], FeedbackModule);
    return FeedbackModule;
}());
exports.FeedbackModule = FeedbackModule;
//# sourceMappingURL=feedback.module.js.map
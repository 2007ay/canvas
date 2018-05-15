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
var segmentsearch_component_1 = require("./segmentsearch.component");
var segmentsearch_routing_module_1 = require("./segmentsearch.routing.module");
var segmentImage_service_1 = require('../shared/services/segmentImage.service');
var segmentsearchImage_service_1 = require('../shared/services/segmentsearchImage.service');
var SegmentSearchModule = (function () {
    function SegmentSearchModule() {
    }
    SegmentSearchModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                segmentsearch_routing_module_1.SegmentSearchRoutingModule
            ],
            declarations: [
                segmentsearch_component_1.SegmentSearchComponent
            ],
            providers: [segmentImage_service_1.SegmentImageService, segmentsearchImage_service_1.SegmentSearchImageService]
        }), 
        __metadata('design:paramtypes', [])
    ], SegmentSearchModule);
    return SegmentSearchModule;
}());
exports.SegmentSearchModule = SegmentSearchModule;
//# sourceMappingURL=segmentsearch.module.js.map
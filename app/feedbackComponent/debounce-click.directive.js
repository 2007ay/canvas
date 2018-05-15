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
var Subject_1 = require('rxjs/Subject');
var debounceTime_1 = require('rxjs/operators/debounceTime');
var DebounceClickDirective = (function () {
    function DebounceClickDirective() {
        this.debounceTime = 500;
        this.debounceClick = new core_1.EventEmitter();
        this.clicks = new Subject_1.Subject();
    }
    DebounceClickDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.clicks.pipe(debounceTime_1.debounceTime(this.debounceTime)).subscribe(function (e) { return _this.debounceClick.emit(e); });
    };
    DebounceClickDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    DebounceClickDirective.prototype.clickEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DebounceClickDirective.prototype, "debounceTime", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DebounceClickDirective.prototype, "debounceClick", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DebounceClickDirective.prototype, "clickEvent", null);
    DebounceClickDirective = __decorate([
        core_1.Directive({
            selector: '[appDebounceClick]'
        }), 
        __metadata('design:paramtypes', [])
    ], DebounceClickDirective);
    return DebounceClickDirective;
}());
exports.DebounceClickDirective = DebounceClickDirective;
//# sourceMappingURL=debounce-click.directive.js.map
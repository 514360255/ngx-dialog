/**
 * Created by sunshine(514360255@qq.com)
 * User: Sunshine
 * Date: 2018/5/7 0007
 * Time: 上午 11:34
 */

import {
    Component, ComponentFactoryResolver, EventEmitter, HostListener, OnInit, Output, ViewChild, ViewContainerRef,
    ReflectiveInjector, ComponentRef, Inject} from '@angular/core';
import {DialogOptions} from './dialog.service';

@Component({
    selector: 'dialog-box',
    template: `<div class="dialog-warp" #dialogBoxAnimation [attr.index]="closeIndexName">
        <div class="dialog-box white-bg border-r2 global-box-shadow {{headerData.sizeClassName}}">
            <div class="g-item-style">
                <div class="title">
                <span class="ebony-color">
                    <i class="{{headerData.icon}}"></i>
                    <span class="ebony-color">{{headerData.title}}</span>
                </span>
                </div>
                <div class="content">
                    <template #element></template>
                    <div class="dialog-btn">
                        <button *ngFor="let btn of btnList" class="btn btn-{{btn.type}} btn-sm mr-10" (click)="dialogButton(btn.status)">
                            <i *ngIf="btn" class="{{btn.icon}}"></i>
                            {{btn.name}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    styles: [`.g-item-style{background-color:#fff;border-radius:2px}.g-item-style .title{border-bottom:1px solid #eee;min-height:60px;padding-right:20px;padding-left:20px;display:flex;justify-content:space-between;align-items:center}.g-item-style .title span:first-child{font-size:16px}.g-item-style .title span.cursor-pointer{color:#aaa}.g-item-style .title span.cursor-pointer:hover{color:#34495f}.g-item-style .title>a{font-size:13px;color:#3498db;margin-left:auto}.g-item-style .content{padding:20px}.dialog-warp{background-color:rgba(0,0,0,.3);position:fixed;left:0;top:0;right:0;bottom:0;z-index:1}.dialog-box-width400{width:400px}.dialog-box-width600{width:600px}.dialog-box{min-height:200px;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%)}.dialog-box.dialog-warp-prompt{width:400px}.dialog-animation{opacity:0;animation:a .4s ease-out .05s forwards}.dialog-animation>.dialog-box{top:40%;opacity:0;animation:c .2s ease-out .2s forwards}.dialog-animation-leave{opacity:1;animation:b .2s ease-out .2s forwards}.dialog-animation-leave>.dialog-box{top:50%;opacity:1;animation:d .3s ease-out forwards}.dialog-animation .dialog-box-animation2{animation:e .4s ease-in-out .05s forwards}.dialog-animation .dialog-box-animation-prompt{animation:f .4s ease-in-out .05s forwards}@keyframes a{0%{opacity:0}to{opacity:1}}@keyframes b{0%{opacity:1}to{opacity:0}}@keyframes c{0%{top:40%;opacity:0}to{top:50%;opacity:1}}@keyframes d{0%{top:50%;opacity:1}to{top:40%;opacity:0}}@keyframes e{0%{top:50%;opacity:0}to{top:50%;opacity:1}}@keyframes f{0%{top:50%;opacity:0}50%{top:50%;opacity:1}60%{top:50%;opacity:1;left:52%}65%{top:50%;opacity:1;left:48%}70%{top:50%;opacity:1;left:52%}75%{top:50%;opacity:1;left:48%}80%{top:50%;opacity:1;left:52%}85%{top:50%;opacity:1;left:48%}90%{top:50%;opacity:1;left:52%}95%{top:50%;opacity:1;left:48%}to{top:50%;opacity:1;left:50%}}.dialog-btn{-webkit-display:flex;display:flex;justify-content:flex-end}.dialog-btn .btn{margin-left:10px;padding:6px 12px;color:#fff;border-width:0;font-size:16px;cursor:pointer;border-radius:2px}.dialog-btn .btn.btn-secondary{background-color:#bdc3c7}.dialog-btn .btn.btn-delete{background-color:#f64247}.dialog-btn .btn.btn-success{background-color:#18c5a9}.dialog-btn .btn.btn-blue{background-color:#3498db}`]
})

export class DialogBoxComponent implements OnInit {

    public closeIndexName: string = '';
    public className: string;
    public customEvent: string;
    public headerData: any = {
        icon: '',
        title: '提醒',
        sizeClassName: 'dialog-box-width400'
    };
    public btnList: Array<any> = [
        {icon: 'fa-close', type: 'secondary', name: '取消', status: false},
        {icon: 'fa-check', type: 'blue', name: '确认', status: true}
    ];
    public content: DialogBoxComponent;
    public options: DialogOptions = {};

    @ViewChild('dialogBoxAnimation') public dialogBoxAnimation: any;
    @ViewChild('element', {read: ViewContainerRef}) public element: any;

    @Output() public outputEvent: any = new EventEmitter<any>();

    @HostListener('document:click', ['$event.target'])
    onclick(btn: HTMLElement) {
        if(this.options.bgClose) {
            const className: string = btn.className;
            if ((className.indexOf('dialog-animation') > -1) &&
                (this.content['wrapper']['closeIndexName'] === btn.getAttribute('index'))) {
                this.dialogService.removeDialog(this.content);
            }
        }
    }

    constructor(
        public componentFactoryResolver: ComponentFactoryResolver,
        @Inject('dialog.service') public dialogService: any
    ) {}

    ngOnInit() {
    }

    /**
     * 设置头部信息
     * @param data
     * @param btnList
     * @param className
     * @param index
     */
    setHeaderData(data: any, btnList: Array<any>, className: string, index: number) {
        for(const key in data) {
            this.headerData[key] = data[key];
        }
        this.className = className;
        if (btnList) {
            this.btnList = btnList;
        }
        this.closeIndexName = 'close-dialog-' + index;
        this.setClassName();
    }

    /**
     * 添加component
     * @param component
     * @param data
     * @param options
     * @returns {any}
     */
    addComponent(component: any, data: any, options: DialogOptions): any {

        this.options = options;

        this.customEvent = data.customEvent;

        const componentFactory: any = this.componentFactoryResolver.resolveComponentFactory(component);

        const injector: any = ReflectiveInjector.fromResolvedProviders([], this.element.injector);

        const componentRef: ComponentRef<any> = componentFactory.create(injector);

        this.element.insert(componentRef.hostView);

        this.content = componentRef.instance;

        this.content['setDialogData'] = data;

        if(this.content.outputEvent) {
            this.content.outputEvent.subscribe((event: any) => {
                data.confirmOutEmit(event);
            });
        }

        this.content['wrapper'] = this;

        return this.content;
    }

    /**
     * dialog 按钮
     * @param {boolean} status
     */
    dialogButton(status: boolean) {
        if (!status) {
            this.dialogService.removeDialog(this.content);
        } else {
            if (this.customEvent && (typeof this.customEvent === 'string')) {
                this.content[this.customEvent]();
            }
        }
    }

    /**
     * 添加class name
     */
    setClassName() {
        this.dialogBoxAnimation.nativeElement.classList.add(this.className);
    }

}

/**
 * Created by sunshine(514360255@qq.com)
 * User: Sunshine
 * Date: 2018/5/10 0010
 * Time: 上午 9:33
 */

import {Component, ComponentFactoryResolver, ComponentRef, Inject, ViewChild, ViewContainerRef} from '@angular/core';
import {DialogOptions} from './dialog.service';
import {DialogBoxComponent} from './dialog-box/dialog-box.component';

@Component({
    selector: 'dialog-holder',
    template: '<ng-template #element></ng-template>'
})

export class DialogHolderComponent {

    public index: number = 0;
    public className: string;
    public dialogs: Array<any> = [];
    @ViewChild('element', {read: ViewContainerRef}) public element: ViewContainerRef;

    constructor(
        public componentFactory: ComponentFactoryResolver,
        @Inject('dialog.service') public dialogService: any
    ) {
    }

    /**
     * 添加弹窗
     * @param component
     * @param data
     * @param options
     */
    addDialog(component: any, data: any, options: DialogOptions) {
        this.className = options && options.animatedName ? options.animatedName : 'dialog-animation';
        const componentFactory: any = this.componentFactory.resolveComponentFactory(DialogBoxComponent);
        const componentRef: ComponentRef<any> = this.element.createComponent(componentFactory);
        const dialogBoxComponent: DialogBoxComponent = <DialogBoxComponent>componentRef.instance;
        dialogBoxComponent.setHeaderData(data.header, data.btnList, this.className, this.index++);
        const setData: any = {
            data: data.data
        };
        if (data.customEvent) {
            setData['customEvent'] = data.customEvent;
        }
        if (data.confirmOutEmit) {
            setData['confirmOutEmit'] = data.confirmOutEmit;
        }
        const _component: DialogBoxComponent = dialogBoxComponent.addComponent(component, setData, options);
        this.dialogs.push(_component);
    }

    /**
     * 移除dialog
     * @param {DialogBoxComponent} component
     */
    removeDialog(component?: any) {
        if(component) {
            const _component: HTMLElement = component.wrapper.dialogBoxAnimation.nativeElement;
            _component.classList.remove(this.className);
            _component.classList.add(this.className + '-leave');
            setTimeout(() => {
                const _index: number = this.dialogs.indexOf(component);
                if (_index > -1) {
                    this.element.remove(_index);
                    this.dialogs.splice(_index, 1);
                }
            }, 400);
        }else {
            const _component: HTMLElement = this.dialogs[0].wrapper.dialogBoxAnimation.nativeElement;
            _component.classList.remove(this.className);
            _component.classList.add(this.className + '-leave');
            setTimeout(() => {
                this.element.remove(0);
                this.dialogs.splice(0, 1);
            }, 400);
        }
    }

}

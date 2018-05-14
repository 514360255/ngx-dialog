/**
 * Created by sunshine(514360255@qq.com)
 * User: Sunshine
 * Date: 2018/5/7 0007
 * Time: 下午 2:01
 */

import {
    ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {DialogBoxComponent} from './dialog-box/dialog-box.component';
import {DialogHolderComponent} from './dialog-holder.component';
import {DialogPromptComponent} from './dialog-prompt/dialog-prompt.component';
import {PromptComponent} from './prompt/prompt.component';

export interface DialogOptions {

    // 指定弹窗顺序
    index?: number;

    // 自动关闭（单位：ms）默认不会关闭
    timeout?: number;

    // 点击背景是否关闭弹窗 false 不关闭
    bgClose?: boolean | false;
}

@Injectable()
export class DialogService {

    public container: HTMLElement;
    public dialogHolderComponent: any;

    constructor(
        public injector: Injector,
        public applicationRef: ApplicationRef,
        public componentFactoryResolver: ComponentFactoryResolver
    ) {
    }

    /**
     * 创建 dialog holder
     * @param {DialogHolderComponent} component
     * @param {any} data
     * @param {DialogOptions} options
     */
    addDialog(component: any, data: any, options: DialogOptions) {

        // 判断页面中是否已经插入dialog holder标签
        if (!this.dialogHolderComponent) {
            this.dialogHolderComponent = this.createDialogHolderComponent();
        }
        let _component: any;
        if(component && (component === 'prompt')) {
            _component = PromptComponent;
        }else if(component) {
            _component = component;
        }else {
            _component = DialogPromptComponent;
        }
        this.dialogHolderComponent.addDialog(_component, data, options);
    }

    /**
     * 创建 dialog holder
     */
    createDialogHolderComponent(): DialogHolderComponent {

        // 组件工厂
        const resolveFactory: any = this.componentFactoryResolver.resolveComponentFactory(DialogHolderComponent);

        // 创建工厂注入器
        const componentRef: ComponentRef<any> = resolveFactory.create(this.injector);

        // 获取注入器rootNodes中第一个数据
        const rootNodes: any = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        // 把document body作为容器
        if (!this.container) this.container = document.body;

        // 附加视
        this.applicationRef.attachView(componentRef.hostView);

        // 销毁视图
        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        });

        // 把rootNodes节点插入到container容器中
        this.container.appendChild(rootNodes);

        // 返回实例
        return componentRef.instance;
    }

    /**
     * 移除dialog
     * @param {DialogBoxComponent} dialog
     */
    removeDialog(dialog?: DialogBoxComponent) {
        if (!this.dialogHolderComponent) return;
        this.dialogHolderComponent.removeDialog(dialog);
    }

}

/**
 * Created by sunshine(514360255@qq.com)
 * User: Sunshine
 * Create Date: 2018/5/10 0010 下午 5:17
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'dialog-prompt',
    template: `<p class="font-14 min-h50">{{content}}</p>`
})

export class DialogPromptComponent {

    public content: string;

    @Output() public outputEvent = new EventEmitter<any>();

    @Input() set setDialogData(data: any) {
        if (data) {
            console.log(data.data);
            this.content = (data.data && data.data.msg) ? data.data.msg : '操作成功';
        }
    }

    constructor() {}

    /**
     * 返回事件
     */
    confirmFunction() {
        this.outputEvent.emit();
    }

    /**
     * 返回事件
     */
    outputPromptEmit() {
        this.outputEvent.emit(true);
    }

}

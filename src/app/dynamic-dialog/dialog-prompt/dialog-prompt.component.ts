/**
 * Created by sunshine(514360255@qq.com)
 * User: Sunshine
 * Create Date: 2018/5/10 0010 下午 5:17
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'dialog-prompt',
    templateUrl: './dialog-prompt.component.html'
})

export class DialogPromptComponent {

    public content: string;

    @Output() public outputEvent = new EventEmitter<any>();

    @Input() set setDialogData(data: any) {
        if (data) {
            this.content = (data.data && data.data.msg) ? data.data.msg : '操作成功';
        }
    }

    constructor() {}

    confirmOutEmit() {
        this.outputEvent.emit();
    }

}

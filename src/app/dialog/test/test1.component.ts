/**
 * Created by sunshine(514360255@qq.com)
 * User: Sunshine
 * Date: 2018/5/8 0008
 * Time: 下午 3:29
 */

import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';

@Component({
    selector: 'test1-component',
    templateUrl: './test1.component.html'
})

export class Test1Component {

    @Output() public outputEvent: any = new EventEmitter<any>();

    constructor(
        @Inject('dialog.service') public dynamicDialog: any
    ) {}

    @Input() set setDialogData(data: any) {
        if (data) {
            console.log(data, '>>>>>>');
        }
    }


    getSubmitData() {
        this.outputEvent.emit('success!!!');
        this.dynamicDialog.addDialog('prompt', {
            header: {
                title: '渠道状态123'
            },
            btnList: [
                {icon: 'fa-check', type: 'blue', name: '确认', status: false}
            ],
            data: {
                msg: '2018.05.10 提示信息'
            }
        });
    }

}

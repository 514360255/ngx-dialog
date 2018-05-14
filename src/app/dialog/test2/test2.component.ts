/**
 * Created by sunshine(514360255@qq.com)
 * User: Sunshine
 * Date: 2018/5/8 0008
 * Time: 下午 3:29
 */

import {Component, EventEmitter, Inject, Output} from '@angular/core';

@Component({
    selector: 'test2-component',
    templateUrl: './test1.component.html'
})

export class Test2Component {

    @Output() public outputEvent: any = new EventEmitter<any>();

    constructor(
        @Inject('dialog.service') public dynamicDialog: any
    ) {}


    getSubmitData() {
        this.outputEvent.emit('success!!!');
        this.dynamicDialog.addDialog(null, {
            header: {
                title: '渠道状态',
                icon: '',
                boxWidth: ''
            },
            btnList: [
                {icon: 'fa-check', type: 'blue', name: '确认', status: false}
            ]
        });
    }

}

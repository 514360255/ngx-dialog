import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Test1Component} from './dialog/test/test1.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('btn') public btnElement: any;

    constructor(
        @Inject('dialog.service') public dialogService: any
    ) {}

    ngOnInit() {
        this.btnElement.nativeElement.addEventListener('click', () => {
            this.dialogService.addDialog(Test1Component, {
                header: {
                    title: '渠道名字'
                },
                btnList: [
                    {icon: 'fa-close', type: 'secondary', name: '取消', status: false},
                    {icon: 'fa-check', type: 'blue', name: '确认', status: true}
                ],
                data: {
                    msg: '2018.05.10 提示信息'
                },
                customEvent: 'getSubmitData',
                confirmOutEmit: data => {
                    console.log(data, '接收数据!!!!');
                }
            });
        });
    }

}

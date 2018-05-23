# Dialog

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## 安装

```
npm i ngx4-dialog
```

## addDialog第一个参数
* [null](#文本)
    * null 不传component提示框
    * 'prompt' 字符串prompt提示文本框
    * Test1Component 传入对应的comonent

## addDialog第二个参数

* [header](#文本)
    * title: string 弹窗标题
    * icon: string 弹窗icon图标
    * sizeWidth: string 弹窗宽度类名
* [btnList](#文本)
    * Array 数组
        * icon: string 按钮icon图标
        * type: string 按钮颜色 secondary | delete | success | blue
        * name: string 按钮显示文本
        * status: boolean 按钮状态 false => 直接关闭弹窗 true => 执行相对应操作
* [data](#文本)
    * Object 弹窗内对应数据
        * msg: string 提示文本框内容
* [customEvent](#文本)
    * String 执行相对应弹窗中事件
* [confirmOutEmit](#文本)
    * CallBack 返回弹窗内输出数据
    
## addDialog第三个参数
* [options](#文本)
    * bgClose: boolean 是否点击背景关闭弹窗 true => 关闭 false => 不关闭 默认true
    * timeout: number 5000/ms 自动关闭弹窗单位毫秒
    
    
## Demo

### AppModule 引入

    
```javascript
import ...

import {DialogModule} from './dynamic-dialog/dialog.module';
import {Test1Component} from './dialog/test/test1.component';
import {Test2Component} from './dialog/test2/test2.component';

@NgModule({
    declarations: [
        AppComponent,
        Test1Component,
        Test2Component
    ],
    imports: [
        BrowserModule,
        DialogModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        Test1Component,
        Test2Component
    ]
})
export class AppModule {
}

```

### 使用方法

```javascript
import ...
import {Test1Component} from './dialog/test/test1.component';

@Component(...)
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
```

### 弹窗内接收及返回参数
```javascript
import ...

@Component(...)

export class Test1Component {

    @Output() public outputEvent: any = new EventEmitter<any>();

    constructor(
        @Inject('dialog.service') public dynamicDialog: any
    ) {}
    
    /**
    * 接收参数
    */
    @Input() set setDialogData(data: any) {
        if (data) {
            console.log(data, '>>>>>>');
        }
    }

    /**
    * 按钮执行事件
    */
    getSubmitData() {
        // 返回参数
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
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4000/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

/**
 * Created by sunshine(514360255@qq.com)
 * User: Sunshine
 * Date: 2018/5/7 0007
 * Time: 上午 11:35
 */

import {ModuleWithProviders, NgModule} from '@angular/core';
import {DialogBoxComponent} from './dialog-box.component';
import {DialogService} from './dialog.service';
import {CommonModule} from '@angular/common';
import {DialogHolderComponent} from './dialog-holder.component';
import {DialogPromptComponent} from './dialog-prompt.component';
import {PromptComponent} from './prompt.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DialogHolderComponent,
        DialogBoxComponent,
        DialogPromptComponent,
        PromptComponent
    ],
    entryComponents: [
        DialogHolderComponent,
        DialogBoxComponent,
        DialogPromptComponent,
        PromptComponent
    ]
})

export class DialogModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DialogModule,
            providers: [
                {provide: 'dialog.service', useClass: DialogService}
            ]
        };
    }
}

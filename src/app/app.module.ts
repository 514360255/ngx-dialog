import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
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

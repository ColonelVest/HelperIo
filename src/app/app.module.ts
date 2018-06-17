import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {QRScanner} from "@ionic-native/qr-scanner";
import {HttpClientModule} from "@angular/common/http";
import {ReceiptDetailsPageModule} from "../pages/receipt-details/receipt-details.module";
import {ReceiptScannerPageModule} from "../pages/receipt-scanner/receipt-scanner.module";
import {LoginPageModule} from "../pages/login/login.module";
import {IonicStorageModule} from "@ionic/storage";
import { ApiProvider } from '../providers/api';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        ReceiptDetailsPageModule,
        ReceiptScannerPageModule,
        LoginPageModule,
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        QRScanner,
        ApiProvider,
    ]
})
export class AppModule {
}

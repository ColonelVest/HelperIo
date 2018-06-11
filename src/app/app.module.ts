import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ReceiptScannerPage} from "../pages/receipt-scanner/receipt-scanner";
import {QRScanner} from "@ionic-native/qr-scanner";
import {ReceiptDetailsPage} from "../pages/receipt-details/receipt-details";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        ReceiptScannerPage,
        ReceiptDetailsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        ReceiptScannerPage,
        ReceiptDetailsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        QRScanner
    ]
})
export class AppModule {
}

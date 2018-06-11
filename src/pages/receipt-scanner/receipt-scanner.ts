import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import {ReceiptDetailsPage} from "../receipt-details/receipt-details";

/**
 * Generated class for the ReceiptScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-receipt-scanner',
    templateUrl: 'receipt-scanner.html',
})
export class ReceiptScannerPage {
    scanSub;

    constructor(public navCtrl: NavController, public navParams: NavParams, private qrScanner: QRScanner, private alertCtrl: AlertController) {
    }

    ionViewWillEnter(){
        console.log('Тутачки');
        this.showCamera();
        this.scan();
    }
    ionViewWillLeave(){
        console.log('Тутачки leave');
        this.hideCamera();
    }

    scan() {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    console.log('Camera Permission Given');
                    this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        this.qrScanner.hide();
                        this.scanSub.unsubscribe();
                        this.navCtrl.push(ReceiptDetailsPage, {
                            result: text
                        });
                    });

                    this.qrScanner.show();
                } else if (status.denied) {
                    console.log('Camera permission denied');
                } else {
                    console.log('Permission denied for this runtime.');
                }
            })
            .catch((e: any) => console.log('Error is', e))
    }

    showCamera() {
        (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    }

    hideCamera() {
        (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    }
}

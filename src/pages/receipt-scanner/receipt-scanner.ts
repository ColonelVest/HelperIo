import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import {ReceiptPreviewPage} from "../receipt-preview/receipt-preview";

@IonicPage()
@Component({
    selector: 'page-receipt-scanner',
    templateUrl: 'receipt-scanner.html',
})
export class ReceiptScannerPage {
    scanSub;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private qrScanner: QRScanner,
        private alrt: AlertController,
    ) {
    }

    ionViewWillEnter() {
        this.showCamera();
        this.scan();
    }

    ionViewWillLeave() {
        this.hideCamera();
    }

    scan() {
        try {
            this.qrScanner.prepare()
                .then((status: QRScannerStatus) => {
                    if (status.authorized) {
                        console.log('Camera Permission Given');
                        this.scanSub = this.qrScanner.scan().subscribe((text) => {
                                this.qrScanner.hide();
                                this.scanSub.unsubscribe();
                                this.navCtrl.push(ReceiptPreviewPage, {
                                    qrText: text['result'] ? text['result'] : text
                                });
                            },
                            error => {
                                const alert = this.alrt.create({
                                    title: 'ошибка',
                                    subTitle: 'ошибка запроса',
                                    buttons: ['OK']
                                });
                                alert.present();
                            }
                        );

                        this.qrScanner.show();
                    } else if (status.denied) {
                        console.log('Camera permission denied');
                    } else {
                        console.log('Permission denied for this runtime.');
                    }
                })
                .catch((e: any) => console.log('Error is', e))
        } catch (e) {
            const alert = this.alrt.create({
                title: 'ошибка',
                subTitle: e.message,
                buttons: ['OK']
            });
            alert.present();
        }
    }

    showCamera() {
        (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    }

    hideCamera() {
        (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    }
}

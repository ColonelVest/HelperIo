import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the ReceiptDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-receipt-details',
    templateUrl: 'receipt-details.html',
})
export class ReceiptDetailsPage {
    qrText;
    receipt;
    constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
        this.qrText = navParams.get('result');
    }

    sendQrResult() {
        return this.http.get('https://api.twto.ru/web/api/v1/create_by_qr_text?token=angry|$2y$13$KMcXxcgw/dSEx0oyXPD6JO37BGHDArSJ5mtq2O4G1ZaD/HtOHAXrK&' + this.qrText).subscribe(
            res => {
                this.receipt = res
            }
        );
    }

    itemTapped($event, item) {
        console.log(item);
    }

    stringify(str) {
        return JSON.stringify(str)
    }

    ionViewDidLoad() {
        this.sendQrResult();
    }
}

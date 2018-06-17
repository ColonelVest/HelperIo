import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api";

@IonicPage()
@Component({
    selector: 'page-receipt-details',
    templateUrl: 'receipt-details.html',
})
export class ReceiptDetailsPage {
    qrText;
    receipt;

    constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
        this.qrText = navParams.get('result');
    }

    sendQrResult() {
        return this.api.createReceiptByQrText(this.qrText).subscribe(
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

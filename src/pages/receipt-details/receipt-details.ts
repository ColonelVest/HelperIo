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
    constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
        this.qrText = navParams.get('result');
    }

    sendQrResult() {
        // this.http.post()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ReceiptDetailsPage');
    }
}

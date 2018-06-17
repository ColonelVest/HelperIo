import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api";
import {ReceiptDetailsPage} from "../receipt-details/receipt-details";

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    icons: string[];
    receipts: Array<{ title: string, note: string }>;

    constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider) {
    }

    ionViewDidLoad() {
        this.api.getReceipts().subscribe(
            res => {
                if (res['success']) {
                    this.receipts = res['data']
                } else {
                    console.log(res);
                }
            }
        );
    }

    itemTapped(event, receipt) {
        console.log(receipt);
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ReceiptDetailsPage, {
            receipt: receipt
        });
    }
}

import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api";

@IonicPage()
@Component({
    selector: 'page-receipt-details',
    templateUrl: 'receipt-details.html',
})
export class ReceiptDetailsPage {
    receipt;

    constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
        this.receipt = navParams.get('receipt');
    }

    itemTapped($event, item) {
        console.log(item);
    }

    stringify(str) {
        return JSON.stringify(str)
    }

    ionViewDidLoad() {
        console.log(this.receipt);
    }

    getReceiptDetails() {
        return [
            {title: 'Дата и время покупки', data: this.receipt.dateTime},
            {title: 'Название магазина', data: this.receipt.storeName ? this.receipt.storeName : 'Не указан'},
            {title: 'Адрес магазина', data: this.receipt.storeAddress ? this.receipt.storeAddress : 'Не указан'},
            {title: 'Кассир', data: this.receipt.cashier ? this.receipt.cashier : 'Не указан'}
        ];

    }
}

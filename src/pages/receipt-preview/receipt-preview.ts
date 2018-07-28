import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import * as moment from 'moment';
import {ReceiptDetailsPage} from "../receipt-details/receipt-details";
import {ApiProvider} from "../../providers/api";

/**
 * Generated class for the ReceiptPreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-receipt-preview',
    templateUrl: 'receipt-preview.html',
})
export class ReceiptPreviewPage {
    qrText: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider, public alert: AlertController) {
        this.qrText = navParams.get('qrText');
    }

    getReceiptDetails() {
        const params = new URLSearchParams(this.qrText);
        const purchaseMoment = moment(params.get('t'), "YYYYMMDDTHHmmss");

        return [
            {title: 'Дата', value: purchaseMoment.format('DD.MM.YYYY')},
            {title: 'Время', value: purchaseMoment.format('HH:mm')},
            {title: 'Итого', value: params.get('s').replace('.', ',')},
            {title: 'ФН:№', value: params.get('fn')},
            {title: 'ФД:№', value: params.get('i')},
            {title: 'ФПД', value: params.get('fp')},
        ];
    }

    saveReceipt() {
        const alert = this.alert.create({
            title: 'Ожидание',
            subTitle: 'Запрос отправлен, ожидайте!',
            enableBackdropDismiss: false
        });
        alert.present();
        return this.api.createReceiptByQrText(this.qrText).subscribe(
            res => {
                alert.dismiss();
                if (res['success'] === true) {
                    this.navCtrl.push(ReceiptDetailsPage, {
                        receipt: res['data']
                    });
                } else {
                    this.openErrorALert(res['errors']);
                }
            },
            error => {
                alert.dismiss();
                this.openErrorALert();
            }
        );
    }

    openErrorALert(errors: string[] = null) {
        const options = {title: 'Ошибка запроса'};
        if (errors && errors.length > 0) {
            options['subTitle'] = errors.join(', ');
        }

        const alert = this.alert.create(options);
        alert.present();
    }
}

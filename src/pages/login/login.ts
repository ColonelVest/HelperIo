import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {HomePage} from "../home/home";
import {ApiProvider} from "../../providers/api";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    pwd: string;
    username: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private storage: Storage,
        private api: ApiProvider,
        private alert: AlertController) {
        this.storage.get(ApiProvider.TOKEN_ID_TITLE).then(
            val => {
                if (val) {
                    this.api.isTokenCorrect(val).subscribe(
                        res => {
                            if (res['success'] === true) {
                                this.onTokenReceive(val);
                            }
                        }
                    );
                }
            }
        );
    }

    onTokenReceive(token) {
        localStorage.setItem(ApiProvider.TOKEN_ID_TITLE, token);
        this.storage.set(ApiProvider.TOKEN_ID_TITLE, token);
        this.navCtrl.push(HomePage);
    }

    ionViewDidLoad() {
    }

    login() {
        this.api.authenticate(this.username, this.pwd).subscribe(
            res => {
                if (res['data']) {
                    this.onTokenReceive(res['data']);
                } else {
                    res['errors'].forEach((error) => {
                        const alert = this.alert.create({
                            title: 'Authorization error',
                            subTitle: error,
                            buttons: ['OK']
                        });
                        alert.present();
                    })
                }
            }
        );
    }
}
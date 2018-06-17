import {Component} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api";


@IonicPage()
@Component({
    selector: 'page-items-list',
    templateUrl: 'items-list.html',
})
export class ItemsListPage {
    allItems;
    items;

    constructor(public viewCtrl: ViewController, private api: ApiProvider) {
    }

    ionViewDidLoad() {
        this.getItems();
    }

    onSelect(selected) {
        this.viewCtrl.dismiss({item: selected});
    }

    getFilteredItems(event) {
        const val = event.target.value;

        if (val && val.trim() != '') {
            this.items = this.allItems.filter((item) => {
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    getItems() {
        this.api.getItems().subscribe(
            response => {
                const items = response['data'];
                this.allItems = items;
                this.items = items;
            }
        );
    }
}

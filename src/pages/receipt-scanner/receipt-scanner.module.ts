import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptScannerPage } from './receipt-scanner';

@NgModule({
  declarations: [
    ReceiptScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptScannerPage),
  ],
})
export class ReceiptScannerPageModule {}

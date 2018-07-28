import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptPreviewPage } from './receipt-preview';

@NgModule({
  declarations: [
    ReceiptPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptPreviewPage),
  ],
})
export class ReceiptPreviewPageModule {}

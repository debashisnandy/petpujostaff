import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FirestoreStorageService } from 'src/app/firebase-cloudstoredb/firestore-storage.service';
import * as fromApp from '../../store/app.reducer';
import * as fromOrder from './store/order.reduser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderItem } from 'src/app/shared/order.module';
import * as OrderAction from './store/order.action';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InvalidOrderComponent } from './invalid-order.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recive-order',
  templateUrl: './recive-order.component.html',
  styleUrls: ['./recive-order.component.css']
})
export class ReciveOrderComponent implements OnInit {
  dataSource= [];
  displayedColumns: string[] = ['checkox','foodName','amount'];
  countNumber:number;
  orderList:Observable<fromOrder.State>;
  orders = [];
  durationInSeconds = 5;
  orderRepeat = [];
  roll:string
  

  constructor(private firebaseStorageRefService:FirestoreStorageService,
    private route:Router,
    private store:Store<fromApp.AppState>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.orderList = this.store.select('orderItem');

    this.firebaseStorageRefService.fetchPublishOrder().subscribe(
      (food) =>{
        this.dataSource = food;
      }
    );

    this.orderList.subscribe(
      (oders:fromOrder.State) =>{
        this.orders = oders.orders; 
        
      }
    );
  }

  onUpCount(fbC,element){

    this.countNumber = +fbC.innerText + 1;

    if (!this.orderRepeat.includes(element)) {
      this.orderRepeat.push(element);
      this.store.dispatch(new OrderAction.SetOrder(new OrderItem(element.foodname,1,element.amount)));
      
    }else if (this.orderRepeat.includes(element)){
      let ind= this.orderRepeat.indexOf(element);
      this.store.dispatch(new OrderAction.ModifyOrder({index: ind,item:new OrderItem(element.foodname,this.countNumber,element.amount * this.countNumber)})); 
    }


    
    fbC.innerText = this.countNumber;
  }

  onDownCount(fbC,element){

    this.countNumber = +fbC.innerText;
    if(this.countNumber > 1 && this.orderRepeat.includes(element)){
      let ind= this.orderRepeat.indexOf(element);
      let item = this.orders[ind];
      this.store.dispatch(new OrderAction.ModifyOrder({index: ind,item:new OrderItem(element.foodname,this.countNumber-1,item.price - element.amount)}));
      fbC.innerText = this.countNumber -1 ;
    }else if (this.countNumber === 1 && this.orderRepeat.includes(element)){
      let ind= this.orderRepeat.indexOf(element);
      this.store.dispatch(new OrderAction.DeleteOrder(ind));
      this.orderRepeat.splice(ind,1);
      fbC.innerText = this.countNumber -1 ;
    }
  }


  onSubmit(){
    
    
    let amt = 0
    if(this.orders.length > 0){
      const dialogRef = this.dialog.open(DialogContentExampleDialog,{
        width: '400px',
        data: {name: this.roll}
      });
      dialogRef.afterClosed().subscribe(result => {

        let data = result;
        if (data !== undefined){
          this.orders.forEach(
            (value) =>{
              amt += value.price;
            }
          );
          
          
          this.firebaseStorageRefService.onTransaction(this.orders,amt,(data.name).toUpperCase());
          this.store.dispatch(new OrderAction.Empty_Order());
          this.route.navigateByUrl('/main/loader',{skipLocationChange: true}).then(()=>{
            this.route.navigate(['/main/receive-order']);
          });
        }
      });
    }else{
      this.snackBar.openFromComponent(InvalidOrderComponent, {
        duration: this.durationInSeconds * 1000,
      });
    }
  }

  onStopReceivingOrder(){
    this.firebaseStorageRefService.onStopOrder(this.dataSource);
    this.route.navigate(['/main/publish']);
  }
}


export interface DialogData {
  name: string;
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: '../pop-up-box/dialog-overview-example-dialog.html',
})
export class DialogContentExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}




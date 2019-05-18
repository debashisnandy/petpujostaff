import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FoodItem } from '../shared/food.module';
import { OrderItem } from '../shared/order.module';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { OrderPlacedComponent } from './orderplaced.component';


interface IsPublished{
  isPublished:boolean;
}

interface TransactionDetails{
  orderItems: OrderItem[];
  date:number;
  time: string;
  roll:string;
  totalAmount: number;
  user:string;
  transactionId:string;
}

interface ChefDetails{
  orderItems: OrderItem[];
  date:number;
  time: string;
  roll:string;
  totalAmount: number;
  user:string;
  transactionId:string;
  orderStatus:string;
  orderType:string;
}


interface SaleDetails{
  quantity:number;
  foodname:string;
  date:number;
}

@Injectable()
export class FirestoreStorageService {


  todoCollectionRef: AngularFirestoreCollection<FoodItem>;
  orderCollectionRef: AngularFirestoreCollection<TransactionDetails>;
  chefCollectionRef: AngularFirestoreCollection<ChefDetails>;
  salesInformation: AngularFirestoreCollection<SaleDetails>;
  isPublishCollectionRef: AngularFirestoreCollection<IsPublished>;
  durationInSeconds = 5;
  
  todo$: Observable<FoodItem[]>;
  isPublised$: Observable<IsPublished[]>;

  constructor(private afs: AngularFirestore,
    private snackBar: MatSnackBar) { }


  fetchItemFromCafeteria(){
    this.todoCollectionRef = this.afs.collection<FoodItem>('cafeteria-menu');
     this.todo$ =this.todoCollectionRef.valueChanges();
    
    return this.todo$;

  }

  fetchItemFromCanteen(){
    this.todoCollectionRef = this.afs.collection<FoodItem>('canteen-menu');
     this.todo$ =this.todoCollectionRef.valueChanges();

    return this.todo$;

  }


  fetchIsOrderActive(){
    var subject = new Subject<boolean>();
    this.isPublishCollectionRef = this.afs.collection('publish', ref=>{
      return ref.orderBy("isPublished");
    });
    this.isPublishCollectionRef.valueChanges().subscribe(
      pub => {
        subject.next(pub[0].isPublished)
      }
    );
     
    return subject.asObservable();
  }

  onPublishMenu(foods:FoodItem[]){
    this.todoCollectionRef = this.afs.collection<FoodItem>('publish-cafeteria');
    this.isPublishCollectionRef = this.afs.collection('publish');
    

    this.isPublishCollectionRef.doc('VU5rE82J57mr37ieMZlc').set({isPublished: true});

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let date = dd + "-" + mm+ '-' + yyyy;
    
    
    foods.forEach(
      (value,index) =>{
        
        this.todoCollectionRef.doc(index.toString()).set({foodname: value.foodname,amount: value.amount});
      
      }
    );
  }

  onStopOrder(item:FoodItem[]){
    this.todoCollectionRef = this.afs.collection<FoodItem>('publish-cafeteria');
    
    item.forEach(
      (item,i) =>{
        this.todoCollectionRef.ref.where("foodname",'==',item.foodname).get().then(
          (querySnapshots) =>{
            querySnapshots.forEach(
              (doc) =>{
                doc.ref.delete()
              }
            )
          }
        )
      }
    );
    this.isPublishCollectionRef = this.afs.collection('publish');
    this.isPublishCollectionRef.doc('VU5rE82J57mr37ieMZlc').set({isPublished: false});
  }

  fetchPublishOrder(){
    this.todoCollectionRef = this.afs.collection<FoodItem>('publish-cafeteria');
    this.todo$ =this.todoCollectionRef.valueChanges();

    return this.todo$;
  }

  onTransaction(orders:OrderItem[],amount:number,roll:string){

    this.salesInformation = this.afs.collection('sales');
    
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let date = dd  + mm+ yyyy;
    let trans= dd+mm+today.getUTCMilliseconds()+yyyy+Math.round(Math.random()+today.getMilliseconds()+today.getUTCSeconds());

    this.orderCollectionRef = this.afs.collection('transactions');
    this.chefCollectionRef = this.afs.collection('chef-cafeteria');

    const ord = orders.map(
      (obj) =>{
        return Object.assign({},obj);
      }
    )

    const time = today.toLocaleTimeString().toString()

    this.chefCollectionRef.add({orderItems:ord,date:+date,
      time:time,roll:roll,
      totalAmount:amount,user: 'Brainware',transactionId: "BWUC"+trans,orderStatus:"waiting",orderType:"offline"});

    this.orderCollectionRef.add({orderItems:ord,date:+date,time:time,roll:roll,totalAmount:amount,user: 'Brainware',transactionId: "BWUC"+trans})
    .then(
      ()=>{
        this.snackBar.openFromComponent(OrderPlacedComponent, {
          duration: this.durationInSeconds * 1000,
        
      });
      }
    );

    orders.forEach(
      (value) =>{
        
        
        this.salesInformation.add({quantity:value.quantity,foodname:value.foodname,date:+date});
        
      }
    );
    
  }

  
}

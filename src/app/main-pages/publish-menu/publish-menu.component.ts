import { Component, OnInit } from '@angular/core';
import { FirestoreStorageService } from 'src/app/firebase-cloudstoredb/firestore-storage.service';
import { FoodItem } from 'src/app/shared/food.module';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as MenuAction from '../store/food.action';
import * as fromMenu from '../store/food.reduser';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish-menu',
  templateUrl: './publish-menu.component.html',
  styleUrls: ['./publish-menu.component.css']
})
export class PublishMenuComponent implements OnInit {
  dataSource= [];
  dataSourceFinal= [];
  menuList:Observable<fromMenu.State>;
  displayedColumns: string[] = ['checkox','foodName','amount'];
  displayfinalColumns:string[] = ['foodName','amount'];

  constructor(private store:Store<fromApp.AppState>,
    private firebaseStorageRefService:FirestoreStorageService,
    public route:Router) { }

  ngOnInit() {
    this.menuList = this.store.select('foodItem');
    this.firebaseStorageRefService.fetchItemFromCafeteria().subscribe(
      (food) =>{
        this.dataSource = food;
      }
    );

    this.menuList.subscribe(
      (food:fromMenu.State) =>{
        this.dataSourceFinal = food.foods;
      }
    );
  }

  onChange(chck,el){
    if(chck.checked && !this.dataSourceFinal.includes(el)){
      this.store.dispatch(new MenuAction.SetMenu(el));      
    }else if(!chck.checked && this.dataSourceFinal.includes(el)){
      this.store.dispatch(new MenuAction.DeleteMenu(this.dataSourceFinal.indexOf(el)));
    }
  }

  onsubmit(){
      this.firebaseStorageRefService.onPublishMenu(this.dataSourceFinal);
      this.store.dispatch(new MenuAction.Empty_Recipe());
      this.route.navigate(['/main/receive-order']);
    }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './signin/signin.component';
import { MatComponentModule } from './main-pages/mat-component/mat-component.module';
import { HeaderComponent } from './main-pages/headers/header/header.component';
import { MainPagesComponent } from './main-pages/main-pages.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginGuard } from './auth/login-guard.service';
import { AuthGuard } from './auth/auth-guard.service';
import { UserAuthService } from './auth/user-auth.service';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule,FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { InvalidAuthComponent } from './auth/invalid-auth.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PublishMenuComponent } from './main-pages/publish-menu/publish-menu.component';
import { FirestoreStorageService } from './firebase-cloudstoredb/firestore-storage.service';
import { ReciveOrderComponent, DialogContentExampleDialog } from './main-pages/recive-order/recive-order.component';
import { PublishedAuthGuard } from './publish-guards/publish-guard.service';
import { ReceivedOrderAuthGuard } from './publish-guards/reciveorder-guard.service';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/app.reducer';
import { InvalidOrderComponent } from './main-pages/recive-order/invalid-order.component';
import { LoadReceiveOrderComponent } from './main-pages/load-receive-order/load-receive-order.component';
import { OrderPlacedComponent } from './firebase-cloudstoredb/orderplaced.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HeaderComponent,
    MainPagesComponent,
    InvalidAuthComponent,
    PageNotFoundComponent,
    PublishMenuComponent,
    ReciveOrderComponent,
    InvalidOrderComponent,
    DialogContentExampleDialog,
    LoadReceiveOrderComponent,
    OrderPlacedComponent
  ],
  entryComponents:[
    DialogContentExampleDialog,
    OrderPlacedComponent,
  InvalidAuthComponent,
  InvalidOrderComponent
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    LayoutModule,
    StoreModule.forRoot(reducer),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    MatComponentModule
  ],
  providers: [UserAuthService,
    AuthGuard,
    LoginGuard,
  FirestoreStorageService,
  PublishedAuthGuard,
  ReceivedOrderAuthGuard,
  { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }

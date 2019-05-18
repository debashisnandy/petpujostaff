import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { MainPagesComponent } from './main-pages/main-pages.component';
import { LoginGuard } from './auth/login-guard.service';
import { AuthGuard } from './auth/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PublishMenuComponent } from './main-pages/publish-menu/publish-menu.component';
import { ReciveOrderComponent } from './main-pages/recive-order/recive-order.component';
import { PublishedAuthGuard } from './publish-guards/publish-guard.service';
import { ReceivedOrderAuthGuard } from './publish-guards/reciveorder-guard.service';
import { LoadReceiveOrderComponent } from './main-pages/load-receive-order/load-receive-order.component';


const appRoutes: Routes = [
    
    {path:'login', component:SigninComponent, canActivate:[LoginGuard]},
    {path:'', redirectTo: 'main', pathMatch: 'full'},
    {path:"main", component:MainPagesComponent, 
    canActivate:[AuthGuard],
    children:[
        {path: '', redirectTo:'publish', pathMatch: 'full'},
        {path:"publish", component: PublishMenuComponent, canActivate: [PublishedAuthGuard]},
        {path:'receive-order', component: ReciveOrderComponent, canActivate: [ReceivedOrderAuthGuard]},
        {path:'loader', component: LoadReceiveOrderComponent}
    ]},
    { path: 'not-found', component: PageNotFoundComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}
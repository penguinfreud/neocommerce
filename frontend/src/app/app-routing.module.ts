import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product/product-list.component';
import { LoginComponent} from './user/login.component';
import { SignupComponent } from './user/signup.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { BalanceComponent } from './balance/balance.component';

const routes: Routes = [
    { path: 'balance', component: BalanceComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'detail/:id', component: ProductDetailComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './general/about/about.component';
import { AdminloginComponent } from './general/adminlogin/adminlogin.component';
import { CartComponent } from './general/cart/cart.component';
import { CheckoutComponent } from './general/checkout/checkout.component';
import { ContactComponent } from './general/contact/contact.component';
import { HomeComponent } from './general/home/home.component';
import { OrdersuccessComponent } from './general/ordersuccess/ordersuccess.component';
import { ProductComponent } from './general/product/product.component';
import { ProductsComponent } from './general/products/products.component';
import { RegisterComponent } from './general/register/register.component';
import { UserloginComponent } from './general/userlogin/userlogin.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"products/:categoryid",component:ProductsComponent},
  {path:"product/:id",component:ProductComponent},
  {path:"about",component:AboutComponent},
  {path:"contact",component:ContactComponent},
  {path:"adminlogin", component:AdminloginComponent},
  {path:"userlogin", component:UserloginComponent},
  {path:"register",component:RegisterComponent},
  {path:"checkout",component:CheckoutComponent},
  {path:"cart",component:CartComponent},
  {path:"ordersuccess",component:OrdersuccessComponent},


  {path:"admin" ,loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:"user" ,loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

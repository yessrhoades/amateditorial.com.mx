import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { BlogComponent } from './blog/blog.component';
import { CartComponent } from './cart/cart.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { ContactComponent } from './contact/contact.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { cartGuardService } from './guards/cart-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { PaymentComponent } from './payment/payment.component';
import { PublishBookComponent } from './publish-book/publish-book.component';
import { QuestionsComponent } from './questions/questions.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ModalBookComponent } from './components/modal-book/modal-book.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'home', component : HomeComponent},
  {path : 'about_us', component : AboutUsComponent},
  {path : 'services/:section', component : OurServicesComponent},
  {path : 'catalogo', component : CatalogoComponent},
  {path : 'publish_book', component : PublishBookComponent},
  {path : 'blog', component : BlogComponent},
  {path : 'contact', component : ContactComponent},
  {path : 'cart', component : CartComponent, canActivate: [cartGuardService]},
  {path : 'questions', component : QuestionsComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'confirm/:email/:token', component : ConfirmAccountComponent},
  {path : 'login', component : LoginComponent},
  {path : 'forgot_password', component : ForgotPasswordComponent},
  {path : 'password/reset/:token/:email', component : ResetPasswordComponent},
  {path : 'book/:id', component : ModalBookComponent},
  //{path : '**', redirectTo : 'login', pathMatch : 'full'},
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuardService, cartGuardService] },
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

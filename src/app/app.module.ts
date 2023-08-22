import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentComponent } from './payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { SeparadorComponent } from './components/separador/separador.component';
import { MenuServicesComponent } from './components/menu-services/menu-services.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SliderBookComponent } from './components/slider-book/slider-book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './cart/cart.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { BookComponent } from './components/book/book.component';
import { ModalBookComponent } from './components/modal-book/modal-book.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { PublishBookComponent } from './publish-book/publish-book.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { QuestionsComponent } from './questions/questions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BlogComponent } from './blog/blog.component';

let pk : string = 'pk_live_51LdddJAcsviPEqiu6DFuW0aGPvJ3GTvmHcTkxwjwggCHpwWkGr4l898JrZ8VQzOhkNrEUrTMu4TyHYKQof6meuy0004gRiC45P';

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    FooterComponent,
    SeparadorComponent,
    MenuServicesComponent,
    SliderBookComponent,
    NavbarComponent,
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    FooterComponent,
    OurServicesComponent,
    SeparadorComponent,
    MenuServicesComponent,
    PublishBookComponent,
    ContactComponent,
    CatalogoComponent,
    BookComponent,
    ModalBookComponent,
    CartComponent,
    QuestionsComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmAccountComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    BlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule,
    NgxStripeModule.forRoot(pk),
  ],
  providers: [
    BsModalService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

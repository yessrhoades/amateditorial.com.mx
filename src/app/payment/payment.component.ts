import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { catchError, debounceTime } from 'rxjs';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { Payment } from '../models/Payment';
import { PaymentService } from '../services/payment.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CartService } from '../services/cart.service';
import { AlertsService } from '../services/alerts.service';
import { Country } from '../models/Country';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  modalRef!: BsModalRef;

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#5e7d23',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#aaa'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  stripe! :any;
  stripe_public! : string;

  total : number = 0;
  envio : number = 95;
  subtotal : number = 0;

  countries : Country[] = [];

  paymentForm!: FormGroup;
  country : string = 'MX';
  email! : string;
  name! : string;
  lastname! : string;
  telephone! : string;
  city! : string;
  street! : string;
  colony! : string;
  state! : string;
  shipping_method : number = 1;
  way_to_pay : number = 1;

  flagPay : boolean = false;
  btnDisabled : boolean = false;
  flagValidateCart : boolean = false;
  btnOxxoMessage = 'Generar voucher';
  btnCartMessage = 'Pagar';
  btnTransferMessage = 'Generar orden de pago';

  stripeCard!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private paymentService : PaymentService,
    private cartService : CartService,
    private alertService : AlertsService,
    private modalService: BsModalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.stripePublic();
    this.buildPaymentForm();
    this.buildStripeCardForm();
    this.subtotal = this.cartService.getTotal();
    this.total = this.subtotal + this.envio;
  }

  private stripePublic():void {
    this.paymentService.stripePublicKey().subscribe(
      data => {
        this.stripe_public = data.stripe_public;
        this.countries = data.countries;
        this.email = data.user.email;
        this.name = data.user.name;
        this.lastname = data.user.lastname1+' '+data.user.lastname2;
        this.telephone = data.user.telephone;
      },
      error => {
        this.alertService.errors(error);
      }
    );
  }

  private buildPaymentForm():void {
    this.paymentForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      name: [this.name, [Validators.required]],
      lastname: [this.lastname, [Validators.required]],
      telephone: [this.telephone, [Validators.required]],
      city: [this.city, [Validators.required]],
      street: [this.street, [Validators.required]],
      colony: [this.colony, [Validators.required]],
      state: [this.state, [Validators.required]],
      country: [this.country, [Validators.required]],
      shipping_method: [this.shipping_method, [Validators.required, Validators.min(1), Validators.max(3)]],
      way_to_pay: [this.way_to_pay, [Validators.required, Validators.min(1), Validators.max(3)]]
    });
    this.paymentForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.email = value.email;
      this.name = value.name;
      this.lastname = value.lastname;
      this.telephone = value.telephone;
      this.city = value.city;
      this.street = value.street;
      this.colony = value.colony;
      this.state = value.state;
      this.country = value.country;
      this.shipping_method = value.shipping_method;
      this.way_to_pay = value.way_to_pay;
    });
  }

  private buildStripeCardForm():void {
    this.stripeCard = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  successForm():void {
    /*switch (this.way_to_pay) {
      case 1 :
        //const config: ModalOptions = { class: 'modal-sm' };

        this.modalRef = this.modalService.show(card);
      break;
      case 2 :

      break;
      case 3 : break;
    }*/
  }

  protected createToken(): void {//2324 2424 3453 5350
    if(this.flagPay == false) {
      this.flagPay = true;
      this.btnDisabled = true;
      this.btnCartMessage = 'Procesando pago...';

      const name = this.stripeCard.get('name')?.value;
      this.stripeService.createToken(this.card.element, { name }).subscribe((result) => {
        if (result.token) {
          let payment = this.createPaymentModel(1);
          payment.response_sale = result;
          //console.log(result);
          this.charge(payment);
        } else if (result.error) {
          this.reloadBtns();
          const message = result.error.message;
          //console.log(message);
          //if (message != 'El número de tu tarjeta está incompleto.')
            this.alertService.error('¡Error!', message!);
        }
      });
    }
  }

  protected async chargeOxxo():Promise<void> {
    if(this.flagPay == false) {
      this.flagPay = true;
      this.btnDisabled = true;
      this.btnOxxoMessage = 'Procesando pago...';
      let payment = this.createPaymentModel(3);
      this.paymentService.stripeClientSecretOxxo(payment).subscribe(
        async data => {
          this.stripe = await loadStripe(this.stripe_public);
          const result = await this.stripe.confirmOxxoPayment(data.client_secret,
          {
            payment_method: {
              billing_details: {
                name: this.name+' '+this.lastname,
                email: this.email,
              },
            },
          });

          if (result.error) {
            this.alertService.error('¡Error!', result.error.message);
            this.reloadBtns();
          } else {
            payment.response_sale = result;
            //console.log(result);
            this.charge(payment);
          }
        },
        error => {
          this.reloadBtns();
          this.alertService.errors(error);
        }
      );
    }
  }

  protected chargeTransfer():void {
    if(this.flagPay == false) {
      this.flagPay = true;
      this.btnDisabled = true;
      this.btnTransferMessage = 'Procesando pago...';
      let payment = this.createPaymentModel(2);
      this.charge(payment);
    }
  }

  private createPaymentModel(way_to_pay : number):Payment {
    const payment = new Payment();
    payment.email = this.email;
    payment.name = this.name;
    payment.lastname = this.lastname;
    payment.telephone = this.telephone;
    payment.city = this.city;
    payment.street = this.street;
    payment.colony = this.colony;
    payment.state = this.state;
    payment.country = this.country;
    payment.detail = this.cartService.getCart();
    payment.shipping_method = this.shipping_method;
    payment.way_to_pay = way_to_pay;
    return payment;
  }

  private reloadBtns():void {
    this.flagPay = false;
    this.btnDisabled = false;
    this.btnOxxoMessage = 'Generar voucher';
    this.btnCartMessage = 'Pagar';
    this.btnTransferMessage = 'Generar orden de pago';
  }

  private charge(payment : Payment):void {
    this.paymentService.sale(payment).subscribe(
      data => {
        this.reloadBtns();
        this.cartService.cleanCart();
        this.cartService.innerCountCart();
        this.alertService.success('¡Bien!', data.message);
        this.router.navigate(['/home']);
      },
      error => {
        this.alertService.errors(error);
      }
    );
  }

  protected addEnvio(shipping_method : number):void {
    if (this.shipping_method == 1) {
      if (this.country == 'MX') {
        this.envio = 95;
        this.total = this.subtotal + this.envio;
      } else {
        this.envio = 500;
        this.total = this.subtotal + this.envio;
      }
    } else {
      this.envio = 0;
      this.total = this.subtotal + this.envio;
    }
  }

  protected addEnvioFromCountry():void {
    if (this.shipping_method == 1) {
      if (this.country == 'MX') {
        this.envio = 95;
        this.total = this.subtotal + this.envio;
      } else {
        this.envio = 500;
        this.total = this.subtotal + this.envio;
      }
    } else {
      this.envio = 0;
      this.total = this.subtotal + this.envio;
    }
  }

}

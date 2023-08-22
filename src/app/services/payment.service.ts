import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private URL : string = environment.baseUrl+'api/';

  constructor(
    private httpclient: HttpClient
  ) { }

  public stripePublicKey():Observable<any>{
    return this.httpclient.get(this.URL+"sales/stripe/public_key");
  }

  public stripeClientSecretOxxo(payment : Payment):Observable<any>{
    return this.httpclient.post(this.URL+"sales/stripe/oxxo_voucher", payment);
  }

  public sale(payment : Payment):Observable<any>{
    return this.httpclient.post(this.URL+"sales", payment);
  }

}

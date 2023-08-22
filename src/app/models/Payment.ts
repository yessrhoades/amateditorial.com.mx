import { Book } from "./Book";

export class Payment {
  email! : string;
  name! : string;
  lastname! : string;
  telephone! : string;
  city! : string;
  street! : string;
  colony! : string;
  state! : string;
  country! : string;
  detail! : Book[];
  shipping_method! : number;
  way_to_pay! : number;
  response_sale! : {};
}

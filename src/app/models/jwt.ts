import { User } from "./user";

export class JWT {
    access_token: string = '';
    expires_in: number = 0;
    token_type: string = '';
    me!: User;

    public constructor(access_token : string) {
        this.access_token = access_token;
    }
}

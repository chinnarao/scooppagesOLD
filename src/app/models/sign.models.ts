import {signEnum} from '../enums/enums';

export class SignModel {
    tab: signEnum = signEnum.SignIn;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class ClientAppStartupResponseModel {
    public SignUpUrl: string;
    public LoginUrl: string;
    public AppBaseUrl: string;
    public Facebook: string;
    public Google: string;
    public LinkedIn: string;
    public Microsoft: string;
}

export class TokenResponseModel {
    public BearerToken: string;
    public AccessToken: string;
    public RefreshToken: string;
    public ExpiresAt: Date;
    public TokenType: string;
    public UserName: string;
    public Email: string;
}

export class LoginRequestModel {
    public Email: string;
    public Password: string;
}

export class UserRequestModel {
    public id: string;
    public userName: string;
    public fullName: string;
    public email: string;
    public jobTitle: string;
}
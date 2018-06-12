import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { emailValidator } from '../../validators/email.validator';
import {signEnum} from '../../enums/enums';
import {SignModel, TokenResponseModel} from '../../models/sign.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { BEARER_TOKEN_NAME } from '../../enums/const';

//https://samkirkiles.svbtle.com/angular-4-reactive-forms-group-validation
function passwordMatchValidator(g: FormGroup) {
  return g.get('pwd').value === g.get('cpwd').value ? null : {'mismatch': true};
}

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
  //providers:[AuthService],
  encapsulation: ViewEncapsulation.None
})
export class SignComponent implements OnInit {

  loading = false;
  activeTabIndex : number = signEnum.SignIn;
  lFG: FormGroup;
  rFG: FormGroup;
  pwdFG: FormGroup;

  constructor(public dialogRef: MatDialogRef<SignComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: SignModel,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private fb: FormBuilder
            ) { }

   ngOnInit() {
     this.authService.Logout();
     this.activeTabIndex = this.data.tab;
      this.lFG = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          pwd: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
        }
      ); 

      this.pwdFG = new FormGroup({
        pwd: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
        cpwd: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      }, passwordMatchValidator); 
      
      this.rFG = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        pwdFG: this.pwdFG,
      });  
   }

   public login() {
    console.log(this.lFG.value);
    let email= this.lFG.value.email;
    let password = this.lFG.value.pwd;
    this.authService.Login(email, password)
    .subscribe( response => { this.AfterSign(response); },
         error => {
           console.log(error.status);
             this.loading = false;
         });
    
    //this.dialogRef.close('signin')
  }

   public register() {
    console.log(this.rFG.value);
    let email= this.rFG.value.email;
    let password = this.rFG.value.pwdFG.pwd;
    this.authService.SignUp(email, password)
        .subscribe( response => { this.AfterSign(response); },
        error => {
          console.log(error.status);
            this.loading = false;
        });
    //this.dialogRef.close('signup');
    //this.router.navigate(['/']);
  }

  public AfterSign(response: TokenResponseModel){
    console.log(JSON.stringify(response));
    this.authService.setSession(response);
    if (this.authService.authenticated) {
      
    } else {
      
    }
  }

}


import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { emailValidator } from '../../validators/email.validator';

@Component({
  selector: 'register-dialog',
  templateUrl: './register.dialog.html',
  styleUrls: ['./register.dialog.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterDialog implements OnInit {

  title: string;
  list: any[] = [];
  registerForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<RegisterDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

   onNoClick(): void {
     this.dialogRef.close();
   }
   ngOnInit() {
     this.createForm();
   }
   private createForm() {
     this.registerForm = new FormGroup({
       email: new FormControl('', [Validators.required, emailValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
       password: new FormControl('', Validators.required),
     });
   }
 
   public register() {
     console.log(this.registerForm.value);
   }

}

import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { emailValidator } from '../../validators/email.validator';

//tab: https://codepen.io/oknoblich/pen/tfjFl

 @Component({
     selector: 'login-dialog',
     templateUrl: './login.dialog.html',
     styleUrls: ['./login.dialog.css']
 })
 export class LoginDialog implements OnInit {
     title: string;
     list: any[] = [];
     loginForm: FormGroup;
     constructor(public dialogRef: MatDialogRef<LoginDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

      onNoClick(): void {
        this.dialogRef.close();
      }
      ngOnInit() {
        this.createForm();
      }
      private createForm() {
        this.loginForm = new FormGroup({
          email: new FormControl('', [Validators.required, emailValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
          password: new FormControl('', Validators.required),
        });
      }
    
      public login() {
        console.log(this.loginForm.value);
      }
 }

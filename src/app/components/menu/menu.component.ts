import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { SignComponent } from '../sign/sign.component';
import { signEnum } from '../../enums/enums';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry } from '@angular/material';
import { SignModel } from '../../models/sign.models';

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  result : any;
  signDialogRef: MatDialogRef<SignComponent>;
  tab : signEnum = signEnum.SignIn;
  model : SignModel = new SignModel();
  
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog) { 
    iconRegistry
    .addSvgIcon('thumb-up',sanitizer.bypassSecurityTrustResourceUrl('/assets/thumbup-icon.svg'))
    .addSvgIconSetInNamespace('core',sanitizer.bypassSecurityTrustResourceUrl('/src/app/components/menu/assets/core-icon-set.svg'))
    .registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit() {}

  login(): void {
    this.sign(signEnum.SignIn);
  }

  register(): void {
    this.sign(signEnum.SignUp);
  }

  sign(sEnum : signEnum): void{
    this.model.tab = sEnum;
    this.signDialogRef = this.dialog.open(SignComponent, { width: '400px', height: '400px', data: this.model});
    this.signDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.result = result;
    });
  }
}



  


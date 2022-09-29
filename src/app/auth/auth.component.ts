import { Component, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { AuthResponseData, AuthService } from "src/app/auth/auth.service";
import { AlertComponent } from "src/app/shared/alert/alert.component";
import { PlaceHolderDirective } from "src/app/shared/placeHolder/placeHolder.directive";

@Component({
  selector:'app-auth',
  templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService, private router: Router){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid) return;
    const {email, password} = form.value;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    }else{
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe({
      next:(resData)=>{
        this.isLoading=false;
        this.router.navigate(['/recipes']);
      },
      error:(errorMessage) => {
        this.showErrorAlert(errorMessage);
        this.isLoading=false;
      },
    });

    form.reset();
  }

  private showErrorAlert(message: string){
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
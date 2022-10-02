import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AlertComponent } from "src/app/shared/alert/alert.component";
import { PlaceHolderDirective } from "src/app/shared/placeHolder/placeHolder.directive";
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/auth/store/auth.actions';

@Component({
  selector:'app-auth',
  templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error = null;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;

  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>){}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authData =>{
      this.isLoading = authData.loading;
      this.error = authData.authError;
      if(this.error){
        this.showErrorAlert(this.error);
      }
    })
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid) return;
    const {email, password} = form.value;

    if(this.isLoginMode){
      this.store.dispatch(new AuthActions.LoginStart({email,password}));
    }else{
      this.store.dispatch(new AuthActions.SignupStart({email,password}));
    }

    form.reset();
  }

  onHandleError(){
    this.store.dispatch(new AuthActions.ClearError());
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
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }
}
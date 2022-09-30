import {Component, OnDestroy, OnInit} from '@angular/core'
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
    ){}
    
    ngOnInit(): void {
      this.userSub = this.store
        .select('auth')
        .pipe(map(userState=>userState.user))
        .subscribe(user =>{
        // this.isAuthenticated = !user ? false : true;
        this.isAuthenticated = !!user;
      });
    }
    
    onSaveData(){
      this.dataStorageService.storeRecipes();
    }
    
    onFetchData(){
      this.dataStorageService.fetchRecipes()
      .subscribe();
    }

    onLogout(){
      this.authService.logout();
    }

    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }
}
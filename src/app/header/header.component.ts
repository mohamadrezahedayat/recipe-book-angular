import {Component} from '@angular/core'

import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html'
})
export class HeaderComponent{
  constructor(private dataStorageService: DataStorageService){}

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes()
      .subscribe();
  }
}
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AlertComponent } from "src/app/shared/alert/alert.component";
import { DropdownDirective } from "src/app/shared/dropdown.directive";
import { LoadingSpinnerComponent } from "src/app/shared/loading-spinner/loading-spinner.component";
import { PlaceHolderDirective } from "src/app/shared/placeHolder/placeHolder.directive";

@NgModule({
  declarations:[
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceHolderDirective,
    DropdownDirective
  ],
  imports:[
    CommonModule
  ],
  exports:[
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceHolderDirective,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule{}
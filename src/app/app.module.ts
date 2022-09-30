import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { RecipesModule } from 'src/app/recipes/recipes.module';
import { ShoppingListModule } from 'src/app/shopping-list/shopping-list.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core.module';
import { AuthModule } from 'src/app/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

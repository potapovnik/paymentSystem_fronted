import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UsersComponent} from './users/users.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule, MatNativeDateModule,
  MatToolbarModule
} from '@angular/material';
import {BalanceComponent} from './balance/balance.component';
import {ReplenishComponent} from './balance/replenish/replenish.component';
import {WithdrawComponent} from './balance/withdraw/withdraw.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {AppService} from './AppService';
import {XhrInterceptor} from './XhrInterceptor';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    BalanceComponent,
    ReplenishComponent,
    WithdrawComponent,
    RegistrationComponent,
    LoginComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [AppService, {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true}],
  bootstrap: [AppComponent]
})

export class AppModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NumberOfCard, UsersComponent} from './users/users.component';
import {BalanceComponent} from './balance/balance.component';
import {ReplenishComponent} from './balance/replenish/replenish.component';
import {WithdrawComponent} from './balance/withdraw/withdraw.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {PaymentComponent} from './payment/payment.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'balance',
    component: BalanceComponent
  },
  {
    path: 'balance/replenish',
    component: ReplenishComponent
  },
  {
    path: 'balance/withdraw',
    component: WithdrawComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [NumberOfCard]
})
export class AppRoutingModule {
}

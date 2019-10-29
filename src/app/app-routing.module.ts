
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {BalanceComponent} from './balance/balance.component';
import {ReplenishComponent} from './balance/replenish/replenish.component';
import {WithdrawComponent} from './balance/withdraw/withdraw.component';
import {NumberOfCard} from './users/pipeNumberOfCard';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

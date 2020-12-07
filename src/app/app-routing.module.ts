import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { AgentComponent } from './agent/agent.component';
import { AgentsComponent } from './agents/agents.component';
import { AppAuthGuard } from './app.authguard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FarmerComponent } from './farmer/farmer.component';
import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { SubtoolComponent } from './subtool/subtool.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AppAuthGuard]},
  { path: 'farmer', component: FarmerComponent, canActivate: [AppAuthGuard]},
  { path: 'agent',  component: AgentComponent, canActivate: [AppAuthGuard]},
  { path: 'agents', component: AgentsComponent, canActivate: [AppAuthGuard]},
  { path: 'products', component: ProductsComponent, canActivate: [AppAuthGuard]},
  { path: 'orders', component: OrdersComponent, canActivate: [AppAuthGuard]},
  { path: 'myaccount', component: MyAccountComponent, canActivate: [AppAuthGuard]  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }

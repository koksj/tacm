import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './app-init';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FarmerComponent } from './farmer/farmer.component';
import { AgentComponent } from './agent/agent.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AddressComponent } from './address/address.component';
import { SubtoolComponent } from './subtool/subtool.component';
import { AgentsComponent } from './agents/agents.component';
import { AgentDialogComponent } from './agent-dialog/agent-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { GlobalHttpInterceptorService } from './global-http-interceptor.service';
import { MyAccountComponent } from './my-account/my-account.component';

@NgModule({
  declarations: [
    AppComponent,
    FarmerComponent,
    AgentComponent,
    DashboardComponent,
    HomeComponent,
    AddressComponent,
    SubtoolComponent,
    AgentsComponent,
    AgentDialogComponent,
    MyAccountComponent
  ],
  imports: [
    BrowserModule,    
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' }
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true  
    },
    { provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

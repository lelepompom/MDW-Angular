import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RoomDetailComponent} from './components/room-detail/room-detail.component';
import {RoomSearchComponent} from './components/room-search/room-search.component';
import {HttpService} from './core/http.service';
import {HttpClientModule} from '@angular/common/http';
import {BookingService} from './services/booking.service';
import {PaymentGatewayComponent} from './components/payment-gateway/payment-gateway.component';
import {MatDatepickerModule, MatFormFieldModule, MatIconModule, MatNativeDateModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    PaymentGatewayComponent,
    RoomDetailComponent,
    RoomSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule,
    HttpService,
    BookingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

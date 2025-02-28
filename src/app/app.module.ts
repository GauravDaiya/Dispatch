import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutModule } from '@angular/cdk/layout';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { customerReducer } from './store/state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomerEffects } from './store/state.effects';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    StoreModule.forRoot({customer: customerReducer}),
    EffectsModule.forRoot([CustomerEffects, ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
   
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(),
    provideState({name : 'customer', reducer : customerReducer}),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

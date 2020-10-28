import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './listing/listing.component';
import { SpacesRoutingModule } from './spaces-routing.module';


@NgModule({
  declarations: [ListingComponent],
  imports: [
      CommonModule,
      SpacesRoutingModule
  ]
})
export class SpacesModule { }

import { NgModule } from '@angular/core';

import { CardStorage } from './card-storage.service';

@NgModule({
  providers: [CardStorage],
})
export class CardStorageModule {}

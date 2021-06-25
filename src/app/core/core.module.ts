import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TOKEN_INTERCEPTOR } from './auth/token.interceptor';
import { CURRENT_USER_INITIALIZER } from './auth/refresh-user.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [HttpClientModule],
  providers: [TOKEN_INTERCEPTOR, CURRENT_USER_INITIALIZER],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule?: CoreModule) {
    if (coreModule != undefined) {
      throw Error('Core module must be defined only once');
    }
  }
}

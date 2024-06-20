import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withJsonpSupport())],
});

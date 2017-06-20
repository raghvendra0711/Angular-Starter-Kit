// All necessary polyfills.
require('./polyfills');

// Custom styles.
require('../styles/main.sass');

import { AppModule }              from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule);

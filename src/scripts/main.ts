// All necessary polyfills.
require('./polyfills');

// Custom styles.
require('../styles/main.sass');

import { MainModule }              from './app/main.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(MainModule);

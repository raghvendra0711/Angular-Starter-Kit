// All necessary polyfills.
import './polyfills.ts';
// Custom styles.
import './styles/main.sass';

/**
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app/app.module';
/**
 * Angular bootstrapping
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Depending on the env mode, enable prod mode or add debugging modules.
if (process.env.ENV === 'production') {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

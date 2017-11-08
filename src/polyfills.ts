import 'core-js/client/shim';
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'ts-helpers';
import 'hammerjs';

if (process.env.ENV === 'production') {
	// Development.
	Error.stackTraceLimit = Infinity;

	/* tslint:disable no-var-requires */
	require('zone.js/dist/long-stack-trace-zone');
}

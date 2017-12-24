import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

/**
 * Add here external dependencies that actually you use.
 * 
 * About RxJS
 * Each RxJS functionality that you use in the library must be added as external dependency.
 * - For main classes use 'Rx':
 *      e.g. import { Observable } from 'rxjs/Observable'; => 'rxjs/Observable': 'Rx'
 * - For observable methods use 'Rx.Observable':
 *      e.g. import 'rxjs/add/observable/merge'; => 'rxjs/add/observable/merge': 'Rx.Observable'
 *      or for lettable operators:
 *      e.g. import { merge } from 'rxjs/observable/merge'; => 'rxjs/observable/merge': 'Rx.Observable'
 * - For operators use 'Rx.Observable.prototype':
 *      e.g. import 'rxjs/add/operator/map'; => 'rxjs/add/operator/map': 'Rx.Observable.prototype'
 *      or for lettable operators:
 *      e.g. import { map } from 'rxjs/operators'; => 'rxjs/operators': 'Rx.Observable.prototype'
 */

const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/common/http': 'ng.commmon.http',
    'rxjs/Observable': 'Rx',
    'rxjs/Observer': 'Rx',
    // Rxjs dependencies
    'rxjs/add/operator/debounceTime': 'Rx.Observable.prototype',
    'rxjs/add/operator/concat': 'Rx.Observable.prototype',
    'rxjs/add/operator/distinctUntilChanged': 'Rx.Observable.prototype',
    'rxjs/add/operator/share': 'Rx.Observable.prototype',
    'rxjs/add/operator/filter': 'Rx.Observable.prototype',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',

    'rxjs/add/observable/fromEvent': 'Rx.Observable.prototype'
};

export default {
    external: Object.keys(globals),
    plugins: [resolve(), sourcemaps()],
    onwarn: () => { return },
    output: {
        format: 'umd',
        name: 'ng.ngxTypeahead',
        globals: globals,
        sourcemap: true,
        exports: 'named'
    }
}
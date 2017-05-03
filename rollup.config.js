export default {
    entry: './dist/modules/ngx-typeahead.es5.js',
    dest: './dist/bundles/ngx-typeahead.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'ng.ngxTypeahead',
    external: [
        '@angular/core',
        '@angular/common',
        'rxjs/Observable',
        'rxjs/Observer'
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        'rxjs/Observable': 'Rx',
        'rxjs/Observer': 'Rx'
    },
    onwarn: () => { return }
}
## v 0.2.1 (2018/04/21)

* [FIX] - active item not updated correctly

## v 0.2.0 (2018/04/21)

* [UPGRADE] - using rxjs new lettable operators ( > 5.5 )
* [REFACTOR] - now using Rxjs 'Subject' and not 'fromEvent' to subscribe for dom events
* [ADD] - new 'taDebounce' - to set debounce for key events
* [ADD] - new scoped classnames for results and items - 'ta-results', 'ta-item', 'ta-backdrop'
* [FIXED] - static list is not filtered by the query's value
* [REFACTOR] - moved functions to utilities
* [DEPRECATED] - removed 'taResponseTransform'
* [UPDATE] - example directory

## v 0.1.0 (2017/12/24)

* [UPGRADE] - now using Angular 5
* [NEW] - now supports static list via 'taList' attribute.
* [CHANGE] - result container now is with 'position: absolute' by default
* [FIXED] - list items are now above the blocking container (z-index: 10)

## v 0.0.4 (2017/11/05)

* Replaced deprecated ngOutletContext by ngTemplateOutletContext to support Angular version 5.
* Added taItemTpl example to Readme

## v 0.0.3 (2017/08/28)

* Added Api for choosing protocols (jsonp or http)
* Added Unit Tests for utils and component

## v 0.0.1 (2017/05/10)

* First release

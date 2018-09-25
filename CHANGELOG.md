## v 6.2.0 (2018/09/24)
- [UPDATED] - now supporting "cleared" selection when the input query is not in results - this allows the user to select the actual value in the input and no value from the list of suggestions.

## v 6.1.0 (2018/06/11)

- [FIXED] - selection with a mouse selected always the first result

## v 6.0.2 (2018/06/11)

- [UPDATED] - if no results - input value is used as the selected value
- [NEW] - added "@Input() taCaseSensitive" to allow forcing case sensitive when filtering the list
- [NEW] - added "@Input() taDisplayOnFocus" to show the result when the input is clicked (focused)

## v 6.0.1 (2018/05/23)

- [FIXED] - static list should be filtered regardless of letters case
- [NEW] - allow static list items to be of type object
- [NEW] - added "@Input() taListItemField" - allows to select fields to filter by for items in a static list
- [NEW] - added "@Input() taListItemLabel" - allows to select a key from objec to be displayed when using static list (of objects)

## v 6.0.0 (2018/05/23)

- [UPGRADE] - now follows Angular 6 and rxjs 6
- [FIXED] - if no results - input value is used as the selected value
- [NEW] - added **"[taAllowEmpty]"** to allow empty strings to pass

## v 0.2.1 (2018/04/21)

- [FIX] - active item not updated correctly

## v 0.2.0 (2018/04/21)

- [UPGRADE] - using rxjs new lettable operators ( > 5.5 )
- [REFACTOR] - now using Rxjs 'Subject' and not 'fromEvent' to subscribe for dom events
- [ADD] - new 'taDebounce' - to set debounce for key events
- [ADD] - new scoped classnames for results and items - 'ta-results', 'ta-item', 'ta-backdrop'
- [FIXED] - static list is not filtered by the query's value
- [REFACTOR] - moved functions to utilities
- [DEPRECATED] - removed 'taResponseTransform'
- [UPDATE] - example directory

## v 0.1.0 (2017/12/24)

- [UPGRADE] - now using Angular 5
- [NEW] - now supports static list via 'taList' attribute.
- [CHANGE] - result container now is with 'position: absolute' by default
- [FIXED] - list items are now above the blocking container (z-index: 10)

## v 0.0.4 (2017/11/05)

- Replaced deprecated ngOutletContext by ngTemplateOutletContext to support Angular version 5.
- Added taItemTpl example to Readme

## v 0.0.3 (2017/08/28)

- Added Api for choosing protocols (jsonp or http)
- Added Unit Tests for utils and component

## v 0.0.1 (2017/05/10)

- First release

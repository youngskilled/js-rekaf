# Rekaf - Turns a list into a fake select #

A jQuery plugin that takes care of all the small nuances of creating a select. Should have indentical functionality to a select but with the added advantage of the user being able to trigger an open state on it. The open state is created by changing the class on the parent object.

### Usage ###


Initiate with `$(selector).rekaf({'some':'property'});`   
Invoke methods with `$(selector).rekaf('method', {'some':'property'});`   
Example

	$('.fake-select').rekaf({
		debug: true,
		zIndex: 2000
	})
 
#### HTML ####

Following structure is required for selector to work. (Using Emmet tab complete for HTML)

	div.fake-select>span.title[data-orig-text=]+ul.fake-select-list>li*3

 
#### zIndex ####

*Default* `1500`   
*Expects* `integer`

Defines which z-index dropdowns should work. A normal select is the highest property on the page so that nothing obstructs it's usage.

	$(selector).rekaf({zIndex: 1500});


#### multiselect ####

*Default* `false`   
*Expects* `boolean`

Enables the user to be able to select more than one value in the drop down. *Warning this is not yet fully implemented*

	$(selector).rekaf({multiselect: false});


#### clickRemoveSelected ####

*Default* `false`   
*Expects* `boolean`

If the user clicks on the same value that is already selected the selection will be removed and the initial state will be returned.

	$(selector).rekaf({clickRemoveSelected: false});


#### debug ####

*Default* `false`   
*Expects* `boolean`

Helpful to get some debugging data. This should be off for production prints object data straight to the console.

	$(selector).rekaf({debug: false});


### Development ###

**Requirements**
* This plugin requires [node](http://nodejs.org/), [gulpjs](http://gulpjs.com/) and [bower](http://bower.io/).
* Follow JSCS guidelines a styling-example.js is also included.
* Run `bower install` and `npm install` to get dev dependencies. Bower and Gulp is assumed to be running globally.

### Contact ###

This is a small plugin by Young Skilled.
Contact [richard](mailto:richard@youngskilled) for more details about this plugin.
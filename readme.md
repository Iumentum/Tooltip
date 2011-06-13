# Tooltip plugin for jQuery

## What is Tooltip
Tooltip is a simple jQuery plugin for generating tooltips.

## Usage
> ___Do not use title selector as selector cause the script will remove that attribute.___

	$(function() {
		$('a[rel=tooltip]').tooltip({
			gravity: ['sw', 'nw', 'se', 'ne', 'n', 's', 'e', 'w']
		});
	});

## Options
* ### gravity:  
  Gravity priority used in order when tooltip falls out of bounds.
	* __Type:__ `Array` or `String`
	* __Default:__ `['sw', 'nw', 'se', 'ne', 'n', 's', 'e', 'w']`

* ### offset:  
  Distance between element and tooltip
	* __Type:__ `Integer`
	* __Default:__ `5`

* ### titleSelector:  
  The selector of the title text which will be used by the plugin.
	* __Type:__ `String`
	* __Default:__ `'title'`

* ### live:  
  Define if the trigger event should be bound as a live event.
	* __Type:__ `Boolean`
	* __Default:__ `true`

* ### trigger:  
  Define what will trigger the tooltip.
	* __Type:__ `String`
	* __Default__: `'hover'`

* ### className:  
  Add class to the tooltip element on creation.
	* __Type:__ `String`
	* __Default:__ `false`

## Functions
Functions used to manually control the tooltip element.

* ### .show()  
  Show the tooltip element.

* ### .hide()  
  Hide the tooltip element.

* ### .html(`text or html`)  
  Set the html contents for the tooltip element.

* ### .addClass(`string`)  
  Add a CSS class to the tooltip element.

* ### .removeClass(`string`)  
  Removes all or the specified class(es) from the tooltip element.

* ### .setGravity(`string or array)  
  Sets the gravity of the tooltip element.

> To use functions you need to initialize the tooltip on the binding element first.

	$('#element-id').tooltip({trigger: 'manually'});

> Then call functions by parsing the first parameter as `true` followed by the function(s).

	$('#element-id').tooltip(true).show();

> All functions can be nested as following.

	$('#element-id').tooltip(true).html('Try this kewl jQuery tooltip plugin.').addClass('tooltip-plugin').show();

## Contributing
__1.__ Fork it.  
__2.__ Make changes.  
__3.__ Create a pull request.  
__4.__ Enjoy a cup of coffee while waiting.  


## Forking
> _By forking this project you hereby grant permission for any commits to your fork to be merged back into this repository and, with attribution, be released under the terms of the MIT License._
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
* __gravity:__ Gravity priority used in order when tooltip falls out of bounds.
	* __Type:__ `Array` or `String`
	* __Default:__ `['sw', 'nw', 'se', 'ne', 'n', 's', 'e', 'w']`

* __offset:__ Distance between element and tooltip
	* __Type:__ `Integer`
	* __Default:__ `5`

* __titleSelector:__ The selector of the title text which will be used by the plugin.
	* __Type:__ `String`
	* __Default:__ `'title'`

* __live:__ Define if the trigger event should be bound as a live event.
	* __Type:__ `Boolean`
	* __Default:__ `true`

* __trigger:__ Define what will trigger the tooltip.
	* __Type:__ `String`
	* __Default__: `'hover'`

* __className:__ Add class to the tooltip element on creation.
	* __Type:__ `String`
	* __Default:__ `false`

## Contributing
__1.__ Fork it.
__2.__ Create a pull request.
__3.__ Enjoy a cup of coffee while waiting.


## Forking
> _By forking this project you hereby grant permission for any commits to your fork to be merged back into this repository and, with attribution, be released under the terms of the MIT License._